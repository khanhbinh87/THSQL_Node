import db from '../models'

const createNewRole = async (roles) => {
    try {
        let currentRoles = await db.Role.findAll({
            attributes: ['url', 'description'],
        })

        const persists = roles.filter(
            ({ url: url1 }) =>
                !currentRoles.some(({ url: url2 }) => url1 === url2)
        )

        if (persists.length === 0) {
            return {
                EM: 'Nothing to create',
                EC: 0,
                DT: [],
            }
        }
        await db.Role.bulkCreate(persists)
        return {
            EM: `create role success : ${persists.length} roles...`,
            EC: 0,
            DT: [],
        }
    } catch (error) {
        return {
            EM: 'error form server',
            EC: 1,
            DT: [],
        }
    }
}
const getRolesWithPagination = () => {}
const getAllRoles = async () => {
    try {
        let roles = await db.Role.findAll({
            attributes: ['id', 'url', 'description'],
            // raw: true,
            order: [['id', 'DESC']],
        })
        return {
            EM: 'get role success',
            EC: 0,
            DT: roles,
        }
    } catch (error) {
        return {
            EM: 'something wrongs with services',
            EC: 1,
            DT: [],
        }
    }
}
const deleteRole = async (id) => {
    try {
        let role = await db.Role.findOne({
            where: {
                id,
            },
        })

        if (role) {
            await role.destroy()
            return {
                EM: 'Delete role success',
                EC: 0,
                DT: [],
            }
        } else {
            return {
                EM: 'Role not exist',
                EC: 2,
                DT: [],
            }
        }
    } catch (error) {
        return {
            EM: 'something went wrong service',
            EC: -1,
            DT: [],
        }
    }
}
const getRoleByGroup = async (id) => {
    try {
        if (!id) {
            return {
                EM: 'Not found any roles',
                EC: 0,
                DT: [],
            }
        }
        let roles = await db.Group.findOne({
            where: { id: id },
            attributes: ['id', 'name', 'description'],
            include: {
                model: db.Role,
                attributes: ['id', 'url', 'description'],
            },
            through: { attributes: [] },
        })
        return {
            EM: 'Get Roles By Group success',
            EC: 0,
            DT: roles,
        }
    } catch (error) {
        return {
            EM: 'something went wrong service',
            EC: -1,
            DT: [],
        }
    }
}
module.exports = {
    createNewRole,
    getRolesWithPagination,
    getAllRoles,
    deleteRole,
    getRoleByGroup,
}
