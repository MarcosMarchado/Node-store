const mongoose = require('mongoose')
const ValidationContract = require('../validators/fluent-validator')
const Repository = require('../repositories/customer-repositoy')
const md5 = require('md5')
const emailService = require('../services/email-service')
const authService = require('../services/auth-service')

mongoose.set('useFindAndModify', false)
//Criar Usuário
exports.post = async (req, res, next) => {
    let contract = new ValidationContract();
    contract.hasMinLen(req.body.name, 3, "O nome deve conter pelo menos 3 caracteres")
    contract.isEmail(req.body.email, "O título deve conter pelo menos 3 caracteres")
    contract.hasMinLen(req.body.password, 6, "A senha deve conter pelo menos 6 caracteres")

    if (!contract.isValid()) {
        res.status(400).send(contract.errors()).end()
        return;
    }

    emailService.send(
        req.body.email,
        'Bem vindo ao Node Store',
        global.EMAIL_TMPL.replace('{0}', req.body.name))

    try {
        await Repository.create({
            name: req.body.name,
            email: req.body.email,
            password: md5(req.body.password + global.SALT_KEY),
            roles: ['user']
            // A senha criptografada é o body.password + SALT_KEY 
        })
        res.status(201).send({ message: "Cliente cadastrado com Sucesso" })
    } catch (e) {
        res.status(500).send({ message: 'Falha ao processar sua requisição' })
    }
}
//Autenticar Usuário
exports.authenticate = async (req, res, next) => {
    try {
        //Vai buscar no Banco o usuário e senha
        const customer = await Repository.authenticate({
            email: req.body.email,
            password: md5(req.body.password + global.SALT_KEY)
        })
        console.log(customer)

        if (!customer) {
            res.status(404).send({
                message: "Usuário ou senha inválidos"
            })
            return
        }
        const token = await authService.generateToken({
            id: customer.id,
            email: customer.email,
            name: customer.name,
            roles: customer.roles
        })

        res.status(201).send({
            token: token,
            data: {
                email: customer.email,
                name: customer.name,
                role: customer.roles
            }
        })

    } catch (e) {
        res.status(500).send({ message: 'Falha ao processar sua requisição' })
    }
}

exports.refreshToken = async (req, res, next) => {
    try {
        const token = req.body.token || req.query.token || req.headers['x-access-token']
        const data = await authService.decodeToken(token)

        const customer = await Repository.getById(data.id)
        console.log(customer)

        if (!customer) {
            res.status(404).send({
                message: "Cliente não encontrado"
            })
            return
        }
        const tokenData = await authService.generateToken({
            id: customer.id,
            email: customer.email,
            name: customer.name,
            roles: customer.roles
        })

        res.status(201).send({
            token: tokenData,
            data: {
                email: customer.email,
                name: customer.name,
                role: customer.roles
            }
        })

    } catch (e) {
        res.status(500).send({ message: 'Falha ao processar sua requisição' })
    }
}