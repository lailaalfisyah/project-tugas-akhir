// jika request berasal dari user yang terautentikasi,
// maka jalankan handler berikutnya
// jika tidak, arahkan ke halaman login

module.exports = (req, res, next) => {
  if (req.isAuthenticated()) return next()
  res.redirect('/login')
}