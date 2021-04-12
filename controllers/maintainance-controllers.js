const Maintainance = require('../models/maintainance')
const { validationResult } = require("express-validator")

const maintainanceDetails = async (req, res, next) => {
    let maintainances;
    try {
        maintainances = await Maintainance.find()
    } catch (err) {
        const error = res.status(500).json('Fetching sale records failed, Plzz try again later')
        return next(error)
    }
    if (maintainances.length === 0) {
        const error = res.status(404).json({ error: "No maintainance Records found" })
        return next(error)
    }
    res.json({ maintainances: maintainances.map(maintainance => maintainance.toObject({ getters: true })) })
}

const getMaintainanceById = async (req, res, next) => {
    const maintainanceId = req.params.mid

    let maintainance
    try {
        maintainance = await Maintainance.findById(maintainanceId)
    } catch (err) {
        const error = res.status(500).json({ error: "Something went WRONG, Could not retrieve data" })
        return next(error)
    }

    if (!maintainance) {
        const error = res.status(404).json({ error: "Could not find place for the provided ID" })
        return next(error);
    }

    res.status(200).json({ maintainance })
}

const createMaintainance = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = res.status(422).json({ error: 'Invalid Inputs, Please Check you Data' })
        throw new error
    }
    const { name, description, cost, date } = req.body;
    const createdMaintainance = new Maintainance({
        name,
        description,
        cost,
        date
    })
    try {
        await createdMaintainance.save()
    } catch (err) {
        const error = res.status(500).json({ error: 'Creating Sale failed, Please try again' })
        return next(error)
    }

    res.status(201).json({ Maintainance: createdMaintainance });
}

const updateMaintainance = async (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        const error = res.status(422).json({ error: 'Invalid Inputs, Please Check you Data' })
        throw new error
    }
    const { name, description, cost, date } = req.body
    const maintainanceId = req.params.mid;

    let maintainance
    try {
        maintainance = await Maintainance.findById(maintainanceId);
    } catch (err) {
        const error = res.status(500).json({ error: 'Something went wrong, Could not update the Maintainance Records' })
        return next(error);
    }

    if (!maintainance) {
        const error = res.status(404).json({ error: "Could not find Record for the Maintainance provided ID" })
        return next(error);
    }

    maintainance.name = name
    maintainance.description = description
    maintainance.cost = cost
    maintainance.date = date

    try {
        await maintainance.save();
    } catch (err) {
        const error = res.status(500).json({ error: 'Something went wrong, Could not update the Maintainance Records' })
        return next(error)
    }
    res.status(200).json({ maintainance: maintainance.toObject({ getters: true }) });

}

const deleteMaintainance = async (req, res, next) => {
    const maintainanceId = req.params.mid;

    let maintainance;
    try {
        maintainance = await Maintainance.findById(maintainanceId)
    } catch (err) {
        const error = res.status(500).json({ error: "Something went WRONG, Could not Delete the record" })
        return next(error);
    }
    if (!maintainance) {
        const error = res.status(404).json({ error: "Could not find record for the provided ID" })
        return next(error);
    }

    try {
        await maintainance.remove();
    } catch (err) {
        const error = res.status(500).json({ error: "Something went WRONG, Could not Delete the record" })
        return next(error);
    }

    res.status(200).json({ message: "Record deleted successfully" });
}


exports.maintainanceDetails = maintainanceDetails
exports.createMaintainance = createMaintainance
exports.deleteMaintainance = deleteMaintainance
exports.getMaintainanceById = getMaintainanceById
exports.updateMaintainance = updateMaintainance