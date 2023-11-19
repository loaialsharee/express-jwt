const express = require('express');
const mongoose = require('mongoose');
const auth = require('./routes/auth');

const app = express();

// middleware
app.use(express.static('public'));
app.use(express.json())

// view engine
app.set('view engine', 'ejs');

// database connection
mongoose.connect(process.env.MONGODB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

app.get('/', (req, res) => res.render('home'));
app.get('/receipes', (req, res) => res.render('receipes'));
app.use(auth);