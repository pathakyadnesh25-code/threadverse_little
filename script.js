
/* =================================
   THREADVERSE LITTLE
   JAVASCRIPT
================================= */

// MOBILE NAVIGATION

const menuToggle = document.getElementById("menuToggle");
const navigation = document.getElementById("navigation");

if (menuToggle && navigation) {

  menuToggle.addEventListener("click", function () {

    const isOpen = navigation.classList.toggle("active");

    menuToggle.setAttribute("aria-expanded", isOpen);

    menuToggle.innerHTML = isOpen ? "✕" : "☰";

  });

  // Close menu after selecting a link

  navigation.querySelectorAll("a").forEach(function(link) {

    link.addEventListener("click", function() {

      navigation.classList.remove("active");

      menuToggle.setAttribute("aria-expanded", "false");

      menuToggle.innerHTML = "☰";

    });

  });

}


// AUTOMATIC COPYRIGHT YEAR

const yearElement = document.getElementById("year");

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}


// CART COUNT DISPLAY

function updateCartCount() {

  const cartCountElement = document.getElementById("cartCount");

  if (!cartCountElement) return;

  try {

    const cart = JSON.parse(
      localStorage.getItem("threadverseLittleCart") || "[]"
    );

    const totalItems = cart.reduce(function(total, item) {
      return total + Number(item.quantity || 0);
    }, 0);

    cartCountElement.textContent = totalItems;

  } catch (error) {

    cartCountElement.textContent = "0";

  }

}

updateCartCount();


// NEWSLETTER FORM - TEMPORARY FRONTEND HANDLER

const newsletterForm = document.getElementById("newsletterForm");

if (newsletterForm) {

  newsletterForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const email = document.getElementById("newsletterEmail");

    const message = document.getElementById("newsletterMessage");

    if (!email.value.trim() || !email.checkValidity()) {

      message.textContent = "Please enter a valid email address.";

      return;

    }

    message.textContent =
      "Thank you for your interest! Newsletter registration will be available soon.";

    newsletterForm.reset();

  });

}
