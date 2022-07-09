const express = require('express')
const router = express.Router()
const restrict = require('./middlewares/restrict')
const multer = require('multer')
const uploadProfilePicture = multer({ dest: __dirname + '/public/assets/img/profilePicture' })
const uploadEventPoster = multer({ dest: __dirname + '/public/assets/img/eventPoster' })
const auth = require('./controllers/auth')
const adminDashboard = require('./controllers/adminDashboard')
const userActivity = require('./controllers/userActivity')



// AUTHENTICATION

// halaman pembuka
router.get('/', auth.loginForm)

// menuju form registrasi
router.get('/register', auth.registerForm)

// menginput data registrasi
router.post('/register', auth.registerProcess)

// menuju form login
router.get('/login', auth.loginForm)

// memproses login
router.post('/login', auth.loginProcess)

// mendeteksi role pengguna
router.get('/roleDetector', auth.roleDetector)

// memproses logout
router.get('/logout', auth.logoutProcess)

// menuju form ubah password
router.get('/changePassword', restrict, auth.changePasswordForm)

// memproses ubah password
router.post('/changePassword', restrict, auth.changePasswordProses)

// menginput keterangan role user (JUST DEMO)
router.post('/role', auth.inputRole)

// registrasi akun admin (JUST DEMO)
router.post('/registerAdmin', auth.registerAdmin)



// USER ACTIVITY

// landing page (tampilan daftar webinar setelah login)
router.get('/event', restrict, userActivity.eventList)

// menampilkan keterangan webinar secara detail
router.get('/event/:id', restrict, userActivity.eventDetail)

// memproses pendaftaran webinar
router.post('/eventRegistration/:id', restrict, userActivity.eventRegistration)

// bukti transaksi berhasil
router.get('/transactionProof/:id', restrict, userActivity.transactionProof)

// mencocokkan token webinar untuk mendapatkan akses menuju e-certificate
router.post('/matchTheToken/:id', restrict, userActivity.matchTheToken)

// menuju halaman profil
router.get('/profile', restrict, userActivity.profile)

// menuju halaman edit profil
router.get('/editProfile', restrict, userActivity.editProfileForm)

// memproses edit profil
router.post('/editProfile', restrict, uploadProfilePicture.single('profilePicture'), userActivity.editProfileProcess)

// memproses edit foto profil
router.post('/editProfilePicture', restrict, uploadProfilePicture.single('profilePicture'), userActivity.editProfilePicture)



// ADMIN DASHBOARD

// menuju dasbor admin
router.get('/admin', restrict, adminDashboard.dashboard)

// data-data pengguna
router.get('/admin/userData', restrict, adminDashboard.userData)

// detail data pengguna
router.get('/admin/userData/:id', restrict, adminDashboard.userDetail)

// mencari data pengguna
router.get('/admin/searchUser', restrict, adminDashboard.searchUser)

// data-data webinar
router.get('/admin/eventData', restrict, adminDashboard.eventData)

// detail data webinar
router.get('/admin/eventData/:id', restrict, adminDashboard.eventDetail)

// mencari data webinar
router.get('/admin/searchEvent', restrict, adminDashboard.searchEvent)

// menuju form input webinar
router.get('/admin/inputEvent', restrict, adminDashboard.inputEventForm)

// memproses data webinar yang di-input
router.post('/admin/inputEvent', restrict, uploadEventPoster.single('poster'), adminDashboard.inputEventProcess)

// menuju form edit data webinar
router.get('/admin/editEvent/:id', restrict, adminDashboard.editEventForm)

// memperoses edit data webinar
router.post('/admin/editEvent/:id', restrict, adminDashboard.editEventProcess)

// memproses edit poster webinar
router.post('/admin/editEventPoster/:id', restrict, uploadEventPoster.single('poster'), adminDashboard.editEventPoster)

// data-data transaksi
router.get('/admin/transactionData', restrict, adminDashboard.transactionData)

// detail data transaksi
router.get('/admin/transactionData/:id', restrict, adminDashboard.transactionDetail)

// laporan transaksi
router.get('/admin/transactionReport', restrict, adminDashboard.transactionReport)



module.exports = router