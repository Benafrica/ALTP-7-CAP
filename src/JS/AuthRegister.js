/**
 * This JS File Will Handle All Blog Articles 
 */

const apiUrl = 'https://benafrica-api.herokuapp.com'

let accessToken;

const bearer = `Bearer ${accessToken}` 

 /**
 * Fetching & Posting Credentials From The API
 */
 
 /**
 * Posting New Users To The API
 */
const regFormData = () => {
    const fName = document.getElementById('fname').value
    const lName = document.getElementById('lname').value
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value
    
    const formData = {fName, lName, email, password}
    return formData
}

 const postNewUser = () => {
     fetch(`${apiUrl}/api/v1/auth/register`, {
        method: 'POST',
        headers: {
             'Content-Type': 'application/json; charset=UTF-8'
         },
         body: JSON.stringify({
            fName: regFormData().fName,
            lName: regFormData().lName,
            email: regFormData().email,
            password: regFormData().password
         })
     }).then(res => {
        if (res.ok !== true ) return console.log(`Error Happened...>> Status Code: ${res.status}`)
        return res.json()        
        }).then(data => {
            return window.location.href = '../pages/login.html'
     })
 }




