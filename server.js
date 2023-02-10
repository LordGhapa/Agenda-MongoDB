require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')

mongoose.set('strictQuery', true)
mongoose
  .connect(process.env.CONNECTIONSTRING,{
    useNewUrlParser:true,
    useUnifiedTopology:true,    

  })
  .then(() => {
    app.emit('ok')
    console.log('CONNECTION WORKS')
  })
  .catch(e => console.log(e))



const session = require('express-session')
const MongoStore = require('connect-mongo')
const flash = require('connect-flash')

const routes = require('./routes')
const path = require('path')
const helmet = require('helmet')
const csurf=require('csurf')
const {middleware,checkCsurf,csurfMiddleware} = require('./src/middlewares/middleware.js')

app.use(helmet())

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static(path.resolve(__dirname, 'public')))

const sessionOptions = session({
  secret: 'texto q ninguem vai saber',

  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7, //tempo q vai durar o cookie (7dias)
    httpOnly: true
  },
  store: MongoStore.create({ mongoUrl: process.env.CONNECTIONSTRING })
})

app.use(sessionOptions)
app.use(flash())

app.set('views', path.resolve(__dirname, 'src', 'views'))
app.set('view engine', 'ejs')

app.use(csurf())

app.use(middleware)
app.use(checkCsurf)
app.use(csurfMiddleware)
app.use(routes)


app.on('ok', () => {
  app.listen(3000, () => {
    console.log('servidor na porta 3000')
    console.log('servidor na porta http://localhost:3000')
  })
})
