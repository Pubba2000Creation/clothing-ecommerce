const mongoose = require('mongoose');
const productCategory = require('../enum/products.category.enum');
const productSize = require('../enum/products.size.enum');

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            trim: true,
        },
        price: {
            type: Number,
            required: true,
        },
        imageUrl: {
            type: String,
        },
        category: {
            type: String,
            enum: Object.values(productCategory),
            required: true,
        },
        sizes: {
            type: [String],
            enum: Object.values(productSize),
            required: true,
        },
        isActive: {
            type: Boolean,
            default: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Product', productSchema);
