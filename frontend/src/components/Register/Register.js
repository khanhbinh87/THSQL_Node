import React, { useEffect } from 'react'
import './Register.scss'
import {  useHistory } from 'react-router-dom'
import axios from 'axios'
const Register = () => {
    let history = useHistory();
    const handleLogin =() =>{
        history.push('/login')
    }
    useEffect(()=>{
            axios.get('http://localhost:8080/api/test-api').then(data => {
                console.log(data);
            })
    },[])
    return (
        <div className='register-container'>
            <div className='container'>
                <div className='row d-flex  vh-50 px-3 py-3 '>
                    <div className='col-md-7 d-none d-md-block  d-flex flex-column  justify-content-md-center ps-5 '>
                        <h3 className='brand text-primary'>facebook</h3>
                        <p className='description'>
                            Facebook giúp bạn kết nối và chia sẻ với mọi người
                            trong cuộc sống của bạn
                        </p>
                    </div>
                    <div className='col-12 col-md-5 register-right px-3'>
                        <h3 className='brand text-primary text-center d-md-none'>
                            facebook
                        </h3>

                        <div className='d-flex flex-column gap-3 mt-2'>
                            <div className='form-group>'>
                                <label htmlFor='email'>Email address :</label>
                                <input
                                    // value={email}
                                    // onChange={(e) => setEmail(e.target.value)}
                                    id='email'
                                    type='text'
                                    placeholder='Email '
                                    // className={
                                    //     objCheckInput.isValidEmail
                                    //         ? 'form-control'
                                    //         : 'form-control is-invalid'
                                    // }
                                />
                            </div>
                            <div className='form-group>'>
                                <label htmlFor='phone'>Phone number :</label>
                                <input
                                    // value={phone}
                                    // onChange={(e) => setPhone(e.target.value)}
                                    id='phone'
                                    type='text'
                                    placeholder='Phone number'
                                    // className={
                                    //     objCheckInput.isValidPhone
                                    //         ? 'form-control'
                                    //         : 'form-control is-invalid'
                                    // }
                                />
                            </div>
                            <div className='form-group>'>
                                <label htmlFor='username'>Username :</label>
                                <input
                                    // value={username}
                                    // onChange={(e) =>
                                    //     setUsername(e.target.value)
                                    // }
                                    id='username'
                                    type='text'
                                    placeholder='Username'
                                    className='form-control'
                                />
                            </div>
                            <div className='form-group>'>
                                <label htmlFor='password'>Password :</label>
                                <input
                                    // value={password}
                                    // onChange={(e) =>
                                    //     setPassword(e.target.value)
                                    // }
                                    autoComplete=''
                                    id='password'
                                    type='password'
                                    placeholder='Password'
                                    // className={
                                    //     objCheckInput.isValidPassword
                                    //         ? 'form-control'
                                    //         : 'form-control is-invalid'
                                    // }
                                />
                            </div>

                            <div className='form-group>'>
                                <label htmlFor='repassword'>
                                    Re-enter password :
                                </label>
                                <input
                                    // value={confirmPassword}
                                    // onChange={(e) =>
                                    //     setConfirmPassword(e.target.value)
                                    // }
                                    // autoComplete=''
                                    id='repassword'
                                    type='password'
                                    placeholder='Re-enter password'
                                    // className={
                                    //     objCheckInput.isValidConfirmPassword
                                    //         ? 'form-control'
                                    //         : 'form-control is-invalid'
                                    // }
                                />
                            </div>
                            <button
                                className='btn btn-primary'
                                // onClick={() => handleRegister()}
                            >
                                Register
                            </button>

                            <hr />
                            <div className='text-center'>
                                <button
                                    className='btn btn-success'
                                    onClick={() => handleLogin()}
                                >
                                    Already've an account. Login
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register
