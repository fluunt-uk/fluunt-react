import {
    GET_ADVERTS,
    GET_ADVERT,
    SEARCH_ADVERTS,
    SHOW_SPINNER,
    HIDE_SPINNER,
} from './types'
import AdvertService from "../services/advertService";
import {exportAsExcelFile} from "../services/excel";
import {showSuccessAlert, showErrorAlert} from "./AlertActions";


/**
 * Add Advert method
 */
export const addAdvert = (advert, ownProps) => {
    return (dispatch) => {

        dispatch({type: SHOW_SPINNER})

        AdvertService.post(advert).then(response => {
            if (response.status === 201) {
                dispatch({type: HIDE_SPINNER})
                showSuccessAlert(dispatch,'operation with success')
                ownProps.history.push('/adverts')
            } else {
                dispatch({type: HIDE_SPINNER})
                showErrorAlert(dispatch, 'failed operation')
            }
        }, error => {
            dispatch({type: HIDE_SPINNER})
            showErrorAlert(dispatch, 'failed operation' + error.toString())
        })

    }
}

/**
 * get adverts
 */
export const getAdvert = (id) => {
    return (dispatch) => {
        dispatch({type: SHOW_SPINNER})

        AdvertService.getByID(id).then(response => {
            if (response.status === 200) {
                dispatch({type: HIDE_SPINNER})
                dispatch({
                    type: GET_ADVERT,
                    advert: response.data
                })

            } else {
                dispatch({type: HIDE_SPINNER})
                showErrorAlert(dispatch, 'failed operation')
            }
        }, error => {
            dispatch({type: HIDE_SPINNER})
            showErrorAlert(dispatch, 'failed operation' + error.toString())
        })
    }
}

/**
 * update adverts
 */
export const updateAdvert = (id, advert, ownProps) => {
    return (dispatch) => {
        dispatch({type: SHOW_SPINNER})
        AdvertService.update(id, advert).then(response => {
            if (response.status === 200) {
                dispatch({type: HIDE_SPINNER})
                ownProps.history.push('/adverts')
            } else {
                dispatch({type: HIDE_SPINNER})
                showErrorAlert(dispatch, 'failed operation')
            }
        }, error => {
            dispatch({type: HIDE_SPINNER})
            showErrorAlert(dispatch, 'failed operation' + error.toString())
        })
    }
}

/**
 * delete adverts
 */

export const deleteAdvert = (id, activePage, ownProps) => {
    return (dispatch) => {
        dispatch({type: SHOW_SPINNER})

        AdvertService.delete(id).then(response => {
            if (response.status === 200) {
                dispatch({type: HIDE_SPINNER})
                ownProps.getAdverts(activePage)
                showSuccessAlert(dispatch,'operation with success')
            } else {
                dispatch({type: HIDE_SPINNER})
                showErrorAlert(dispatch, 'failed operation')
            }
        }, error => {
            dispatch({type: HIDE_SPINNER})
            showErrorAlert(dispatch, 'failed operation' + error.toString())
        })
    }
}

/**
 * fetch adverts
 */
export const getAdverts = (nbrePage) => {
    return (dispatch) => {

        dispatch({type: SHOW_SPINNER})

        AdvertService.get(nbrePage).then(response => {
            if (response.status === 200) {
                dispatch({type: HIDE_SPINNER})
                dispatch({
                    type: GET_ADVERTS,
                    adverts: response.data,
                })
            } else {
                dispatch({type: HIDE_SPINNER})
                showErrorAlert(dispatch, 'failed operation')
            }
        }, error => {
            dispatch({type: HIDE_SPINNER})
            showErrorAlert(dispatch, 'failed operation' + error.toString())
        })
    }
}


/**
 * recherche Adverts
 */
export const rechercheAdverts = (data) => {
    return (dispatch) => {

        dispatch({type: SHOW_SPINNER})

        AdvertService.recherche(data).then(response => {
            if (response.status === 200) {
                dispatch({type: HIDE_SPINNER})
                dispatch({
                    type: SEARCH_ADVERTS,
                    adverts: response.data,
                })
            } else {
                dispatch({type: HIDE_SPINNER})
                showErrorAlert(dispatch, 'failed operation')
            }
        }, error => {
            dispatch({type: HIDE_SPINNER})
            showErrorAlert(dispatch, 'failed operation' + error.toString())
        })
    }
}

/**
 * export Adverts
 */
export const exportAdverts = (data) => {
    return (dispatch) => {

        dispatch({type: SHOW_SPINNER})

        AdvertService.export(data).then(response => {
            if (response.status === 200) {
                dispatch({type: HIDE_SPINNER})
                exportAsExcelFile(response.data, 'adverts')
            } else {
                dispatch({type: HIDE_SPINNER})
                showErrorAlert(dispatch, 'failed operation')
            }
        }, error => {
            dispatch({type: HIDE_SPINNER})
            showErrorAlert(dispatch, 'failed operation' + error.toString())
        })
    }
}