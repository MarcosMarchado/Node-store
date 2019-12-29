const mongoose = require('mongoose')
const Schema = mongoose.Schema
const AWS = require('aws-sdk')
const path = require('path')
const fs = require('fs')
const config = require('../config')
const { promisify } = require('util')

const s3 = new AWS.S3({
    bucket: config.AWS_BUCKET,
    region: config.AWS_DEFAULT_REGION,
    secretAccessKey: config.AWS_SECRET_ACCESS_KEY,
    accessKeyId: config.AWS_ACCESS_KEY_ID
});



const schema = new Schema({ //O schema cria automaticamente o ID
    title: {
        type: String,
        required: true,
        trim: true
    },
    slug: { //Cadeira gamer = cadeira-gamer na url
        type: String,
        required: [true, 'O slug é obrigatório'], //validação 
        trim: true,
        index: true,
        unique: true //unico
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    active: {
        type: Boolean,
        required: true,
        default: true
    },
    tags: [{
        type: String,
        required: true
    }],
    image: {
        type: String,
        required: true,
        trim: true,
    },
    key: String
})

schema.pre('remove', function () {
    if (config.STORAGE_TYPE === 's3') {
        return s3.deleteObject({
            Bucket: config.AWS_BUCKET,
            Key: this.key
        }).promise()
    } else {
        //unlink = func de deleção
        return promisify(fs.unlink)(path.resolve(__dirname, '..', '..', 'tmp', 'uploads', this.key))
    }
})
module.exports = mongoose.model('Product', schema)