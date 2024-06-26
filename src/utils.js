//UTILS
function movieSkeleton(parent) {
    parent.innerHTML = '';
    const n = 6;

    for (let index = 0; index < n; index++) {
        const filmContainer = document.createElement('div');
        filmContainer.classList.add('movie-skeleton');  

        parent.append(filmContainer)
    }
}

function categorySkeleton(parent, quantity) {
    parent.innerHTML = '';
    const n = quantity;

    for (let index = 0; index < n; index++) {
        const categoryContainer = document.createElement('div');
        categoryContainer.classList.add('category-skeleton');  

        parent.appendChild(categoryContainer)
    }
}

function homePageSkeleton() {
    movieSkeleton(trendingMoviesPreviewList)
    categorySkeleton(categoriesPreviewList, 10)
}

function movieDetailSkeleton() {
    movieDetailTitle.innerText = '';
    movieDetailScore.innerText = '';

    movieDetailTitle.classList.add('movieDetail-title--skeleton');
    movieDetailScore.classList.add('movieDetail-score--skeleton');

    movieSkeleton(relatedMoviesContainer);
    categorySkeleton(movieDetailCategoriesList, 4);
}

function createMoviesContainer(array, parent, { clean = true, } = {}) {
    if(clean) {
        parent.innerHTML = '';
    }

    array.forEach(film => {
        const filmContainer = document.createElement('div');
        filmContainer.classList.add('movie-container');
        
        const filmImg = document.createElement('img');
        filmImg.classList.add('movie-img');
        filmImg.alt = film.title;
        filmImg.dataset.src = 'https://image.tmdb.org/t/p/w300' + film.poster_path;

        filmImg.addEventListener('click', (e) => {
            e.stopPropagation()
            location.hash = `#movie=${film.id}`
        });

        filmImg.addEventListener('error', (e) => {
            e.stopPropagation()
           filmImg.src = 'https://static.vecteezy.com/system/resources/previews/012/942/784/non_2x/broken-image-icon-isolated-on-a-white-background-no-image-symbol-for-web-and-mobile-apps-free-vector.jpg'
           const spanTitle = document.createElement('span')
           spanTitle.innerText = filmImg.alt
           spanTitle.classList.add('img-error')

           filmContainer.appendChild(spanTitle)           
        })

        const movieBtn = document.createElement('button');
        movieBtn.classList.add('movie-btn');

        getLocalStorageData()[film.id] && movieBtn.classList.add('movie-btn--liked');
        movieBtn.addEventListener('click', () => {
            movieBtn.classList.toggle('movie-btn--liked');
            movieLiked(film)

            if (location.hash === '') {
                getLikedMovies()                
            }
        });
        
        filmContainer.append(filmImg, movieBtn);
        parent.appendChild(filmContainer);
        registerImage(filmContainer)
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

function getLocalStorageData() {
    const moviesStorage = JSON.parse(localStorage.getItem('liked_movies'));
    let item;

    moviesStorage ? item = moviesStorage : item = {};
    return item;
}

function movieLiked(film) {
    const likedMovies = getLocalStorageData()
    
    if (likedMovies[film.id]) {
        delete likedMovies[film.id];
    } else {
        likedMovies[film.id] = film;
    }

    localStorage.setItem('liked_movies', JSON.stringify(likedMovies))
}

function getLikedMovies() {
    const moviesStorage = getLocalStorageData()
    const moviesArray = Object.values(moviesStorage)

    createMoviesContainer(moviesArray, likedMoviesList)
}