const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');
const productsSeed = require('./data/products.seed');

const path = require('path');

dotenv.config({ path: path.join(__dirname, '../.env') });

const connectDB = async () => {
    await mongoose.connect(process.env.MONGO_URI);
};

const seedProducts = async () => {
    try {
        await connectDB();

        await Product.deleteMany();
        console.log('🧹 Existing products removed');

        const insertedProducts = await Product.insertMany(productsSeed);

        console.log(`🌱 ${insertedProducts.length} Products seeded successfully`);
        process.exit();
    } catch (error) {
        console.error('❌ Seeding error:', error);
        process.exit(1);
    }
};

seedProducts();
