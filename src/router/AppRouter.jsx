
import React, { useEffect } from 'react'

import { BrowserRouter as Router, Switch, Redirect, useRouteMatch, useParams, useLocation, useHistory } from "react-router-dom";
import Login from '../components/pages/auth/Login';
import Home from '../components/pages/home/Home';

import { useAuth } from '../hooks/useAuth';
import PrivateRoute from './PrivateRoute';
import { PublicRoute } from './PublicRoute';



const AppRouter = () => {


    const { auth, checkAuthToken } = useAuth();

    useEffect(() => {

        checkAuthToken()

    }, [checkAuthToken])


    return (
        <Router>
            <div>
                <Switch>

                    <PublicRoute exact path="/login" component={Login} isLoggedIn={!!auth?.uid} />

                    <PrivateRoute path="/" component={Home} isLoggedIn={!!auth?.uid} />

                    <Redirect to="/" />
                </Switch>
            </div>
        </Router>
    )
}

export default AppRouter