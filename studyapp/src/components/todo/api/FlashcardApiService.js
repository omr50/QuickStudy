import { apiClient } from './ApiClient'


export const retrieveAllCardSetsForUsernameApi = (username)=> apiClient.get(`users/${username}/flashcards`)

export const retrieveCardSetByIdApi = (username, id)=> apiClient.get(`users/${username}/flashcards/${id}`)

export const retrieveCardsForSetApi = (username, id)=> apiClient.get(`users/${username}/flashcards/${id}/cards`)

export const postCardSetApi = (username, cardset)=> apiClient.post(`users/${username}/flashcards`, cardset)

export const deleteCardSetApi = (username, id) => apiClient.delete(`users/${username}/flashcards/${id}`)

export const updateCardSetApi = (username, id, cardset)=> apiClient.put(`users/${username}/flashcards/${id}`, cardset)

export const deleteCardApi = (username, id) => apiClient.delete(`/users/${username}/cards/${id}`)

export const retrieveCardByIdApi = (username, id)=> apiClient.get(`users/${username}/cards/${id}`)

export const postCardApi = (username, card) => apiClient.post(`users/${username}/cards`, card)

export const updateCardApi = (username, card, id) => apiClient.put(`users/${username}/cards/${id}`, card)


// export const createTodoApi = (username, todo) => apiClient.post(`users/${username}/todos`, todo)

