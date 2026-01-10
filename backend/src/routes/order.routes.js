const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth.middleware');
const { checkout, getMyOrders } = require('../controller/order.controller');


router.use(auth);

router.post('/checkout', checkout);
router.get('/', getMyOrders);

module.exports = router;