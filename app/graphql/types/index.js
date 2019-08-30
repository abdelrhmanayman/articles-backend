module.exports = `
directive @IsAuthorized(requires : [String]) on  FIELD_DEFINITION
directive @IsAuthenticated on OBJECT | FIELD_DEFINITION
`   .concat(require('./input'))
    .concat(require('./output'))
    .concat(require('./queries'))
    .concat(require('./mutations'))