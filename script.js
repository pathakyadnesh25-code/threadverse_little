
// Mobile navigation
const menuToggle = document.getElementById("menuToggle");
const navigation = document.getElementById("navigation");

if (menuToggle && navigation) {
  menuToggle.addEventListener("click", function () {
    navigation.classList.toggle("active");
  });

  navigation.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
      navigation.classList.remove("active");
    });
  });
}

// Automatic copyright year
const currentYear = document.getElementById("currentYear");

if (currentYear) {
  currentYear.textContent = new Date().getFullYear();
}

// Newsletter demo
const newsletterForm = document.getElementById("newsletterForm");
const emailInput = document.getElementById("emailInput");
const newsletterMessage = document.getElementById("newsletterMessage");

if (newsletterForm) {
  newsletterForm.addEventListener("submit", function (event) {
    event.preventDefault();

    if (emailInput.value.trim() !== "") {
      newsletterMessage.textContent =
        "Thank you for your interest in THREADVERSE LITTLE!";

      emailInput.value = "";
    }
  });
}
