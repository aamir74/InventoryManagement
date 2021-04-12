const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const Schema = mongoose.Schema

const userSchema = new Schema({
    name: { type: String, required: true },
    employee_id: { type: String, required: true, unique: true },
    password: { type: String, required: true, minlenth: 6 },
    designation: { type: String, required: true },
})

userSchema.plugin(uniqueValidator)

module.exports = mongoose.model('User', userSchema)