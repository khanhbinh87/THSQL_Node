import React, { useEffect, useState } from 'react'
import './Nav.scss'
import { NavLink, useLocation } from 'react-router-dom'
const Nav = () => {
    const [isShow, setIsShow] = useState(true)
    let location = useLocation()
    console.log(location);
    useEffect(() => {
        if (location.pathname === '/login') {
            setIsShow(false)
        }
    }, [])
    return (
        <>
            {isShow && (
                <div className='topnav'>
                    <NavLink to='/' exact>
                        Home
                    </NavLink>
                    <NavLink to='/users'>Users</NavLink>
                    <NavLink to='/projects'>Projects</NavLink>
                    <NavLink to='/about'>About</NavLink>
                </div>
            )}
        </>
    )
}

export default Nav
