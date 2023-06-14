const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport(
     {
     pool: true,
     maxConnections: 8,
     SocketTimeout: 1000000,
     maxMessages: 'infinity',
     rateLimit: 2,
     rateDelta: 2000,
     host: 'smtp.mail.ru',
     port: 465,
     secure: true, //true for 465, false for other ports
     auth: {
         user: process.env.EMAIL,
         pass: process.env.PASSWORD
     },
 },
defaultConfig,
{
    from: `Mailer Test <process.env.EMAIL>`
}
)

transporter.verify((error, success) => {
    error ? console.log(error) :
    console.log('Server is ready to take our message: ', success)
})
const mailer = message => {
    transporter.sendMail(message, (err, info) => {
        if(err) return console.log(err)
        console.log('Email sent:', info)
        //transporter.close()
    })
}

module.exports = mailer