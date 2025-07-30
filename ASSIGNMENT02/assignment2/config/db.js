const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://avneet:yourpassword123@cluster0.iupgf0d.mongodb.net/healthDB?retryWrites=true&w=majority&appName=Cluster0');
    console.log('✅ MongoDB Connected');
  } catch (err) {
    console.error('❌ MongoDB Error:', err.message);
  }
};

module.exports = connectDB;
