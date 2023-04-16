import React, { useState, createContext, useEffect } from 'react'
import { getUserAccount } from '../services/userService'
const UserContext = createContext(null)

const UserProvider = ({ children }) => {
    const userDefault = {
        isAuthenticated: false,
        isLoading: true,
        token: '',
        account: {},
    }
    const [user, setUser] = useState(userDefault)
    const loginContext = (dataUser) => {
        setUser({ ...dataUser, isLoading: false })
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
                isLoading: false,
            }

            setUser(data)
        } else {
            setUser({ ...userDefault, isLoading: false })
        }
    }
    useEffect(() => {
        if (
            window.location.pathname !== '/' ||
            window.location.pathname !== '/login'
        ) {
            fetchUser()
        }
    }, [])

    return (
        <UserContext.Provider value={{ user, loginContext, logoutContext }}>
            {children}
        </UserContext.Provider>
    )
}

export { UserProvider, UserContext }
