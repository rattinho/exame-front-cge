const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;