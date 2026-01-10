const mongoose = require('mongoose');
categoryEnum = require('../enum/products.category.enum');
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
            enum: categoryEnum,
            required: true,
        },
        sizes: {
            type: [String], 
            default: [],
        },
        isActive: {
            type: Boolean,
            default: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Product', productSchema);
