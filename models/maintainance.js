const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const Schema = mongoose.Schema

const maintainanceSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true, unique: true },
    cost: { type: Number, required: true },
    date: { type: Date, default: Date.now }
})

maintainanceSchema.plugin(uniqueValidator)

module.exports = mongoose.model('Maintainance', maintainanceSchema)