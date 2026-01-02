// Import express
const express = require("express");

// Create express app
const app = express();

// Define port
const PORT = 3000;

// Middleware to parse JSON
app.use(express.json());


//Adding Routes
const studentRoutes=require('./routes/studentRoutes');
app.use('/students',studentRoutes);

// Default route
app.get("/", (req, res) => {
  res.send("Welcome to Student Management App 🚀");
});

// Sample route - get students
app.get("/students", (req, res) => {
  res.json({
    message: "List of students",
    students: []
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
