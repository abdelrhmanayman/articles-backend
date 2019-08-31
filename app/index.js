const CURRENT_ENV = process.env.ENV
const express = require('express')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const graphqlHTTP = require('express-graphql')
const { makeExecutableSchema } = require('graphql-tools')
const passport = require('passport')
const mongoose = require('mongoose')
const compression = require('compression')
const helmet = require('helmet')
const cors = require('cors')
const { mongodb: { URI }, PORTS, ENV, SECRET } = require('./configs/settings')
const { initializeSystem } = require('./utils')
const bodyParser = require('body-parser')
const graphql = require('./graphql')
require('./configs/passport-setup')

mongoose.connect(URI[CURRENT_ENV],
    { useNewUrlParser: true, autoReconnect: true, useCreateIndex: true, useFindAndModify: false })
    .then(_ => { initializeSystem() })
    .catch(error => console.error(error.message))

app = express()
// app.use(bodyParser.urlencoded({ extended: false }))
// app.use(bodyParser.json())
app.use(cors({ origin: RegExp('/*/'), credentials: true }))
app.use(compression())
app.use(helmet())

app.use(session({
    secret: SECRET,
    saveUninitialized: false,
    resave: false,
    rolling: true,
    cookie: { maxAge: 8640000000000, httpOnly: false },
    store: new MongoStore({ url: URI[CURRENT_ENV], autoRemove: 'native', autoReconnect: true })
}))
app.use(passport.initialize())
app.use(passport.session())

app.get('/', (req, res) => req.user ? res.json(req.user) : res.sendStatus(403))

app.use('/images', require('./service/image-server'))

app.use('/graphql', graphqlHTTP((req, res) => ({
    schema: makeExecutableSchema(graphql),
    graphiql: true,
    context: { req, res }

})))

app.post('/', graphqlHTTP((req, res) => {
    return {
        schema: makeExecutableSchema(graphql),
        graphiql: false,
        context: { req, res }
    }
}))

app.listen(PORTS[CURRENT_ENV], () =>
    console.log(
        `${CURRENT_ENV} GraphQL-Server\t=>\thttp://localhost/graphql`,
        `\n${CURRENT_ENV} Image-Server\t=>\thttp://localhost/images`
    )
)
