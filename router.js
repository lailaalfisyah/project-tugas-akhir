const express = require('express')
const router = express.Router()
const restrict = require('./middlewares/restrict')
const userAuth = require('./controllers/userAuth')
const eventManagement = require('./controllers/eventManagement')
const userAccount = require('./controllers/userAccount')
const coba = require('./controllers/coba')

// EVENT MANAGEMENT

// landing page (tampilan daftar webinar sebelum login)
router.get('/', eventManage.home)

// landing page (tampilan daftar webinar setelah login)
router.get('/event', restrict, eventManage.eventList)

// menampilkan keterangan webinar secara detail
router.get('/event/:id', restrict, eventManage.eventDetail)

// memproses pendaftaran webinar
router.post('/eventRegistration/:id', restrict, eventManage.eventRegistration)

// bukti transaksi berhasil


// auto generate e-certificate


// mencocokkan token webinar untuk mendapatkan akses menuju e-certificate
router.post('/matchTheToken/:id', restrict, eventManage.matchTheToken)

// menampilkan e-certificate dalam bentuk PDF

// menuju dasbor admin (ONLY FOR ADMIN)
router.get('/admin', eventManage.dashboard)

// // data-data pengguna
// router.get('/usersData', eventManage.usersData)

// data-data webinar
router.get('/eventsData', eventManage.eventsData)

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

// memproses logout
router.get('/logout', userAuth.logoutProcess)

// menginput keterangan role user (JUST DEMO)
router.post('/role', userAuth.inputRole)



// USER ACCOUNT

// menuju halaman profil
router.get('/profile', restrict, userAccount.profile)

// menuju halaman edit profil
router.get('/editProfile', restrict, userAccount.editProfileForm)

// memproses edit profil
router.post('/editProfile', restrict, userAccount.editProfileProcess)

// melihat bukti transaksi
router.get('/transactionProof/:id', restrict, userAccount.transactionProof)



// // LAIN-LAIN

// tes variabel user di halaman profile sementara
router.get('/whoami', restrict, (req, res) => {
  res.render('profile', req.user.dataValues)
  // res.send(req.user.dataValues)
})

// // percobaan
// router.get('/openCertif', coba.openCertif)
// router.get('/click', coba.click)

module.exports = router