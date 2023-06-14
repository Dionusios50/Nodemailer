require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const mailer = require('./nodemailer')

const app = express()

const port = process.env.PORT || 9000
let user = undefined

app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'))
app.use(bodyParser.urlencoded({extended: false}))
app.post('/registration', (req, res) => {
	if(!req.body.email || !req.body.pass) return res.sendStatus(400)
	const message = {
		from: 'Mailer Test <nettie10@ethereal.email>',
		to: req.body.email,
		subject: 'Congratulations! You are successfully registered on our site!',
		html:`
			<h2>Congratulations! You are successfully registered on our site!</h2>
				<i>Your account details:</i>
		<ul>
			<li>login: ${req.body.email}</li>
			<li>password: ${req.body.pass}</li>
		</ul>
		${req.body.promo ? `
You are subscribed to the newsletter of our promotions and offers, to unsubscribe from the newsletter, follow the link <a href="$(process.env.HOST)/${req.body.email}/">unsubscribe</a>` : ''}
	<p>This letter does not require a response!</p>`
	}
	mailer(message)
	user = req.body
	res.redirect('/registration')
	res.send(`
Registration completed successfully! Account details sent to email:${req.body.email}`)
})
app.get('/registration', (reg, res) => {
	if(typeof user !== 'object') return res.sendFile(__dirname + '/registration.html')
	res.send(`
Registration completed successfully! Account details sent to email:${user.email}`)
	user = undefined
})
app.get('/unsubscible/:email', (req, res) => {
	console.log(`${req.params.email} unsubscribed`)
	res.send(`Your email: ${req.params.email} has been removed from the mailing list!`)
})

app.listen(port, () =>
	console.log(`server listening at http://localhost:${port}/registration`)
)
