
function loadData() {
    fetch('https://openapi.programming-hero.com/api/news/categories')
        .then(res => res.json())
        .then(data => display(data.data.news_category))

}
function display(newses) {
    const newsCatagoriesContainer = document.getElementById('news-catagories');
    for (const news of newses) {
        // console.log(news)
        const li = document.createElement('li');
        // li.innerText = news.category_name;
        // console.log(li)
        li.innerHTML = `
        ${news.category_name}
        `
        newsCatagoriesContainer.appendChild(li);
    }
}

function newsDataLoad() {
    fetch('https://openapi.programming-hero.com/api/news/category/01')
        .then(res => res.json())
        .then(data => displayNews(data.data))

}
function displayNews(views) {
    console.log(views)
    const newsCatagoriesContainer = document.getElementById('news-display');
    for (const view of views) {
        console.log(view)
        const divNews = document.createElement('div')
        divNews.innerHTML = `
        <div class=" border rounded-2 bg-light d-sm-flex  container  ">
        <div><img src="${view.image_url}" class="img-fluid" alt="">
        </div>
        <div class="pt-3 ps-4">
            <h4>${view.title}</h4>
            <p>${view.details}
            </p>
            <div>
                <div class="d-flex m-3">
                    <div class="d-flex">
                        <div class="w-25  h-25 m-3"> <img src="${view.author.img}" class="w-100 rounded-circle  h-100" alt=""></div>
                        <div class=" m-3">
                            <h6>${view.author.name}
                            </h6>
                            <p>${view.author.published_date}
                            </p>
                        </div>
                    </div>
                    <div class="d-flex m-3 ">
                    <i class="fa-solid fa-eye p-2"></i>
                        <h3 class="">${view.total_view}</h3>
                    </div>
                    <div class=" m-3">
                    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#newsDetailsModal">
                    details
            </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
            `
        newsCatagoriesContainer.appendChild(divNews)
    }
}
newsDataLoad();
loadData();
