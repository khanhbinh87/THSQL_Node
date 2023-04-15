import React, { useContext, useEffect, useState } from 'react'
import './Nav.scss'
import { NavLink, useLocation } from 'react-router-dom'
import { UserContext } from '../../Context/UserContext'
const Nav = () => {
    
    let location = useLocation()
    let { user } = useContext(UserContext)
   
    if (user && user.isAuthenticated || location.pathname === '/') {
        return (
            <>
                <div className='topnav'>
                    <NavLink to='/' exact>
                        Home
                    </NavLink>
                    <NavLink to='/users'>Users</NavLink>
                    <NavLink to='/projects'>Projects</NavLink>
                    <NavLink to='/about'>About</NavLink>
                </div>
            </>
        )
    } else {
        return <></>
    }
}

export default Nav
