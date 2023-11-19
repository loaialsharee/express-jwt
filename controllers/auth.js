const User = require('../models/User');
const { handleErrors } = require('../utils/handleErrors');

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
    res.status(201).json(user);
  }catch (err) {
    const errors = handleErrors(err)
    res.status(400).json({errors});
  }
};

module.exports.postLogin = async (req, res) => {
  const {email, password} = req.body;

  res.send("new login");
};
