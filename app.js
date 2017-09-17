var express = require('express')
var mongoose = require('mongoose')
var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')
var session = require('express-session')
var flash = require('connect-flash')
var logger = require('morgan')
var routes = require('./routes')

var app = express()

// logger
app.use(logger('dev'))

// mongoose
mongoose.connect('mongodb://localhost/nodekb')

//port
app.set('port', process.env.PORT || 3000)

// view engine
app.set('views', './views')
app.set('view engine', 'ejs')

// bodyParser, cookies and session
app.use(bodyParser.urlencoded({extended: false}))
app.use(cookieParser())
app.use(session({
	secret: "TKRv0IJs=HYqrvagQ#&!F!%V]Ww/4KiVs$s,<<MX",
	resave: true,
	saveUninitialized: true
}))

// flash
app.use(flash())
// routes
app.use(routes)

// listen
app.listen(app.get('port'), function(){
	console.log('Server started on port ' + app.get('port'))
})
