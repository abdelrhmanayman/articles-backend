const { articleModelInsert, articleModelUpdate, articleModelDelete } = require('../../../models/article-model')


exports.createArticle = async (_, { article }, { req: { user: { username } } }) => {
    let { _id, name } = await articleModelInsert(article)
    if (_id) {
        let { n, nModified } = await articleModelUpdate({
            one: true,
            filter: { _id },
            update: { $set: { "meta.publishedBy": username } }
        })
        return n > 0 && nModified > 0 ? name : new err()
    } else
        return new err()

}
exports.publishArticle = async (_, { id }) => {
    let { n, nModified } = await articleModelUpdate({
        one: true,
        filter: { _id: id },
        update: { $set: { "meta.published": true, "meta.publishedAt": Date.now } }
    })
    return n > 0 && nModified > 0 ? true : false
}
exports.editArticle = async (_, { text, id }) => {
    let { n, nModified } = await articleModelUpdate({
        one: true,
        filter: { _id: id },
        update: { $set: { text } }
    })
    return n > 0 && nModified > 0 ? true : false
}
exports.deleteArticle = async (_, { id }) => {
    let { deletedCount } = await articleModelDelete(id)
    return deletedCount > 0 ? true : false
}
exports.comment = async (_, { userId, articleId, comment }) => {
    let { n, nModified } = await articleModelUpdate({
        one: true,
        filter: { _id: articleId },
        update: { $push: { comments: { userId, comment } } }
    })
    return n > 0 && nModified > 0 ? true : false
}

