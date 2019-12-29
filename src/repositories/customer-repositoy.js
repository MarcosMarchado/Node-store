const mongoose = require('mongoose')
const Customer = mongoose.model('Customer')
// const authorize = require('../services/auth-service')

exports.create = async (data) => {
    const customer = new Customer(data) //persistindo dados no banco
    await customer.save()
}

exports.authenticate = async (data) => {
    const res = await Customer.findOne({
        email: data.email,
        password: data.password
    })
    return res;
}
exports.getById = async (id) => {
    const res = await Customer.findById(id)
    return res;
}