const errorHandler = (err, req, res, next) => {
  console.error("error:", err.stack);

  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  // In development or for 500s, you may want to avoid exposing internal errors to the client
  res.status(statusCode).json({
    message: process.env.NODE_ENV === "production" && statusCode === 500 ? "Internal Server Error" : message,
  });
};
module.exports = errorHandler;
