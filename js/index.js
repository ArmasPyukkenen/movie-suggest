import { findSuggestions, getFullSuggestionData } from "./suggest.js";
import {renderSuggestions, renderInfo, renderLatest} from './render.js';
import { addLatestMovie, getLatestMoviesData } from "./storage.js";
import {SEARCHBAR, SUGGESTION_LIST} from './elements.js';

renderLatest(getLatestMoviesData());

//input with delay
let inputTimer;
SEARCHBAR.addEventListener('input', e => {
    clearTimeout(inputTimer);
    if(e.target.value.length === 0) {
        return;
    }
    inputTimer = setTimeout(() => {
        findSuggestions(e.target.value).then(result => {
            renderSuggestions(result);
        })
    }, 500);
})

//click on list
SUGGESTION_LIST.addEventListener('click', e => {
    if (e.target.classList.contains('search__option')) {
        e.target.classList.add('search__option_repeat');
        const movieData = getFullSuggestionData(e.target.dataset.movieid);
        addLatestMovie(movieData);
        renderInfo(movieData);
        renderLatest(getLatestMoviesData());
    }
})

//storage
window.addEventListener('storage', () => {
    renderLatest(getLatestMoviesData());
})