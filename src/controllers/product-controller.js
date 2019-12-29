const mongoose = require('mongoose')
const ValidationContract = require('../validators/fluent-validator')
const Repository = require('../repositories/product-repository')


mongoose.set('useFindAndModify', false)

exports.get = async (req, res, next) => {
    try {
        const data = await Repository.get()
        res.status(200).send(data)
    } catch (e) {
        res.status(500).send({ message: 'Falha ao processar sua requisição' })
    }
}

exports.getById = async (req, res, next) => {
    try {
        const data = await Repository.getById(req.params.id)
        res.status(200).send(data)
    } catch (e) {
        res.status(400).send({ message: 'Falha ao processar sua requisição' })
    }
}

exports.getBySlug = async (req, res, next) => {
    try {
        const data = await Repository.getBySlug(req.params.slug)
        res.status(200).send(data)

    } catch (e) {
        res.status(400).send({ message: 'Falha ao processar sua requisição' })
    }
}

exports.getByTag = async (req, res, next) => {
    try {
        const data = await Repository.getByTag(req.params.tag)
        res.status(200).send(data)
    } catch (e) {
        res.status(400).send({ message: 'Falha ao processar sua requisição' })
    }
}
exports.post = async (req, res, next) => {
    let contract = new ValidationContract();
    contract.hasMinLen(req.body.title, 3, "O título deve conter pelo menos 3 caracteres")
    contract.hasMinLen(req.body.slug, 3, "O título deve conter pelo menos 3 caracteres")
    contract.hasMinLen(req.body.description, 3, "O título deve conter pelo menos 3 caracteres")

    if (!contract.isValid()) {
        res.status(400).send(contract.errors()).end()
        return;
    }
    console.log(req.file)
    try {
        await Repository.create({
            title: req.body.title,
            slug: req.body.slug,
            description: req.body.description,
            price: req.body.price,
            tags: req.body.tags,
            image: req.file.location || req.file.path,
            key: req.file.key
        })
        res.status(201).send({ message: "Produto cadastrado com Sucesso" })
    } catch (e) {
        res.status(500).send({ message: 'Falha ao processar sua requisição' })
        console.log(e)
    }
    //enviar o corpo da requisição
}

exports.put = async (req, res, next) => {
    try {
        await Repository.put(req.params.id, req.body)
        res.status(201).send({ message: "Produto Atualizado com sucesso!" })
    } catch (e) {
        res.status(500).send({ message: 'Falha ao processar sua requisição' })
    }
}

exports.delete = async (req, res, next) => {
    try {
        await Repository.delete(req.params.id)
        res.status(200).send({ message: "Produto removido com Sucesso!" })
    } catch (e) {
        res.status(500).send({ message: 'Falha ao processar sua requisição' })
    }

}

