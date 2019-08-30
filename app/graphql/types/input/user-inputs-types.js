module.exports = `
input INPUT_NAME {
    first: String
    last: String
}

input INPUT_USER {
    name: INPUT_NAME!
    password: String!
    role: String
    username: String!
}

`