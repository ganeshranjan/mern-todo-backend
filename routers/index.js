const express = require("express");
const router = express.Router();

const authRouters = require("./authRouters");
const todoRoutes = require("./todoRoutes");


router.use("/auth", authRouters);
router.use("/todos", todoRoutes);


router.get("/health", (req, res) => {
  res.status(200).json({ status: "API is Healthy" });
});

module.exports = router;
