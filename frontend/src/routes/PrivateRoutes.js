import React, { useContext } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { UserContext } from '../Context/UserContext'
const PrivateRoutes = (props) => {
    const { user } = useContext(UserContext)
    
    if (user && user.isAuthenticated) {
        return (
            <>
                <Route path={props.path} component={props.component}></Route>
            </>
        )
    } else {
        return <Redirect to='/login'></Redirect>
    }
}

export default PrivateRoutes
