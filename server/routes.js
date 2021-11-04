const express = require('express')
const multer = require('multer')

const upload = multer()
const routes = express.Router()

const sqlget = require('./callback/sqlget')
const sqlpost = require('./callback/sqlpost')
const sqldelete = require('./callback/sqldelete')
const sqlupdate = require('./callback/sqlupdate')

const google = require('./google/update')

routes.get("/herokuget", upload.none(), sqlget.herokuget)
routes.get("/userget", upload.none(), sqlget.userget)
routes.post("/userpost", upload.none(), sqlpost.userPost)
routes.post("/userdelete", upload.none(), sqldelete.userdelete)
routes.post("/userupdate", upload.none(), sqlupdate.userupdate)

routes.post("/gettable", upload.none(), google.update)

module.exports = routes