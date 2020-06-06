import axios from 'axios';


const getClientAxios = () => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const options = {
        baseURL: 'http://35.179.11.178:5000/',
        headers: {
            'Authorization': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJzaWduaW5fdXNlciIsImV4cCI6MTY5ODU4ODY5MiwianRpIjoiTk9UX1NFVCIsImlhdCI6MTU4NzU4ODM5MiwiaXNzIjoiYXV0aCIsIm5iZiI6MTU4NzU4ODM5Miwic3ViIjoicmVnaXN0ZXIifQ.bQjWaMAxrl7dgK2JO5ZOBGXiGtf-O82tquyolRwYS3U",
            'Access-Control-Request-Method': 'POST',
            'Access-Control-Request-Headers': 'Authorization'
        }
    };

    // if (currentUser) {
    //     options.headers.Authorization = 'Bearer ' + currentUser.token;
    //     options.headers.role = '' + currentUser.role === '0' ? 'admin' : 'editor';
    // }

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
            .then(response => Promise.resolve())
            .catch(error => Promise.reject(error));
    }

    fetch(url, data = {}, conf = {}) {

        // Default options are marked with *
        const response = fetch(url, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJzaWduaW5fdXNlciIsImV4cCI6MTY5ODU4ODY5MiwianRpIjoiTk9UX1NFVCIsImlhdCI6MTU4NzU4ODM5MiwiaXNzIjoiYXV0aCIsIm5iZiI6MTU4NzU4ODM5Miwic3ViIjoicmVnaXN0ZXIifQ.bQjWaMAxrl7dgK2JO5ZOBGXiGtf-O82tquyolRwYS3U",
            },
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            body: JSON.stringify(data) // body data type must match "Content-Type" header
        });
        return response; // parses JSON response into native JavaScript objects
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

