import http from 'http'
import path from 'path'
import fs from 'fs'
import Express from './lib/express.js'
const PORT = process.env.PORT || 4500;
const server = http.createServer( (req, res) => {
	res.setHeader('Access-Control-Allow-Origin','*')
  	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT')
  	res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
	if(req.method.toUpperCase() == 'OPTIONS') return res.end()

	const app = new Express(req, res)

	app.static('assets')

	app.get('/', (req, res) => res.render('index'))
	app.get('/login', (req, res) => res.render('login'))
	app.get('/register', (req, res) => res.render('register'))
	app.get('/chat', (req, res) => res.render('index'))
	app.get('/img', (req, res) => res.ren('chat'))
	app.get('/image', (req, res) => res.ren('icon'))

})

server.listen(PORT, () => console.log("FRONT ISHLASHNI BOSHLADI"))


