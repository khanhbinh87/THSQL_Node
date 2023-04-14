import React, { useState, createContext } from 'react'

const UserContext = createContext({ name: '', auth: false })

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
    return (
        <UserContext.Provider value={{ user, loginContext, logoutContext }}>
            {children}
        </UserContext.Provider>
    )
}

export { UserProvider, UserContext }
