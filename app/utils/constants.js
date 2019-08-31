// Status Codes
exports.STAUTS_NOT_FOUND = 404
exports.STATUS_WRONG_LOGIN = 419
exports.STAUTS_SERVER_ERROR = 500
exports.STATUS_OK = 200
exports.STATUS_BAD_REQUEST = 400
exports.STATUS_BLOCKED_USER = 420
exports.STATUS_FORBIDDEN = 403
exports.STATUS_NOT_AUTHORIZED = 401
exports.STATUS_DUPLICATED = 599


// Permissions
exports.permissions = {
    addArticle: "add-article",
    uploadImage: "upload-image",
}

// Public
exports.uploads = "/upload/"

exports.roles = { USER: "USER", WRITER: "WRITER" }