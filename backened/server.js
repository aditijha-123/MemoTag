const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");

const authRoutes = require("./routes/authRoutes");
const postRoutes = require("./routes/postRoutes");

dotenv.config();
const app = express();

// Middleware
app.use(cors({ origin: '*', credentials: true }));


app.use(bodyParser.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("DB Connection Error:", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
