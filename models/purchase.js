const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const Schema = mongoose.Schema

const purchaseSchema = new Schema({
    productName: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    unitCost: { type: Number, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
    supplier: {
        name: { type: String, required: true },
        address: { type: String, required: true },
        mobileNo: { type: String, required: true },
    },    
    date: { type: Date, default: Date.now }
})

purchaseSchema.plugin(uniqueValidator)

module.exports = mongoose.model('Purchase', purchaseSchema)