const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config()
const path = require('path');
const expressValidator = require('express-validator');
// const twilio = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

// twilio.messages
// .create({
    //     body: 'cowabunga',
    //     from: '+19513354836',
    //     to: '+19097440295'
    // })
    // .then(message => console.log(message))
    // .done();
    
const app = express();
require('./server/routes')(app);
const port = process.env.PORT || 5000;
app.use(bodyParser.json());
app.use(expressValidator());
app.use(express.static(path.join(__dirname, 'build')));

app.listen(port, function(){
    console.log("listening on port " + port);
});