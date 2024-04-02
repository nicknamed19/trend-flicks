'use strict'
const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    headers: {
        'Content-type': 'application/json;charset=utf-8',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4MTQ0NTc4MTk5YjczYjdlZmIzYmJiNmU4NDI0YzhiNyIsInN1YiI6IjY2MDFlOWM0NjJmMzM1MDE2NDUyMzJmYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.y-Z6z9V_Qq71CgbV3yIbxZdLtOp0MoeL_rjhq7ZTb4g',
    }
});

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

async function getTrendingMovies() {
    const {data, status} = await api('/trending/movie/day');
    const movies = data.results;

    createMoviesContainer(movies, genericSection);
};

async function getMovieDetails(movieId) {
    const { data: movie } = await api(`/movie/${movieId}`);

    const movieCategories = movie.genres;
    const voteAvarenge = movie.vote_average;
    const imgUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    
    headerSection.style.background = `
        linear-gradient(
            180deg,
            rgba(0, 0, 0, 0.35) 19.27%, 
            rgba(0, 0, 0, 0) 29.17%
        ), 
        url(${imgUrl})
    `;

    movieDetailTitle.classList.remove('movieDetail-title--skeleton');
    movieDetailScore.classList.remove('movieDetail-score--skeleton');

    movieDetailTitle.innerText = movie.title;
    movieDetailScore.innerText = voteAvarenge.toFixed(1);
    movieDetailDescription.innerText = movie.overview;

    createCategoriesContainer(movieCategories, movieDetailCategoriesList);
    getMoviesRelated(movieId);
};

async function getMoviesRelated(movieId) {
    const { data } = await api(`/movie/${movieId}/recommendations`);
    const movies = data.results;

    relatedMoviesContainer.scrollLeft = 0
    createMoviesContainer(movies, relatedMoviesContainer);
}
