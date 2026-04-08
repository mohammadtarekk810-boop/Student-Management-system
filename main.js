const form = document.getElementById('studentForm');
const idInput = document.getElementById('studentId');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const trackInput = document.getElementById('track');
const gradeInput = document.getElementById('grade');
const tbody = document.getElementById('studentsBody');
const countEl = document.getElementById('studentsCount');
const searchInput = document.getElementById('search');
const submitBtn = document.getElementById('submitBtn');
const cancelBtn = document.getElementById('cancelBtn');

const KEY = "STUDENTS_DATA";
let students = JSON.parse(localStorage.getItem(KEY)) || [];

displayStudents();

function save() {
    localStorage.setItem(KEY, JSON.stringify(students));
}

form.onsubmit = function(e) {
    e.preventDefault();
    const student = {
        id: idInput.value || Date.now().toString(),
        name: nameInput.value.trim(),
        email: emailInput.value.trim(),
        track: trackInput.value,
        grade: gradeInput.value
    };
    if (idInput.value) {
        const index = students.findIndex(s => s.id === idInput.value);
        students[index] = student;
    } else {
        students.push(student);
    }
    save();
    displayStudents();
    resetForm();
};

function displayStudents() {
    const term = searchInput.value.toLowerCase();
    let rows = "";
    const filtered = students.filter(s => s.name.toLowerCase().includes(term));
    
    filtered.forEach((s) => {
        rows += `
            <tr>
                <td>${s.name}</td>
                <td>${s.email}</td>
                <td>${s.track}</td>
                <td>${s.grade}</td>
                <td>
                    <button class="btn-edit-action" onclick="setupEdit('${s.id}')">Edit</button>
                    <button class="btn-delete-action" onclick="deleteStudent('${s.id}')">Delete</button>
                </td>
            </tr>`;
    });
    tbody.innerHTML = rows;
    countEl.textContent = students.length;
}

function deleteStudent(id) {
    if (confirm("Delete this student?")) {
        students = students.filter(s => s.id !== id);
        save();
        displayStudents();
    }
}

function setupEdit(id) {
    const s = students.find(s => s.id === id);
    idInput.value = s.id;
    nameInput.value = s.name;
    emailInput.value = s.email;
    trackInput.value = s.track;
    gradeInput.value = s.grade;
    submitBtn.textContent = "Update Student";
    cancelBtn.style.display = "inline-block";
}

function resetForm() {
    form.reset();
    idInput.value = "";
    submitBtn.textContent = "Add Student";
    cancelBtn.style.display = "none";
}

function clearAll() {
    if (confirm("Clear all students?")) {
        students = [];
        save();
        displayStudents();
    }
}