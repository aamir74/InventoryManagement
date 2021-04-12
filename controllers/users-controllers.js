const { validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
const User = require('../models/user')

const signup = async (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        const error = res.status(422).send({ error: 'Signing up failed, Plz try again later..' })
        return next(error)
    }

    const { name, employee_id, password, designation, } = req.body

    let existingUser
    try {
        existingUser = await User.findOne({ employee_id: employee_id })
    } catch (err) {
        const error = res.status(500).send({ error: 'Signing up failed, Plz try again later..' })
        return next(error)
    }

    if (existingUser) {
        const error = res.status(422).send({ error: 'User already exists, Login instead' })
        return next(error)
    }

    let hashedPassword;
    try {
        hashedPassword = await bcrypt.hash(password, 14)
    } catch (err) {
        const error = res.status(500).send({ error: 'Could not create User,Please Try again later' })
        return next(error)
    }

    const createdUser = new User({
        name,
        employee_id,
        password: hashedPassword,
        designation,
    })

    try {
        await createdUser.save()
    } catch (err) {
        const error = res.status(500).send({ error: 'Signing up failed, Please try again' })
        return next(error)
    }
    res.status(201).json({ createdUser })

}

const login = async (req, res, next) => {

    const { employee_id, password } = req.body

    let existingUser;

    try {
        existingUser = await User.findOne({ employee_id: employee_id })
    } catch (err) {
        const error = res.status(500).json({ error: 'Logging In failed, Plz try again later..' })
        return next(error)
    }

    if (!existingUser) {
        const error = res.status(403).send({ error: 'Invalid Credentials, Could not Log you in' })
        return next(error)
    }

    let isValidPassword = false;
    try {
        isValidPassword = await bcrypt.compare(password, existingUser.password)
    } catch (err) {
        const error = res.status(500).send({ error: 'Could not Log you in , Check Credentials and try again later' })
        return next(error)
    }

    if (!isValidPassword) {
        const error = res.status(401).send({ error: 'Invalid Credentials, Could not Log you in' })
        return next(error)
    }

    res.json({ existingUser })
}

exports.signup = signup
exports.login = login
