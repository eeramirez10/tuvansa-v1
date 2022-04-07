import React from 'react'

import { Redirect, Route, Navigate} from 'react-router-dom'

const PrivateRoute = ({
    isLoggedIn,
    component:Component,
    ...rest
}) => {
  return (
    <Route 
        {...rest} 
        component={ (props) =>(
            (isLoggedIn)
                ? <Component {...props} />
                : <Redirect to='/login' />
        )}
        
    />
  )
}

export default PrivateRoute