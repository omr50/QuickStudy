
// export function retrieveHelloWorldBean() {
//     return axios.get('http://localhost:8080/hello-world-bean')
// }

import { apiClient } from './ApiClient'
export const retrieveAllTodosForUsernameApi = (username)=> apiClient.get(`/users/${username}/todos`)

export const deleteTodoApi = (username, id)=> apiClient.delete(`/users/${username}/todos/${id}`)

export const retrieveTodoApi = (username, id)=> apiClient.get(`/users/${username}/todos/${id}`)

// send the todo in the body of the request.
export const updateTodoApi = (username, id, todo) => apiClient.put(`users/${username}/todos/${id}`, todo)

export const createTodoApi = (username, todo) => apiClient.post(`users/${username}/todos`, todo)

export const setTodoReminderApi = (username, id, reminder, reminderEmail) => apiClient.put(`users/${username}/todos/${id}/reminder/${reminder}/${reminderEmail}`)

export const DeleteTodoReminderApi = (username, id) => apiClient.delete(`/users/${username}/todos/${id}/reminder`)



