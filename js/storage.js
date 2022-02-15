function getLatestMoviesData() {
    return JSON.parse(window.localStorage.getItem('threeLatest')) || [];
}

function getSearchHistory() {
    return JSON.parse(window.localStorage.getItem('searchHistoryIds')) || [];
}

function addLatestMovie(movieData) {
    const moviesArray = getLatestMoviesData();
    const searchHistory = getSearchHistory();
    if(!moviesArray.find(obj => obj.id === movieData.id)) {
        moviesArray.unshift(movieData);
    }
    if(moviesArray.length > 3) {
        moviesArray.pop();
    }
    searchHistory.push(movieData.id);
    try {
        window.localStorage.setItem('searchHistoryIds', JSON.stringify(searchHistory))
        window.localStorage.setItem('threeLatest', JSON.stringify(moviesArray))
    } catch(e) {
        console.error('Updating search history has not been successfull')
    }
}

export {getLatestMoviesData, getSearchHistory, addLatestMovie};