module.exports = `
    createArticle(article: INPUT_ARTICLE): String
    publishArticle(id: String): Boolean
    editArticle(id: String, text: String): Boolean
    deleteArticle(id: String): Boolean
    comment(userId: String!, articleId: String, comment: String!): Boolean
`