
/**
 * Pre Loader
 */


/**
 * Storing Form Data
 */

const apiUrl = 'https://benafrica-api.herokuapp.com'

const messageFormData = () => {
    const fullNames = document.getElementById('name').value
    const email = document.getElementById('email').value
    const message = document.getElementById('message').value

    const messageData = {fullNames, email, message}
    return messageData
}


const clearForm = () => {
    const contactForm = document.getElementById('form1')
    contactForm.reset()
    return false
 }



 const postNewQuerry = () => {
     fetch(`${apiUrl}/api/v1/admin/messages`, {
        method: 'POST',
        headers: {
             'Content-Type': 'application/json; charset=UTF-8'
         },
         body: JSON.stringify({
            fullNames: messageFormData().fullNames,
            email: messageFormData().email,
            message: messageFormData().message
         })
     }).then(res => {
        if (res.ok === true ) return res.json()
        else console.log(`Error Happened...>> Status Code: ${res.status}`) 
        }).then(data => {
            console.log(data);
            const sentMessage = data.newMessage
            console.log(data.newMessage)
            alert('>>>   Message Sent Successfully.  Thank You For Reaching Out!   <<<')
            clearForm()
     })
 }

export default postNewQuerry;

