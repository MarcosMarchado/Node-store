const mongoose = require('mongoose')
const Repository = require('../repositories/order-repository')
const guid = require('guid')
const authService = require('../services/auth-service')

mongoose.set('useFindAndModify', false)

exports.get = async (req, res, next) => {
    try {
        const data = await Repository.get()
        res.status(200).send(data)
    } catch (e) {
        res.status(404).send({ message: "Falha ao processar requisição" })
    }
}

exports.post = async (req, res, next) => {
    try {
        const token = req.body.token || req.query.token || req.headers['x-access-token']
        const data = await authService.decodeToken(token)

        await Repository.create({ //Passar apenas essas informações 
            customer: data.id, //O id do usuário virá através da decodificação do Token
            number: guid.raw().substring(0, 6),
            items: req.body.items
        })
        res.status(201)
            .send({ message: "Pedido cadastrado com Sucesso" })
    } catch (e) {
        res.status(500).send({ message: "Falha ao Processar requisição" })
    }
}


