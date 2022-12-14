import { JWT, User } from '../services/interface'
import axios from './httpService'

async function login(email: string, password: string): Promise<JWT> {
    return await axios.post('/auth/login', {
        email,
        password
    })
}

async function signup(email: string, firstName: string, lastName: string, password: string, imageBase64: string) {
    return await axios.post('/auth/signup', {
        email,
        firstName,
        lastName,
        password,
        imageBase64
    })
}


function logout() {

}

async function updateProfile(email: string, firstName: string, lastName: string): Promise<User> {
    return axios.put('/user/my-profile', {
        firstName,
        lastName
    })
}

async function updateProfileImage(email: string, imageBase64: string): Promise<User> {
    return axios.put('/user/my-profile/image', {
        imageBase64
    })
}

async function changePassword(email: string, newPassword: string): Promise<void> {
    return Promise.resolve()
}

const authApi = {
    updateProfile,
    updateProfileImage,
    changePassword,
    logout,
    login,
    signup
}

export default authApi