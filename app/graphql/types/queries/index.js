module.exports =
    'type Query {'
        .concat(require('./user-queries-types'))
        .concat(require('./articles-queries-types'))
        .concat('}')