import jwt from 'jsonwebtoken'
require('dotenv').config()

const nonSecurePaths = ['/', '/login', '/register']

const createJWT = (payload) => {
    let key = process.env.JWT_SERCRET
    let token = null
    try {
        token = jwt.sign(payload, key)
    } catch (error) {
        console.log(error)
    }
    return token
}
const verifyToken = (token) => {
    let key = process.env.JWT_SERCRET
    let data = null
    try {
        const decoded = jwt.verify(token, key)
        data = decoded
    } catch (err) {
        // err
        console.log(err)
    }
    return data
}
const checkUserJWT = (req, res, next) => {
    console.log('ehcekJWT');
    if (nonSecurePaths.includes(req.path)) return next()
    let cookies = req.cookies
    if (cookies && cookies.jwt) {
        let token = cookies.jwt
        let decoded = verifyToken(token)
        if (decoded) {
            req.user = decoded
            next()
        } else {
            return {
                EM: 'Unauthorized',
                EC: -1,
                DT: '',
            }
        }
    } else {
        return {
            EM: 'Unauthorized',
            EC: -1,
            DT: '',
        }
    }
}
const checkUserPermission = (req, res, next) => {
    console.log('checkUserPermission');
    if (nonSecurePaths.includes(req.path)) return next()
    if (req.user) {
        console.log('req');
        let email = req.user.email
        let roles = req.user.groupWithRoles.Roles
        let currentPath = req.path
        if (!roles || roles.length === 0) {
            return res.status(403).json({
                EC: -1,
                DT: '',
                EM: 'Forbidden',
            })
        }
        let canAccess = roles.some((item) => item.url === currentPath)
        if (canAccess) {
            next()
        } else {
            return res.status(403).json({
                EC: -1,
                DT: '',
                EM: 'Forbidden user',
            })
        }
    } else {
        return res.status(401).json({
            EC: -1,
            DT: '',
            EM: 'Unauthorized user' ,
        })
    }
}
module.exports = {
    createJWT,
    verifyToken,
    checkUserJWT,
    checkUserPermission,
}
