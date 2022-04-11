const express = require('express')
const router = express.Router()

// contoh percobaan
router.get('/', (req, res) => {
  res.send('halo, ini coba lagi')
})

module.exports = router