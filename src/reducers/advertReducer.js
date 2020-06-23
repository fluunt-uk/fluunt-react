import {
    GET_ADVERTS,
    GET_ADVERT,
    SEARCH_ADVERTS,
} from '../actions/types'

const INITIAL_STATE = {
    adverts: {},
    advert: {}

}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {

        case GET_ADVERT:
            return {
                ...state,
                advert: action.advert
            }

        case GET_ADVERTS:
            return {
                ...state,
                adverts: action.adverts

            }
        case SEARCH_ADVERTS:
            return {
                ...state,
                adverts: action.adverts
            }
        default:
            return state;
    }
}