const APIFeatures = require('../utils/apiFeatures');
const Product = require('../models/Product');

/**
 * @desc    Get all products with search, filters & pagination
 * @route   GET /api/products
 */
const getProducts = async (req, res) => {
    try {
        const resPerPage = Number(req.query.limit) || 10;
        const productsCount = await Product.countDocuments({ isActive: true });

        const apiFeatures = new APIFeatures(Product.find({ isActive: true }), req.query)
            .search()
            .filter();

        // Get filtered products count before pagination
        let products = await apiFeatures.query;
        let filteredProductsCount = products.length;

        // Apply pagination
        apiFeatures.pagination(resPerPage);
        products = await apiFeatures.query.clone().sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            message: 'Products fetched successfully',
            data: {
                count: products.length,
                total: productsCount,
                filteredCount: filteredProductsCount,
                items: products,
                pagination: {
                    total: filteredProductsCount,
                    page: Number(req.query.page) || 1,
                    limit: resPerPage,
                    totalPages: Math.ceil(filteredProductsCount / resPerPage),
                },
            },
        });
    } catch (error) {
        console.error('[GET PRODUCTS ERROR]', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message,
        });
    }
};

/**
 * @desc    Get single product by ID
 * @route   GET /api/products/:id
 */
const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product || !product.isActive) {
            return res.status(404).json({
                success: false,
                message: 'Product not found',
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Product fetched successfully',
            data: product,
        });
    } catch (error) {
        console.error('[GET PRODUCT ERROR]', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message,
        });
    }
};

module.exports = {
    getProducts,
    getProductById,
};
