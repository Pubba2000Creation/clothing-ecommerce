const APIFeatures = require('../utils/apiFeatures');
const Product = require('../models/Product');
const ProductAnalytics = require('../models/ProductAnalytics');

/**
 * @desc    Get all products with search, filters & pagination
 * @route   GET /api/products
 */
const getProducts = async (req, res) => {
    try {
        const params = { ...req.query, ...req.body };
        const resPerPage = Number(params.limit) || 10;
        const productsCount = await Product.countDocuments({ isActive: true });

        const apiFeatures = new APIFeatures(Product.find({ isActive: true }), params)
            .search()
            .filter();

        // Get filtered products count before pagination efficiently
        const filteredProductsCountQuery = apiFeatures.query.clone();
        const filteredProductsCount = await filteredProductsCountQuery.countDocuments();

        // Apply pagination and sort
        apiFeatures.pagination(resPerPage);
        const products = await apiFeatures.query.sort({ createdAt: -1 });

        const currentPage = Number(params.page) || 1;
        const totalPages = Math.ceil(filteredProductsCount / resPerPage);

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
                    page: currentPage,
                    limit: resPerPage,
                    totalPages: totalPages,
                    hasNextPage: currentPage < totalPages,
                    hasPrevPage: currentPage > 1,
                    nextPage: currentPage < totalPages ? currentPage + 1 : null,
                    prevPage: currentPage > 1 ? currentPage - 1 : null,
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

/**
 * @desc    Get new arrival products
 * @route   GET /api/products/new-arrivals
 */
const getNewArrivals = async (req, res) => {
    try {
        const products = await Product.find({ isActive: true })
            .sort({ createdAt: -1 })
            .limit(8);

        return res.status(200).json({
            success: true,
            data: products,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message,
        });
    }
};

/**
 * @desc    Get top rated products (most added to cart)
 * @route   GET /api/products/top-rated
 */
const getTopRated = async (req, res) => {
    try {
        const analytics = await ProductAnalytics.find()
            .sort({ addToCartCount: -1 })
            .limit(20) // Fetch extra to ensure we get enough active products
            .populate('product');

        const products = analytics
            // @ts-ignore
            .filter(item => item.product && item.product.isActive)
            .map(item => item.product)
            .slice(0, 8);

        return res.status(200).json({
            success: true,
            data: products,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message,
        });
    }
};

/**
 * @desc    Get top seller products (most ordered)
 * @route   GET /api/products/top-sellers
 */
const getTopSellers = async (req, res) => {
    try {
        const analytics = await ProductAnalytics.find()
            .sort({ orderCount: -1 })
            .limit(20) // Fetch extra to ensure we get enough active products
            .populate('product');

        const products = analytics
            // @ts-ignore
            .filter(item => item.product && item.product.isActive)
            .map(item => item.product)
            .slice(0, 8);

        return res.status(200).json({
            success: true,
            data: products,
        });
    } catch (error) {
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
    getNewArrivals,
    getTopRated,
    getTopSellers,
};
