import {ApiClient} from "./client"


let apiClient = new ApiClient()

export class AuthService {


    static login(data) {

        console.log(data)

        const headers = {
            'g-recaptcha-response': data.recaptcha_token
        }
        return apiClient.post('auth', data,  {
            headers: headers
        })
    }

    static register(data) {
        return apiClient.put('account', data)
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
