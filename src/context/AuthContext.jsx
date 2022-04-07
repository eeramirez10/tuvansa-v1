import React, { createContext, useState } from 'react'

const AuthContext = createContext();


const initState = JSON.parse(localStorage.getItem('usuario')) || '' ;


export const AuthProvider = ({ children }) => {

    const [auth, setAuth] = useState(initState)

    const handleAuth = (user) => {
        localStorage.setItem('usuario', JSON.stringify(user) );
        setAuth(user)
    }

    const handleLogout = () => {
        localStorage.clear('usuario')
        setAuth('')
    }

    console.log(auth)

    return <AuthContext.Provider value={{auth, handleAuth, handleLogout}}> {children} </AuthContext.Provider>
}


export default AuthContext