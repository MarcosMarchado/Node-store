const route = require('express').Router()
const controller = require('../controllers/product-controller')
const multer = require('multer')
const multerConfig = require('../config/multer')
const authService = require('../services/auth-service')

//Para criar um produto, editar e deletar será necessário a autorização
route.post("/", authService.isAdmin, multer(multerConfig).single('file'), controller.post)
route.put("/:id", authService.isAdmin, controller.put)
route.delete("/:id", authService.isAdmin, controller.delete)
route.get("/", controller.get)
route.get("/tags/:tag", controller.getByTag)
route.get("/admin/:id", controller.getById)
route.get("/:slug", controller.getBySlug)

module.exports = route