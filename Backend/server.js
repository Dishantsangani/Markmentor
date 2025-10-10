require("dotenv").config();
const express = require("express");
const Connection = require("./Database/Connection");
const studentRouter = require("./Routes/UserRoutes");
const cors = require("cors");

const App = express();
const PORT = process.env.PORT || 8900;

// Database Connection
Connection();

// Middleware
App.use(cors());
App.use(express.json()); // ✅ Fixed typo (APP → App)

// API Routes
App.use("/auth", studentRouter);

// Default Route
App.get("/", (req, res) => {
  return res.send("Hello From Server");
});

// Start Server
App.listen(PORT, () => console.log(`🚀 Server Started At Port ${PORT}`));
