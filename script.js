
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
  // Open individual product details
cards.forEach(function (card) {
  card.style.cursor = "pointer";

  card.addEventListener("click", function () {
    const productName = card.dataset.name;

    window.location.href =
      "product.html?name=" + encodeURIComponent(productName);
  });
});

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


// ==================================
// PRODUCT DETAILS AND CART
// ==================================

document.addEventListener("DOMContentLoaded", function () {

  const detailImage = document.getElementById("detailImage");

  // Only run on the product details page
  if (!detailImage) return;

  const products = {
    "Little Cloud Romper": {
      price: 399,
      age: "newborn",
      ageLabel: "0–3 Months",
      gender: "Unisex",
      type: "Rompers",
      image: "https://images.unsplash.com/photo-1622290319146-7b63df48a635?auto=format&fit=crop&w=1000&q=85",
      description: "A lovely sample romper style for your baby's everyday wardrobe."
    },
    "Everyday Baby Set": {
      price: 599,
      age: "infant",
      ageLabel: "3–12 Months",
      gender: "Boys",
      type: "Clothing Sets",
      image: "https://images.unsplash.com/photo-1777397660834-67c6d0eabe15?auto=format&fit=crop&w=1000&q=85",
      description: "A sample clothing set selected for a little one's everyday looks."
    },
    "Dreamy Nightwear": {
      price: 499,
      age: "newborn",
      ageLabel: "0–3 Months",
      gender: "Girls",
      type: "Nightwear",
      image: "https://images.unsplash.com/photo-1766918780914-5df4a5a98c44?auto=format&fit=crop&w=1000&q=85",
      description: "A sample nightwear style for your baby's clothing collection."
    },
    "Tiny Sunshine Bodysuit": {
      price: 349,
      age: "infant",
      ageLabel: "3–12 Months",
      gender: "Unisex",
      type: "Bodysuits",
      image: "https://images.unsplash.com/photo-1622290319146-7b63df48a635?auto=format&fit=crop&w=1000&q=85",
      description: "A sample bodysuit style for little everyday adventures."
    },
    "Little Blossom Set": {
      price: 649,
      age: "newborn",
      ageLabel: "0–3 Months",
      gender: "Girls",
      type: "Clothing Sets",
      image: "https://images.unsplash.com/photo-1777397660834-67c6d0eabe15?auto=format&fit=crop&w=1000&q=85",
      description: "A sample newborn clothing set for your little one's wardrobe."
    },
    "Cozy Little Romper": {
      price: 449,
      age: "infant",
      ageLabel: "3–12 Months",
      gender: "Boys",
      type: "Rompers",
      image: "https://images.unsplash.com/photo-1766918780914-5df4a5a98c44?auto=format&fit=crop&w=1000&q=85",
      description: "A sample infant romper style for everyday wear."
    },
    "Soft Cloud Bodysuit": {
      price: 329,
      age: "newborn",
      ageLabel: "0–3 Months",
      gender: "Unisex",
      type: "Bodysuits",
      image: "https://images.unsplash.com/photo-1622290319146-7b63df48a635?auto=format&fit=crop&w=1000&q=85",
      description: "A sample bodysuit design for a newborn clothing collection."
    },
    "Little Star Night Suit": {
      price: 549,
      age: "infant",
      ageLabel: "3–12 Months",
      gender: "Girls",
      type: "Nightwear",
      image: "https://images.unsplash.com/photo-1777397660834-67c6d0eabe15?auto=format&fit=crop&w=1000&q=85",
      description: "A sample night suit style for your little one's wardrobe."
    }
  };

  const params = new URLSearchParams(window.location.search);
  const name = params.get("name");
  const product = products[name];

  if (!product) {
    document.querySelector(".product-information").innerHTML =
      '<h1>Product not found</h1><p>Please explore our collection.</p><a href="shop.html">Back to Shop</a>';
    return;
  }

  document.title = name + " | THREADVERSE LITTLE";

  document.getElementById("detailName").textContent = name;
  document.getElementById("detailImage").src = product.image;
  document.getElementById("detailCategory").textContent = product.type;
  document.getElementById("detailPrice").textContent =
    "₹" + product.price;

  document.getElementById("detailDescription").textContent =
    product.description;

  document.getElementById("detailAge").textContent =
    "Age group: " + product.ageLabel;

  document.getElementById("detailGender").textContent =
    "Style: " + product.gender;

  // Size options
  const sizeSelect = document.getElementById("sizeSelect");

  const sizes = product.age === "newborn"
    ? ["Newborn", "0–3 Months"]
    : ["3–6 Months", "6–9 Months", "9–12 Months"];

  sizes.forEach(function (size) {
    const option = document.createElement("option");
    option.value = size;
    option.textContent = size;
    sizeSelect.appendChild(option);
  });

  // Quantity
  const quantityInput = document.getElementById("quantityInput");

  document.getElementById("decreaseQty").addEventListener("click", function () {
    quantityInput.value = Math.max(1, Number(quantityInput.value) - 1);
  });

  document.getElementById("increaseQty").addEventListener("click", function () {
    quantityInput.value = Math.min(10, Number(quantityInput.value) + 1);
  });

  // Header cart count
  function updateCartCount() {
    const cart = JSON.parse(
      localStorage.getItem("threadverseLittleCart") || "[]"
    );

    const total = cart.reduce(function (sum, item) {
      return sum + item.quantity;
    }, 0);

    const count = document.getElementById("headerCartCount");

    if (count) count.textContent = total;
  }

  updateCartCount();

  // Add to cart
  document.getElementById("addToCart").addEventListener("click", function () {

    const size = sizeSelect.value;
    const quantity = Number(quantityInput.value);

    const message = document.getElementById("cartMessage");

    if (!size) {
      message.textContent = "Please select a baby size first.";
      sizeSelect.focus();
      return;
    }

    const cart = JSON.parse(
      localStorage.getItem("threadverseLittleCart") || "[]"
    );

    const existingItem = cart.find(function (item) {
      return item.name === name && item.size === size;
    });

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.push({
        name: name,
        price: product.price,
        image: product.image,
        size: size,
        quantity: quantity
      });
    }

    localStorage.setItem(
      "threadverseLittleCart",
      JSON.stringify(cart)
    );

    message.textContent = "Added to your shopping cart successfully!";

    updateCartCount();
  });

});
