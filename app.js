const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const authRoutes = require('./routes/authRoutes');

const app = express();

// middleware
app.use(cookieParser());
app.use(express.static('public'));
app.use(express.json());

// view engine
app.set('view engine', 'ejs');

// database connection
const dbURI = `${process.env.DB_URL}`;
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
  .then((result) => {
    console.log('App running at port: 3000');
    app.listen(3000)
  })
  .catch((err) => console.log(err));

// routes
app.get('/', (req, res) => res.render('home'));
app.get('/smoothies', (req, res) => res.render('smoothies'));

app.get('/set-cookies', (req, res) => {
  res.cookie('isEmployee', true, {maxAge: 1000 * 60 * 60 * 24, httpOnly: true});
  res.send('Cookies set');
})

app.get('/read-cookies', (req, res) => {
  const cookies = req.cookies;
  console.log(cookies);
})
app.use(authRoutes);