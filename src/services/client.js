import axios from 'axios';


const getClientAxios = () => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const options = {
        baseURL: 'http://35.179.11.178:5000/',
        headers: {
            //TODO: remove, temporary for testing
            'Authorization': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJzaWduaW5fdXNlciIsImV4cCI6MTY5ODU4ODY5MiwianRpIjoiTk9UX1NFVCIsImlhdCI6MTU4NzU4ODM5MiwiaXNzIjoiYXV0aCIsIm5iZiI6MTU4NzU4ODM5Miwic3ViIjoicmVnaXN0ZXIifQ.bQjWaMAxrl7dgK2JO5ZOBGXiGtf-O82tquyolRwYS3U",
            'Content-Type': 'application/json'
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

