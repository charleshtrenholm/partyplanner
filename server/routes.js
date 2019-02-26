const bodyParser = require('body-parser');
const register = require('./controllers/register');
const validation = require('./models/validation');

module.exports = function(app){

    app.use(bodyParser.json());

    app.get('/api/test', function(req, res){
        res.send({express: 'express is connected to react'});
    })

    app.post('/api/register', register.validate('createUser'), function(req, res){
        register.createUser(req, res);
    })


}