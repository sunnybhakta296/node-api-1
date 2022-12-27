const { createUser, getUsers } = require("../service/user.service")

const getUsersHandler = async(req, res) => {
    // return res.status(200).json({users: "Hi im user"})++
    try {
        const users = await getUsers();

        return res.send(users)
    } catch(e) {
        return res.send(400)
    }
}

const createUserHandler = async(req, res)=> {
    try {
        // let body = {
        //     name: "ts",
        //     email: "test@gmail.com",
        //     password: "123"
        // }
        const user = await createUser(req.body)

        return res.send(user)
    } catch(e) {
        console.log('Error in creatng user', e)
        return res.status(422).send("pagal")
    }
}

module.exports = {
    getUsersHandler,
    createUserHandler
}