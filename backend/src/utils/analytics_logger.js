const ProductAnalytics = require('../models/ProductAnalytics');
const UserAnalytics = require('../models/UserAnalytics');

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

/**
 * @desc Track user registration
 * @param {string} userId 
 */
const trackUserRegistration = async (userId) => {
    try {
        await UserAnalytics.create({ user: userId });
    } catch (error) {
        console.error(`[ANALYTICS] Error tracking registration for user ${userId}:`, error.message);
    }
};

/**
 * @desc Track user login frequency and timing
 * @param {string} userId 
 */
const trackUserLogin = async (userId) => {
    try {
        await UserAnalytics.findOneAndUpdate(
            { user: userId },
            {
                $inc: { loginCount: 1 },
                $set: { lastLogin: new Date() }
            },
            { upsert: true, new: true }
        );
    } catch (error) {
        console.error(`[ANALYTICS] Error tracking login for user ${userId}:`, error.message);
    }
};

/**
 * @desc Track user order history and spending
 * @param {string} userId 
 * @param {number} totalAmount 
 */
const trackUserOrder = async (userId, totalAmount) => {
    try {
        await UserAnalytics.findOneAndUpdate(
            { user: userId },
            {
                $inc: { orderCount: 1, totalSpent: totalAmount }
            },
            { upsert: true, new: true }
        );
    } catch (error) {
        console.error(`[ANALYTICS] Error tracking order for user ${userId}:`, error.message);
    }
};

module.exports = {
    trackAddToCart,
    trackOrder,
    trackUserRegistration,
    trackUserLogin,
    trackUserOrder,
};
