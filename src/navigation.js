'use strict'

const changeHash = (hash) => {
    hash === '#search=' 
        ? location.hash = hash + searchFormInput.value
        : location.hash = hash;
};

arrowBtn.addEventListener('click', () => {
    history.back();
});
searchFormBtn.addEventListener('click', () => changeHash('#search='));
trendingBtn.addEventListener('click', () => changeHash('#trends'));

window.addEventListener('DOMContentLoaded', navigator, false);
window.addEventListener('hashchange', navigator, false);

function navigator() {
    scrollTo(top)

    if (location.hash.startsWith('#trends')) {
        trendsPage()
    } else if (location.hash.startsWith('#search=')) {
        searchPage()
    } else if (location.hash.startsWith('#movie=')) {
        movieDetailsPage()
    }else if (location.hash.startsWith('#category=')) {
        categoriesPage()
    } else {
        homePage()
    }

    window.addEventListener('scroll', () => {
        if(scrollInfinite === 'undefined') {
            return
        } else {
            scrollInfinite()
        }
    })
}


function trendsPage() {
    headerSection.classList.remove('header-container--long');
    headerSection.style.background = '';
    arrowBtn.classList.remove('inactive');
    arrowBtn.classList.remove('header-arrow--white');
    headerTitle.classList.add('inactive');
    headerCategoryTitle.classList.remove('inactive');
    searchForm.classList.add('inactive');
  
    trendingPreviewSection.classList.add('inactive');
    likedMoviesContainer.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    genericSection.classList.remove('inactive');
    movieDetailSection.classList.add('inactive');

    headerCategoryTitle.innerText = 'Trending';
    movieSkeleton(genericSection)
    getTrendingMovies()
}

function searchPage() {
    headerSection.classList.remove('header-container--long');
    headerSection.style.background = '';
    arrowBtn.classList.remove('inactive');
    arrowBtn.classList.remove('header-arrow--white');
    headerTitle.classList.add('inactive');
    headerCategoryTitle.classList.remove('inactive');
    searchForm.classList.remove('inactive');
  
    trendingPreviewSection.classList.add('inactive');
    likedMoviesContainer.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    genericSection.classList.remove('inactive');
    movieDetailSection.classList.add('inactive');

    const [_, searchValue] = location.hash.split('=');
    const query = fixQueries(searchValue);
    
    headerCategoryTitle.innerText = `Results for ${query}`;
    searchFormInput.value = ''
    movieSkeleton(genericSection)
    getMoviesByQuery(query);
}

function movieDetailsPage() {
    headerSection.classList.add('header-container--long');
    // headerSection.style.background = '';
    arrowBtn.classList.remove('inactive');
    arrowBtn.classList.add('header-arrow--white');
    headerTitle.classList.add('inactive');
    headerCategoryTitle.classList.add('inactive');
    searchForm.classList.add('inactive');
  
    trendingPreviewSection.classList.add('inactive');
    likedMoviesContainer.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    genericSection.classList.add('inactive');
    movieDetailSection.classList.remove('inactive');

    movieDetailSkeleton()
    const [_, movieId] = location.hash.split('=');
    getMovieDetails(movieId);
}

function categoriesPage() {
    headerSection.classList.remove('header-container--long');
    headerSection.style.background = '';
    arrowBtn.classList.remove('inactive');
    arrowBtn.classList.remove('header-arrow--white');
    headerTitle.classList.add('inactive');
    headerCategoryTitle.classList.remove('inactive');
    searchForm.classList.add('inactive');
  
    trendingPreviewSection.classList.add('inactive');
    likedMoviesContainer.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    genericSection.classList.remove('inactive');
    movieDetailSection.classList.add('inactive');

    const [_, hashData] = location.hash.split('=');
    const [categoryId, categoryName] = hashData.split('-');

    const fixCategoryName = fixQueries(categoryName);
    headerCategoryTitle.innerText = fixCategoryName;

    movieSkeleton(genericSection)
    getMoviesByCategory(categoryId);
}

function homePage() {
    headerSection.classList.remove('header-container--long');
    headerSection.style.background = '';
    arrowBtn.classList.add('inactive');
    arrowBtn.classList.remove('header-arrow--white');
    headerTitle.classList.remove('inactive');
    headerCategoryTitle.classList.add('inactive');
    searchForm.classList.remove('inactive');
  
    trendingPreviewSection.classList.remove('inactive');
    likedMoviesContainer.classList.remove('inactive');
    categoriesPreviewSection.classList.remove('inactive');
    genericSection.classList.add('inactive');
    movieDetailSection.classList.add('inactive');

    homePageSkeleton();
    getCategoriesPreview();
    getTrendingMoviesPreview();
    getLikedMovies();
}
