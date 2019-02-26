const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/party-planner');

const UserSchema = new mongoose.Schema({
    email: {type: String},
    f_name: {type: String},
    l_name: {type: String},
    phone: {type: String},
    password: {type: String}
});

mongoose.model('User', UserSchema);

module.exports = {
    User: mongoose.model('User')
}
