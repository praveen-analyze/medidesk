
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

const formContainer = document.getElementById("formContainer");
const closeForm = document.getElementById("closeForm");
const addPatient = document.getElementById("addPatient");


// Open
addPatient.addEventListener("click", () => {
  formContainer.style.display = "flex";
});

// Close
closeForm.addEventListener("click", () => {
  formContainer.style.display = "none";
});
const doctors = [
      {
        initials: "DP",
        name: "Dr. Priya Mehta",
        specialty: "General Surgery",
        patients: 24,
        rating: 4.9,
        availability: 70,
        color: "bg-blue-600",
        progress: "bg-blue-600"
      },
      {
        initials: "DA",
        name: "Dr. Arjun Nair",
        specialty: "Orthopedics",
        patients: 18,
        rating: 4.8,
        availability: 45,
        color: "bg-purple-600",
        progress: "bg-purple-600"
      },
      {
        initials: "DK",
        name: "Dr. Kavitha Rao",
        specialty: "Pediatrics",
        patients: 31,
        rating: 4.9,
        availability: 20,
        color: "bg-green-600",
        progress: "bg-green-600"
      },
      {
        initials: "DS",
        name: "Dr. Suresh Iyer",
        specialty: "Cardiology",
        patients: 22,
        rating: 4.7,
        availability: 60,
        color: "bg-red-500",
        progress: "bg-red-500"
      },
      {
        initials: "DM",
        name: "Dr. Meena Sharma",
        specialty: "General Medicine",
        patients: 28,
        rating: 4.6,
        availability: 55,
        color: "bg-orange-500",
        progress: "bg-orange-500"
      },
      {
        initials: "DR",
        name: "Dr. Rajan Thomas",
        specialty: "Neurology",
        patients: 15,
        rating: 4.8,
        availability: 80,
        color: "bg-cyan-500",
        progress: "bg-cyan-500"
      }
    ];

    const container = document.getElementById("doctorContainer");

    doctors.forEach(doc => {
      const card = `
        <div class="bg-white rounded-2xl shadow-md p-8 text-center hover:shadow-xl transition duration-300">
          
          <!-- Avatar -->
          <div class="w-20 h-20 mx-auto rounded-full flex items-center justify-center text-white text-2xl font-bold ${doc.color}">
            ${doc.initials}
          </div>

          <!-- Name -->
          <h2 class="mt-4 text-lg font-semibold text-gray-800">${doc.name}</h2>
          <p class="text-gray-500 text-sm">${doc.specialty}</p>

          <!-- Stats -->
          <div class="flex justify-center gap-8 mt-6">
            <div>
              <p class="text-xl font-semibold">${doc.patients}</p>
              <p class="text-gray-500 text-sm">Patients</p>
            </div>

            <div class="flex items-center gap-1">
              <svg class="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.12 3.447a1 1 0 00.95.69h3.623c.969 0 1.371 1.24.588 1.81l-2.932 2.13a1 1 0 00-.364 1.118l1.12 3.447c.3.921-.755 1.688-1.54 1.118l-2.932-2.13a1 1 0 00-1.176 0l-2.932 2.13c-.784.57-1.838-.197-1.539-1.118l1.12-3.447a1 1 0 00-.364-1.118L2.88 8.874c-.783-.57-.38-1.81.588-1.81h3.623a1 1 0 00.95-.69l1.12-3.447z"/>
              </svg>
              <div>
                <p class="text-xl font-semibold">${doc.rating}</p>
                <p class="text-gray-500 text-sm">Rating</p>
              </div>
            </div>
          </div>

          <!-- Availability -->
          <div class="mt-6">
            <p class="text-gray-600 text-sm mb-2">Availability</p>
            <div class="w-full bg-gray-200 h-2 rounded-full">
              <div class="${doc.progress} h-2 rounded-full" style="width:${doc.availability}%"></div>
            </div>
            <p class="text-gray-500 text-sm mt-2">${doc.availability}% slots free</p>
          </div>

        </div>
      `;

      container.innerHTML += card;
    });
 