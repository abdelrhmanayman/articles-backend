const MONGO = 'mongodb://localhost:27017/'

exports.ENV = { DEVELOPMENT: "DEVELOPMENT", PRODUCTION: "PRODUCTION" }
exports.mongodb = {
    URI: {
        DEVELOPMENT: MONGO + 'paradox-dev',
        PRODUCTION: MONGO + 'paradox-live'
    }
}
exports.PORTS = {
    DEVELOPMENT: 80,
    PRODUCTION: 80
}

exports.SECRET =
    `6hy6i9y;~P98iGbeYK4$'GHk=cnT$H}HfY{s1ysDa-3zc-#<e+(?";1w[A";~qI`
    +
    'SEKe#@mKe{_.4d?>"+La`[66&Z_Zn64F/-mc5+>~4X8Sh<O-g*I.6;x>3B4o@Rf'
