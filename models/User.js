const mongoose = require('mongoose');
const {isEmail} = require('validator')
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Please enter an email'],
        unique: true,
        lowercase: true,
        validate: [isEmail, 'Please enter a valid email']
    },
    password: {
        type: String,
        required: [true, 'Please enter a password'],
        minlength: [6, 'Minimum password length is 6 characters'],
    }
});

// This function will run before the doc is saved to db
userSchema.pre('save', async function(next){
    // Attach a 'salt' - an additional string added to the password for an extra layer of protection before hashing
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
})

// static method to login users
userSchema.statics.login = async function(email, password) {
    const user = await this.findOne({email});
    if (user){
        const auth = await bcrypt.compare(password, user.password)
        if (auth){
            return user;
        } 
        throw Error('Incorrect credentials')
    }
    throw Error('Incorrect credentials')
}

const User = mongoose.model('user', userSchema)

module.exports = User;