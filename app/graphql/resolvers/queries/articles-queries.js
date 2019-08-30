const { articleModelFind } = require('../../../models/article-model')
const { Types: { ObjectId } } = require('mongoose')

exports.getComments = (_, { articleId }) => articleModelFind({
    one: true,
    aggregation: [
        {
            '$match': {
                '_id': new ObjectId(articleId)
            }
        }, {
            '$unwind': {
                'path': '$comments'
            }
        }, {
            '$addFields': {
                'userId': {
                    '$toObjectId': '$comments.userId'
                }
            }
        }, {
            '$lookup': {
                'from': 'users',
                'localField': 'userId',
                'foreignField': '_id',
                'as': 'user'
            }
        }, {
            '$project': {
                'user': {
                    '$arrayElemAt': [
                        '$user.username', -1
                    ]
                },
                'comment': '$comments.comment',
                '_id': 0
            }
        }
    ]
})

exports.getArticles = () => articleModelFind({
    filter: { "meta.published": true },
    selection: { picture: 1, name: 1, _id: 1 }
})

exports.getArticleDetails = (_, { id }) => articleModelFind({
    one: true,
    filter: { _id: id }
})
