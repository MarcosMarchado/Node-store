const route = require('express').Router()
const controller = require('../controllers/order-controller')
const authService = require('../services/auth-service')

route.post("/", authService.authorize, controller.post)
route.get("/", authService.authorize, controller.get)

module.exports = route
