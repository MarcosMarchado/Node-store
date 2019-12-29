const mongoose = require('mongoose')
const Schema = mongoose.Schema

const schema = new Schema({ //O schema cria automaticamente o ID
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    roles: [{
        type: String,
        require: true,
        enum: ['user', 'admin'],
        default: 'user'
    }]
})

module.exports = mongoose.model('Customer', schema)