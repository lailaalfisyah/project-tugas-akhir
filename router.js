const express = require('express')
const router = express.Router()
const restrict = require('./middlewares/restrict')
const userAuth = require('./controllers/userAuth')
const coba = require('./controllers/coba')

// AUTH

// menuju form registrasi
router.get('/register', userAuth.registerForm)

// menginput data registrasi
router.post('/register', userAuth.registerProcess)

// menuju form login
router.get('/login', userAuth.loginForm)

// memproses login
router.post('/login', userAuth.loginProcess)

// memproses logout
router.get('/logout', userAuth.logoutProcess)

// LAIN-LAIN

// halaman beranda sementara
router.get('/', (req, res) => {
  res.send('Ini halaman HOME')
})

// tes variabel user di halaman profile sementara
router.get('/whoami', restrict, (req, res) => {
  res.render('profile', req.user.dataValues)
})

// menginput keterangan role user
router.post('/role', userAuth.inputRole)

// percobaan
router.get('/cobainput', coba.inputForm)
router.post('/cobainput', coba.inputProcess)

module.exports = router