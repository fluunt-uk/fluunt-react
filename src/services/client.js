import axios from 'axios';


const getClientAxios = () => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const options = {
        baseURL: 'http://localhost:5001/',
        headers: {
            //TODO: remove, temporary for testing
            'Authorization': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJyZWdpc3Rlcl91c2VyIiwiZXhwIjoxNjk3ODA0NTY3LCJqdGkiOiJOT1RfU0VUIiwiaWF0IjoxNTg3NTg4NTY3LCJpc3MiOiJhdXRoIiwibmJmIjoxNTg3NTg4NTY3LCJzdWIiOiIifQ.gYZSbRWcEAjQWaiTdQBBT3g6Woat8BC9DAbV_u6Iy-I"
        }
    };

    if (currentUser) {
        options.headers.Authorization =  currentUser.access_token;
        //specif user permission?
        //options.headers.role = '' + currentUser.role === '0' ? 'admin' : 'editor';
    }

    const clientAxios = axios.create(options);
    return clientAxios;
};


export class ApiClient {

    constructor() {
        this.client = getClientAxios();
    }

    get(url, conf = {}) {
        return this.client.get(url, conf)
            .then(response => Promise.resolve(response.data))
            .catch(error => Promise.reject(error));
    }

    delete(url, conf = {}) {
        return this.client.delete(url, conf)
            .then(response => Promise.resolve(response))
            .catch(error => Promise.reject(error));
    }

    head(url, conf = {}) {
        return this.client.head(url, conf)
            .then(response => Promise.resolve(response))
            .catch(error => Promise.reject(error));
    }

    options(url, conf = {}) {
        return this.client.options(url, conf)
            .then(response => Promise.resolve(response))
            .catch(error => Promise.reject(error));
    }

    post(url, data = {}, conf = {}) {
        return this.client.post(url, data, conf)
            .then(response => Promise.resolve(response))
            .catch(error => Promise.reject(error));
    }

    put(url, data = {}, conf = {}) {
        return this.client.put(url, data, conf)
            .then(response => Promise.resolve(response))
            .catch(error => Promise.reject(error));
    }

    patch(url, data = {}, conf = {}) {
        return this.client.patch(url, data, conf)
            .then(response => Promise.resolve(response))
            .catch(error => Promise.reject(error));
    }
}

