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


function getBedStatus() {
  const patients = JSON.parse(localStorage.getItem("patients")) || [];

  let beds = {};

  // Example: assign beds automatically
  patients.forEach((p, index) => {
    if (p.ward === "General") {
      beds["A" + String(index + 1).padStart(2, "0")] = "occupied";
    }
  });

  return beds;
}
      (function() {
        const beds = document.querySelectorAll('.bed-box');
        const container = document.getElementById('toastContainer');

        function showToast(message, type) {
          const toast = document.createElement('div');
          toast.className = `px-4 py-3 rounded-lg text-white font-medium shadow-lg transform transition-all duration-300 translate-x-0 opacity-100`;
          if (type === 'occupied') {
            toast.classList.add('bg-red-600');
          } else if (type === 'free') {
            toast.classList.add('bg-green-600');
          } else if (type === 'reserved') {
            toast.classList.add('bg-yellow-600');
          } else {
            toast.classList.add('bg-gray-700');
          }
          toast.innerText = message;
          container.appendChild(toast);

          setTimeout(() => {
            if (toast.parentNode) {
              toast.style.opacity = '0';
              toast.style.transform = 'translate-x-2';
              setTimeout(() => {
                if (toast.parentNode) toast.remove();
              }, 300);
            }
          }, 3000);
        }

        beds.forEach(bed => {
          bed.addEventListener('click', function(e) {
            const p = this.querySelector('p');
            if (!p) return;
            const bedNum = p.innerText.trim(); 
            
            let status = 'unknown';
            let type = 'unknown';
            if (this.classList.contains('bg-red-50')) {
              status = 'occupied';
              type = 'occupied';
            } else if (this.classList.contains('bg-green-50')) {
              status = 'free';
              type = 'free';
            } else if (this.classList.contains('bg-yellow-50')) {
              status = 'reserved';
              type = 'reserved';
            }
            
            let message = `Bed ${bedNum} is ${status}`;
            showToast(message, type);
          });
        });
      })();
  