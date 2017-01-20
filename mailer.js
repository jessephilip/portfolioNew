var nodemailer = require('nodemailer');
var mg = require('nodemailer-mailgun-transport');

// import keys and domain
const keys = require ("./keys.js")

// This is your API key that you retrieve from www.mailgun.com/cp (free up to 10K monthly emails)
var auth = {
    auth: {
        api_key: "key-a730d0ff021816dfcce139937a6da884",
        domain: "sandboxe9910aedccf3408fabfbae6003164dec.mailgun.org"
    }
}

module.exports = function(sender, message, callback) {

    var nodemailerMailgun = nodemailer.createTransport(mg(auth));

    nodemailerMailgun.sendMail({
        from: sender,
		to: 'jessephilip@gmail.com', // An array if you have multiple recipients.
        subject: 'Portfolio Message',
        text: message
    }, function(err, info) {
        if (err) {
            callback('Error: ' + err);
        } else {
            callback('Response: ' + info);
        }
    });
}
