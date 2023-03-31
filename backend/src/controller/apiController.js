import loginRegisterService from '../service/loginRegisterService'
const testApi = (req, res) => {
    return res.status(200).json({
        message: 'ok',
        data: 'test api',
    })
}
const handleRegister = async (req, res) => {
    
    //check email password phone
    try {
        // if (!req.body.email || !req.body.email.phone || !req.body.email.password) {
        //     return res.status(200).json({
        //         EM: 'Miss information',
        //         EC: '1',
        //         DT: '',
        //     })
        // }
        // if (req.body.password && req.body.password.length < 4) {
        //     return res.status(200).json({
        //         EM: 'Your password must have more than 3  letters',
        //         EC: '1',
        //         DT: '',
        //     })
        // }
        let data = await loginRegisterService.registerNewUser(req.body)
        console.log('data',data);
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: '',
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
    testApi,
    handleRegister,
}
