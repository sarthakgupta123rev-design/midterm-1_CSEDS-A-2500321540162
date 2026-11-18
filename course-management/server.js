
const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();

app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));

// Direct API test
app.get("/api/courses", (req, res) => {

    const file = path.join(__dirname, "data", "courses.json");

    const courses = JSON.parse(
        fs.readFileSync(file, "utf8")
    );

    res.json(courses);

});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});
