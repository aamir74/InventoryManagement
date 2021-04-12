const Sale = require('../models/sale')
const { validationResult } = require("express-validator")

const saleDetails = async (req, res, next) => {
    let sales;
    try {
        sales = await Sale.find()
    } catch (err) {
        const error = res.status(500).json('Fetching sale records failed, Plzz try again later')
        return next(error)
    }
    if (sales.length === 0) {
        const error = res.status(404).json({ error: "No Sale Records found" })
        return next(error)
    }
    console.log({ sales })

    res.json({ sales: sales.map(sale => sale.toObject({ getters: true })) })
}

const getSaleById = async (req, res, next) => {
    const saleId = req.params.sid

    let sale
    try {
        sale = await Sale.findById(saleId)
    } catch (err) {
        const error = res.status(500).json({ error: "Something went WRONG, Could not retrieve data" })
        return next(error)
    }

    if (!sale) {
        const error = res.status(404).json({ error: "Could not find place for the provided ID" })
        return next(error);
    }

    res.status(200).json({ sale })
}

const createSale = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = res.status(422).json({ error: 'Invalid Inputs, Please Check you Data' })
        throw new error
    }
    const { productName, quantity, price, customer: { name, address, mobileNo }, date } = req.body;
    const createdSale = new Sale({
        productName,
        quantity,
        price,
        customer: {
            name,
            address,
            mobileNo
        },
        date
    })
    try {
        await createdSale.save()
    } catch (err) {
        const error = res.status(500).json({ error: 'Creating Sale failed, Please try again' })
        return next(error)
    }

    res.status(201).json({ Sale: createdSale });
}

const updateSale = async (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        const error = res.status(422).json({ error: 'Invalid Inputs, Please Check you Data' })
        throw new error
    }
    const { productName, quantity, price, date } = req.body
    const saleId = req.params.sid;

    let sale
    try {
        sale = await Sale.findById(saleId);
    } catch (err) {
        const error = res.status(500).json({ error: 'Something went wrong, Could not update the Sale Records' })
        return next(error);
    }

    if (!sale) {
        const error = res.status(404).json({ error: "Could not find Record for the provided ID" })
        return next(error);
    }

    sale.productName = productName
    sale.quantity = quantity
    sale.price = price
    sale.date = date

    try {
        await sale.save();
    } catch (err) {
        const error = res.status(500).json({ error: 'Something went wrong, Could not update the Purchase Records' })
        return next(error)
    }
    res.status(200).json({ sale: sale.toObject({ getters: true }) });

}

const deleteSale = async (req, res, next) => {
    const saleId = req.params.sid;

    let sale;
    try {
        sale = await Sale.findById(saleId)
    } catch (err) {
        const error = res.status(500).json({ error: "Something went WRONG, Could not Delete the record" })
        return next(error);
    }
    if (!sale) {
        const error = res.status(404).json({ error: "Could not find record for the provided ID" })
        return next(error);
    }

    try {
        await sale.remove();
    } catch (err) {
        const error = res.status(500).json({ error: "Something went WRONG, Could not Delete the record" })
        return next(error);
    }

    res.status(200).json({ message: "Record deleted successfully" });
}


exports.saleDetails = saleDetails
exports.getSaleById = getSaleById
exports.createSale = createSale
exports.updateSale = updateSale
exports.deleteSale = deleteSale