const express = require('express');
const app = express();
const port = 3000;

// middleware
const logger = (req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
}
app.use(logger);
app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));

// menggunakan view engine ejs
app.set('view engine', 'ejs');

// route
const router = require('./router')
app.use(router)

// menyalakan web server
app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
});