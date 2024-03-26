'use strict'
const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    headers: {
        'Content-type': 'application/json;charset=utf-8',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4MTQ0NTc4MTk5YjczYjdlZmIzYmJiNmU4NDI0YzhiNyIsInN1YiI6IjY2MDFlOWM0NjJmMzM1MDE2NDUyMzJmYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.y-Z6z9V_Qq71CgbV3yIbxZdLtOp0MoeL_rjhq7ZTb4g',
    }
})


async function getTrendingMoviesPreview() {
    const {data, status} = await api('/trending/movie/day');
    
    
    const movies = data.results;
    const trendingPreviewContainer = document.querySelector('#trendingPreview .trendingPreview-movieList')

    movies.forEach(film => {
        const filmContainer = document.createElement('div');
        filmContainer.classList.add('movie-container');

        const filmImg = document.createElement('img');
        filmImg.classList.add('movie-img');
        filmImg.alt = film.title;
        filmImg.src = 'https://image.tmdb.org/t/p/w300' + film.poster_path;

        filmContainer.appendChild(filmImg);
        trendingPreviewContainer.appendChild(filmContainer);


    });
};

async function getCategoriesPreview() {
    const {data, status} = await api('/genre/movie/list');

    const categoriesPreview = document.querySelector('#categoriesPreview .categoriesPreview-list');
    const categories = data.genres;

    categories.forEach(category => {
        const categoryContainer = document.createElement('div');
        categoryContainer.classList.add('category-container')

        const categoryTitle = document.createElement('h3');
        categoryTitle.id = `id${category.id}`;
        categoryTitle.classList.add('category-title');
        categoryTitle.innerText = category.name;

        categoryContainer.appendChild(categoryTitle);
        categoriesPreview.appendChild(categoryContainer);
    })
    
}

getCategoriesPreview()
getTrendingMoviesPreview()