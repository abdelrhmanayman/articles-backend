module.exports = `
    type ARTICLE {
        name: String
        picture: String
        _id: String
    }

    type ARTICLE_DETAILS {
        name: String
        picture: String
        text: String
        meta: META
    }

    type COMMENT { 
         user: String,
         comment: String
    }
    
    type META {
        published: Boolean
        publishedAt: String
        publishedBy: String
        createdAt: String
    }
    
`