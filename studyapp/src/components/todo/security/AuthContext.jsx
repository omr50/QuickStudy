// create a context so that when we have an authenticated
// user we can use the context and let all of the other
// routes know.

import { createContext, useEffect } from "react";
import { useContext} from "react";
import { useState } from "react";
import { apiClient } from "../api/ApiClient";
import { executeJwtAuthenticationService } from "../api/AuthenticationApiService";
// 1. create context

const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)

// the children (all elements that we want to give access to the context)
// will be a parameter in AuthProvider. Thn we can just give them access
// to the AuthContext we created with the createContext()

// we will also add state in the context. So all of the variables and things
// we want to share with the children will be added with useState. Then we can
// just add those values inside of the value prop in the AuthContext below. Then
// when you want access in the children, just use the useContext() hook.
export default function AuthProvider({ children }) {
    // 2. Put osme state in the context
    // and share the created context
    // with other components

    const [isAuthenticated, setAuthenticated] = useState(false)
    const [username, setUsername] = useState(null)
    const [token, setToken] = useState(null)
    const [myInterceptor, setMyInterceptor] = useState(null)

    // useEffect(()=>{
    //     // IMPORTANT: As soon as the user logs in we
    //     // add interceptors on apiClient (which is our
    //     // base url) and we use the interceptor to add
    //     // the token to the headers when we need it for
    //     // a protected route. So this interceptor as its
    //     // name suggests will intercept all the api calls
    //     // and it will add authorization headers to all of them.
    //     apiClient.interceptors.request.use(
    //         (config) => {
    //             console.log('Intercepting and adding a token, ', token)
    //             config.headers.Authorization=token
    //             return config
    //         }
    //     )
    // }, [token])

    // put some state in the context
    // const values = {isAuthenticated, setAuthenticated}

    // this is where we want to do all of the authentication logic
    // function login(username, password) {
    //     if (username === 'in28minutes' && password==='password'){
    //         // if the user is actually correct then we will
    //         // set that isAuthenticated is correct in the context
    //         setAuthenticated(true)
    //         setUsername(username)
    //         return true
    //     }
    //     setAuthenticated(false)
    //     setUsername(null)
    //     return false
    // }

    // async function login(username, password) {
    //     const baToken = 'Basic ' + window.btoa(username + ":" + password)
    //     try {
    //     const response = await executeBasicAuthenticationService(baToken)
    //     if (response.status == 200){
    //         // if the user is actually correct then we will
    //         // set that isAuthenticated is correct in the context
    //         setAuthenticated(true)
    //         setUsername(username)
    //         setToken(baToken)

    //         // IMPORTANT: As soon as the user logs in we
    //         // add interceptors on apiClient (which is our
    //         // base url) and we use the interceptor to add
    //         // the token to the headers when we need it for
    //         // a protected route. So this interceptor as its
    //         // name suggests will intercept all the api calls
    //         // and it will add authorization headers to all of them.
    //         apiClient.interceptors.request.use(
    //             (config) => {
    //                 console.log('Intercepting and adding a token')
    //                 config.headers.Authorization=baToken
    //                 return config
    //             }
    //         )
    //         return true
    //     } else {
    //         logout()
    //         return false
    //     }
    // } catch (error) {
    //     logout()
    //     return false

    // }
    // }

    async function login(username, password) {
        try {
        const response = await executeJwtAuthenticationService(username, password)
        if (response.status == 200){
            // if the user is actually correct then we will
            // set that isAuthenticated is correct in the context
            const jwtToken = 'Bearer ' + response.data.token;
            setAuthenticated(true)
            setUsername(username)
            setToken(jwtToken)

            // IMPORTANT: As soon as the user logs in we
            // add interceptors on apiClient (which is our
            // base url) and we use the interceptor to add
            // the token to the headers when we need it for
            // a protected route. So this interceptor as its
            // name suggests will intercept all the api calls
            // and it will add authorization headers to all of them.
            const myInterceptor = apiClient.interceptors.request.use(
                (config) => {
                    console.log('Intercepting and adding a token')
                    config.headers.Authorization=jwtToken
                    return config
                }
            )
            return true
        } else {
            logout()
            return false
        }
    } catch (error) {
        logout()
        return false

    }
    }

    function logout() {
        setAuthenticated(false);
        setToken(null)
        setUsername(null)
    }

    return (
        <AuthContext.Provider value={{isAuthenticated, login, logout, username, token}}>
            {children}
        </AuthContext.Provider>
    )
}

// Use auth provider as a paraent and wrap all of the elements
// that you want your context to be able to give data to.