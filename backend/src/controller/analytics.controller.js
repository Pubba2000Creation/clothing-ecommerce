const User = require('../models/User');
const Product = require('../models/Product');
const Order = require('../models/Order');
const UserAnalytics = require('../models/UserAnalytics');
const ProductAnalytics = require('../models/ProductAnalytics');

/**
 * @desc    Get all users' analytics data
 * @route   GET /api/analytics/users
 */
const getUserAnalytics = async (req, res) => {
    try {
        const usersData = await UserAnalytics.find()
            .populate('user', 'name email')
            .sort({ totalSpent: -1 });

        return res.status(200).json({
            success: true,
            data: usersData,
        });
    } catch (error) {
        console.error('[GET USER ANALYTICS ERROR]', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message,
        });
    }
};

/**
 * @desc    Get overall system stats
 * @route   GET /api/analytics/overall
 */
const getOverallStats = async (req, res) => {
    try {
        const totalUsers = await User.countDocuments();
        const totalProducts = await Product.countDocuments();
        const totalOrders = await Order.countDocuments();

        // Calculate total revenue from all user analytics
        const revenueData = await UserAnalytics.aggregate([
            {
                $group: {
                    _id: null,
                    totalRevenue: { $sum: "$totalSpent" }
                }
            }
        ]);

        const totalRevenue = revenueData.length > 0 ? revenueData[0].totalRevenue : 0;

        // Get top products summary (most ordered)
        const topProducts = await ProductAnalytics.find()
            .sort({ orderCount: -1 })
            .limit(5)
            .populate('product', 'name price');

        return res.status(200).json({
            success: true,
            data: {
                summary: {
                    totalUsers,
                    totalProducts,
                    totalOrders,
                    totalRevenue,
                },
                topProducts: topProducts.map(tp => {
                    const p = tp.product;
                    return {
                        productId: p?._id,
                        // @ts-ignore
                        name: p?.name,
                        // @ts-ignore
                        price: p?.price,
                        orders: tp.orderCount,
                        cartAdds: tp.addToCartCount
                    };
                })
            },
        });
    } catch (error) {
        console.error('[GET OVERALL STATS ERROR]', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message,
        });
    }
};

module.exports = {
    getUserAnalytics,
    getOverallStats,
};
