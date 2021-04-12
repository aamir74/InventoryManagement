const express = require ('express')

const saleControllers = require ('../controllers/sale-controllers')

const router = express.Router()

router.delete('/:sid',saleControllers.deleteSale)
router.get('/',saleControllers.saleDetails)
router.post('/',saleControllers.createSale)
router.get('/:sid',saleControllers.getSaleById)
router.patch('/:sid',saleControllers.updateSale)

module.exports = router