import {combineReducers} from 'redux';

import {ADD_MOVIES, ADD_FAVOURITE, REM_FAVOURITE, SET_FAVOURITE, ADD_MOVIE_TO_LIST, ADD_SEARCH_RESULT} from '../actions' 

const initialMovieState = {
    list:[],
    favourites:[],
    showFavourites:false
}

export function movies (state = initialMovieState,action){
   // console.log('MOVIE_REDUCER');
    // if(action.type === ADD_MOVIES){
    //     return {
    //         ...state,
    //         list: action.movies
    //     };
    // }
    // return state;

    switch (action.type) {
        case ADD_MOVIES:
            return {
                ...state,
                list: action.movies
            }
        case ADD_FAVOURITE:
            return{
                ...state,
                favourites: [action.movie, ...state.favourites]
            }
        case REM_FAVOURITE:
            const index = state.favourites.indexOf(action.movie);
            if(index !== -1){
                    state.favourites.splice(index,1);
            }
            return {
                ...state,
                
            }
        case SET_FAVOURITE:
            return {
                ...state,
                setFavourites: action.val
            }
        case ADD_MOVIE_TO_LIST:
            return {
                ...state,
                list: [action.movie,...state.list]
            }

        default:
            return state;
    }

}
const initialSearchState = {
    result: {},
    showSearchResults:false
}
export  function search (state=initialSearchState,action){
    switch (action.type){
        case ADD_SEARCH_RESULT:
            return {
                ...state,
                result: action.movie,
                showSearchResults: true
            };
        case ADD_MOVIE_TO_LIST:
            return {
                ...state,
                showSearchResults:false
            }
        default:
            return state;
    }

}
// const initialRootState = {
//     movies: initialMovieState,
//     search: initialSearchState
// }
// export default function rootReducer(state = initialRootState,action){
//     return {
//         movies:movies(state.movies,action),
//         search: search(state.search,action)
//     }
// }

export default combineReducers({
    movies: movies,
    search : search
})