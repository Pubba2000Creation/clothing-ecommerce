const mongoose = require('mongoose');

const productAnalyticsSchema = new mongoose.Schema(
    {
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true,
            unique: true,
        },
        addToCartCount: {
            type: Number,
            default: 0,
        },
        orderCount: {
            type: Number,
            default: 0,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('ProductAnalytics', productAnalyticsSchema);
