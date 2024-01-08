const express = require('express');
const mongoose = require('mongoose');
const auth = require('./routes/auth');
const cookieParser = require('cookie-parser');
const {requireAuth} = require('./middleware/auth');
const { checkUser } = require('./middleware/checkUser');

const app = express();

// middleware
app.use(express.static('public'));
app.use(express.json())
app.use(cookieParser())

// view engine
app.set('view engine', 'ejs');

// database connection
mongoose.connect(process.env.MONGODB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

app.get('*', checkUser);
app.get('/', (req, res) => res.render('home'));
app.get('/receipes', requireAuth, (req, res) => res.render('receipes'));
app.use(auth);