const mongoose = require('mongoose')
const { roles: { USER } } = require('../utils/constants')

const userSchema = new mongoose.Schema({
    name: {
        first: { type: String, required: true },
        last: { type: String, required: true }
    },
    password: { type: String, required: true },
    isVerified: { type: Boolean, default: false },
    isRegistered: { type: Boolean, default: false },
    isBlocked: { type: Boolean, default: false },
    role: { type: String, default: USER },
    username: { type: String, trim: true, index: true, unique: true, sparse: true },
})

const userModel = mongoose.model('users', userSchema)

exports.userModel = userModel

exports.userModelInsert = user => new userModel(user).save()

exports.userModelFind = ({ one = false, aggregation = null, filter = {}, selection = {}, sort = {} }) =>
    aggregation ?
        userModel.aggregate(aggregation) :
        one ?
            userModel.findOne(filter).select(selection).sort(sort) :
            userModel.find(filter).select(selection).sort(sort)

exports.userModelCount = filter => userModel.countDocuments(filter)

exports.userModelUpdate = ({ one = false, filter = {}, update = {} }) =>
    one ? userModel.updateOne(filter, update) : userModel.updateMany(filter, update)
