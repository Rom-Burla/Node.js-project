//                                                                                           בס"ד

// requires
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const app = express();

// route requires
const userRoutes = require("./routes/userRoutes");
const buisnessRoutes = require("./routes/buisnessRoutes");
const { requireAuth } = require("./middleware/authMiddleware");

// middleware
app.use(express.json());
app.use(cookieParser());

// database connection
const dbURI = "mongodb://127.0.0.1:27017/node-hackeru-project";
mongoose.set("strictQuery", false);
mongoose
  .connect(dbURI)
  .then(() => {
    app.listen(3000, () => {
      console.log("listening to port 3000 and connected to DB");
    });
  })
  .catch((err) => {
    console.log(err);
  });

// Routes
app.use("/user", userRoutes);
app.use("/buisness-card", requireAuth, buisnessRoutes);
