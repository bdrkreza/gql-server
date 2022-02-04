const mongoose = require("mongoose");

const connectDB = async () => {
  const URI = `mongodb+srv://${process.env.BD_USER}:${process.env.BD_PASS}@cluster0.a3up8.mongodb.net/${process.env.BD_NAME}?retryWrites=true&w=majority`;
  if (URI !== undefined) {
    const options = {
      useNewUrlParser: true,
      useUnifiedTopology: true
    };
    try {
      const conn = await mongoose.connect(URI, options);
      console.log(`MongoDB Connected:${conn}`);
    } catch (error) {
      console.error(`Error: ${error.message}`);
      process.exit(1);
    }
  }
};

module.exports = connectDB;
