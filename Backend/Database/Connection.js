const mongoose = require("mongoose");

async function Connection() {
  try {
    await mongoose.connect(process.env.MONGODB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database Connected");
  } catch (error) {
    console.error("Database Connection Error:", error);
  }
}

module.exports = Connection;
