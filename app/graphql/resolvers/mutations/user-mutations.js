const { userModelInsert } = require('../../../models')
const { genSaltSync, hashSync } = require('bcrypt')

exports.register = (_, { user }) => {
    user.password = hashSync(user.password, genSaltSync(10))
    return userModelInsert(user)
}