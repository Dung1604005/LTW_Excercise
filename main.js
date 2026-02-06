class Student{
    constructor(id, name, birthdate, className, gpa){
        this.id = id;
        this.name = name;
        this.birthdate = birthdate;
        this.className = className;
        this.gpa = gpa;
    }

    update(name, birthdate, className, gpa){
        this.name = name;
        this.birthdate = birthdate;
        this.className = className;
        this.gpa = gpa;
    }
}

let students = [];
const studentForm = document.getElementById('student-form');
const studentIdInput = document.getElementById('studentId');
const studentNameInput = document.getElementById('studentName');
const studentBirthdateInput = document.getElementById('studentBirthdate');
const studentClassInput = document.getElementById('studentClass');
const studentGPAInput = document.getElementById('studentGPA');
const submitBtn = document.getElementById('submitBtn');
const removeBtn = document.getElementById('removeBtn');
const editingIdInput = document.getElementById('editingId');

const tableTBody = document.getElementById('studentTBody');

function resetForm(){
    studentIdInput.value = '';
    studentNameInput.value = '';
    studentBirthdateInput.value = '';
    studentClassInput.value = '';
    studentGPAInput.value = '';
    editingIdInput.value = '';
}
function getFromData(){
    return {
        id: studentIdInput.value.trim(),
        name: studentNameInput.value.trim(),
        birthdate: studentBirthdateInput.value,
        className: studentClassInput.value.trim(),
        gpa: parseFloat(studentGPAInput.value)
    };
}
studentForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    const formData = getFromData();
    const editingId = editingIdInput.value;
    // edit mode
    if(editingId){
        const student = students.find(s => s.id === editingId);
        if(student){
            student.update(formData.name, formData.birthdate, formData.className, formData.gpa);
            alert('Cập nhật sinh viên thành công!');
            
        }
        else{
            resetForm();
            alert('Không tìm thấy sinh viên để cập nhật!');
        }
        render(students);
        return;
    }

    //Them mode

    const existingStudent = students.find(s => s.id === formData.id);
    if(existingStudent){
        alert('Mã sinh viên đã tồn tại!');
        return;
    }
    const newStudent = new Student(formData.id, formData.name, formData.birthdate, formData.className, formData.gpa);

    students.push(newStudent);
    resetForm();
    alert('Thêm sinh viên thành công!'); 
    render(students);
});

removeBtn.addEventListener("click", () => {
  resetForm();
});

tableTBody.addEventListener('click', (e) => {

    const btn = e.target.closest("button");
  if (!btn) return;

  const action = btn.dataset.action;
  const id = btn.dataset.id;

  const s = students.find(x => x.id === id);
  if (!s) return;

  if (action === "delete") {
    const ok = confirm(`Xóa sinh viên ${id}?`);
    if (!ok) return;
    students = students.filter(x => x.id !== id);
    resetForm();
    render(students);
  }

  if (action === "edit") {
    // đổ dữ liệu lên form
    studentIdInput.value = s.id;
    studentNameInput.value = s.name;
    studentBirthdateInput.value = s.birthdate;
    studentClassInput.value = s.className;
    studentGPAInput.value = s.gpa;
    editingIdInput.value = s.id;
    studentIdInput.disabled = true; // khóa id khi sửa
    submitBtn.textContent = "Cập nhật";
  }

});

function render(list) {
  tableTBody.innerHTML = list.map(s => `
    <tr>
      <td><span class="badge">${s.id}</span></td>
      <td>${s.name}</td>
      <td>${s.birthdate}</td>
      <td>${s.className}</td>
      <td>${s.gpa.toFixed(2)}</td>
      <td>
        <button class="btn-small btn-edit" data-action="edit" data-id="${s.id}">Sửa</button>
        <button class="btn-small btn-delete" data-action="delete" data-id="${s.id}">Xóa</button>
      </td>
    </tr>
  `).join("");
}
render(students);

    