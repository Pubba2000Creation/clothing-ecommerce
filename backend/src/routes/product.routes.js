const express = require('express');
const router = express.Router();
const {
    getProducts,
    getProductById,
    getNewArrivals,
    getTopRated,
    getTopSellers,
} = require('../controller/product.controller');

router.get('/', getProducts);
router.get('/new-arrivals', getNewArrivals);
router.get('/top-rated', getTopRated);
router.get('/top-sellers', getTopSellers);
router.get('/:id', getProductById);

module.exports = router;
