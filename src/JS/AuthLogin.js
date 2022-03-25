/**
 * This JS File Will Handle All Blog Articles 
 */

const apiUrl = 'https://benafrica-api.herokuapp.com'

let accessToken;

const bearer = `Bearer ${accessToken}`;

// window.addEventListener('load', () => {
//     isLoggedIn()
// });

 /**
 * Fetching & Posting Credentials From The API
 */
 
 /**
 * Posting New Users To The API
 */
const loginFormData = () => {
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value
    
    const formData = { email, password }
    return formData
}

const loginUser = () => {
    fetch(`${apiUrl}/api/v1/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify({
           email: loginFormData().email,
           password: loginFormData().password
        })
    }).then(res => {
        if (res.ok !== true ) return console.log(`Error Happened...>> Status Code: ${res.status}`)
        else return res.json()
       }).then( data => {
            const accessToken = data.accessToken
            document.cookie =  `accessToken=${accessToken};path=/; max-age=${1000*60*60*3}; sameSite=Lax;`;
            return window.location.href = '../pages/admin.html'
    })
}

