const Cart = require('../models/Cart');
const Product = require('../models/Product');

/**
 * @desc Get logged-in user's cart
 * @route GET /api/cart
 */
const getCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.user._id }).populate(
            'items.product'
        );

        return res.status(200).json({
            success: true,
            message: 'Cart fetched successfully',
            data: cart || { items: [] },
        });
    } catch (error) {
        console.error('[GET CART ERROR]', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
};

/**
 * @desc Add item to cart (or increase quantity)
 * @route POST /api/cart
 * @body { productId: "65a123...", size: "M", quantity: 1 }
 */
const addToCart = async (req, res) => {
    try {
        const { productId, size, quantity } = req.body;

        if (!productId || !size || !quantity) {
            return res.status(400).json({
                success: false,
                message: 'Product, size and quantity are required',
            });
        }

        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found',
            });
        }

        let cart = await Cart.findOne({ user: req.user._id });

        if (!cart) {
            cart = await Cart.create({
                user: req.user._id,
                items: [{ product: productId, size, quantity }],
            });
        } else {
            const index = cart.items.findIndex(
                (item) =>
                    item.product.toString() === productId && item.size === size
            );

            if (index > -1) {
                cart.items[index].quantity += quantity;
            } else {
                cart.items.push({ product: productId, size, quantity });
            }

            await cart.save();
        }

        return res.status(200).json({
            success: true,
            message: 'Item added to cart',
            data: cart,
        });
    } catch (error) {
        console.error('[ADD TO CART ERROR]', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
};

/**
 * @desc Update quantity of a cart item
 * @route PUT /api/cart/:itemId
 * @body { quantity: 2 }
 */
const updateCartItemQuantity = async (req, res) => {
    try {
        const { quantity } = req.body;

        if (!quantity || quantity < 1) {
            return res.status(400).json({
                success: false,
                message: 'Quantity must be at least 1',
            });
        }

        const cart = await Cart.findOne({ user: req.user._id });
        if (!cart) {
            return res.status(404).json({
                success: false,
                message: 'Cart not found',
            });
        }

        const item = cart.items.id(req.params.itemId);
        if (!item) {
            return res.status(404).json({
                success: false,
                message: 'Cart item not found',
            });
        }

        item.quantity = quantity;
        await cart.save();

        return res.status(200).json({
            success: true,
            message: 'Cart item quantity updated',
            data: cart,
        });
    } catch (error) {
        console.error('[UPDATE CART ERROR]', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
};

/**
 * @desc Remove item from cart
 * @route DELETE /api/cart/:itemId
 */
const removeFromCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.user._id });

        if (!cart) {
            return res.status(404).json({
                success: false,
                message: 'Cart not found',
            });
        }

        cart.items = cart.items.filter(
            (item) => item._id.toString() !== req.params.itemId
        );

        await cart.save();

        return res.status(200).json({
            success: true,
            message: 'Item removed from cart',
            data: cart,
        });
    } catch (error) {
        console.error('[REMOVE CART ERROR]', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
};

/**
 * @desc Merge guest cart into user cart
 * @route POST /api/cart/merge
 * @body { items: [{ product: "65a123...", size: "M", quantity: 1, ... }] }
 */
const mergeGuestCart = async (req, res) => {
    try {
        const { items } = req.body;

        if (!Array.isArray(items)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid cart data',
            });
        }

        let cart = await Cart.findOne({ user: req.user._id });

        if (!cart) {
            cart = await Cart.create({
                user: req.user._id,
                items: [],
            });
        }

        for (const guestItem of items) {
            const index = cart.items.findIndex(
                (item) =>
                    item.product.toString() === guestItem.product &&
                    item.size === guestItem.size
            );

            if (index > -1) {
                cart.items[index].quantity += guestItem.quantity;
            } else {
                cart.items.push(guestItem);
            }
        }

        await cart.save();

        return res.status(200).json({
            success: true,
            message: 'Guest cart merged successfully',
            data: cart,
        });
    } catch (error) {
        console.error('[MERGE CART ERROR]', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
};

module.exports = {
    getCart,
    addToCart,
    updateCartItemQuantity,
    removeFromCart,
    mergeGuestCart,
};
