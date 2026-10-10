const mongoose = require('mongoose');

// Connects to MongoDB. If it fails there's no point running the API, so we exit.
module.exports = async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected');
  } catch (err) {
    console.error('Mongo connection failed:', err.message);
    process.exit(1);
  }
};
