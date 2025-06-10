// Menu toggle functionality
const mobileMenuBtn = document.getElementById("mobile-menu");
const navBar = document.getElementById("header__nav-bar");
const overlay = document.querySelector(".menu-overlay");
const closeBtn = document.querySelector(".menu-close-btn");

function toggleMenu() {
  navBar.classList.toggle("active");
  overlay.classList.toggle("active");
}

// Open menu when clicking hamburger icon
mobileMenuBtn.addEventListener("click", toggleMenu);

// Close menu when clicking close button
closeBtn.addEventListener("click", toggleMenu);

// Close menu when clicking on overlay
overlay.addEventListener("click", toggleMenu);

// Close menu when pressing Escape key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && navBar.classList.contains("active")) {
    toggleMenu();
  }
});
