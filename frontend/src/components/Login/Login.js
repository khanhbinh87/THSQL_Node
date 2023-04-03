import React, { useEffect, useState } from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import { toast } from 'react-toastify'
import { loginUser } from '../../services/userService'
import './Login.scss'
const Login = () => {
    let history = useHistory()
    const handleCreateNewUser = () => {
        history.push('/register')
    }
    const [valueLogin, setValueLogin] = useState('')
    const [password, setPassword] = useState('')
    const defaultValue = {
        isValidLogin: true,
        isValidPassword: true,
    }
    const handleKey = (e) => {
        if (e.charCode === 13 && e.code === 'Enter') {
            handleLogin()
        }
    }
    useEffect(() => {
        let session = sessionStorage.getItem('account')
        if (session) {
            history.push('/')
            window.location.reload('/')
        }
    }, [history])

    const [objValueLogin, setObjValueLogin] = useState(defaultValue)
    const handleLogin = async () => {
        setObjValueLogin(defaultValue)
        if (!valueLogin) {
            setObjValueLogin({ ...objValueLogin, isValidLogin: false })
            toast.error('Please enter phone or email ')
            return
        }
        if (!password) {
            setObjValueLogin({ ...objValueLogin, isValidPassword: false })
            toast.error('Please enter password ')
            return
        }

        let resData = await loginUser(valueLogin, password)

        if (resData && resData.data && +resData.data.EC === 0) {
            let data = {
                isAuthenticated: true,
                token: 'fake',
            }
            sessionStorage.setItem('account', JSON.stringify(data))
            history.push('/users')
            window.location.reload()
        } else {
            toast.error(resData.EM)
        }
    }
    return (
        <div className='login-container'>
            <div className='container'>
                <div className='row d-flex  vh-50 px-3 py-3'>
                    <div className='col-md-7 d-none d-md-block  d-flex flex-column  justify-content-md-center ps-5 '>
                        <h3 className='brand text-primary'>facebook</h3>
                        <p className='description'>
                            Facebook giúp bạn kết nối và chia sẻ với mọi người
                            trong cuộc sống của bạn
                        </p>
                    </div>
                    <div className='col-12 col-md-5 login-right px-3'>
                        <h3 className='brand text-primary text-center d-md-none'>
                            facebook
                        </h3>

                        <div className='d-flex flex-column gap-3 mt-2'>
                            <input
                                type='text'
                                placeholder='Email or phone number'
                                className={
                                    objValueLogin.isValidLogin
                                        ? 'form-control'
                                        : 'is-invalid form-control'
                                }
                                value={valueLogin}
                                onChange={(e) => {
                                    setValueLogin(e.target.value)
                                }}
                            />
                            <input
                                type='password'
                                placeholder='Password'
                                className={
                                    objValueLogin.isValidPassword
                                        ? 'form-control'
                                        : 'is-invalid form-control'
                                }
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value)
                                }}
                                onKeyPress={(e) => handleKey(e)}
                            />
                            <button
                                className='btn btn-primary'
                                onClick={() => handleLogin()}
                            >
                                Login
                            </button>
                            <span className='text-center text-primary'>
                                <NavLink
                                    to='/'
                                    className='forgot-password text-decoration-none'
                                >
                                    Forgot your password ?
                                </NavLink>
                            </span>
                            <hr />
                            <div className='text-center'>
                                <button
                                    className='btn btn-success'
                                    onClick={() => handleCreateNewUser()}
                                >
                                    Create user
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
