const { createSession, findSession, updateSession } = require("../service/session.service")
const { validatePassword } = require("../service/user.service")
const { singJwt } = require("../utils/jwt.utils")

const accessTokenTtl = "15m"
const refreshTokenTtl = "1y"

const createUseSessionHandler = async(req, res) => {
    //validate user password
    const user = await validatePassword(req.body)

    if (!user) {
        return res.status(401).send("Invalid email or passwordl;l")
    }

    //create session
    const session = await createSession(user._id, req.get('user-agent')|| '')
    // console.log
    //create access token
    const accessToken = singJwt(
        {...user, session: session._id},
        {expiresIn: accessTokenTtl} //15m
    )

    //create refresh token
    const refreshToken = singJwt(
        {...user, session: session._id},
        {expiresIn: refreshTokenTtl} //1y
    )

    //return access & refresh token
    return res.send({accessToken, refreshToken})
}

const getUserSessionsHandler = async(req, res) => {
    const userId = res.locals.user._id
    const sessions = await findSession({user: userId, valid: true})

    return res.send(sessions)
}

const deleteSessionHandler = async(req, res) => {
    const sessionId = res.locals.user.session
    await updateSession({_id: sessionId}, {valid: false})
    return res.send({
        accessToken: null,
        refreshToken: null
    })
}

module.exports = {
    createUseSessionHandler,
    getUserSessionsHandler,
    deleteSessionHandler
}