const express = require("express")
const router = express.Router()

const ShopController = require("../../controllers/ShopControllers")

router.get('/products/get', ShopController.get)
router.get('/products/search', ShopController.search)
router.get('/products/arrange', ShopController.arrange)
router.get('/products/:id/read', ShopController.read)
router.get('/', ShopController.test)

module.exports = router