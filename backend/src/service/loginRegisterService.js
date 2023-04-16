require('dotenv').config()
import db from '../models'
import bcrypt from 'bcryptjs'
const salt = bcrypt.genSaltSync(10)
import { Op } from 'sequelize'
import { createJWT } from '../middleware/JWTActions'
import { getGroupWithRoles } from '../service/JWTService'
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
    let hassPass = hassUserPassword(rawData.password)

    //create user
    try {
        await db.User.create({
            email: rawData.email,
            password: hassPass,
            username: rawData.username,
            phone: rawData.phone,
            groupId: 4,
        })
        return {
            EM: 'A user is created',
            EC: 0,
            DT: '',
        }
    } catch (error) {
        console.log(error)
    }
}
const checkPassword = (inputPassword, hassPassword) => {
    return bcrypt.compareSync(inputPassword, hassPassword)
}
const handleLoginUser = async (rawData) => {
    try {
        let user = await db.User.findOne({
            where: {
                [Op.or]: [
                    { email: rawData.valueLogin },
                    { phone: rawData.valueLogin },
                ],
            },
        })
        if (user) {
            let isCheckPass = checkPassword(rawData.password, user.password)

            if (isCheckPass) {
                let groupWithRoles = await getGroupWithRoles(user)
                let payload = {
                    email: user.email,
                    groupWithRoles,
                    username: user.username,
                }
                let token = createJWT(payload)
                return {
                    EM: 'ok',
                    EC: 0,
                    DT: {
                        access_token: token,
                        groupWithRoles,
                        email: user.email,
                        username: user.username,
                    },
                }
            }
        }

        return {
            EM: 'Your phone /number or pass is incorrect !',
            EC: 1,
            DT: '',
        }
    } catch (error) {
        console.log(error)
    }
}
module.exports = {
    registerNewUser,
    handleLoginUser,
    hassUserPassword,
    checkEmailExist,
    checkPhoneExist,
}
