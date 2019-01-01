var express = require('express');

var bodyparser = require('body-parser');
var exphbs = require('express-handlebars');
var nodemailer = require('nodemailer');
var app = express();

app.set('view engine', 'ejs');
app.use('/public', express.static('public'));

var urlencodedParser = bodyparser.urlencoded({extended:false});


app.get('/',(req,res)=>{
    res.render('contact');
    // res.send('hey you made it to step1');
});
app.post('/send',urlencodedParser,(req,res)=>{
    var output = `
    <p>you have a new conatct request</p>
    <p>Hey Bro U called for me at ${req.body.email}</p>
    <p>was just saying ${req.body.message}    `;

    var transporter = nodemailer.createTransport({
        port: 587,
        service:'gmail',
        secure: false, // true for 465, false for other ports
        auth: {
            user: 'manuanand43@gmail.com', // generated ethereal user
            pass: 'qazwsxedx123' // generated ethereal password
        },
        tls:{
            rejectUnauthorized:false
        }
    });

    // setup email data with unicode symbols
    let mailOptions = {
        from: '"Sukrit 👻" <manuanand43@gmail.com>', // sender address
        to: req.body.email, // list of receivers
        subject: 'Request', // Subject line
        text: req.body.message, // plain text body
        html: output // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

        res.render('contact-sucess',{qs:'sucess'});
});
});

app.listen(8000, ()=> console.log('i heard at port 8000'));
