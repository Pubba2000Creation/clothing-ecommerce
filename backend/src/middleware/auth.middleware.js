const jwt = require('jsonwebtoken');
const User = require('../models/User');

/**
 * @desc JWT authentication middleware
 * Protects private routes
 */
const authMiddleware = async (req, res, next) => {
    try {
        let token;

        // Expect: Authorization: Bearer <token>
        if (
            req.headers.authorization &&
            req.headers.authorization.startsWith('Bearer ')
        ) {
            token = req.headers.authorization.split(' ')[1];
        }

        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'No token provided, authorization denied',
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById(decoded.id).select('-password');

        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'User not found',
            });
        }

        req.user = user;
        next();
    } catch (error) {
        console.error('[AUTH MIDDLEWARE ERROR]', error);
        return res.status(401).json({
            success: false,
            message: 'Invalid or expired token',
        });
    }
};

module.exports = authMiddleware;
