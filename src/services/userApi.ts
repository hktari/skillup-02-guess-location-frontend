import { ApiResult, User } from "./interface"
import restClient from './httpService'

async function getMyUserProfile(): Promise<User> {
    return restClient.get('/user/my-profile')
}


const userApi = {
    getMyUserProfile
}

export default userApi