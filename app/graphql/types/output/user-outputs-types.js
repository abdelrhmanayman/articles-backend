module.exports = `
type NAME {
    first: String
    last: String
}

type USER {
    _id: String
    name: NAME
    role: String
}

`