import {ApiClient} from "./client"


let apiClient = new ApiClient()

export class AuthService {


    static login(data) {
        console.log(data)
        return apiClient.post('auth', data)
    }

    static register(data) {
        return apiClient.post('register', data)
    }

    static logout() {
        return apiClient.get('logout')
    }

    static isRole(role) {
        const roles = ['admin', 'editor']
        const currentUser = JSON.parse(localStorage.getItem('currentUser'))
        if (roles[currentUser.role] === role) {
            return true
        }
        return false
    }


}
