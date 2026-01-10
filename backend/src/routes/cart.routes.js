const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth.middleware');

const {
    getCart,
    addToCart,
    updateCartItemQuantity,
    removeFromCart,
    mergeGuestCart,
} = require('../controller/cart.controller');

router.use(auth);

router.get('/', getCart);
router.post('/', addToCart);
router.put('/:itemId', updateCartItemQuantity);
router.delete('/:itemId', removeFromCart);
router.post('/merge', mergeGuestCart);

module.exports = router;
