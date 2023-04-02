import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Login from '../components/Login/Login'
import Register from '../components/Register/Register'
import User from '../components/ManageUser/User'
import PrivateRoutes from './PrivateRoutes'
import Project from '../components/Project/Project'
const AppRoutes = () => {
    return (
        <div>
            <Switch>
                <PrivateRoutes path='/users' component={User} />
                <PrivateRoutes path='/projects' component={Project} />

                <Route path='/about'>About</Route>
                <Route path='/login'>
                    <Login />
                </Route>
                <Route path='/register'>
                    <Register />
                </Route>
                <Route path='/' exact>
                    Home
                </Route>

                <Route path='*'>404 Not Found</Route>
            </Switch>
        </div>
    )
}

export default AppRoutes
