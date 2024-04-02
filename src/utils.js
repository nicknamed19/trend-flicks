//UTILS
function movieSkeleton(parent) {
    const n = 6;

    for (let index = 0; index < n; index++) {
        const filmContainer = document.createElement('div');
        filmContainer.classList.add('movie-skeleton');  

        parent.appendChild(filmContainer)
    }
    console.log(parent);
}

function categorySkeleton(parent) {
    const n = 10;

    for (let index = 0; index < n; index++) {
        const categoryContainer = document.createElement('div');
        categoryContainer.classList.add('category-skeleton');  

        parent.appendChild(categoryContainer)
    }
}

function homePageSkeleton() {
    movieSkeleton(trendingMoviesPreviewList)
    categorySkeleton(categoriesPreviewList)
}

function genericSectionSkeleton() {
    movieSkeleton(genericSection)
    
}

function createMoviesContainer(array, parent) {
    array.forEach(film => {
        const filmContainer = document.createElement('div');
        filmContainer.classList.add('movie-container');
        filmContainer.addEventListener('click', () => {
            location.hash = `#movie=${film.id}`
        });
        
        const filmImg = document.createElement('img');
        filmImg.classList.add('movie-img');
        filmImg.alt = film.title;
        filmImg.src = 'https://image.tmdb.org/t/p/w300' + film.poster_path;
        
        filmContainer.appendChild(filmImg);
        parent.innerHTML = '';
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