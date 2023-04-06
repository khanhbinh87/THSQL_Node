import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import './User.scss'
import { createNewUser, fetchGroup } from '../../services/userService'
import { toast } from 'react-toastify'
import _ from 'lodash'
const ModalUser = (props) => {
    const { handleUserClose, show, title } = props

    const defaultUserData = {
        email: '',
        phone: '',
        username: '',
        password: '',
        address: '',
        sex: '',
        group: '',
    }
    const defaultInputValue = {
        email: true,
        phone: true,
        username: true,
        password: true,
        address: true,
        sex: true,
        group: true,
    }
    const [userData, setuserData] = useState(defaultUserData)
    const [userGroups, setUserGroups] = useState([])
    const [inputValue, setInputValue] = useState(defaultInputValue)
    useEffect(() => {
        getGroups()
    }, [])
    const getGroups = async () => {
        let res = await fetchGroup()
        
        if (res && res.data && res.data.EC === 0) {
            setUserGroups(res.data.DT)
            if (res && res.data && res.data.DT.length > 0) {
                let groups = res.data.DT
                setuserData({ ...userData, group: groups[0].id })
            }
        } else {
            toast.error(res.data.EM)
        }
    }
    const handleInput = (value, name) => {
        let _userData = _.cloneDeep(userData)
        _userData[name] = value
        setuserData(_userData)
    }
    const checkValidateInputs = () => {
        setInputValue(defaultInputValue)
        let arr = ['email', 'phone', 'password', 'group']
        let check = true
        for (let i = 0; i < arr.length; i++) {
            if (!userData[arr[i]]) {
                let _userData = _.cloneDeep(defaultInputValue)
                _userData[arr[i]] = false

                setInputValue(_userData)
                toast.error(`Emty input ${arr[i]}`)
                check = false
                break
            }
        }
        return check
    }
    const handleConfirmUser = async () => {
        let check = checkValidateInputs()
        if (check) {
            let res = await createNewUser({
                ...userData,
                groupId: userData['group'],
            })
            if (res && res.data.EC === 0) {
                setuserData({ ...defaultUserData, group: userGroups[0].id })
                handleUserClose()
            } else {
                toast.error('Error create user')
            }
        }
    }
    return (
        <div>
            <>
                <Modal show={show} onHide={handleUserClose} size='lg'>
                    <Modal.Header closeButton>
                        <Modal.Title>{title}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className='modal-body'>
                        <form className='row'>
                            <div className='col-6'>
                                <label className='form-label'>
                                    Email address (
                                    <span className='red'>*</span>)
                                </label>
                                <input
                                    type='email'
                                    className={
                                        inputValue.email
                                            ? 'form-control'
                                            : 'form-control is-invalid'
                                    }
                                    value={userData.email}
                                    onChange={(e) =>
                                        handleInput(e.target.value, 'email')
                                    }
                                />
                            </div>
                            <div className=' col-6'>
                                <label className='form-label'>
                                    Phone number (<span className='red'>*</span>
                                    )
                                </label>
                                <input
                                    type='text'
                                     className={
                                        inputValue.phone
                                            ? 'form-control'
                                            : 'form-control is-invalid'
                                    }
                                    value={userData.phone}
                                    onChange={(e) =>
                                        handleInput(e.target.value, 'phone')
                                    }
                                />
                            </div>
                            <div className=' col-6'>
                                <label className='form-label'>Username</label>
                                <input
                                    type='text'
                                    className={
                                        inputValue.username
                                            ? 'form-control'
                                            : 'form-control is-invalid'
                                    }
                                    value={userData.username}
                                    onChange={(e) =>
                                        handleInput(e.target.value, 'username')
                                    }
                                />
                            </div>
                            <div className=' col-6'>
                                <label className='form-label'>
                                    Password (<span className='red'>*</span>)
                                </label>
                                <input
                                    type='password'
                                    className={
                                        inputValue.password
                                            ? 'form-control'
                                            : 'form-control is-invalid'
                                    }
                                    value={userData.password}
                                    onChange={(e) =>
                                        handleInput(e.target.value, 'password')
                                    }
                                    autoComplete='on'
                                />
                            </div>
                            <div className=' col-12'>
                                <label className='form-label'>Address</label>
                                <input
                                    type='text'
                                    className='form-control'
                                    value={userData.address}
                                    onChange={(e) =>
                                        handleInput(e.target.value, 'address')
                                    }
                                />
                            </div>
                            <div className=' col-6'>
                                <label className='form-label'>Gender</label>

                                <select
                                    className='form-select'
                                    onChange={(e) =>
                                        handleInput(e.target.value, 'sex')
                                    }
                                >
                                    <option value='Male'>Male</option>
                                    <option value='FeMale'>FeMale</option>
                                    <option value='Other'>Other</option>
                                </select>
                            </div>
                            <div className=' col-6'>
                                <label className='form-label'>
                                    Group (<span className='red'>*</span>)
                                </label>

                                <select
                                    className='form-select'
                                    onChange={(e) =>
                                        handleInput(e.target.value, 'group')
                                    }
                                >
                                    {userGroups &&
                                        userGroups.length > 0 &&
                                        userGroups.map((item, index) => {
                                            return (
                                                <option
                                                    value={item.id}
                                                    key={`row -${index}`}
                                                >
                                                    {item.name}
                                                </option>
                                            )
                                        })}
                                </select>
                            </div>
                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant='secondary' onClick={handleUserClose}>
                            Close
                        </Button>
                        <Button
                            variant='primary'
                            onClick={() => handleConfirmUser()}
                        >
                            Save
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        </div>
    )
}

export default ModalUser
