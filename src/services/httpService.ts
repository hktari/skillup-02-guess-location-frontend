const axios = require('axios').default;

console.debug('api endpoint', process.env.REACT_APP_API)
const restClient = axios.create({
    baseURL: process.env.REACT_APP_API,
    timeout: 3000,
});

restClient.default.headers.post['Content-Type'] = 'application/json';

// Add a response interceptor
restClient.interceptors.response.use(function (response: any) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return { payload: response.data, errors: response.data?.message };
}, function (error: any) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return { errors: error.response.data?.message }
});

restClient.defaults.validateStatus = function (status: number) {
    return status < 500; // Resolve only if the status code is less than 500
}

export default restClient