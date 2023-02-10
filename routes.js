const express = require('express')
const router = express.Router()
const homeController = require('./src/controllers/homeController')
const loginController = require('./src/controllers/loginController.js')
const contatoController = require('./src/controllers/contatoController.js')

const{loginRequired}=require("./src/middlewares/middleware")


 
//---Rotas da Home
router.get('/', homeController.index)

//--rotas login
router.get('/login/index', loginController.index)
router.post('/login/register', loginController.register)
router.post('/login/login', loginController.login)
router.get('/login/logout', loginController.logout)

// Rotas de contato
router.get('/contato/index',loginRequired, contatoController.index)
router.post('/contato/register',loginRequired, contatoController.register)
 router.get('/contato/index/:id',loginRequired, contatoController.editIndex)
router.post('/contato/edit/:id',loginRequired, contatoController.edit) 
router.get('/contato/delete/:id',loginRequired, contatoController.delete) 


module.exports = router
