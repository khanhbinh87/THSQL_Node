import db from '../models'

const createNewRole = async (roles) => {
    try {
        let currentRoles = await db.Role.findAll({
            attributes: ['url', 'description'],
            raw: true,
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

module.exports = {
    createNewRole,
}
