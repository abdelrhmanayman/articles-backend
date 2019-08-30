const { mkdirSync } = require('fs')
const { genSaltSync, hashSync } = require('bcrypt')
const { STATUS_BLOCKED_USER, STATUS_DUPLICATED, STATUS_BAD_REQUEST, STAUTS_NOT_FOUND, STATUS_NOT_AUTHORIZED } = require('./constants')
const { roleModelInsertMany, userModelInsert, userModelFind } = require('../models')
const { roles, users } = require('../configs/default-setup')
const { Types: { ObjectId } } = require('mongoose')

const getUserWithPermissions = async (_id) =>
    (await userModelFind({
        aggregation: [
            { $match: { _id: new ObjectId(_id) } },
            {
                $lookup: {
                    from: "roles",
                    localField: "role",
                    foreignField: "name",
                    as: "field"
                }
            },
            { $addFields: { permissions: "$field.permissions" } },
            { $unwind: "$permissions" },
            { $project: { field: 0 } }
        ]
    }))[0]

const hashPassword = password => hashSync(password, genSaltSync(10))

exports.hashPassword = hashPassword

exports.createDir = direname => mkdirSync(direname)

exports.initializeSystem = async () => {
    try {
        await roleModelInsertMany(roles)
        for (let user of users) {
            user.password = hashPassword(user.password)
            await userModelInsert(user)
        }
    } catch ({ message }) { }
}

exports.createError = ({ msg, code, req }) => {
    if (req) req.status(code)
    throw new Error(msg)
}

exports.getUserWithPermissions = getUserWithPermissions
exports.contextExtractor = async (req, res) => {
    let user = req.user
    let permissions
    if (user) {
        let userPermissions = await getUserWithPermissions(user)
        if (userPermissions.isBlocked) throw new Error(STATUS_BLOCKED_USER)
        permissions = userPermissions.permissions
    }
    return ({ user, permissions, req, res })
}
exports.getRespStatus = ({ code }) =>
    code ?
        code == 11000 ?
            STATUS_DUPLICATED
            : STATUS_BAD_REQUEST
        : STAUTS_NOT_FOUND


exports.checkServerAuthorization = ({ permission }) =>
    (req, res, next) => {
        console.log(req.user)
        !req.user ? res.sendStatus(STATUS_NOT_AUTHORIZED) :
            (req.user.permissions.includes(permission)) ? next() :
                res.sendStatus(STATUS_NOT_AUTHORIZED)
    }