// const Order = require('mongoose').model('Order')
const mongoose = require('mongoose');
const Order = mongoose.model('Order');

exports.get = async () => {
    const res = await Order
        .find({}, 'number status costumer items')
        .populate('customer', 'name') //do customer vai trazer apenas o nome do usuário
        .populate('items.product', 'title') //trazer os nomes e não apenas o Id de referência
    return res
}

exports.create = async (data) => {
    const order = new Order(data)
    await order.save()
}
