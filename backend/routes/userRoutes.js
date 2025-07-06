const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const auth = require('../middleware/auth');

const router = express.Router();

// Register
router.post('/register', async (req, res) => {
  const { name, email, password, address, userType, profilePhoto } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'Email already registered' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      address,
      userType,        // Optional — defaults to 'user' if not provided
      profilePhoto,    // Optional — uses default if not provided
    });

    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error during registration' });
  }
});

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid email or password' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid email or password' });

    const token = jwt.sign(
      { id: user._id, role: user.userType },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        userType: user.userType,
        status: user.status,
        profilePhoto: user.profilePhoto,
        address: user.address,
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error during login' });
  }
});

// Edit Profile
router.put('/profile', auth, async (req, res) => {
  const { name, address, profilePhoto } = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      { name, address, profilePhoto },
      { new: true }
    );

    if (!updatedUser) return res.status(404).json({ message: 'User not found' });

    res.json({
      message: 'Profile updated successfully',
      user: {
        id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        userType: updatedUser.userType,
        profilePhoto: updatedUser.profilePhoto,
        address: updatedUser.address,
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error during profile update' });
  }
});

router.get('/profile', auth, async (req, res) => {
    try {
        res.status(200).json({
            success: true,
            user: {
                id: req.user._id,
                name: req.user.name,
                email: req.user.email,
                profilePhoto: req.user.profilePhoto,
                address: req.user.address
            }
        });
    } catch (error) {
        res.status(500).json({ 
            success: false,
            message: 'Error fetching profile'
        });
    }
});

// Get all users (admin only)
router.get('/', auth, async (req, res) => {
  try {
    // Check if user is admin
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    const users = await User.find({}, '-password');
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error fetching users' });
  }
});

// Update user status (admin only)
router.put('/:id/status', auth, async (req, res) => {
  try {
    // Check if user is admin
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    const { status } = req.body;
    if (!['active', 'deactivated'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    ).select('-password');

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({
      message: 'User status updated successfully',
      user: updatedUser
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error updating user status' });
  }
});

module.exports = router;
