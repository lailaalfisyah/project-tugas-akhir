const express = require('express')
const router = express.Router()
const restrict = require('./middlewares/restrict')
const userAuth = require('./controllers/userAuth')
const eventManage = require('./controllers/eventManage')
const coba = require('./controllers/coba')

// EVENT MANAGEMENT

// landing page (tampilan daftar webinar sebelum login)
router.get('/', eventManage.eventList)

// menampilkan keterangan webinar secara detail
router.get('/eventDetail/:id', eventManage.eventDetail)

// memproses pendaftaran webinar
router.post('/eventRegistration/:id', restrict, eventManage.eventRegistration)

// bukti transaksi berhasil


// auto generate e-certificate


// mencocokkan token webinar untuk mendapatkan akses menuju e-certificate
router.post('/matchTheToken', eventManage.matchTheToken)

// menampilkan e-certificate dalam bentuk PDF


// menuju form input webinar (ONLY FOR ADMIN)
router.get('/inputEvent', eventManage.inputEventForm)

// memproses data webinar yang di-input (ONLY FOR ADMIN)
router.post('/inputEvent', eventManage.inputEventProcess)

// laporan transaksi (ONLY FOR ADMIN)
router.get('/report', eventManage.transactionsReport)




// // USER AUTHENTICATION

// menuju form registrasi
router.get('/register', userAuth.registerForm)

// menginput data registrasi
router.post('/register', userAuth.registerProcess)

// menuju form login
router.get('/login', userAuth.loginForm)

// memproses login
router.post('/login', userAuth.loginProcess)

// // memproses logout
// router.get('/logout', userAuth.logoutProcess)

// menginput keterangan role user (JUST DEMO)
router.post('/role', userAuth.inputRole)





// // LAIN-LAIN

// // tes variabel user di halaman profile sementara
// router.get('/whoami', restrict, (req, res) => {
//   res.render('profile', req.user.dataValues)
//   // res.send(req.user.dataValues)
// })

// // percobaan
// router.get('/certif', coba.certif)
// router.get('/adminReport', coba.adminReport)

module.exports = router