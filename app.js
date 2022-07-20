const express = require('express');
const app = express();
const { PORT = 3000} = process.env;

// middleware
const logger = (req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
}
app.use(logger);
app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));

// session
const session = require('express-session')
app.use(session({
  secret: 'Web Speak Up Now sebagai TA Laila',
  resave: false,
  saveUninitialized: false,
  cookie: {
    expires: 3600000 // 1 hour
  }
}))

// passport
const passport = require('./lib/passport')
app.use(passport.initialize())
app.use(passport.session())

// flash message
const flash = require('express-flash')
app.use(flash())

// menggunakan view engine ejs
app.set('view engine', 'ejs');

// route
const router = require('./router')
app.use(router)

// menyalakan web server
app.listen(PORT, () => {
    console.log(`App listening at http://localhost:${PORT}`)
});