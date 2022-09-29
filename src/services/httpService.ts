const axios = require('axios').default;

console.debug('api endpoint', process.env.REACT_APP_API)
axios.defaults.baseURL = process.env.REACT_APP_API

axios.defaults.headers.post['Content-Type'] = 'application/json';
// axios.transformResponse = [function (data: any) {
//     // Do whatever you want to transform the data

//     return data;
// }],

// Add a response interceptor
// axios.interceptors.response.use(
//     function (response: any) {
//         // Any status code that lie within the range of 2xx cause this function to trigger
//         // Do something with response data
//         return { ...response };
//     }, function (error: any) {
//         // Any status codes that falls outside the range of 2xx cause this function to trigger
//         // Do something with response error
//         return Promise.reject({ message: error.response?.data?.message, status: error.response?.status } as ApiError)
//     });

// restClient.defaults.validateStatus = function (status: number) {
//     return status < 500; // Resolve only if the status code is less than 500
// }


export interface ApiError {
    message: string
}

export function setAuthBearer(token: string) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

export default axios