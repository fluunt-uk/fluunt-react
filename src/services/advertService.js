import {ApiClient} from "./client";

let apiClient = new ApiClient();


export default {

    post(advert) {
        return apiClient.post('adverts/add', advert);
    },
    update(id, advert) {
        return apiClient.post('adverts/' + id + '/update', advert);
    },
    getByID(id) {
        return apiClient.get('adverts/' + id);
    },
    get(nbrePage) {
        return apiClient.get('adverts?page=' + nbrePage);
    },
    delete(id) {
        return apiClient.delete('adverts/' + id);
    },
    recherche(advert) {
        return apiClient.post('adverts', advert);
    },
    export(advert) {
        return apiClient.post('adverts', advert);
    }

}
