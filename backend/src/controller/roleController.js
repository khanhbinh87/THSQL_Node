
import roleApiService from '../service/roleApiService'
const readFunc = async (req, res) => {
    try {
        // if (req.query.page && req.query.limit) {
        //     let page = +req.query.page
        //     let limit = +req.query.limit
        //     let data = await roleApiService.getRolesWithPagination(page, limit)
        //     return res.status(200).json({
        //         EM: data.EM,
        //         EC: data.EC,
        //         DT: data.DT,
        //     })
        // } else {
        let data = await roleApiService.getAllRoles()
        
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT,
        })
        // }
    } catch (error) {
        return res.status(500).json({
            EM: 'error form server',
            EC: '-1',
            DT: '',
        })
    }
}
const createFunc = async (req, res) => {
    try {
        let data = await roleApiService.createNewRole(req.body)
        
        return res.status(200).json({
            EM: data.EM, //error message
            EC: data.EC, //error code
            DT: data.DT, //data
        })
    } catch (error) {
        return res.status(500).json({
            EM: 'error form server',
            EC: '-1',
            DT: '',
        })
    }
}
const updateFunc = async (req, res) => {
    try {
        let data = await userApiService.updateUser(req.body)
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT,
        })
    } catch (error) {
        return res.status(500).json({
            EM: 'error form server',
            EC: '-1',
            DT: '',
        })
    }
}
const deleteFunc = async (req, res) => {
    let data = await roleApiService.deleteRole(req.body.id)
    try {
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT,
        })
    } catch (error) {
        return res.status(500).json({
            EM: 'error form server',
            EC: '-1',
            DT: '',
        })
    }
}
const getGroupById = async(req,res) => {
    let id = +req.params.groupId
    
    try {
        let data = await roleApiService.getRoleByGroup(id)
        return res.status(200).json({
            EM: data.EM, //error message
            EC: data.EC, //error code
            DT: data.DT, //data
        })
    } catch (error) {
        return res.status(500).json({
            EM: 'error form server',
            EC: '-1',
            DT: '',
        })
    }
}
module.exports = {
    readFunc,
    createFunc,
    updateFunc,
    deleteFunc,
    getGroupById
}