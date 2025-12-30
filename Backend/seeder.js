const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');

// Load env vars
dotenv.config();

// Connect to database
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB Connected');
  } catch (error) {
    console.error('❌ MongoDB Connection Error:', error.message);
    process.exit(1);
  }
};

// Seed data
const seedData = async () => {
  try {
    // Clear existing data
    await User.deleteMany();
    console.log('🗑️  Cleared existing users');

    // Create admin user
    const admin = await User.create({
      fullName: 'Admin User',
      email: 'admin@example.com',
      password: 'Admin123',
      role: 'admin',
      status: 'Active'
    });
    console.log('✅ Admin user created:', admin.email);

    // Create regular users
    const users = await User.create([
      {
        fullName: 'Sarah Johnson',
        email: 'sarah.j@company.com',
        password: 'Password123',
        role: 'admin',
        status: 'Active',
        lastLogin: new Date('2025-12-29T10:30:00')
      },
      {
        fullName: 'Michael Chen',
        email: 'michael.c@company.com',
        password: 'Password123',
        role: 'user',
        status: 'Active',
        lastLogin: new Date('2025-12-29T09:15:00')
      },
      {
        fullName: 'Emma Davis',
        email: 'emma.d@company.com',
        password: 'Password123',
        role: 'user',
        status: 'Active',
        lastLogin: new Date('2025-12-28T16:20:00')
      },
      {
        fullName: 'James Wilson',
        email: 'james.w@company.com',
        password: 'Password123',
        role: 'user',
        status: 'Inactive',
        lastLogin: new Date('2025-12-25T14:45:00')
      },
      {
        fullName: 'Olivia Martinez',
        email: 'olivia.m@company.com',
        password: 'Password123',
        role: 'admin',
        status: 'Active',
        lastLogin: new Date('2025-12-29T08:00:00')
      }
    ]);

    console.log('✅ Sample users created:', users.length);
    console.log('\n📋 Test Credentials:');
    console.log('Admin: admin@example.com / Admin123');
    console.log('User: michael.c@company.com / Password123');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding data:', error.message);
    process.exit(1);
  }
};

// Run seeder
connectDB().then(seedData);
