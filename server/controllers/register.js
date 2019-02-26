const User = require('../models/user').User;
const { body, validationResult } = require('express-validator/check');
const bcrypt = require('bcryptjs');


exports.validate = function(method){
    switch(method){
        case 'createUser': {
            return [
                body('email', 'Invalid Email').exists().isEmail().normalizeEmail(),
                body('email').custom(value => {
                    return User.findOne({email: value}).then(user => {
                        if(user){
                            return Promise.reject('E-mail already in use');
                        }
                    });
                }),
                body('f_name', 'Invalid First Name').exists().isLength({min: 2}),
                body('l_name', 'Invalid Last Name').exists().isLength({min: 2}),
                body('phone', 'Invalid Phone Number').exists().isNumeric(),
                body('password', 'Password must be at least 8 Characters').exists().isLength({min: 8}),
                body('password').exists().custom(value => {
                    let regex = /\d/;
                    if(!regex.test(value)){
                        throw new Error('Password must contain at least 1 numeric character');
                    } else {
                        return true;
                    }
                }),
                body('pw_confirm', 'im a teapot').exists().custom((value, { req }) => {
                    if(value !== req.body.password) {
                        throw new Error('Password and confirmation do not match');
                    } else {
                        return true;
                    }
                })
            ];
        }
    }
};

exports.createUser = function(req, res, next){
    let errors = validationResult(req);
    if(!errors.isEmpty()){
        res.json({errors: errors.array()});
    } else {
        const hash = bcrypt.hashSync(req.body.password, 10);
        User.create({
            email: req.body.email,
            phone: req.body.phone,
            f_name: req.body.f_name,
            l_name: req.body.l_name,
            password: hash
        }, function(err){
            if(err) console.log(err.message)
        });

        const id = User.find({email: req.body.email})._id;
        console.log("ID", id);

        res.json({message: 'success', id: id});
    }
}