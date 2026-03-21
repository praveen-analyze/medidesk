
const modal = document.getElementById("modal");

const btn1 = document.getElementById("openModalBtn1");
const btn2 = document.getElementById("openModalBtn2");

// Open modal
btn1.addEventListener("click", function () {
  modal.style.display = "flex";
});

btn2.addEventListener("click", function () {
  modal.style.display = "flex";
});

// Close modal
function closeModal() {
  modal.style.display = "none";
}

// ADD PATIENT
function addpatients() {
  const firstName = document.getElementById("firstName").value;
  const lastName = document.getElementById("lastName").value;
  const age = document.getElementById("age").value;
  const gender = document.getElementById("gender").value;
  const phone = document.getElementById("phone").value;
  const condition = document.getElementById("condition").value;
  const ward = document.getElementById("ward").value;

  if (!firstName || !lastName || !age || !condition || !gender || !ward) {
    alert("Please fill all required fields!");
    return;
  }

//   
const table = document.getElementById("patientTableBody");
  const newRow = document.createElement("tr");

  // 🔥 Ward class
  let wardClass = "ward-general";
  if (ward === "ICU") wardClass = "ward-icu";
  if (ward === "SCAN") wardClass = "ward-scan";
  if (ward === "Discharge") wardClass = "ward-discharge";

  // 🔥 Status logic
  let status = "Admitted";
  let statusClass = "status-admitted";

  if (ward === "ICU") {
    status = "Critical";
    statusClass = "status-critical";
  }
  if (ward === "Discharge") {
    status = "Discharged";
    statusClass = "status-discharged";
  }

  newRow.innerHTML = `
    <td>${firstName} ${lastName}</td>
    <td>#${Math.floor(Math.random() * 1000)}</td>
    <td>${age} / ${gender}</td>
    <td>${condition}</td>
    <td><span class="badge ${wardClass}">${ward}</span></td>
    <td><span class="badge ${statusClass}">${status}</span></td>
    <td>${new Date().toLocaleDateString()}</td>
    <td>
      <button onclick="deletePatient(this)" class="delete-btn"  style="background-color:red; color:white;">Delete</button>
    </td>
  `;

  table.appendChild(newRow);

  saveToLocalStorage();

  // Clear form
  document.getElementById("firstName").value = "";
  document.getElementById("lastName").value = "";
  document.getElementById("age").value = "";
  document.getElementById("condition").value = "";

  closeModal();
}

// 🔥 DELETE
function deletePatient(btn) {
  const row = btn.parentElement.parentElement;
  row.remove();
  saveToLocalStorage();
}

// 🔥 SAVE
function saveToLocalStorage() {
  const rows = document.querySelectorAll("#patientTableBody tr");

  let data = [];

  rows.forEach(row => {
    const cols = row.querySelectorAll("td");

    data.push({
      name: cols[0].innerText,
      id: cols[1].innerText,
      ageGender: cols[2].innerText,
      condition: cols[3].innerText,
      ward: cols[4].innerText,
      status: cols[5].innerText,
      admitted: cols[6].innerText
    });
  });

  localStorage.setItem("patients", JSON.stringify(data));
}

// 🔥 LOAD
function loadFromLocalStorage() {
  const data = JSON.parse(localStorage.getItem("patients")) || [];

  const table = document.getElementById("patientTableBody");
  table.innerHTML = "";

  data.forEach(p => {
    const row = document.createElement("tr");

    // 🔥 Detect class again
    let wardClass = "ward-general";
    if (p.ward.includes("ICU")) wardClass = "ward-icu";
    if (p.ward.includes("SCAN")) wardClass = "ward-scan";
    if (p.ward.includes("Discharge")) wardClass = "ward-discharge";

    let statusClass = "status-admitted";
    if (p.status.includes("Critical")) statusClass = "status-critical";
    if (p.status.includes("Discharged")) statusClass = "status-discharged";

    row.innerHTML = `
      <td>${p.name}</td>
      <td>${p.id}</td>
      <td>${p.ageGender}</td>
      <td>${p.condition}</td>
      <td><span class="badge ${wardClass}">${p.ward}</span></td>
      <td><span class="badge ${statusClass}">${p.status}</span></td>
      <td>${p.admitted}</td>
      <td>
        <button onclick="deletePatient(this)" class="delete-btn"  style="background-color:red; color:white;">Delete</button>
      </td>
    `;

    table.appendChild(row);
  });
}

window.onload = loadFromLocalStorage;