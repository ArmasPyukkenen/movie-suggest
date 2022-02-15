import { getFullImageUrl, searchMovie } from "./api.js";
import { getSearchHistory } from "./storage.js";

const SUGGEST_SIZE = 10;
const MAX_REPEATS = 5;
let currentSuggestionsData = [];

function buildSuggestionList(responsePageIds, searchHistoryIds, baseResult={list:[], repeatCount:0}) {
    const resultList = baseResult.list;
    let repeatCount = baseResult.repeatCount;
    for(let i = 0; i < responsePageIds.length; i++) {
        const potentialSuggestion = {id: responsePageIds[i], repeat: false};
        if (searchHistoryIds.includes(responsePageIds[i])) {
            if(repeatCount >= MAX_REPEATS) {
                continue;
            }
            potentialSuggestion.repeat = true;
            repeatCount++;
        }
        resultList.push(potentialSuggestion);
        if(resultList.length >= SUGGEST_SIZE) {
            return {
                list: resultList,
                repeatCount,
                complete: true
            }
        }
    }
    return {
        list: resultList,
        repeatCount,
        complete: false
    }
}

async function findSuggestions(query) {
    let compilationInProgress = true;
    const searchHistory = getSearchHistory();
    let page = 1;
    let suggestionAttempt = {list: [], repeatCount: 0};
    const suggestionsFullData = [];
    currentSuggestionsData = [];
    while (compilationInProgress) {
        compilationInProgress = false;
        const response = await searchMovie(query);
        const movieDataPage = response.results;
        const idsPage = movieDataPage.map(movieData => movieData.id);
        suggestionAttempt = buildSuggestionList(idsPage, searchHistory, suggestionAttempt, page);
        //in any case we need to get full data for chosen ids
        suggestionAttempt.list.forEach(suggestion => {
            currentSuggestionsData.push({
                ...movieDataPage.find(movie => movie.id === suggestion.id),
                repeat: suggestion.repeat
            })
        })
        if(suggestionAttempt.complete || Number(response.page) >= Number(response.total_pages)) {
            //currentSuggestionsData = movieDataPage.filter(movieData => suggestionAttempt.list.includes(movieData.id))
            return currentSuggestionsData.map(movieData => ({
                    id: movieData.id,
                    title: movieData.original_title,
                    repeat: movieData.repeat
                }))
        } else {
            page++;
            compilationInProgress = true;
        }
    }

}

function getFullSuggestionData(id) {
    return currentSuggestionsData.find(movieData => movieData.id == id);
}

export {findSuggestions, getFullSuggestionData};