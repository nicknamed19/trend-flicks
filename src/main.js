async function getTrendingMoviesPreview() {
    const res = await fetch('https://api.themoviedb.org/3/trending/movie/day?api_key=' + API_KEY);
    const data = await res.json();
    
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

getTrendingMoviesPreview()