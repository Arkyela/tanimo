require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User'); // Update path accordingly

async function createAdmin() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    const existingAdmin = await User.findOne({ email: 'chibi@gmail.com' });
    if (existingAdmin) {
      console.log('Admin user already exists.');
      return process.exit(0);
    }

    const hashedPassword = await bcrypt.hash('admin123', 10);

    const admin = new User({
      name: 'Admin',
      email: 'chibi@gmail.com',
      password: hashedPassword,
      userType: 'admin'
    });

    await admin.save();
    console.log('Admin user created successfully.');
    process.exit(0);
  } catch (err) {
    console.error('Error creating admin user:', err);
    process.exit(1);
  }
}

createAdmin();
