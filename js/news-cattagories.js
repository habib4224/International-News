let idPerNews = [];
function newsCategoriesget() {
    fetch('https://openapi.programming-hero.com/api/news/categories')
        .then(res => res.json())
        .then(data => displayCategories(data))
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