import { getFullImageUrl } from './api.js';
import {SUGGESTION_LIST, INFO_IMG, INFO_TEXT, INFO_TITLE, INFO_RELEASE, INFO_RATING, INFO_OVERVIEW, LATEST_LIST} from './elements.js';

// poster size opitons : ["w92", "w154", "w185", "w342", "w500", "w780", "original"]
const INFO_POSTER_SIZE = "w154";
const LATEST_POSTER_SIZE = "w154";

function renderSuggestions(movieList) {
    SUGGESTION_LIST.innerHTML = movieList.reduce((innerHTML, movie) => {
        return innerHTML + `<li class="search__option ${movie.repeat ? 'search__option_repeat' : ''}" data-movieid="${movie.id}">${movie.title}</li>`
    }, '')
}

function renderInfo(movieInfo) {
    INFO_IMG.classList.remove('hidden');
    INFO_TEXT.classList.remove('hidden');
    INFO_IMG.src = getFullImageUrl(movieInfo.poster_path, INFO_POSTER_SIZE);
    INFO_TITLE.textContent = movieInfo.title;
    INFO_RELEASE.textContent = movieInfo.release_date;
    INFO_RATING.textContent = movieInfo.vote_average;
    INFO_OVERVIEW.textContent = movieInfo.overview;
}

function renderLatest(latestMoviesArray) {
    LATEST_LIST.innerHTML = latestMoviesArray.map(movieInfo => {
        const movieURL = getFullImageUrl(movieInfo.poster_path, LATEST_POSTER_SIZE);
        return `
        <li class="latest__card">
            <img src="${movieURL}" alt="poster of recently searched movie" class="card__img">
            <h3 class="card__title">${movieInfo.title}</h3>
        </li>
        `
    }).join('')
    
}

export {renderSuggestions, renderInfo, renderLatest};