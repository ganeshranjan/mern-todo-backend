const baseRoutes = require("./routers/index");
const express = require("express");
const app = express();
const cors = require("cors");
const errorHandler = require("./middleware/errorMiddleware");

// Middleware
app.use(express.json());
// app.use(cors({
//   origin: [
//     "http://localhost:5173",  // local dev
//     "https://your-frontend.vercel.app" // production frontend
//   ],
//   credentials: true
// }));
// app.use(cors());

const allowedOrigins = [
  "http://localhost:5173",
  "https://your-frontend.vercel.app"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true); // allow server-to-server / Postman

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));

app.get("/", (req, res) => {
  res.status(200).json({
    message: "API is running on url",
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
