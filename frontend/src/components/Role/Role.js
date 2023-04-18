import React, { useState } from 'react'
import './Role.scss'
import { v4 as uuidv4 } from 'uuid'
import _ from 'lodash'
const Role = () => {
    const [listInput, setListInput] = useState({
        child1: {
            url: '',
            description: '',
        },
    })
    const handleChangeInput = (name, value, key) => {
        let cloneInput = _.cloneDeep(listInput)
        cloneInput[key][name] = value
        setListInput(cloneInput)
    }

    const handleAddNew = () => {
        let cloneInput = _.cloneDeep(listInput)
        cloneInput[`child-${uuidv4()}`] = {
            url: '',
            description: '',
        }
        setListInput(cloneInput)
    }
    const handleDelete = (key) => {
        let cloneInput = _.cloneDeep(listInput)

        delete cloneInput[key]
        setListInput(cloneInput)
    }
    
    return (
        <div className='container mt-3'>
            <div>
                <h3>Add a new role ...</h3>
            </div>

            {Object.entries(listInput).map(([key, child],index) => {
                return (
                    <div key={`child-${key}`} className='row '>
                        <div className='mb-3 col-md-5'>
                            <label className='form-label'>URL :</label>
                            <input
                                type='text'
                                className='form-control'
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
                                      key,
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
                    <button className='btn btn-success'> Save</button>
                </div>
            </div>
        </div>
    )
}

export default Role
