import React, { createContext, useMemo, useState } from 'react'
import { toast } from 'react-toastify';
import { fetchSinToken } from '../helpers/fetch';

const AuthContext = createContext();


const initState = JSON.parse(localStorage.getItem('usuario')) || null;



export const AuthProvider = ({ children }) => {

    const [auth, setAuth] = useState(initState)

    const handleAuth = (user) => {
        localStorage.setItem('usuario', JSON.stringify(user));
        setAuth(user)
    }


    const handleLogin = async (email, password) => {

        const resp = await fetchSinToken('auth/login', '', { email, password  }, 'POST')

        console.log(resp)

        const body = await resp.json()



        if (!body.ok) {

            return toast.error(body.msg, {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 2000
            })

        }

       

        toast.success('Login Correcto', {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 1000
        })

        handleAuth(body.user)

    }



    const handleLogout = () => {
        localStorage.clear('usuario')
        setAuth('')
    }

    const value = useMemo(() => {

        return {
            auth,
            handleAuth,
            handleLogout,
            handleLogin
        }
    }, [auth])

    



    return <AuthContext.Provider value={value}> {children} </AuthContext.Provider>
}


export default AuthContext