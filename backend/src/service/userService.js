import mysql from 'mysql2/promise'
import bluebird from 'bluebird'

import bcrypt from 'bcryptjs'
import db from '../models'
const salt = bcrypt.genSaltSync(10)

// create the connection to database

const hassUserPassword = (userPassword) => {
    return bcrypt.hashSync(userPassword, salt)
}
const createNewUser = async (email, password, username) => {
    const hash = hassUserPassword(password)

    try {
        await db.User.create({
            email,
            hash,
            username,
        })
    } catch (error) {
        console.log(error)
    }
}
const getUserList = async () => {
    //test relations
    // let user = await db.User.findOne({
    //     where: { id: 1 },
    //     attributes: ['id', 'username', 'email'],
    //     include: { model: db.Group, attributes: ['name', 'description'] },
    //     raw: true,
    //     nest: true,
    // })
    // let r = await db.Role.findAll({
    //     include: { model: db.Group, where: { id: 1 } ,attributes: ['name', 'description','id']},
    //     raw: true,
    //     nest: true,
    // })
    
    // console.log('user', user)
    try {
        return await db.User.findAll()
    } catch (error) {
        console.log(error)
    }
}
const deleteUser = async (id) => {
    try {
        await db.User.destroy({
            where: { id },
        })
    } catch (error) {
        console.log(error)
    }
}
const getUserById = async (id) => {
    try {
        let user = {}
        user = await db.User.findOne({
            where: { id },
        })
        return user.get({ plain: true })
    } catch (error) {
        console.log(error)
    }
}
const updateUser = async (id, email, username) => {
    try {
        await db.User.update(
            { email: email, username: username },
            {
                where: {
                    id,
                },
            }
        )
    } catch (error) {
        console.log(error)
    }
}
module.exports = {
    createNewUser,
    getUserList,
    deleteUser,
    getUserById,
    updateUser,
}
