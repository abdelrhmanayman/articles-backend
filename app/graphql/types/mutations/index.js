module.exports =
    'type Mutation {'
        .concat(require('./user-mutations-types'))
        .concat(require('./articles-mutations-types'))
        .concat('}')