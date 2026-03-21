// ================= SIDEBAR =================
const sideNav = document.getElementById("sideNav");
const menuBar = document.getElementById("menubar");
const closeNav = document.getElementById("closeNav");

menuBar?.addEventListener("click", () => {
  sideNav.style.left = "0";
});

closeNav?.addEventListener("click", () => {
  sideNav.style.left = "-40%";
});

// ================= FORM =================
const formContainer = document.getElementById("formContainer");
const closeForm = document.getElementById("closeForm");
const addPatient = document.getElementById("addPatient");
const quickAdd = document.getElementById("quickAddPatient");

addPatient?.addEventListener("click", () => {
  formContainer.style.display = "flex";
});

quickAdd?.addEventListener("click", () => {
  formContainer.style.display = "flex";
});

closeForm?.addEventListener("click", () => {
  formContainer.style.display = "none";
});

// ================= LOAD PATIENTS =================
function loadPatientsToDashboard() {
  const data = JSON.parse(localStorage.getItem("patients")) || [];
  const table = document.getElementById("recentPatientsBody");

  if (!table) return;

  table.innerHTML = "";

  data.slice(-5).reverse().forEach(p => {
    let status = "Admitted";
    let statusClass = "text-green-600";

    if (p.status?.includes("Critical")) {
      status = "Critical";
      statusClass = "text-red-600";
    }
    if (p.status?.includes("Discharged")) {
      status = "Discharged";
      statusClass = "text-gray-500";
    }

    const row = document.createElement("tr");

    row.innerHTML = `
      <td class="px-5 py-3">${p.name}</td>
      <td class="px-3 py-3">${p.ageGender}</td>
      <td class="px-3 py-3">${p.condition}</td>
      <td class="px-3 py-3 ${statusClass}">${status}</td>
      <td class="px-3 py-3">${p.doctor || "-"}</td>
      <td class="px-3 py-3">
        <button class="text-red-500">Delete</button>
      </td>
    `;

    table.appendChild(row);
  });
}

// ================= LOAD APPOINTMENTS =================
function loadAppointmentsToDashboard() {
  const data = JSON.parse(localStorage.getItem("appointments")) || [];
  const container = document.getElementById("scheduleList");

  if (!container) return;

  container.innerHTML = "";

  data.slice(-5).reverse().forEach(a => {
    const row = document.createElement("div");

    row.className = "flex justify-between items-center p-3 border-b hover:bg-gray-50 rounded-lg";

    row.innerHTML = `
      <div>
        <p class="font-semibold text-sm">${a.name}</p>
        <p class="text-xs text-gray-500">${a.doctor}</p>
      </div>
      <div class="text-right">
        <p class="text-xs text-gray-400">${a.date}</p>
        <span class="text-xs px-2 py-1 bg-blue-100 text-blue-600 rounded">
          ${a.type}
        </span>
      </div>
    `;

    container.appendChild(row);
  });
}

// ================= DASHBOARD STATS =================
function updateDashboardStats() {
  const patients = JSON.parse(localStorage.getItem("patients")) || [];
  const appointments = JSON.parse(localStorage.getItem("appointments")) || [];

  const patientEl = document.getElementById("totalPatients");
  const appointEl = document.getElementById("totalAppointments");
  const bedEl = document.getElementById("bedCount");

  if (patientEl) patientEl.innerText = patients.length;
  if (appointEl) appointEl.innerText = appointments.length;

  let admitted = 0;
  let critical = 0;

  patients.forEach(p => {
    if (p.status?.includes("Admitted")) admitted++;
    else if (p.status?.includes("Critical")) critical++;
  });

  if (bedEl) bedEl.innerText = `${admitted + critical}/80`;
}

// ================= DEPARTMENT LOAD =================
function loadDepartmentLoad() {
  const patients = JSON.parse(localStorage.getItem("patients")) || [];
  const container = document.getElementById("deptBars");

  if (!container) return;

  container.innerHTML = "";

  if (patients.length === 0) {
    container.innerHTML = "<p class='text-gray-400 text-sm'>No data available</p>";
    return;
  }

  let deptCount = {};

  patients.forEach(p => {
    const dept = p.ward || "General";
    deptCount[dept] = (deptCount[dept] || 0) + 1;
  });

  const max = Math.max(...Object.values(deptCount));

  for (let dept in deptCount) {
    const count = deptCount[dept];
    const width = (count / max) * 100;

    const row = document.createElement("div");

    row.innerHTML = `
      <div class="flex justify-between text-sm mb-1">
        <span>${dept}</span>
        <span>${count}</span>
      </div>
      <div class="w-full bg-gray-200 rounded h-2">
        <div class="bg-blue-600 h-2 rounded" style="width:${width}%"></div>
      </div>
    `;

    container.appendChild(row);
  }
}

// ================= INIT =================
window.onload = function () {
  loadPatientsToDashboard();
  loadAppointmentsToDashboard();
  updateDashboardStats();
  loadDepartmentLoad();
  