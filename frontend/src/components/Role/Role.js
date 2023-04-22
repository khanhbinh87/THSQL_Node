import React, { useRef, useState} from 'react'
import './Role.scss'
import { v4 as uuidv4 } from 'uuid'
import _ from 'lodash'
import { toast } from 'react-toastify'
import { createRole } from '../../services/roleService'
import TableRole from './TableRole'
const Role = () => {
    const childRef = useRef();
    const defaultInput = {
        url: '',
        description: '',
        isValidUrl: true,
    }
    const [listInput, setListInput] = useState({ child1: defaultInput })
    const handleChangeInput = (name, value, key) => {

        let cloneInput = _.cloneDeep(listInput)
        cloneInput[key][name] = value
        if (value && name === 'url') {
            cloneInput[key]['isValidUrl'] = true
        }
       setListInput(cloneInput)
    }

    const handleAddNew = () => {
        let cloneInput = _.cloneDeep(listInput)
        cloneInput[`child-${uuidv4()}`] = defaultInput
        setListInput(cloneInput)
    }
    const handleDelete = (key) => {
        let cloneInput = _.cloneDeep(listInput)

        delete cloneInput[key]
        setListInput(cloneInput)
    }
    const buildDataPersist = () => {
        let cloneInput = _.cloneDeep(listInput)
        let result = []
        Object.entries(cloneInput).map(([key, child]) => {
            return result.push({
                url: child.url,
                description: child.description,
            })
        })
        return result
    }
    const handleSave = async () => {
        let invalidObj = Object.entries(listInput).find(([key, child]) => {
            return child && !child.url
        })
        if (!invalidObj) {
            let data = buildDataPersist()

            let res = await createRole(data)
            if (res && res.EC === 0) {
                toast.success(res.EM)
                childRef.current.fetListRole()
                
            }
        } else {
            toast.error('URL must not be empty...')
            let cloneInput = _.cloneDeep(listInput)
            let key = invalidObj[0]

            cloneInput[key]['isValidUrl'] = false
            setListInput(cloneInput)
        }
    }
  
    return (
        <div className='container mt-3'>
            <div>
                <h3>Add a new role ...</h3>
            </div>

            {Object.entries(listInput).map(([key, child], index) => {
                return (
                    <div key={`child-${key}`} className='row '>
                        <div className='mb-3 col-md-5'>
                            <label className='form-label'>URL :</label>
                            <input
                                type='text'
                                className={
                                    child.isValidUrl
                                        ? 'form-control'
                                        : 'form-control is-invalid'
                                }
                                value={child.url}
                                onChange={(e) =>
                                    handleChangeInput(
                                        'url',
                                        e.target.value,
                                        key
                                    )
                                }
                            />
                        </div>
                        <div className='mb-3 col-md-5'>
                            <label className='form-label'>Description :</label>

                            <input
                                type='text'
                                className='form-control'
                                value={child.description}
                                onChange={(e) =>
                                    handleChangeInput(
                                        'description',
                                        e.target.value,
                                        key
                                    )
                                }
                            />
                        </div>
                        <div className='mb-3 col-md-2 d-flex align-items-center mt-4'>
                            <i
                                className='fa fa-plus mx-2 text-success icon'
                                onClick={() => handleAddNew()}
                            ></i>
                            {index >= 1 && (
                                <i
                                    className='fa fa-trash text-danger icon'
                                    onClick={() => handleDelete(key)}
                                ></i>
                            )}
                        </div>
                    </div>
                )
            })}

            <div className='row'>
                <div className=''>
                    <button
                        className='btn btn-success'
                        onClick={() => handleSave()}
                    >
                        {' '}
                        Save
                    </button>
                </div>
            </div>
            <hr></hr>
            <div className='table-role'>
                <h3>List Current Roles : </h3>
                <TableRole  
                ref={childRef}
                />
            </div>
        </div>
    )
}

export default Role
