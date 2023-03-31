import userService from '../service/userService'
const handleHomePage = (req, res) => {
    return res.render('home.ejs')
}
const handleUserPage = async (req, res) => {
    let userList = await userService.getUserList()

    return res.render('user.ejs', { userList })
}
const handleCreateNewUser = async (req, res) => {
    let { email, password, username } = req.body

    await userService.createNewUser(email, password, username)

    return res.redirect('/user')
}
const handleDeleteUser = async (req, res) => {
    let id = req.params.id
    await userService.deleteUser(id)
    return res.redirect('/user')
}
const getUserUpdate = async (req, res) => {
    let id = req.params.id
    let user = await userService.getUserById(id)

    let userData = {}
    userData = user

    return res.render('update-user.ejs', { userData })
}
const handleUpdateUser = async (req, res) => {
    let id = req.body.id
    let email = req.body.email
    let username = req.body.username
    await userService.updateUser(id, email, username)
    return res.redirect('/user')
}
module.exports = {
    handleHomePage,
    handleUserPage,
    handleCreateNewUser,
    handleDeleteUser,
    getUserUpdate,
    handleUpdateUser,
}
