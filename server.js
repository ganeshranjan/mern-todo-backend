// Load environment variables
require("dotenv").config();

// Connect to MongoDB
const connectDB = require("./config/db");

// Import the Express app
const app = require("./app");

const PORT = process.env.PORT || 5001;

connectDB().then(() => {
  //   require("./models/User");
  //   require("./models/Todo");
  console.log("✅ Models loaded successfully");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
