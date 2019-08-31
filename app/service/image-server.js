const CURRENT_ENV = process.env.ENV
const router = require('express').Router()
const multer = require('multer')
const { mkdirSync, existsSync } = require('fs')
const { ENV: { DEVELOPMENT, PRODUCTION } } = require('../configs/settings')
const { uploads, STAUTS_NOT_FOUND, STAUTS_SERVER_ERROR,
    STATUS_BAD_REQUEST, checkServerAuthorization } = require('../utils')

const createdirs = (dirs = []) => dirs.forEach(dir => mkdirSync(dir))

const destination = (_, __, cb) => {
    let dir = uploads + new Date().getFullYear() + '/'
    let developmentDir = dir + DEVELOPMENT + '/'
    let productionDir = dir + PRODUCTION + '/'
    if (!existsSync(uploads))
        createdirs([uploads, dir, developmentDir, productionDir])
    if (!existsSync(dir))
        createdirs([dir, developmentDir, productionDir])
    cb(null, dir + CURRENT_ENV + '/')
}

const filename = (_, file, cb) =>
    cb(null, Date.now() + "_" + file.originalname.replace(/ /g, '-').toLocaleLowerCase())

const storage = multer.diskStorage({ destination, filename })
const upload = multer({ storage }).single('file')

router.get('*', (req, res) => {
    let imagePath =  req.url
    if (req.url.length > 1 && existsSync(imagePath))
        res.sendFile(imagePath)
    else res.sendStatus(STAUTS_NOT_FOUND)
})

router.use(checkServerAuthorization({ permission: 'upload-image' }))

router.post('/', (req, res) => {
    try {
        upload(req, res, error =>
            error ?
                res.status(STAUTS_NOT_FOUND).end(error.message) :
                req.file ?
                    res.end(req.file.path.replace('uploads', 'files')) :
                    res.sendStatus(STATUS_BAD_REQUEST)
        )
    } catch (error) {
        console.log(error.message)
        res.sendStatus(STAUTS_SERVER_ERROR)
    }
})

module.exports = router