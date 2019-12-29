const route = require('express').Router()
const controller = require('../controllers/customer-controller')
const authService = require('../services/auth-service')

route.post("/", controller.post)
route.post("/authenticate", controller.authenticate)
route.post("/refresh-token", authService.authorize, controller.refreshToken)
module.exports = route