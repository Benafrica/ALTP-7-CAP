/**
 * This JS File Will Handle All Blog Articles
 */

/**
 * Fetching The API
 */

 const apiUrl = "https://benafrica-api.herokuapp.com";

 let accessToken = ("; " + document.cookie)
   .split(`; accessToken=`)
   .pop()
   .split(";")[0];
 const bearer = `Bearer ${accessToken}`;
 
 let totQuerries;
 
 /**
  * Fetching All Querries
  */
 
 const fetchQuerries = () => {
   fetch(`${apiUrl}/api/v1/admin/messages`, {
     method: "GET",
     headers: {Authorization: bearer},
   })
     .then((res) => {
       if (res.ok === true) return res.json();
       else throw new Error(`Error Happened...>> Status Code: ${res.status}`);
     })
     .then((data) => {
       let message = "";
       let count = 1;
       data.map((values) => {
         message += `
                 <div class="msg-details" id="${values._id}">
                 <div class="msg-content">
                     <div class="querry-counter">Message: ${count}</div>
                         <span class="msg-querry"><span class="querry-title">From:</span>${values.fullNames}</span>
                         <span class="msg-querry"><span class="querry-title">Email:</span>${values.email}</span>
                         <span class="msg-querry-msg msg-querry"><span class="querry-title">Message:</span>${values.message}</span>
                 </div>
                 <p class="article-action-btns">
                     <p class="article-action-btns">
                         <button class="article-action-btn" onclick="fetchQuerryById('${values._id}')">View</button>
                         <button class="article-action-btn" onclick="deleteQuerryById('${values._id}')">Delete</button>
                     </p>
                 </p>
             </div>`;
         count++;
       });
       totQuerries = count - 1;
       localStorage.setItem("Total Querries", totQuerries);
       document.getElementById("adminQuerries").innerHTML = message;
     })
     .catch((err) => {
       console.log(err);
     });
 };
 fetchQuerries();
 
 /**
  * Fetching Querry By Id
  */
 
 const fetchQuerryById = (querryId) => {
   fetch(`${apiUrl}/api/v1/admin/messages/${querryId}`, {
     method: "GET",
     headers: {Authorization: bearer},
   })
     .then((res) => {
       if (res.ok === true) return res.json();
       else throw new Error(`Error Happened...>> Status Code: ${res.status}`);
     })
     .then((fetchedMsg) => {
        const msgDetail = document.getElementById('msgViewDetail')
        const msgContainer = document.getElementById('msgViewContainer')
        msgDetail.style.display = 'block'
        msgContainer.style.display = 'flex'
        console.log(fetchedMsg);
        let message = `
        <div class="msg-view-container-details">
            <h3>Message From: <span>${fetchedMsg.fullNames}</span></h3>
            <p>${fetchedMsg.message}</p>
        </div>
        <div class="msg-view-container-btns">
            <a href="mailto:${fetchedMsg.email}" id="replytoId">Reply</a>
            <a id="deleteMsgId" onclick="deleteQuerryById('${fetchedMsg._id}')">Delete</a>
            <a id="closeMsgId" onclick="closeMsgBox()">Close</a>
        </div>`;
       document.getElementById("msgViewContainer").innerHTML = message;
     })
     .catch((err) => {
       console.error(err);
     });
 };
 
 /**
  * Fetching Delete Querry By Id
  */
 
 const deleteQuerryById = (postId) => {
   fetch(`${apiUrl}/api/v1/admin/messages/${postId}`, {
     method: "DELETE",
     headers: {Authorization: bearer},
   })
     .then((res) => {
       if (res.ok === true) return res.json();
       else throw new Error(`Error Happened...>> Status Code: ${res.status}`);    })
     .then((fetchedRes) => {
       alert("Message Deleted");
       location.reload();
     })
     .catch((err) => {
       console.error(err);
     });
 };

/**
 *  Close View MSG By ID
 */

const closeMsgBox = () => {
    const msgDetail = document.getElementById('msgViewDetail')
    const msgContainer = document.getElementById('msgViewContainer')
    msgDetail.style.display = 'none'
    msgContainer.style.display = 'none'
}
 
 /**
  * Logout Fetch
  */
 
 const logout = () => {
   fetch(`${apiUrl}/api/v1/auth/logout`, {
     method: "DELETE",
     headers: {Authorization: bearer},
   })
     .then((res) => {
       if (res.ok === true) return res.json();
       else throw new Error(`Error Happened...>> Status Code: ${res.status}`);
     })
     .then((data) => {
       document.cookie = `accessToken=${accessToken};path=/; max-age=0; sameSite=Lax;`;
       return (window.location.href = "../../index.html");
     });
 };
 