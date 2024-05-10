// app.js

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const contactRoutes = require("./routes/contactRoutes");
const { validateRequest } = require("./utils/validator");

const app = express();

// Middleware
app.use(bodyParser.json());

// Routes
app.use("/api", contactRoutes);

// Error handler for validation errors
app.use(validateRequest);

// Error handler for other errors
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

// Database connection
const MONGODB_URI = "mongodb://localhost:27017/contacts";
mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected", MONGODB_URI))
  .catch((err) => console.error("MongoDB connection error:", err));

// Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
