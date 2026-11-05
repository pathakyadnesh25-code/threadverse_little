
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


// ==================================
// THREADVERSE LITTLE - SHOP FILTERS
// ==================================

document.addEventListener("DOMContentLoaded", function () {

  const grid = document.getElementById("shopProductGrid");

  // Run shop functionality only on the Shop page
  if (!grid) return;

  const cards = Array.from(
    grid.querySelectorAll(".shop-product-card")
  );

  const search = document.getElementById("productSearch");
  const sort = document.getElementById("sortProducts");
  const count = document.getElementById("resultCount");
  const noProducts = document.getElementById("noProducts");
  const clearButton = document.getElementById("clearFilters");
  const resetButton = document.getElementById("resetNoProducts");
  const activeFilters = document.getElementById("activeFilters");

  function getSelected(name) {
    const selected = document.querySelector(
      'input[name="' + name + '"]:checked'
    );

    return selected ? selected.value : "all";
  }

  function updateShop() {

    const searchValue = search.value.toLowerCase().trim();
    const age = getSelected("age");
    const gender = getSelected("gender");
    const type = getSelected("type");

    let visibleCards = [];

    cards.forEach(function (card) {

      const name = card.dataset.name.toLowerCase();

      const matchesSearch = name.includes(searchValue);
      const matchesAge = age === "all" || card.dataset.age === age;
      const matchesGender =
        gender === "all" || card.dataset.gender === gender;
      const matchesType =
        type === "all" || card.dataset.type === type;

      const visible =
        matchesSearch &&
        matchesAge &&
        matchesGender &&
        matchesType;

      card.hidden = !visible;

      if (visible) {
        visibleCards.push(card);
      }
    });

    // Sorting
    if (sort.value === "low") {
      visibleCards.sort((a, b) =>
        Number(a.dataset.price) - Number(b.dataset.price)
      );
    }

    if (sort.value === "high") {
      visibleCards.sort((a, b) =>
        Number(b.dataset.price) - Number(a.dataset.price)
      );
    }

    if (sort.value === "name") {
      visibleCards.sort((a, b) =>
        a.dataset.name.localeCompare(b.dataset.name)
      );
    }

    visibleCards.forEach(function (card) {
      grid.appendChild(card);
    });

    count.textContent =
      visibleCards.length +
      (visibleCards.length === 1 ? " product" : " products");

    noProducts.hidden = visibleCards.length !== 0;

    const selectedLabels = [];

    if (age !== "all") selectedLabels.push(age);
    if (gender !== "all") selectedLabels.push(gender);
    if (type !== "all") selectedLabels.push(type);
    if (searchValue) selectedLabels.push('Search: "' + searchValue + '"');

    activeFilters.textContent = selectedLabels.length
      ? "Active filters: " + selectedLabels.join(" · ")
      : "Showing all products";
  }

  // Search
  search.addEventListener("input", updateShop);

  // Sorting
  sort.addEventListener("change", updateShop);

  // Radio filters
  document.querySelectorAll(
    '.shop-page input[type="radio"]'
  ).forEach(function (input) {
    input.addEventListener("change", updateShop);
  });

  // Clear filters
  function clearAllFilters() {
    document.querySelector(
      'input[name="age"][value="all"]'
    ).checked = true;

    document.querySelector(
      'input[name="gender"][value="all"]'
    ).checked = true;

    document.querySelector(
      'input[name="type"][value="all"]'
    ).checked = true;

    search.value = "";
    sort.value = "featured";

    updateShop();
  }

  clearButton.addEventListener("click", clearAllFilters);
  resetButton.addEventListener("click", clearAllFilters);

  // Initial display
  updateShop();
});
