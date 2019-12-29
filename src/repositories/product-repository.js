const mongoose = require('mongoose')
const Product = mongoose.model('Product')//Nome do Schema

exports.get = async () => {
    const res = await Product
        .find({
            active: true
        }, 'title price slug') //Vai trazer apenas os produtos ativos e apenas o title, price e slug
    return res
}

exports.getById = async (id) => {
    const res = await Product
        .findById(id);
    return res;
}

exports.getBySlug = async (slug) => {
    const res = await Product
        .findOne({
            active: true,
            slug: slug
        }, 'title slug price tags description')
    return res
}

exports.getByTag = async (tag) => {
    const res = await Product.find({
        tags: tag
    }, 'title slug price tags description')

    return res
}

exports.create = async (data) => {
    var product = new Product(data) //persistindo dados no banco
    await product.save()
}

exports.put = async (id, data) => {
    await Product.findByIdAndUpdate(id, {
        $set: {
            title: data.title,
            price: data.price,
            slug: data.slug,
            description: data.description
        },
    })
}

exports.delete = async (id) => {
    await Product.findOneAndRemove(id)
}