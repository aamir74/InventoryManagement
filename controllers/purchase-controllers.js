const Purchase = require('../models/purchase')
const { validationResult } = require("express-validator");

const purchaseDetails = async (req, res, next) => {
    let purchases;
    try {
        purchases = await Purchase.find()
    } catch (err) {
        const error = res.status(500).json('Fetching products failed, Plzz try again later')
        return next(error)
    }
    if (purchases.length === 0) {
        const error = res.status(404).json({ error: "Could not find Purchase record" })
        return next(error)
    }
    console.log({ purchases })

    res.json({ purchases: purchases.map(purchase => purchase.toObject({ getters: true })) })
}

const getPurchaseById = async (req, res, next) => {
    const purchaseId = req.params.pid

    let purchase
    try {
        purchase = await Purchase.findById(purchaseId)
    } catch (err) {
        const error = res.status(500).json({ error: "Something went WRONG, Could not retrieve data" })
        return next(error)
    }

    if (!purchase) {
        const error = res.status(404).json({ error: "Could not find place for the provided ID" })
        return next(error);
    }

    res.status(200).json({ purchase })
}

const createPurchase = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = res.status(422).json({ error: 'Invalid Inputs, Please Check you Data' })
        throw new error
    }
    const { productName, description, unitCost, quantity, price, supplier: { name, address, mobileNo }, date } = req.body;
    const createdPurchase = new Purchase({
        productName,
        description,
        unitCost,
        quantity,
        price,
        supplier: {
            name,
            address,
            mobileNo
        },
        date
    })
    console.log({ createdPurchase })

    try {
        await createdPurchase.save()
    } catch (err) {
        const error = res.status(500).json({ error: 'Creating Purchase failed, Please try again' })
        return next(error)
    }

    res.status(201).json({ purchase: createdPurchase });
}

const updatePurchase = async (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        const error = res.status(422).json({ error: 'Invalid Inputs, Please Check you Data' })
        throw new error
    }
    const { productName, description, unitCost, quantity, price, date } = req.body
    const purchaseId = req.params.pid;

    let purchase
    try {
        purchase = await Purchase.findById(purchaseId);
    } catch (err) {
        const error = res.status(500).json({ error: 'Something went wrong, Could not update the Purchase Records' })
        return next(error);
    }

    if (!purchase) {
        const error = res.status(404).json({ error: "Could not find Record for the provided ID" })
        return next(error);
    }

    purchase.productName = productName
    purchase.description = description
    purchase.unitCost = unitCost
    purchase.quantity = quantity
    purchase.price = price
    purchase.date = date

    try {
        await purchase.save();
    } catch (err) {
        const error = res.status(500).json({ error: 'Something went wrong, Could not update the Purchase Records' })
        return next(error)
    }
    res.status(200).json({ purchase: purchase.toObject({ getters: true }) });

}

const deletePurchase = async (req, res, next) => {
    const purchaseId = req.params.pid;

    let purchase;
    try {
        purchase = await Purchase.findById(purchaseId)
    } catch (err) {
        const error = res.status(500).json({ error: "Something went WRONG, Could not Delete Place" })
        return next(error);
    }
    if (!purchase) {
        const error = res.status(404).json({ error: "Could not find record for the provided ID" })
        return next(error);
    }

    try {
        await purchase.remove();
    } catch (err) {
        const error = res.status(500).json({ error: "Something went WRONG, Could not Delete Record" })
        return next(error);
    }

    res.status(200).json({ message: "Deleted Record Successfully..." });
}


exports.purchaseDetails = purchaseDetails
exports.getPurchaseById = getPurchaseById
exports.createPurchase = createPurchase
exports.deletePurchase = deletePurchase
exports.updatePurchase = updatePurchase