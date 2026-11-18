const API = "/api/courses";

const form = document.getElementById("courseForm");
const courseList = document.getElementById("courseList");


async function getCourses() {

    const response = await fetch(API);
    const courses = await response.json();

    courseList.innerHTML = "";

    courses.forEach(course => {

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${course.id}</td>
            <td></td>
            <td></td>
            <td></td>
            <td>
                <button class="edit">Edit</button>
                <button class="delete">Delete</button>
            </td>
        `;

        row.children[1].textContent = course.courseName;
        row.children[2].textContent = course.code;
        row.children[3].textContent = course.department;

        row.querySelector(".edit").onclick = () => editCourse(course);
        row.querySelector(".delete").onclick = () => deleteCourse(course.id);

        courseList.appendChild(row);
    });
}

// CREATE and UPDATE
form.addEventListener("submit", async (e) => {

    e.preventDefault();

    const id = document.getElementById("id").value;

    const course = {
        courseName: document.getElementById("courseName").value,
        code: document.getElementById("code").value,
        department: document.getElementById("department").value
    };

    const method = id ? "PUT" : "POST";

    const url = id ? `${API}/${id}` : API;

    const response = await fetch(url, {
        method: method,
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(course)
    });

    const result = await response.json();

    alert(result.message);

    form.reset();

    document.getElementById("id").value = "";

    getCourses();
});

// UPDATE: Fill form with existing course
function editCourse(course) {

    document.getElementById("id").value = course.id;

    document.getElementById("courseName").value = course.courseName;

    document.getElementById("code").value = course.code;

    document.getElementById("department").value = course.department;
}

// DELETE: Remove course
async function deleteCourse(id) {

    if (confirm("Are you sure you want to delete this course?")) {

        const response = await fetch(`${API}/${id}`, {
            method: "DELETE"
        });

        const result = await response.json();

        alert(result.message);

        getCourses();
    }
}

// Load courses when page opens
getCourses();