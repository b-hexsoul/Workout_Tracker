const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const colors = require("colors");
const connectDB = require("./config/db");

const htmlRoutes = require("./routes/htmlRoutes");
const workoutRoutes = require("./routes/workoutRoutes");

// Load env vars
dotenv.config({ path: "./config/config.env" });
const PORT = process.env.PORT || 5000;

const app = express();

// Connect to DB
connectDB();

// Body Parser & static
app.use(express.json());
app.use(express.static(__dirname + "/public"));

// Dev logging middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Routers
app.use("/", htmlRoutes);
app.use("/api/workouts", workoutRoutes);

const server = app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.magenta.bold)
);

// Handle unhandled promise from the mongodb connection in db.js file...
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`.red.bold);
  // Shutoff express server and exit node process
  server.close(() => process.exit(1));
});
