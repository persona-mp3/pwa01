const version ='v2.2';

self.addEventListener('install', () => {
    console.log('Installing...')
});

self.addEventListener('activate',() => {
    console.log('SW Activated');

    caches.keys()
        .then((currentCaches) =>{
            
            const deletedPromise = currentCaches.map((existingCache) => {

                if (existingCache!== version){
                    console.log('Deleting Caches');
                    return caches.delete(existingCache);
                }
            });
            return Promise.all(deletedPromise)
        })
});

self.addEventListener('fetch', (e) => {
    e.respondWith(

        fetch(e.request) 
            .then(async (res) =>{
                const clonedRes = res.clone();

                            
                try{
                    //open cache with current version
                    const newCache = await caches.open(version);
                    await newCache.put(e.request, clonedRes)

                }catch(err) {
                    console.error(`Error occured while cloning: ${err}`)
                }

                return res

            })
            .catch(async (err) => {
                console.error(`Error during request event`);

                //fallback option for cached response

                const cache = await caches.open(version);
                const cachedResponse = await cache.match(e.request);

                if (cachedResponse){
                    return cachedResponse
                } else{
                    return caches.match('/index.html')
                }
            }),
    )
})
