/**
 * This JS File Will Handle All Blog Articles 
 */

/**
 * Pre Loader
 */

window.addEventListener('load', () => {
    fetchArticles()
});


const apiUrl = 'https://benafrica-api.herokuapp.com'

let accessToken = ("; " + document.cookie)
.split(`; accessToken=`)
.pop()
.split(";")[0];
const bearer = `Bearer ${accessToken}`;

/**
* Fetching The Articles From The API
*/



const fetchArticles = () => {
    fetch(`${apiUrl}/api/v1/admin/blog_articles`).then( res => {
        if (res.ok !== true ) throw new Error(`Error Happened...>> Status Code: ${res.status}`);
        else return res.json()
    }).then(fetchedData => {
        // Storing & Outputing Blog Articles Data
        let article=""
        let date
        let displayDate
        const options = { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric' };
        fetchedData.map(values => {
            date = new Date(`${values.dateOfArticle}`)
            displayDate = date.toLocaleDateString('en-US', options)
            article+= `<div class="box"  id="${values._id}">
            <div>
                <img src="../images/blog-img1.jpg" alt="blog 2 image" class="box-img">
            </div>
            <div class="box-content">
                <h4>${values.title}</h4>
                <h6>${displayDate}</h6>
                <p>${values.articleContent}</p>
                <div class="blog-btn">
                    <a class="btn-blog" onclick="ArticleView('${values._id}')">Read More</a>
                    <div class="blog-btn-r-side">
                        <span class="blog-stats"><span class="counter">5</span><i class="uil uil-thumbs-up"></i></span>
                        <span class="blog-stats"><span class="counter">5</><i class="uil uil-comment-lines"></i></span>
                    </div>
                </div>
            </div>
        </div>`
        })
        document.getElementById('blogArticles').innerHTML = article
    }).catch(err => {
        console.error(err)
    })
}


const ArticleView = (ArticleId) => {
    const singleBlogViewBackound = document.getElementById('blogArticles-view-background')
    const singleBlogViewContente = document.getElementById('blogArticles-view-content')

    fetch(`${apiUrl}/api/v1/admin/blog_articles/${ArticleId}`, {
        method: "GET",
        headers: {Authorization: bearer},
      }).then( res => {
        if (res.ok !== true ) throw new Error(`Error Happened...>> Status Code: ${res.status}`);
        else return res.json()
    }).then(fetchedData => {
        // Storing & Outputing Blog Articles Data
        let article=""
        let date
        let displayDate
        const options = { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric' };            
        date = new Date(`${fetchedData.dateOfArticle}`)
        displayDate = date.toLocaleDateString('en-US', options)
        article = `
        <div class="blog-view-l-side">
            <img src="../images/blog-img1.jpg" alt="">
            <h5>${fetchedData.title}</h5>
            <p>Article Published On : ${displayDate}</p>
      </div>
      <div class="blog-view-r-side">
        <p>${fetchedData.articleContent}</p>
        <a onclick="closeArticle()">Close</a>
      </div>`
        document.getElementById('blogArticles-view-content').innerHTML = article
        singleBlogViewBackound.style.display = 'block'
        singleBlogViewContente.style.display = 'flex'
    }).catch(err => {
        console.error(err)
    })
}

const closeArticle = () => {
    const singleBlogViewBackound = document.getElementById('blogArticles-view-background')
    const singleBlogViewContente = document.getElementById('blogArticles-view-content')
    singleBlogViewBackound.style.display = 'none'
    singleBlogViewContente.style.display = 'none'
} 




