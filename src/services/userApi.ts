import { GuessResult, ItemList, User } from './interface'
import axios from './httpService'

async function getMyUserProfile(): Promise<User> {
  return axios.get('/user/my-profile')
}

async function getGuesses(
  userId: any,
  startIdx: number,
  pageSize: number,
): Promise<ItemList<GuessResult>> {
  const user = await axios.get(`user/${userId}/guess`, {
    params: {
      startIdx,
      pageSize,
    },
  })
  return {
    startIdx,
    pageSize,
    totalItems: user.guesses.length,
    items: user.guesses,
  }
}

const userApi = {
  getMyUserProfile,
  getGuesses,
}

export default userApi
