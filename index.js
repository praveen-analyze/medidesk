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