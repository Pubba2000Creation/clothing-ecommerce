const Cart = require('../models/Cart');
const Order = require('../models/Order');
const Product = require('../models/Product');
const sendEmail = require('../utils/email/sendEmail');
const { trackOrder, trackUserOrder } = require('../utils/analytics_logger');

/**
 * @desc Checkout and create order
 * @route POST /api/orders/checkout
 */
const checkout = async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.user._id }).populate(
            'items.product'
        );

        if (!cart || cart.items.length === 0) {
            return res.status(400).json({
                success: false,
                message: 'Cart is empty',
            });
        }

        let totalPrice = 0;

        const orderItems = cart.items.map((item) => {
            // Ensure product is populated and exists
            if (!item.product || typeof item.product !== 'object') {
                throw new Error('Product not found in cart');
            }

            // @ts-ignore
            const price = item.product.price;
            const itemTotal = price * item.quantity;
            totalPrice += itemTotal;

            return {
                product: item.product._id,
                size: item.size,
                quantity: item.quantity,
                price: price,
            };
        });

        const order = await Order.create({
            user: req.user._id,
            items: orderItems,
            totalPrice,
        });

        // 🧹 Clear cart after checkout
        cart.items.splice(0);
        await cart.save();

        // 📊 Track Analytics
        for (const item of orderItems) {
            await trackOrder(item.product.toString(), item.quantity);
        }

        // 📊 Track User Analytics
        await trackUserOrder(req.user._id.toString(), totalPrice);

        // 📧 Send confirmation email
        const emailHtml = `
      <h2>Order Confirmation</h2>
      <p><strong>Order ID:</strong> ${order._id}</p>
      <p><strong>Order Date:</strong> ${order.orderDate.toDateString()}</p>
      <h3>Items</h3>
      <ul>
        ${orderItems
                .map(
                    (item) =>
                        `<li>${item.quantity} × ${item.size} - Rs. ${item.price}</li>`
                )
                .join('')}
      </ul>
      <h3>Total: Rs. ${totalPrice}</h3>
    `;

        await sendEmail({
            to: req.user.email,
            subject: 'Your Order Confirmation',
            html: emailHtml,
        });

        return res.status(201).json({
            success: true,
            message: 'Order placed successfully',
            data: order,
        });
    } catch (error) {
        console.error('[CHECKOUT ERROR]', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
};

/**
 * @desc Get logged-in user's orders
 * @route GET /api/orders
 */
const getMyOrders = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user._id })
            .populate('items.product')
            .sort({
                createdAt: -1,
            });

        return res.status(200).json({
            success: true,
            message: 'Orders fetched successfully',
            data: orders,
        });
    } catch (error) {
        console.error('[GET ORDERS ERROR]', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
};

//the email sending tester
const testEmail = async (req, res) => {
    try {

        const tosendemail = req.body.email;
        await sendEmail({
            to: tosendemail,
            subject: 'Test Email',
            html: '<h2>Test Email</h2><p>This is a test email</p>',
        });

        return res.status(200).json({
            success: true,
            message: 'Email sent successfully',
        });
    } catch (error) {
        console.error('[TEST EMAIL ERROR]', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
};

module.exports = {
    checkout,
    getMyOrders,
    testEmail,
};
