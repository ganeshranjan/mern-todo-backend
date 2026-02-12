const baseRoutes = require("./routers/index");
const express = require("express");
const app = express();
const cors = require("cors");
const errorHandler = require("./middleware/errorMiddleware");

// Middleware
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.status(200).json({
    message: "API is running",
  });
});
app.use("/api", baseRoutes);

app.use((req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
});

app.use(errorHandler);

module.exports = app;
