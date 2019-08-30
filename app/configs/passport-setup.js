const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const { userModelFind } = require('../models')
const { compareSync } = require('bcrypt')
const { Types: { ObjectId } } = require('mongoose')


passport.use('local', new LocalStrategy({ usernameField: 'username', passwordField: 'password' }
    , async function (username, password, done) {
        let response = await userModelFind({ one: true, filter: { username } })
        if (response) {
            let check = compareSync(password, response.password)
            check ?
                done(null, response) :
                done(null, false)
        }
        else done(null, false, response)
    })
)


passport.serializeUser((user, done) => done(null, user._id))

passport.deserializeUser(async (_id, done) => {
    try {
        let user = (await userModelFind({
            aggregation: [
                { $match: { _id: new ObjectId(_id) } },
                {
                    $lookup: {
                        from: "roles",
                        localField: "role",
                        foreignField: "name",
                        as: "field"
                    }
                },
                { $addFields: { permissions: "$field.permissions" } },
                { $unwind: { path: "$permissions" } },
                { $project: { field: 0 } }
            ]
        }))[0]
        done(null, user)
    } catch ({ message }) {
        done(message, null)
    }
})