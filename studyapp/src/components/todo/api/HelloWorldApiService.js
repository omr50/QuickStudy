
// export function retrieveHelloWorldBean() {
//     return axios.get('http://localhost:8080/hello-world-bean')
// }

import { apiClient } from './ApiClient'

export const retrieveHelloWorldBean = ()=> apiClient.get('/hello-world-bean')

export const retrieveHelloWorldPath = ()=> apiClient.get('/hello-world/path-variable/froggdog')

export const retrieveHelloWorldPathVariable = (username, token)=> apiClient.get(`/hello-world/path-variable/${username}`, {
    headers: {
        Authorization: token
    }
})


