const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const companyRoutes = require("./routes/companyRoutes");
require("dotenv").config(); // Load environment variables from .env file

const app = express();
const PORT = 80;

// Middleware
app.use(bodyParser.json());

// MongoDB connection using the DATABASE_URL environment variable
const connectDB = process.env.DATABASE_URL;

mongoose
  .connect(connectDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to Database");
  })
  .catch((error) => {
    console.error("MongoDB connection failed:", error);
  });

// Routes
app.use("/train", companyRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is up and running`);
});
