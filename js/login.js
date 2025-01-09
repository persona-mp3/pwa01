// const form = document.getElementById('loginForm');

// async function sendData(){
//     const formData = new FormData(form);

//     try{
//     const response = await fetch('/login', {
//         method: 'POST',
//         body: formData,
//         credentials: 'same-origin'
//     });

//     if (response.ok){
//         alert('Status: Logged-in')
//         window.location.href = '/'
//     }else if(response.status === 401){
//         alert(`Email address not found/ Incorrect password`)
//     }
//     else{
//         // console.log('ERROR BELOW')
//         console.error(response.status);
//         alert('FAILED TO SUBMIT')
//     }

//     const responseData = await response.json
//     console.log(responseData)
//     }catch(e){console.error(e)}
// }

// form.addEventListener('submit', (e) => {
//     e.preventDefault()
//     sendData()
// })


