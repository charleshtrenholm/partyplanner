const { body } = require('express-validator/check');
const User = require('./user').User;

exports.validate = function(method){
    switch(method){
        case 'createUser': {
            console.log("WE are in createUser");
            return [
                body('email', 'Invalid Email').exists().isEmail().normalizeEmail(),
                body('email').custom(value => {
                    return User.findUserByEmail(value).then(user =>{
                        if(user){
                            return Promise.reject('E-mail already in use');
                        }
                    });
                }),
                body('f_name', 'Invalid First Name').exists().isLength({min: 2}),
                body('l_name', 'Invalid Last Name').exists().isLength({min: 2}),
                body('phone', 'Invalid Phone Number').exists().isNumeric(),
                body('password', 'Password must be at least 8 Characters').exists().isLength({min: 8}),
                body('password').custom(value => {
                    let regex = /\d/;
                    if(!regex.test(value)){
                        return Promise.reject('Password must contain at least 1 numeric character');
                    }
                }),
                body('pw_confirm').custom((value, { req })=> {
                    if(value !== req.body.password) {
                        return Promise.reject('Password and confirmation do not match')
                    }
                })
            ];
        }
    }
}