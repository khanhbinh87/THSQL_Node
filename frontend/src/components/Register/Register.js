import React, { useEffect, useState } from 'react'
import './Register.scss'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'
const Register = () => {
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [username, setUsername] = useState('')
    const defaultValueInput = {
        isValidEmail: true,
        isValidPhone: true,
        isValidPassword: true,
        isValidConfirmPassword: true,
    }
    const [objCheckInput, setObjCheckInput] = useState(defaultValueInput)
    let history = useHistory()
    const handleLogin = () => {
        history.push('/login')
    }
    useEffect(() => {
        // axios.get('http://localhost:8080/api/v1/test-api').then((data) => {
        //     console.log(data)
        // })
    }, [])
    const isValidInput = () => {
        setObjCheckInput(defaultValueInput)
        if (!email) {
            toast.error('Email is required')
            setObjCheckInput({ ...defaultValueInput, isValidEmail: false })
            return false
        }
        const re = /\S+@\S+\.\S+/
        if (!re.test(email)) {
            toast.error('Please enter the valid email address')
            setObjCheckInput({ ...defaultValueInput, isValidEmail: false })

            return false
        }

        if (!phone) {
            toast.error('Phone is required')
            setObjCheckInput({ ...defaultValueInput, isValidPhone: false })

            return false
        }
        if (!password) {
            toast.error('Password is required')
            setObjCheckInput({ ...defaultValueInput, isValidPassword: false })

            return false
        }
        if (password !== confirmPassword) {
            toast.error('Your password is not same')
            setObjCheckInput({ ...defaultValueInput, isValidPassword: false })
            return false
        }
        return true
    }
    const handleRegister = async () => {
        let check = isValidInput()
        if (check === true) {
            axios.post('http://localhost:8080/api/v1/register',{
                email,username,password,phone
            })
            // let resData = await registerNewUser({
            //     email,
            //     password,
            //     phone,
            //     username,
            // })
            // let serverData = resData.data
            // if (+serverData.EC === 0) {
            //     toast.success('A user is created success')
            //     history.push('/login')
            // } else {
            //     toast.error(serverData.EM)
            // }
        }
    }

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
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    id='email'
                                    type='text'
                                    placeholder='Email '
                                    className={
                                        objCheckInput.isValidEmail
                                            ? 'form-control'
                                            : 'form-control is-invalid'
                                    }
                                />
                            </div>
                            <div className='form-group>'>
                                <label htmlFor='phone'>Phone number :</label>
                                <input
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    id='phone'
                                    type='text'
                                    placeholder='Phone number'
                                    className={
                                        objCheckInput.isValidPhone
                                            ? 'form-control'
                                            : 'form-control is-invalid'
                                    }
                                />
                            </div>
                            <div className='form-group>'>
                                <label htmlFor='username'>Username :</label>
                                <input
                                    value={username}
                                    onChange={(e) =>
                                        setUsername(e.target.value)
                                    }
                                    id='username'
                                    type='text'
                                    placeholder='Username'
                                    className='form-control'
                                />
                            </div>
                            <div className='form-group>'>
                                <label htmlFor='password'>Password :</label>
                                <input
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    autoComplete=''
                                    id='password'
                                    type='password'
                                    placeholder='Password'
                                    className={
                                        objCheckInput.isValidPassword
                                            ? 'form-control'
                                            : 'form-control is-invalid'
                                    }
                                />
                            </div>

                            <div className='form-group>'>
                                <label htmlFor='repassword'>
                                    Re-enter password :
                                </label>
                                <input
                                    value={confirmPassword}
                                    onChange={(e) =>
                                        setConfirmPassword(e.target.value)
                                    }
                                    autoComplete=''
                                    id='repassword'
                                    type='password'
                                    placeholder='Re-enter password'
                                    className={
                                        objCheckInput.isValidConfirmPassword
                                            ? 'form-control'
                                            : 'form-control is-invalid'
                                    }
                                />
                            </div>
                            <button
                                className='btn btn-primary'
                                onClick={() => handleRegister()}
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
