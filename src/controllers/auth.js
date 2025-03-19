
const jwt = require('jsonwebtoken');
const User = require('../models/user.js');
const config = require('../config/index.js')

const generateToken = (user) => {
    return jwt.sign(
        { id: user._id, email: user.email },
        config.jwtSecret,
        { expiresIn: '1h' }
    );
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Compare passwords
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Generate JWT token
        const token = generateToken(user);

        // Return the token and user data
        res.json({
            message: 'Login successful',
            token,
            user: {
                id: user._id,
                email: user.email,
                name: user.firstName + ' ' + user.lastName,
            },
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = { loginUser }