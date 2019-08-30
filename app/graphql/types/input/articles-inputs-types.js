module.exports = `
input INPUT_ARTICLE {
    name: String
    comments: [COMMENT_TYPE]
    picture: String
    text: String
    meta: META_TYPE
}

input COMMENT_TYPE {
    userId: String
    comment: String
}

input META_TYPE {
    publishedAt: String
    createdAt: String
    published: Boolean
    publishedBy: String
}
`