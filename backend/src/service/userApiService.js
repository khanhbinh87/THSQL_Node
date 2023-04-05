import db from '../models'

const getAllUser = async () => {
    try {
        let users = await db.User.findAll({
            attributes: ['id', 'username', 'email', 'sex'],
            include: { model: db.Group, attributes: ['name', 'description'] },
        })
        if (users) {
            return {
                EM: 'get user success',
                EC: 0,
                DT: users,
            }
        } else {
            return {
                EM: 'get user success',
                EC: 0,
                DT: [],
            }
        }
    } catch (error) {
        return {
            EM: 'something wrongs with services',
            EC: 1,
            DT: [],
        }
    }
}

const getUserWithPagination = async (page, limit) => {
    try {
        let offset = (page - 1) * limit

        const { count, rows } = await db.User.findAndCountAll({
            offset: offset,
            limit: limit,
            attributes: ['id', 'username', 'email', 'phone', 'sex'],
            include: { model: db.Group, attributes: ['name', 'description'] },
            raw: true,
            nest: true,
        })
        let totalPages = Math.ceil(count / limit)
        let data = {
            totalRows: count,
            totalPages: totalPages,
            users: rows,
        }
        return {
            EM: 'ok',
            EC: 0,
            DT: data,
        }
    } catch (error) {}
}
const createNewUser = async (data) => {
    try {
        await db.User.create({})
    } catch (error) {}
}
const updateUser = async (data) => {
    try {
        let user = await db.User.findOne({
            where: {
                id,
            },
        })
        if (user) {
            user.save({})
        }
    } catch (error) {}
}
const deleteUser = async (id) => {
    try {
        let user = await db.User.findOne({
            where: {
                id,
            },
        })

        if (user) {
            await user.destroy()
            return {
                EM: 'Delete sucess',
                EC: 0,
                DT: [],
            }
        } else {
            return {
                EM: 'Users not exist',
                EC: 2,
                DT: [],
            }
        }
    } catch (error) {}
}


module.exports = {
    getAllUser,
    createNewUser,
    updateUser,
    deleteUser,
    getUserWithPagination,
    
}
