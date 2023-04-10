import jwt from 'jsonwebtoken'
require('dotenv').config()

const createJWT = () => {
    let payload = { name: 'binh', address: 'hcm' }
    let key = process.env.JWT_SERCRET
    let token = null
    try {
        token = jwt.sign(payload, key)
    } catch (error) {
        console.log(error)
    }
    return token
}
const verifyToken = (token) =>{
    let key = process.env.JWT_SERCRET
    let data = null
    try {
        const  decoded = jwt.verify(token, key);
        data = decoded
      } catch(err) {
        // err
        console.log(err);
      }
      return data;
}
module.exports = {
    createJWT,
    verifyToken
}
