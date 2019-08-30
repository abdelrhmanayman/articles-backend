const passport = require('passport')

exports.login = (_, args, { req }) => new Promise((resolve) => {
    req.body = args
    passport.authenticate('local', (_, user, info) => !user ? resolve(info) : req.login(user, () => resolve(user)))(req)
})
exports.logout = (_, __, { req, res }) => {
    if (!req.user) return false
    res.clearCookie('connect.sid')
    req.session.destroy()
    req.logout()
    return true
}
