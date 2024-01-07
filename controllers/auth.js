const User = require('../models/User');
const { handleErrors } = require('../utils/handleErrors');
const jwt = require('jsonwebtoken');

const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({id}, process.env.secret, {
    expiresIn: maxAge
  })
}

module.exports.getSignup = (req, res) => {
  res.render("signup");
};

module.exports.getLogin = (req, res) => {
  res.render("login");
};

module.exports.postSignup = async (req, res) => {
  const {email, password} = req.body;

  try{
    const user = await User.create({email, password});
    const token = createToken(user._id)
    res.cookie('jwt', token, {httpOnly:true, maxAge: maxAge*1000})
    res.status(201).json({user: user._id});
  }catch (err) {
    const errors = handleErrors(err)
    res.status(400).json({errors});
  }
};

module.exports.postLogin = async (req, res) => {
  const {email, password} = req.body;

  try{
    const user = await User.login(email, password)
    const token = createToken(user._id)
    res.cookie('jwt', token, {httpOnly:true, maxAge: maxAge*1000})
    res.status(200).json({user: user._id})
  }catch (err){
    const errors = handleErrors(err)
    res.status(400).json({errors});
  }
};
