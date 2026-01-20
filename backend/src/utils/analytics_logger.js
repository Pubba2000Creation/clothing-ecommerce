const ProductAnalytics = require('../models/ProductAnalytics');

/**
 * @desc Track how many times a product is added to cart
 * @param {string} productId 
 */
const trackAddToCart = async (productId) => {
    try {
        await ProductAnalytics.findOneAndUpdate(
            { product: productId },
            { $inc: { addToCartCount: 1 } },
            { upsert: true, new: true }
        );
    } catch (error) {
        console.error(`[ANALYTICS] Error tracking add to cart for product ${productId}:`, error.message);
    }
};

/**
 * @desc Track how many times a product is ordered
 * @param {string} productId 
 * @param {number} quantity 
 */
const trackOrder = async (productId, quantity = 1) => {
    try {
        await ProductAnalytics.findOneAndUpdate(
            { product: productId },
            { $inc: { orderCount: quantity } },
            { upsert: true, new: true }
        );
    } catch (error) {
        console.error(`[ANALYTICS] Error tracking order for product ${productId}:`, error.message);
    }
};

module.exports = {
    trackAddToCart,
    trackOrder,
};
