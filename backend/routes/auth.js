const express = require('express');
const router = express.Router();
const User = require('../models/User');
const fetchuser = require('../middleware/fetchUser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');

const JWT_SECRET = 'web_store@446';

// const ADMIN_EMAIL = 'admin@webstore.com'; // Fixed email for admin
// const ADMIN_PASSWORD = 'adminpass123';  // Fixed password for admin

// @route   POST /api/auth/createuser
router.post('/createuser', [
    body('name').notEmpty(),
    body('email').isEmail(),
    body('password').isLength({ min: 5 }),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    try {
        const { name, email, password } = req.body;

        // Check if the user already exists
        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ error: "User already exists" });
        
        const userRole = (email === 'admin@webstore.com' && password === 'admin') ? 'admin' : 'user';

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create a new user
        user = new User({
            name,
            email,
            password: hashedPassword,
            role: userRole // Assign the appropriate role (admin or user)
        });

        // Save the user to the database
        await user.save();

        const data = {
            user: {
                id: user.id,
                role: user.role
            }
        };

        await User.updateOne({ email: "admin@webstore.com", password: "admin" }, { $set: { role: "admin" } });

        // Generate a JWT token
        const token = jwt.sign(data, JWT_SECRET);
        res.json({ token });

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

// @route   POST /api/auth/login
router.post('/login', [
    body('email').isEmail(),
    body('password').exists()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ error: "Invalid Credentials" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ error: "Invalid Credentials" });

        const data = {
            user: {
                id: user.id,
                role: user.role
            }
        };

        const token = jwt.sign(data, JWT_SECRET);
        res.json({ token });

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

router.post('/getuser', fetchuser, async (req, res) => {
    try {
        // console.log('User info from token:', req.user);
        // console.log('User role:', req.user.role);

        const userId = req.user.id;
        const user = await User.findById(userId).select("-password");
        res.send({ user });
    } catch (err) {
        console.error("err" + err);
        res.status(500).send("Internal Server Error 500");
    }
});


module.exports = router;
