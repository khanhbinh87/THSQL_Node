import React, { useState, createContext, useEffect } from 'react'
import { getUserAccount } from '../services/userService'
const UserContext = createContext(null)

const UserProvider = ({ children }) => {
    const [user, setUser] = useState({
        isAuthenticated: false,
        token: '',
        account: {},
    })
    const loginContext = (dataUser) => {
        setUser(dataUser)
    }
    const logoutContext = () => {
        setUser({
            isAuthenticated: false,
            token: '',
            account: {},
        })
    }
    const fetchUser = async () => {
        let res = await getUserAccount()
        if (res && res.EC === 0) {
            let groupWithRoles = res.DT.groupWithRoles
            let email = res.DT.email
            let username = res.DT.username
            let token = res.DT.access_token
            let data = {
                isAuthenticated: true,
                token,
                account: {
                    groupWithRoles,
                    email,
                    username,
                },
            }
            setUser(data)
        }
    }
    useEffect(() => {
        fetchUser()
    }, [])
    console.log(user);
    return (
        <UserContext.Provider value={{ user, loginContext, logoutContext }}>
            {children}
        </UserContext.Provider>
    )
}

export { UserProvider, UserContext }
