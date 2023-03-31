import db from '../models'
import bcrypt from 'bcryptjs'
const salt = bcrypt.genSaltSync(10)
const hassUserPassword = (userPassword) => {
    return bcrypt.hashSync(userPassword, salt)
}
const checkEmailExist = async (email) => {
    let check = await db.User.findOne({ where: { email } })
    if (check) {
        return true
    }
    return false
}
const checkPhoneExist = async (phone) => {
    let check = await db.User.findOne({ where: { phone } })
    if (check) {
        return true
    }
    return false
}
const registerNewUser = async (rawData) => {
    //check email phone
    console.log('raw',rawData);
    let checkEmail = await checkEmailExist(rawData.email)
    if (checkEmail) {
        return {
            EM: 'Email exist',
            EC: 1,
        }
    }
    let checkPhone = await checkPhoneExist(rawData.phone)
    if (checkPhone) {
        return {
            EM: 'Phone exist',
            EC: 1,
        }
    }
    //hash pass
    let hassPass =  hassUserPassword(rawData.password)

    //create user
    try {
        await db.User.create({
            email: rawData.email,
            password: hassPass,
            username: rawData.username,
            phone: rawData.phone,
        })
        return {
            EM: 'A user is created',
            EC: 0,
        }
    } catch (error) {
        console.log(error)
    }
}
module.exports = {
    registerNewUser,
}
