
import React, { useContext } from 'react'

import { BrowserRouter as Router, Switch, Redirect, Link, Navigate } from "react-router-dom";
import Login from '../components/pages/auth/Login';
import Home from '../components/pages/home/Home';
import AuthContext from '../context/AuthContext';
import PrivateRoute from './PrivateRoute';
import { PublicRoute } from './PublicRoute';



const AppRouter = () => {

      
    const { auth } = useContext(AuthContext);

    


    return (
        <Router>
            <div>
                <Switch>
                 
                    <PublicRoute exact path="/login" component={Login} isLoggedIn={!!auth?.uid} /> 
                
                    <PrivateRoute path="/" component={Home} isLoggedIn={!!auth?.uid} /> 
                   
                    <Redirect  to="/" />
                </Switch>
            </div>
        </Router>
    )
}

export default AppRouter