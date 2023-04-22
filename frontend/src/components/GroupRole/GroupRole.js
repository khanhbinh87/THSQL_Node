import React, { useEffect, useState } from 'react'
import { fetchRoleByGroup, readRole } from '../../services/roleService'
import { fetchGroup } from '../../services/userService'
import _ from 'lodash'
const GroupRole = () => {
    const [listGroup, setListGroup] = useState([])
    const [listRoles, setListRoles] = useState('')
    const [listAssign, setListAssign] = useState([])

    useEffect(() => {
        getGroups()
        fetchDataRoles()
    }, [])
    const getGroups = async () => {
        let data = await fetchGroup()
        if (data && data.EC === 0) {
            setListGroup(data.DT)
        }
    }
    const fetchDataRoles = async () => {
        let data = await readRole()

        if (data && +data.EC === 0) {
            setListRoles(data.DT)
        }
    }
    const handleOnChangeGroup = async (value) => {
        let res = await fetchRoleByGroup(+value)

        if (res && res.EC === 0) {
            let data = buildDataRolesByGroup(res.DT.Roles, listRoles)
            console.log(data)
            setListAssign(data)
        }
    }

    const buildDataRolesByGroup = (groupRole, allGroup) => {
        let result = []
        if (allGroup && allGroup.length > 0) {
            allGroup.map((role) => {
                let obj = {}
                obj.id = role.id
                obj.url = role.url
                obj.description = role.description
                if (groupRole && groupRole.length > 0) {
                    obj.isAssigned = groupRole.some(
                        (item) => item.url === obj.url
                    )
                }
                result.push(obj)
            })
            return result
        }
    }
    const handleChangeAssign = (value) => {
        const _cloneAssign = _.cloneDeep(listAssign)
        const foundIndex = _cloneAssign.findIndex((item) => +item.id === +value)

        if (foundIndex > -1) {
            _cloneAssign[foundIndex].isAssigned =
                !_cloneAssign[foundIndex].isAssigned
        }
        setListAssign(_cloneAssign)
    }
    return (
        <div className='container'>
            <h3 className='mt-3'>Group Role : </h3>
            <div className='col-6'>
                <label className='form-label'>Select group :</label>
                <select
                    className='form-select'
                    onChange={(e) => handleOnChangeGroup(e.target.value)}
                >
                    <option value=''>Please select your group</option>
                    {listGroup &&
                        listGroup.map((item, index) => {
                            return (
                                <option value={item.id} key={`group-${index}`}>
                                    {item.name}
                                </option>
                            )
                        })}
                </select>
            </div>
            <hr></hr>
            <h4>Assign Role : </h4>

            <div>
                {listAssign &&
                    listAssign.length > 0 &&
                    listAssign.map((item, index) => {
                        return (
                            <div
                                className='form-check'
                                key={`list-roles-${index}`}
                            >
                                <input
                                    className='form-check-input'
                                    type='checkbox'
                                    id={item.id}
                                    checked={item.isAssigned}
                                    defaultValue={item.id}
                                    onChange={(e) =>
                                        handleChangeAssign(e.target.value)
                                    }
                                />
                                <label className='role' htmlFor={item.id}>
                                    {item.url}
                                </label>
                            </div>
                        )
                    })}
            </div>
            <button className='btn btn-warning'>Save</button>
        </div>
    )
}

export default GroupRole
