
const mongoose = require('mongoose');

let connectionPromise;

module.exports = async function connectDB() {
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }

  if (!connectionPromise) {
    connectionPromise = mongoose
      .connect(process.env.MONGO_URI)
      .then(console.log("Mongo DB Connected"))
      .catch((error) => {
        console.log("Failed to connect mongo DB")
        connectionPromise = null;
        throw error;
      });
  }

  return connectionPromise;
};
