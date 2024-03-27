'use strict'

window.addEventListener('load', navigator);
window.addEventListener('hashchange', navigator);

function navigator() {
    console.log({location});

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
}


function trendsPage() {
    console.log('trends');
}

function searchPage() {
    console.log('SEARCH');
}

function movieDetailsPage() {
    console.log('MOVIES');
}

function categoriesPage() {
    console.log('CATEGORIES');
}

function homePage() {
    console.log('HOME');
    getCategoriesPreview();
    getTrendingMoviesPreview();
}
