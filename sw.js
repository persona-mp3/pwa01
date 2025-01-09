//install --> activate --> fetch
const currentVersion = '.v3'

self.addEventListener('install', () => {
    console.log('SW installed')
});


//manipulates CACHE API storage
self.addEventListener('activate', (e) => {
    console.log('SW activated')
    //1. list existing cache    caches.key().then((cacheNames) => {})
    //2. Delete old cache       return Promise.all(...caches.delete(...))
    e.waitUntil(
        caches.keys().then((cacheNames => {
            //map thru cache names and delete old ones
            const deletePromises = cacheNames.map((cacheName) => {
                if (cacheName !== currentVersion){
                    console.log('Clearing Old Cache')
                    return caches.delete(cacheName)
                }
            });

            return Promise.all(deletePromises)
        }))
    )
});


//clones and stores repoionses from server
self.addEventListener('fetch', (e) => {
    console.log('SW...fetching')

    //skip non-GET request made
    if (e.request.method !== 'GET'){
        return;
    }


    //intercept responses gotten from server
    e.respondWith(

        fetch(e.request)
        
            .then(async (res) => {
                const clonedResponse = res.clone();     //clone the response from server

                if (res.status === 206){
                    return res;         //skip partial caching
                }

                try{
                    const newCache = await caches.open(currentVersion);
                    await newCache.put(e.request, clonedResponse);
                } catch(err){
                    console.error(`No available request/response, ${err}`);
                }

                return res


            })
            .catch((err) => {
                console.log(`An error occured while trying to clone, ${err}`)
            })
    )
})