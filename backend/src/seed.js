const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');
const productsSeed = require('./data/products.seed');

dotenv.config();

const connectDB = async () => {
    await mongoose.connect(process.env.MONGO_URI);
};

const seedProducts = async () => {
    try {
        await connectDB();

        await Product.deleteMany();
        console.log('🧹 Existing products removed');

        const expandedProducts = [];

        productsSeed.forEach((product, index) => {
            for (let i = 1; i <= 4; i++) {
                expandedProducts.push({
                    ...product,
                    name: `${product.name} ${i}`,
                    price: product.price + i * 100,
                });
            }
        });

        await Product.insertMany(expandedProducts.slice(0, 40));

        console.log('🌱 40 Products seeded successfully');
        process.exit();
    } catch (error) {
        console.error('❌ Seeding error:', error);
        process.exit(1);
    }
};

seedProducts();
