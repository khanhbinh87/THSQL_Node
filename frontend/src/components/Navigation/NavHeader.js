import React, { useContext } from 'react'
import './Nav.scss'
import { Link, NavLink, useHistory, useLocation } from 'react-router-dom'
import { UserContext } from '../../Context/UserContext'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'
import logo from '../../img/logo.png'
import { logOutUser } from '../../services/userService'
import { toast } from 'react-toastify'

const NavHeader = () => {
    let location = useLocation()
    let { user, logoutContext } = useContext(UserContext)
    const history = useHistory()
    const handleLogout = async () => {
        let data = await logOutUser() //clear cookies
        localStorage.removeItem('jwt') //clear local
        logoutContext() //clear user in context
        if (data && +data.EC === 0) {
            toast.success('Log out success')
            history.push('/login')
        } else {
            toast.error(data.EM)
        }
    }
    if ((user && user.isAuthenticated) || location.pathname === '/') {
        return (
            <>
                <Navbar collapseOnSelect expand='lg' bg='dark' variant='dark'>
                    <Container>
                        <Navbar.Brand to='/'>
                            <img
                                src={logo}
                                width='30'
                                height='30'
                                className='d-inline-block align-top mx-2'
                                alt='logo'
                            />
                            React
                        </Navbar.Brand>
                        <Navbar.Toggle aria-controls='responsive-navbar-nav' />
                        <Navbar.Collapse id='responsive-navbar-nav'>
                            <Nav className='me-auto'>
                                <NavLink to='/' className='nav-link' exact>
                                    Home
                                </NavLink>
                                <NavLink to='/users' className='nav-link'>
                                    Users
                                </NavLink>
                                <NavLink to='/role' className='nav-link'>
                                    Roles
                                </NavLink>
                                <NavLink to='/group-role' className='nav-link'>
                                   Group-Role
                                </NavLink>
                                <NavLink to='/projects' className='nav-link'>
                                    Projects
                                </NavLink>
                                <NavLink to='/about' className='nav-link'>
                                    About
                                </NavLink>
                            </Nav>
                            <Nav>
                                {user && user.isAuthenticated ? (
                                    <>
                                        <Nav.Item className='nav-link'>
                                            Welcome {user.account.username} !
                                        </Nav.Item>
                                        <NavDropdown
                                            title='Settings'
                                            id='collasible-nav-dropdown'
                                        >
                                            <NavDropdown.Item>
                                                Change password
                                            </NavDropdown.Item>
                                            <NavDropdown.Item>
                                                <span
                                                    onClick={() =>
                                                        handleLogout()
                                                    }
                                                >
                                                    {' '}
                                                    Log out
                                                </span>
                                            </NavDropdown.Item>
                                        </NavDropdown>
                                    </>
                                ) : (
                                    <Link className='nav-link' to="/login">Login</Link>
                                )}
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </>
        )
    } else {
        return <></>
    }
}

export default NavHeader
