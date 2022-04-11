const express = require('express')
const router = express.Router()
const userAuth = require('./controllers/userAuth')

// contoh percobaan
router.get('/', userAuth.coba)

module.exports = router