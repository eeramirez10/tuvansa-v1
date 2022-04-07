import React from 'react'

import { Redirect, Route, Navigate } from 'react-router-dom';

export const PublicRoute = ({
    isLoggedIn,
    component: Component,
    ...rest
}) => {

    return (

        <Route  
            {...rest} 
            component={ (props) => (
           
                (!isLoggedIn) 
                   ? <Component {...props} />
                   
                    :<Redirect to="/" />
              

        )} />
    )
}