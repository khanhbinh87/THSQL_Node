import db from '../models'
const getGroups = async () => {
    try {
        let group = await db.Group.findAll({
            order: [['name', 'ASC']],
        })
        if (group) {
            return {
                EM: 'get group success',
                EC: 0,
                DT: group,
            }
        } else {
            return {
                EM: 'get group fail',
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
module.exports = {
    getGroups,
}
