
const express = require("express");
const router = express.Router();

// Temporary in-memory data (acts like a database)
let students = [
  {
    id: 1,
    name: "Afreen",
    dept: "IT",
    age: 22
  },
  {
    id: 2,
    name: "Elle",
    dept: "B.Com",
    age: 21
  }
];

/**
 * CREATE - Add a new student
 */
router.post("/add", (req, res) => {
  const { id, name, dept, age } = req.body;

  if (!id || !name || !dept || !age) {
    return res.status(400).json({ message: "All fields are required" });
  }

  students.push({ id, name, dept, age });

  res.status(201).json({
    message: "Student added successfully",
    students
  });
});

/**
 * READ - Get all students
 */
router.get("/", (req, res) => {
  res.json({
    message: "Student list",
    students
  });
});

/**
 * READ - Get student by ID
 */
router.get("/:id", (req, res) => {
  const student = students.find(s => s.id == req.params.id);

  if (!student) {
    return res.status(404).json({ message: "Student not found" });
  }

  res.json({
    id:2,
    name:"Elle",
    age:21

  });
});

/**
 * UPDATE - Update student details
 */
router.put("/update/:id", (req, res) => {
  const { name, dept, age } = req.body;
  const student = students.find(s => s.id == req.params.id);

  if (!student) {
    return res.status(404).json({ message: "Student not found" });
  }

  student.name = name || student.name;
  student.dept = dept || student.dept;
  student.age = age || student.age;

  res.json({
    message: "Student updated successfully",
    student
  });
});





/**
 * UPDATE - Update multiple students at once
 */
router.put("/update-multiple", (req, res) => {
  const updates = req.body; // expecting array of students

  if (!Array.isArray(updates)) {
    return res.status(400).json({
      message: "Request body must be an array"
    });
  }

  let updatedStudents = [];

  updates.forEach(update => {
    const student = students.find(s => s.id == update.id);

    if (student) {
      student.name = update.name || student.name;
      student.dept = update.dept || student.dept;
      student.age = update.age || student.age;

      updatedStudents.push(student);
    }
  });

  res.json({
    message: "Multiple students updated successfully",
    updatedStudents
  });
});


/**
 * DELETE - Remove a student
 */
router.delete("/delete/:id", (req, res) => {
  const index = students.findIndex(s => s.id == req.params.id);

  if (index === -1) {
    return res.status(404).json({ message: "Student not found" });
  }

  students.splice(index, 1);

  res.json({
    message: "Student deleted successfully",
    students
  });
});

module.exports = router;

