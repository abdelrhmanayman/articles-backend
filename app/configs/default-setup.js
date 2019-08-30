const { permissions, roles } = require('../utils/constants')

exports.roles = [{ name: roles.WRITER, permissions: Object.values(permissions), deletable: false }, { name: roles.USER, deletable: true }]
exports.users = [{
    name: { first: "Abdelrhman", last: "Ayman" },
    password: "1234",
    isVerified: true,
    isRegistered: true,
    username: "abdelrhman",
    role: roles.WRITER,
}]
