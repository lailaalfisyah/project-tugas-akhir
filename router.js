const express = require('express')
const router = express.Router()
const restrict = require('./middlewares/restrict')
const userAuth = require('./controllers/userAuth')
const eventManage = require('./controllers/eventManage')
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

// MANAGEMENT

// menuju form input event
router.get('/inputEvent', eventManage.inputForm)

// memproses data event yang di-input
router.post('/inputEvent', eventManage.inputProcess)

// menampilkan daftar events
router.get('/outputEvent', eventManage.output)

// menampilkan detai event
router.get('/detailEvent/:id', eventManage.detail)

// memproses pendaftaran event
router.post('/regisEvent/:id', restrict, eventManage.registration)

// mencocokkan token yang di-input peserta dengan database
router.post('/matchTheToken', eventManage.matchTheToken)

// menggabungkan tabel users, transactions, dan events untuk laporan admin
router.get('/report', eventManage.adminReport)

// LAIN-LAIN

// halaman beranda sementara
router.get('/', (req, res) => {
  res.send('Ini halaman HOME')
})

// tes variabel user di halaman profile sementara
router.get('/whoami', restrict, (req, res) => {
  res.render('profile', req.user.dataValues)
  // res.send(req.user.dataValues)
})

// menginput keterangan role user
router.post('/role', userAuth.inputRole)

// percobaan
router.get('/certif', coba.certif)
router.get('/adminReport', coba.adminReport)

module.exports = router