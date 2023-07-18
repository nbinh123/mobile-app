const express = require("express")
const router = express.Router()

const LoginController = require("../../controllers/UserControllers")

router.use('/login', LoginController.login)
router.post('/register', LoginController.register)
router.get('/get', LoginController.get_infomation)
router.patch('/config', LoginController.config)

router.put('/cart/pay', LoginController.request_bill)

router.put('/cart/update/quanlity', LoginController.update_quanlity_order)
router.put('/cart/update/create', LoginController.create_order)
router.get('/cart/get', LoginController.get_card)
router.delete('/cart/update/delete', LoginController.delete_order)

router.post('/cart/bill/pay', LoginController.pay)

router.put('/coin/update', LoginController.update_coin)
router.post('/coin/buy', LoginController.reward_exchange_by_coin)

router.use('/', LoginController.index)


module.exports = router