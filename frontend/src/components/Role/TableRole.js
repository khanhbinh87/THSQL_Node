import React, { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap'
import { toast } from 'react-toastify'
import { readRole, deleteRole } from '../../services/roleService'
import { forwardRef, useImperativeHandle } from 'react'
const TableRole = forwardRef((props, ref) => {
    const [listRoles, setListRoles] = useState('')
    useEffect(() => {
        fetchDataRole()
    }, [])

    useImperativeHandle(ref, () => ({
         fetListRole(){
            fetchDataRole()

        }
    }))
   
    const fetchDataRole = async () => {
        let data = await readRole()
        if (data && +data.EC === 0) {
            setListRoles(data.DT)
        }
    }
    const handleDeleteRole = async (role) => {
        let res = await deleteRole(role)
      
        if (res && res.EC === 0) {
            toast.success(res.EM)
            fetchDataRole()
        }
    }

    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>Id</th>
                    <th>URL</th>
                    <th>Description</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {listRoles && listRoles.length > 0 ? (
                    <>
                        {listRoles.map((item, index) => {
                            return (
                                <tr key={`row-${index}`}>
                                    <td>{item.id}</td>
                                    <td>{item.url}</td>
                                    <td>{item.description}</td>

                                    <td>
                                        <span
                                            className='mx-2 delete'
                                            title='Delete'
                                            onClick={() =>
                                                handleDeleteRole(item)
                                            }
                                        >
                                            <i className='fa fa-trash red'></i>
                                        </span>
                                    </td>
                                </tr>
                            )
                        })}
                    </>
                ) : (
                    <tr>
                        <td colSpan={4} className='text-center'>
                            Not roles
                        </td>
                    </tr>
                )}
            </tbody>
        </Table>
    )
})

export default TableRole
