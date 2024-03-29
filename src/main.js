'use strict'
const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    headers: {
        'Content-type': 'application/json;charset=utf-8',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4MTQ0NTc4MTk5YjczYjdlZmIzYmJiNmU4NDI0YzhiNyIsInN1YiI6IjY2MDFlOWM0NjJmMzM1MDE2NDUyMzJmYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.y-Z6z9V_Qq71CgbV3yIbxZdLtOp0MoeL_rjhq7ZTb4g',
    }
});

//UTILS
function createMoviesContainer(array, parent) {
    parent.innerHTML = '';

    array.forEach(film => {
        const filmContainer = document.createElement('div');
        filmContainer.classList.add('movie-container');

        const filmImg = document.createElement('img');
        filmImg.classList.add('movie-img');
        filmImg.alt = film.title;
        filmImg.src = 'https://image.tmdb.org/t/p/w300' + film.poster_path;

        filmContainer.appendChild(filmImg);
        parent.appendChild(filmContainer);
    });
}

function createCategoriesContainer(array, parent) {
    parent.innerHTML = '';

    array.forEach(category => {
        const categoryContainer = document.createElement('div');
        categoryContainer.addEventListener('click', (e) => {
            e.stopPropagation();
            location.hash = `#category=${category.id}-${category.name}`
        });
        categoryContainer.classList.add('category-container');

        const categoryTitle = document.createElement('h3');
        categoryTitle.id = `id${category.id}`;
        categoryTitle.classList.add('category-title');
        categoryTitle.innerText = category.name;

        categoryContainer.appendChild(categoryTitle);
        parent.appendChild(categoryContainer);
    })
};

function fixQueries(query) {
    let queryFixed = query;

    if(queryFixed.includes('%20')) {
        queryFixed = queryFixed.replace('%20', ' ');
        return fixQueries(queryFixed);
    } 
    
    if(queryFixed.includes('%C3%A1')) {
        queryFixed = queryFixed.replace('%C3%A1', 'á');
        return fixQueries(queryFixed);
    } 
    
    if(queryFixed.includes('%C3%A9')) {
        queryFixed = queryFixed.replace('%C3%A9','é');
        return fixQueries(queryFixed);
    } 
    
    if(queryFixed.includes('%C3%AD')) {
        queryFixed = queryFixed.replace('%C3%AD','í');
        return fixQueries(queryFixed);
    } 
    
    if(queryFixed.includes('%C3%B3')) {
        queryFixed = queryFixed.replace('%C3%B3', 'ó');
        return fixQueries(queryFixed);
    } 
    
    if(queryFixed.includes('%C3%BA')) {
        queryFixed = queryFixed.replace('%C3%BA','ú');
        return fixQueries(queryFixed);
    } 

    return queryFixed  
};

//API'S CALL
async function getTrendingMoviesPreview() {
    const {data, status} = await api('/trending/movie/day');
    const movies = data.results;

    createMoviesContainer(movies, trendingMoviesPreviewList);
};

async function getCategoriesPreview() {
    const {data, status} = await api('/genre/movie/list');
    const categories = data.genres;

    createCategoriesContainer(categories, categoriesPreviewList);
}

async function getMoviesByCategory(categoryId) {
    const {data, status} = await api('/discover/movie', {
        params: {
            with_genres: categoryId,
        },
    });
    const movies = data.results;

    createMoviesContainer(movies, genericSection);
}

async function getMoviesByQuery(query) {
    const {data, status} = await api('/search/movie', {
        params: {
            query
        },
    });
    const movies = data.results;

    movies.length === 0 
        ? genericSection.innerHTML = `<p>Sorry, no results found for <strong>${query}</strong> :(</p>`
        : createMoviesContainer(movies, genericSection);
}
