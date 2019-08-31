module.exports = `
getComments(articleId: String): [COMMENT] @IsAuthenticated
getArticles: [ARTICLE] @IsAuthenticated
getArticleDetails(id: String): ARTICLE_DETAILS @IsAuthenticated
getWriterArticles(username: String): [ARTICLE_DETAILS] @IsAuthenticated
`