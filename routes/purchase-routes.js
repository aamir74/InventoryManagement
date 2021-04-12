const express = require ('express')

const purchaseControllers = require ('../controllers/purchase-controllers')

const router = express.Router()

router.delete('/:pid',purchaseControllers.deletePurchase)
router.get('/',purchaseControllers.purchaseDetails)
router.post('/',purchaseControllers.createPurchase)
router.get('/:pid',purchaseControllers.getPurchaseById)
router.patch('/:pid',purchaseControllers.updatePurchase)

module.exports = router