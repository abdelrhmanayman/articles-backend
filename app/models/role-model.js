const mongoose = require('mongoose')

const roleSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    permissions: {
        type: [String]
    },
    deletable: Boolean
})

const roleModel = mongoose.model('roles', roleSchema)
exports.roleModel = roleModel

exports.roleModelInsert = role => new roleModel(role).save()
exports.roleModelInsertMany = roles => roleModel.insertMany(roles)
exports.roleModelCount = filter => roleModel.countDocuments(filter)
exports.roleModelFind = ({ one = false, aggregation = null, filter = {}, selection = {}, sort = {} }) =>
    aggregation ?
        roleModel.aggregate(aggregation) :
        one ?
            roleModel.findOne(filter).select(selection).sort(sort) :
            roleModel.find(filter).select(selection).sort(sort)