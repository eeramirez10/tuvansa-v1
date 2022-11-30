import { useContext, useEffect } from "react"
import AuthContext from "../context/AuthContext";
import { toast } from 'react-toastify';
import { fetchConToken, fetchSinToken } from '../helpers/fetch';
import { useHistory, useLocation } from "react-router-dom";




export const useAuth = () => {

    const location = useLocation();

    const hystory = useHistory();;



    const { auth, setAuth } = useContext(AuthContext);

    useEffect(()=>{

      
     
        if(!location.key){

            localStorage.setItem('urlRedirect', location.pathname)

        }
    },[location])

    const handleAuth = (user) => {

        localStorage.setItem('token', user.token)
        localStorage.setItem('usuario', JSON.stringify(user));
        setAuth(user)
    }


    const handleLogin = async (email, password) => {

        const resp = await fetchSinToken('auth/login', '', { email, password }, 'POST')


    
        const body = await resp.json();


        if (!body.ok) {

            return toast.error(body.msg, {
                position: toast.POSITION.BOTTOM_CENTER,
                autoClose: 2000
            });

        }


        toast.success('Login Correcto', {
            position: toast.POSITION.BOTTOM_CENTER,
            autoClose: 1000
        })

        handleAuth({ ...body.user, token: body.token })

        if(localStorage.getItem('urlRedirect')){
            hystory.push(localStorage.getItem('urlRedirect'));
            localStorage.removeItem('urlRedirect')
        }

        

    }



    const handleLogout = () => {
        localStorage.clear('usuario')
        localStorage.clear('token')
        setAuth('')
    }

    const checkAuthToken = async () =>{

        const token = localStorage.getItem('token');

        if(!token ) return setAuth('')

        try {
            const resp = await fetchConToken('auth/renew')

            const body = await resp.json();

            if(!body.ok && body.msg === "Token no válido") return handleLogout();
              

            localStorage.setItem('token', body.token);
            


        } catch (error) {

            console.log(error);

            localStorage.clear('token');
            handleLogout()

            
        }

    }



    return {
        auth,
        handleAuth,
        handleLogout,
        handleLogin,
        checkAuthToken
    }


}