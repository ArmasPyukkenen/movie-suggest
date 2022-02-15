//import API_KEY from './api_key.js';

async function searchMovie(query, pageNum=1) {
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${query}&page=${pageNum}`;
    const response = await fetch(url);
    if(response.ok) {
        return await response.json();
    } else {
        if (response.status === 401 ) {
            alert('API call failed. Please, refresh the page and enter correct API key.');
            throw new Error('Bad api key!')
        } else {
            alert('API call failed with status ' + response.status);
        }
    }
}

function getFullImageUrl(relativePath, size="original") {
    return "https://image.tmdb.org/t/p/" + size + relativePath;
}

export {searchMovie, getFullImageUrl};