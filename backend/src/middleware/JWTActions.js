import jwt from 'jsonwebtoken'
require('dotenv').config()

const nonSecurePaths = ['/', '/login', '/register','/logout']

const createJWT = (payload) => {
    let key = process.env.JWT_SERCRET
    let token = null
    try {
        token = jwt.sign(payload, key, {
            expiresIn: process.env.JWT_EXPIRES_IN,
        })
    } catch (error) {
        console.log(error)
    }
    return token
}
const verifyToken = (token) => {
    let key = process.env.JWT_SERCRET
    let decoded = null
    try {
        decoded = jwt.verify(token, key)
    } catch (err) {
        // err
        console.log(err)
    }
    return decoded
}
const extractToken = (req) => {
    if (
        req.headers.authorization &&
        req.headers.authorization.split(' ')[0] === 'Bearer'
    ) {
        return req.headers.authorization.split(' ')[1]
    }
    return null
}
const checkUserJWT = (req, res, next) => {
    if (nonSecurePaths.includes(req.path)) return next()
    let cookies = req.cookies
    let tokenfromHeader = extractToken(req)
    if ((cookies && cookies.jwt )|| tokenfromHeader) {
        let token = cookies && cookies.jwt ? cookies.jwt : tokenfromHeader
        let decoded = verifyToken(token)
        if (decoded) {
            req.user = decoded
            req.token = token
            next()
        } else {
            return res.status(401).json({
                EM: 'Not authenticated the user',
                EC: -1,
                DT: '',
            })
        }
    } else {
        return res.status(401).json({
            EM: 'Not authenticated the user',
            EC: -1,
            DT: '',
        })
    }
}
const checkUserPermission = (req, res, next) => {
    if (nonSecurePaths.includes(req.path) || req.path === '/account') {
        return next()
    }
    if (req.user) {
        let email = req.user.email
        let roles = req.user.groupWithRoles.Roles
        let currentPath = req.path
        if (!roles || roles.length === 0) {
            return res.status(403).json({
                EC: -1,
                DT: '',
                EM: `You dont have permission to access this resource`,
            })
        }
        let canAccess = roles.some((item) => item.url === currentPath)
        if (canAccess) {
            next()
        } else {
            return res.status(403).json({
                EC: -1,
                DT: '',
                EM: `You dont have permission to access this resource`,
            })
        }
    } else {
        return res.status(401).json({
            EC: -1,
            DT: '',
            EM: 'Not authenticated the user user',
        })
    }
}
module.exports = {
    createJWT,
    verifyToken,
    checkUserJWT,
    checkUserPermission,
}
