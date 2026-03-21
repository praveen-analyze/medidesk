const sideNav = document.getElementById("sideNav");
const menuBar = document.getElementById("menubar");
const closeNav = document.getElementById("closeNav");

// Sidebar open
menuBar.addEventListener("click", () => {
  sideNav.style.left = "0";
});

// Sidebar close
closeNav.addEventListener("click", () => {
  sideNav.style.left = "-40%";
});

// ================= SAMPLE DATA =================
const billingData = [
  {
    id: "INV-1041",
    patient: "Ananya Krishnan",
    date: "Mar 14",
    services: "Surgery, Bed (3d), Meds",
    amount: 52000,
    status: "Paid"
  },
  {
    id: "INV-1040",
    patient: "Sunil Verma",
    date: "Mar 13",
    services: "ICU, Cardiology, Tests",
    amount: 120000,
    status: "Pending"
  },
  {
    id: "INV-1039",
    patient: "Meera Iyer",
    date: "Mar 13",
    services: "Consult, Meds",
    amount: 8500,
    status: "Paid"
  },
  {
    id: "INV-1038",
    patient: "Divya Nair",
    date: "Mar 12",
    services: "X-Ray, Ortho",
    amount: 18000,
    status: "Pending"
  },
  {
    id: "INV-1037",
    patient: "Karthik Menon",
    date: "Mar 11",
    services: "Consultation",
    amount: 4200,
    status: "Paid"
  },
  {
    id: "INV-1036",
    patient: "Arun Kumar",
    date: "Mar 10",
    services: "ICU (5d), Antibiotics",
    amount: 240000,
    status: "Overdue"
  }
];

// ================= LOAD TABLE =================
const tableBody = document.getElementById("billingTableBody");

function loadTable(data) {
  tableBody.innerHTML = "";

  data.forEach(item => {
    const statusColor =
      item.status === "Paid"
        ? "text-green-600 bg-green-100"
        : item.status === "Pending"
        ? "text-yellow-600 bg-yellow-100"
        : "text-red-600 bg-red-100";

    const row = `
      <tr class="hover:bg-gray-50">
        <td class="px-5 py-3">${item.id}</td>
        <td class="px-3 py-3">${item.patient}</td>
        <td class="px-3 py-3">${item.date}</td>
        <td class="px-3 py-3">${item.services}</td>
        <td class="px-3 py-3 font-semibold">₹${item.amount.toLocaleString()}</td>
        <td class="px-3 py-3">
          <span class="px-2 py-1 rounded-full text-xs ${statusColor}">
            ${item.status}
          </span>
        </td>
      </tr>
    `;
    tableBody.innerHTML += row;
  });

  updateRevenue(data);
}

// ================= REVENUE CALCULATION =================
function updateRevenue(data) {
  let total = 0;
  let pending = 0;
  let overdue = 0;

  data.forEach(item => {
    total += item.amount;

    if (item.status === "Pending") pending += item.amount;
    if (item.status === "Overdue") overdue += item.amount;
  });

  document.getElementById("totalRevenue").innerText = "₹" + total.toLocaleString();
  document.getElementById("pendingRevenue").innerText = "₹" + pending.toLocaleString();
  document.getElementById("overdueRevenue").innerText = "₹" + overdue.toLocaleString();
}

// ================= SEARCH =================
const searchInput = document.querySelector("input");

if (searchInput) {
  searchInput.addEventListener("keyup", function () {
    const value = this.value.toLowerCase();

    const filtered = billingData.filter(item =>
      item.id.toLowerCase().includes(value) ||
      item.patient.toLowerCase().includes(value) ||
      item.services.toLowerCase().includes(value)
    );

    loadTable(filtered);
  });
}

// ================= LOAD INIT =================
loadTable(billingData);