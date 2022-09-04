let idPerNews = [];
function newsCategoriesget() {
    fetch('https://openapi.programming-hero.com/api/news/categories')
        .then(res => res.json())
        .then(data => displayCategories(data))
        .catch(error => console.log(error))
}

function displayCategories(data) {

    const categoriesGet = data.data.news_category;
    const categoriesContainer = document.getElementById('news-catagories');

    for (const categoriesDatas of categoriesGet) {
        idPerNews.push(categoriesDatas.category_id);
        const li = document.createElement('li');

        li.innerHTML = `
        <p id="${categoriesDatas.category_id}" onclick="newsCatagoriesClicked(${categoriesDatas.category_id})">${categoriesDatas.category_name}</p>
        `
        categoriesContainer.appendChild(li);

    }

}

newsCategoriesget();

function newsCatagoriesClicked(id) {
    spinner(true);
    const url = `https://openapi.programming-hero.com/api/news/category/0${id}`;
    fetch(url)
        .then(res => res.json())
        .then(data => newsCatagoriesDisplay(data.data))
        .catch(error => console.log(error))
}

function newsCatagoriesDisplay(getNews) {
    const noFoundNews = document.getElementById('noFound');
    if (getNews.length == 0) {
        noFoundNews.classList.remove('d-none');
    }
    else {
        noFoundNews.classList.add('d-none');
    }
    const newsShowContainer = document.getElementById('News-Div');
    newsShowContainer.innerHTML = "";
    for (const getNewsd of getNews) {

        const newsPushDiv = document.createElement('div');
        newsPushDiv.innerHTML = `
        <div class=" border rounded-3 bg-light d-sm-flex  container my-3" >
        <div><img src="${getNewsd.image_url ? getNewsd.image_url : "News Img Not Available"}" class=" my-3" alt=""  style="height: 220px; width: 340px;">
        </div>
        <div class="pt-3 ps-4">
            <h4>${getNewsd.title ? getNewsd.title : "News Title not available"}</h4>
            <p>${getNewsd.details.slice(0, 400)}...
            </p>
            <div>
                <div class="d-flex justify-content-between">
                    <div class="d-flex">
                        <div class=" m-3" style="height: 40px; width:40px; "> <img src="${getNewsd.author.img ? getNewsd.author.img : "Author Img not Avalaible"}" class="w-100 rounded-circle  h-100" alt=""></div>
                        <div class=" m-3">
                            <h6>${getNewsd.author.name ? getNewsd.author.name : "Author Name Not Avaialble"}
                            </h6>
                            <p>${getNewsd.author.published_date ? getNewsd.author.published_date : "Published Date Not Available"}
                            </p>
                        </div>
                    </div>
                    <div class="d-flex m-3 ">
                    <i class="fa-solid fa-eye p-2"></i>
                        <h3 class="">${getNewsd.total_view ? getNewsd.total_view : "No view "}</h3>
                    </div>
                    
                    <div class=" m-3">
                    <button onclick="getFullNews('${getNewsd._id}')" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#newsDetailsModal" >
                    Read More
                    </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
            `
        newsShowContainer.appendChild(newsPushDiv);
    }
    spinner(false);

}

// full news loader function

function getFullNews(id) {
    const fullNewsUrl = `https://openapi.programming-hero.com/api/news/${id}`;
    fetch(fullNewsUrl)
        .then(res => res.json())
        .then(news => fullNewsModal(news.data))
        .catch(error => console.log(error))
}

function fullNewsModal(fullNewses) {
    const modalFullNews = document.getElementById('modalTitel');
    modalFullNews.innerText = "";
    for (const fullNews of fullNewses) {
        const modalFullNewsDiv = document.createElement('div');
        modalFullNewsDiv.innerHTML = `
        <div class=" border rounded-3 bg-light   container my-3" >
        <div><img src="${fullNews.image_url}" class=" my-3" alt=""  style="height: 220px; width: 340px;">
        </div>
        <div class="pt-3 ps-4">
            <h4>${fullNews.title}</h4>
            <p>${fullNews.details}
            </p>
            <div>
                <div class="d-flex justify-content-between">
                    <div class="d-flex">
                        <div class=" m-3" style="height: 40px; width:40px; "> <img src="${fullNews.author.img ? fullNews.author.img : " News Img Not Found"}" class="w-100 rounded-circle  h-100" alt=""></div>
                        <div class=" m-3">
                            <h6>${fullNews.author.name ? fullNews.author.name : "Author Name Not Found"}
                            </h6>
                            <p>${fullNews.author.published_date ? fullNews.author.published_date : "Published Date Not Found"}
                            </p>
                        </div>
                    </div>
                    <div class="d-flex m-3 ">
                    <i class="fa-solid fa-eye p-2"></i>
                        <h3 class="">${fullNews.total_view ? fullNews.total_view : " No Views "}</h3>
                    </div>
                </div>
                <div class="m-3">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>
        `
        modalFullNews.appendChild(modalFullNewsDiv);
    }
}

// spiner condition 
const spinner = isloading => {
    const spinnerSection = document.getElementById('loader');
    if (isloading) {
        spinnerSection.classList.remove('d-none');
    }
    else {
        spinnerSection.classList.add('d-none');
    }
}
newsCatagoriesClicked(01);