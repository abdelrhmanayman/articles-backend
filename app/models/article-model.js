const mongoose = require('mongoose')

const articleSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    comments: {
        type: [{
            userId: { type: String },
            comment: { type: String },
        }],
        default: []
    },
    picture: { type: String, required: true },
    text: { type: String, maxlength: 2000 },
    meta: {
        createdAt: { type: String, default: new Date().toISOString() },
        publishedAt: { type: String },
        publishedBy: { type: String },
        published: { type: Boolean, default: false }
    }
})

const articleModel = mongoose.model('articles', articleSchema)
exports.articleModel = articleModel

exports.articleModelInsert = article => new articleModel(article).save()
exports.articleModelInsertMany = articles => articleModel.insertMany(articles)
exports.articleModelCount = filter => articleModel.countDocuments(filter)
exports.articleModelUpdate = ({ one = false, filter = {}, update = {} }) =>
    one ? articleModel.updateOne(filter, update) : articleModel.updateMany(filter, update)
exports.articleModelFind = ({ one = false, aggregation = null, filter = {}, selection = {}, sort = {} }) =>
    aggregation ?
        articleModel.aggregate(aggregation) :
        one ?
            articleModel.findOne(filter).select(selection).sort(sort) :
            articleModel.find(filter).select(selection).sort(sort)
exports.articleModelDelete = (id) => articleModel.deleteOne({ "_id": id })