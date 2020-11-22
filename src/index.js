const express = require('express')
const morgan = require('morgan') //Middlewares
const exphbs = require('express-handlebars') //Conf HTML
const path = require('path')
const { urlencoded } = require('express')


//initialization
const app = express()


//settings
app.set('port', process.env.PORT || 4000)
app.set('views', path.join(__dirname, 'views'))
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    layoutDir: path.join(app.get('views'), 'layouts'),
    partialDir: path.join(app.get('views'), 'partial'),
    extname: '.hbs',
    helpers: require('./lib/handlebars')
}))
app.set('view engine', '.hbs')


//Middlewares
app.use(morgan('dev'))
app.use(express.urlencoded({extended: false}))
app.use(express.json());


//Global Variables
app.use((req, res, next) => {

    next()
})


//Routes
app.use(require('./routes'))
app.use(require('./routes/authentication'))
app.use('/links', require('./routes/links'))


//Public
app.use(express.static(path.join(__dirname, 'public')))


//Starting Server
app.listen(app.get('port'), () => {
    console.log('Servidor na porta: ', app.get('port'))
})