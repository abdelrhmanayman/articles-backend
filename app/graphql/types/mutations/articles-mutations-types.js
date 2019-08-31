module.exports = `
    createArticle(article: INPUT_ARTICLE): String @IsAuthenticated
    publishArticle(id: String): Boolean @IsAuthenticated
    editArticle(id: String, text: String): Boolean @IsAuthenticated
    deleteArticle(id: String): Boolean @IsAuthenticated
    comment(userId: String!, articleId: String, comment: String!): Boolean @IsAuthenticated
`