const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const Schema = mongoose.Schema

const saleSchema = new Schema({
    productName: { type: String, required: true, unique: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
    customer: {
        name: { type: String, required: true },
        address: { type: String, required: true },
        mobileNo: { type: String, required: true }
    },
    date: { type: Date, default: Date.now },
})

saleSchema.plugin(uniqueValidator)

module.exports = mongoose.model('Sale', saleSchema)