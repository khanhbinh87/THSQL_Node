import React, { useContext, useEffect } from 'react'
import {  Route, useHistory } from 'react-router-dom'
import { UserContext } from '../Context/UserContext'
const PrivateRoutes = (props) => {
    let {user} = useContext(UserContext)
    console.log(user);
    let history = useHistory()
    useEffect(() => {
        let session = sessionStorage.getItem('account')
        if (!session) {
            history.push('/login')
            window.location.reload()
        }
    }, [history])
    return (
        <>
            <Route path={props.path} component={props.component}></Route>
        </>
    )
}

export default PrivateRoutes
