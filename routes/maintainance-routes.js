const express = require('express')

const maintainanceControllers = require('../controllers/maintainance-controllers')

const router = express.Router()

router.delete('/:mid', maintainanceControllers.deleteMaintainance)
router.get('/', maintainanceControllers.maintainanceDetails)
router.get('/:mid', maintainanceControllers.getMaintainanceById)
router.post('/', maintainanceControllers.createMaintainance)
router.patch('/:mid', maintainanceControllers.updateMaintainance)

module.exports = router