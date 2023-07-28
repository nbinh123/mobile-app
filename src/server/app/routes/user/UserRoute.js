const express = require("express")
const router = express.Router()

const LoginController = require("../../controllers/UserControllers")

router.post('/login', LoginController.login)
router.post('/register', LoginController.register)
router.get('/get', LoginController.get_infomation)
router.put('/info/update', LoginController.update_infomations)

router.put('/cart/pay', LoginController.request_bill)

router.put('/cart/update/quanlity', LoginController.update_quanlity_order)
router.put('/cart/update/create', LoginController.create_order)
router.get('/cart/get', LoginController.get_card)
router.delete('/cart/update/delete', LoginController.delete_order)

router.post('/cart/bill/pay', LoginController.pay)

router.get('/coin/get', LoginController.get_coin)
router.put('/coin/update', LoginController.update_coin)
router.post('/coin/buy', LoginController.reward_exchange_by_coin)

router.put('/config/update', LoginController.config)

router.post('/friend/request', LoginController.request_friend)
router.post('/friend/request/cancel', LoginController.cancel_request_friend)

router.use('/', LoginController.index)


module.exports = router