require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const app = express();
const mongoose = require('mongoose')


mongoose.connect(
    "mongodb+srv://marcos:marcos@crud-6ywp8.mongodb.net/test?retryWrites=true&w=majority",
    { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true })
//Carregando os models
const Product = require('./models/product')
const Customer = require('./models/customer')
const Order = require('./models/order')


//Carregar rotas
const indexRoute = require('./routes/index-route')
const productRoute = require('./routes/product-route')
const customerRoute = require('./routes/customer-route')
const orderRoute = require('./routes/order-route')



app.use(bodyParser.json({ limit: '5mb' }))
app.use(bodyParser.urlencoded({ extended: false }))

// Habilita o CORS
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-access-token');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});


app.use('/', indexRoute)
app.use('/products', productRoute)
app.use('/customers', customerRoute)
app.use('/orders', orderRoute)

module.exports = app