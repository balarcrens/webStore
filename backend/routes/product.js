const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Product = require('../models/Product');
const fetchuser = require('../middleware/fetchUser');
const requireAdmin = require('../middleware/requireAdmin');

// All users can fetch products
router.get('/fetchallproducts', fetchuser, async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        res.status(500).send("Server Error");
    }
});

// Only Admins can add products
router.post('/addproduct', fetchuser, requireAdmin, [
    body('name', 'Name is required').notEmpty(),
    body('price', 'Price must be a number').isFloat({ min: 0 }),
    body('description', 'Description is required').notEmpty(),
    body('image', 'Image URL is required').notEmpty(),
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

        const product = new Product({ ...req.body });
        const savedProduct = await product.save();
        res.json(savedProduct);
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
});

router.get('/:id', fetchuser, async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ error: "Product not found" });
        res.json({ product });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

// Only Admins can update products
router.put('/updateproduct/:id', fetchuser, requireAdmin, async (req, res) => {
    try {
        const updated = await Product.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
        if (!updated) return res.status(404).send("Product not found");
        res.json(updated);
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
});

// Only Admins can delete products
router.delete('/deleteproduct/:id', fetchuser, requireAdmin, async (req, res) => {
    try {
        const deleted = await Product.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).send("Product not found");
        res.json({ success: "Product deleted", deleted });
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;
