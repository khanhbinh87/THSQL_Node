import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import './User.scss'
import { fetchGroup } from '../../services/userService'
import { toast } from 'react-toastify'
const ModalUser = (props) => {
    const { handleClose, show ,title} = props
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [username, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [address, setAddress] = useState('')

    const [userGroups, setUserGroups] = useState([])
    useEffect(() => {
        getGroups()
    }, [])
    const getGroups = async () => {
        let res = await fetchGroup()
        if (res && res.data && res.data.EC === 0) {
            setUserGroups(res.data.DT)
        } else {
            toast.error(res.data.EM)
        }
    }
    return (
        <div>
            <>
                <Modal show={true} onHide={handleClose} size='lg'>
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
                                    className='form-control'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className=' col-6'>
                                <label className='form-label'>
                                    Phone number (<span className='red'>*</span>
                                    )
                                </label>
                                <input
                                    type='text'
                                    className='form-control'
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                />
                            </div>
                            <div className=' col-6'>
                                <label className='form-label'>Username</label>
                                <input
                                    type='text'
                                    className='form-control'
                                    value={username}
                                    onChange={(e) =>
                                        setUserName(e.target.value)
                                    }
                                />
                            </div>
                            <div className=' col-6'>
                                <label className='form-label'>
                                    Password (<span className='red'>*</span>)
                                </label>
                                <input
                                    type='password'
                                    className='form-control'
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    autoComplete='on'
                                />
                            </div>
                            <div className=' col-12'>
                                <label className='form-label'>Address</label>
                                <input
                                    type='text'
                                    className='form-control'
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                />
                            </div>
                            <div className=' col-6'>
                                <label className='form-label'>Gender</label>

                                <select className='form-select'>
                                    <option value='Male' defaultValue>
                                        Male
                                    </option>
                                    <option value='FeMale'>FeMale</option>
                                    <option value='Other'>Other</option>
                                </select>
                            </div>
                            <div className=' col-6'>
                                <label className='form-label'>
                                    Group (<span className='red'>*</span>)
                                </label>

                                <select className='form-select'>
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
                        <Button variant='secondary' onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant='primary'>Save</Button>
                    </Modal.Footer>
                </Modal>
            </>
        </div>
    )
}

export default ModalUser
