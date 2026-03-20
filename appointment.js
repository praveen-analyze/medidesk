// Modal
const modal = document.getElementById("modal-1");


const btn1 = document.getElementById("openModalBtn1");
const btn2 = document.getElementById("openModalBtn2");

btn1.addEventListener("click", function () {
  modal.style.display = "flex";
});

btn2.addEventListener("click", function () {
  modal.style.display = "flex";
});

function closeModal() {
  modal.style.display = "none";
}


function addpatients() {

  const name = document.getElementById("firstName").value;
  const doctor = document.getElementById("doctor").value;
  const department = document.getElementById("department").value;
  const type = document.getElementById("type").value;
  const status = document.getElementById("status").value;

  if (!name || !doctor || !department) {
    alert("Fill all fields!");
    return;
  }

  const table = document.getElementById("patientTableBody"); // ✅ FIXED

  const row = document.createElement("tr");

  let statusClass = "green";
  if (status === "Waiting") statusClass = "orange";
  if (status === "In-Progress") statusClass = "blue";
  if (status === "Completed") statusClass = "purple";

  row.innerHTML = `
    <td>${name}</td>
    <td>${doctor}</td>
    <td><span class="badge purple">${department}</span></td>
    <td>${new Date().toLocaleString()}</td>
    <td><span class="badge blue">${type}</span></td>
    <td><span class="badge ${statusClass}">${status}</span></td>
    <td>
      <button onclick="deletePatient(this)" class="delete-btn"  style="background-color:red; color:white;">Delete</button>
    </td>
  `;

  table.appendChild(row);

  saveToLocalStorage(); // ✅ IMPORTANT

  closeModal();
}

// DELETE
function deletePatient(btn) {
  btn.parentElement.parentElement.remove();
  saveToLocalStorage();
}

// SAVE
function saveToLocalStorage() {
  const rows = document.querySelectorAll("#patientTableBody tr"); // ✅ FIXED

  let data = [];

  rows.forEach(row => {
    const cols = row.querySelectorAll("td");

    if (cols.length > 0) {
      data.push({
        name: cols[0].innerText,
        doctor: cols[1].innerText,
        department: cols[2].innerText,
        date: cols[3].innerText,
        type: cols[4].innerText,
        status: cols[5].innerText
      });
    }
  });

  localStorage.setItem("appointments", JSON.stringify(data));
}

// LOAD
function loadFromLocalStorage() {
  const data = JSON.parse(localStorage.getItem("appointments")) || [];

  const table = document.getElementById("patientTableBody"); // ✅ FIXED
  table.innerHTML = "";

  data.forEach(p => {

    let statusClass = "green";
    if (p.status.includes("Waiting")) statusClass = "orange";
    if (p.status.includes("In-Progress")) statusClass = "blue";
    if (p.status.includes("Completed")) statusClass = "purple";

    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${p.name}</td>
      <td>${p.doctor}</td>
      <td><span class="badge purple">${p.department}</span></td>
      <td>${p.date}</td>
      <td><span class="badge blue">${p.type}</span></td>
      <td><span class="badge ${statusClass}">${p.status}</span></td>
      <td>
        <button onclick="deletePatient(this)" class="delete-btn"  style="background-color:red; color:white;">Delete</button>
      </td>
    `;

    table.appendChild(row);
  });
}

window.onload = loadFromLocalStorage;