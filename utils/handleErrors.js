module.exports.handleErrors = (err) => {
    console.log(err.message, err.code);
    let errors = {email: '', password: ''}

    //duplicate error code
    if (err.code === 11000){
        errors.email = 'Email has been registered';
        return errors;
    }

    if(err.message.includes('user validation failed')){
        Object.values(err.errors).forEach(({properties}) => {
            errors[properties.path] = properties.message
        })
    }
    return errors;
}

