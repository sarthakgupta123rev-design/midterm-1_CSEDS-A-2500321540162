
const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();

const file = path.join(__dirname, "../data/courses.json");

// READ all courses
router.get("/", (req, res) => {
    const courses = JSON.parse(fs.readFileSync(file, "utf8"));
    res.json(courses);
});

// CREATE course
router.post("/", (req, res) => {
    const courses = JSON.parse(fs.readFileSync(file, "utf8"));

    const newCourse = {
        id: courses.length ? Math.max(...courses.map(c => c.id)) + 1 : 1,
        courseName: req.body.courseName,
        code: req.body.code,
        department: req.body.department
    };

    courses.push(newCourse);

    fs.writeFileSync(file, JSON.stringify(courses, null, 2));

    res.json({ message: "Course added successfully" });
});

// UPDATE course
router.put("/:id", (req, res) => {
    const courses = JSON.parse(fs.readFileSync(file, "utf8"));

    const course = courses.find(c => c.id === Number(req.params.id));

    if (!course) {
        return res.status(404).json({ message: "Course not found" });
    }

    course.courseName = req.body.courseName;
    course.code = req.body.code;
    course.department = req.body.department;

    fs.writeFileSync(file, JSON.stringify(courses, null, 2));

    res.json({ message: "Course updated successfully" });
});

// DELETE course
router.delete("/:id", (req, res) => {
    let courses = JSON.parse(fs.readFileSync(file, "utf8"));

    courses = courses.filter(c => c.id !== Number(req.params.id));

    fs.writeFileSync(file, JSON.stringify(courses, null, 2));

    res.json({ message: "Course deleted successfully" });
});

module.exports = router;
