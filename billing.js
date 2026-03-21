// Notification
function showNotification() {
    alert("You have notifications");
  }
  
  // Search functionality
  const searchInput = document.getElementById("search");
  const rows = document.querySelectorAll("#tableBody tr");
  
  searchInput.addEventListener("keyup", function () {
    let value = this.value.toLowerCase();
  
    rows.forEach(row => {
      let text = row.innerText.toLowerCase();
      row.style.display = text.includes(value) ? "" : "none";
    });
  });
  
  function openModal() {
    document.getElementById("modal").style.display = "block";
  }
  
  function closeModal() {
    document.getElementById("modal").style.display = "none";
  }
  
  window.onclick = function(e) {
    let modal = document.getElementById("modal");
    if (e.target === modal) {
      modal.style.display = "none";
    }
  }