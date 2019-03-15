const express = require('express')
const app = express()
const port = 3000
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser')


app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(express.static('public'))

app.get('/', (req, res) =>{
	res.render('home')
})

app.get('/barcode', (req, res) =>{
	res.render('barcode')
})

app.get('/nfc', (req, res) =>{
	res.render('nfc')
})


app.get('/search', (req, res) =>{
	console.log(req.query);
	res.render('search')
})

app.get('*', (req, res)=>{
	res.render('error', {error: "Deze pagina lijkt (nog) niet niet te bestaan"})
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
