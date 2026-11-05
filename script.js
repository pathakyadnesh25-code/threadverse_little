
document.addEventListener("DOMContentLoaded", function () {

  // ==========================================
  // 1. MOBILE NAVIGATION
  // ==========================================

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

  // ==========================================
  // 2. COPYRIGHT YEAR
  // ==========================================

  const currentYear = document.getElementById("currentYear");

  if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
  }

  // ==========================================
  // 3. NEWSLETTER DEMO
  // ==========================================

  const newsletterForm = document.getElementById("newsletterForm");
  const emailInput = document.getElementById("emailInput");
  const newsletterMessage = document.getElementById("newsletterMessage");

  if (newsletterForm) {
    newsletterForm.addEventListener("submit", function (event) {
      event.preventDefault();

      if (emailInput && emailInput.value.trim() !== "") {
        if (newsletterMessage) {
          newsletterMessage.textContent =
            "Thank you for your interest in THREADVERSE LITTLE!";
        }

        emailInput.value = "";
      }
    });
  }

  // ==========================================
  // 4. PRODUCT DATA
  // ==========================================

  // Temporary demonstration image.
  // Replace these with your actual product photographs later.
  const sampleImage =
    "https://images.unsplash.com/photo-1622290319146-7b63df48a635?auto=format&fit=crop&w=1000&q=85";

  const products = {
    "Little Cloud Romper": {
      price: 399,
      age: "newborn",
      ageLabel: "0–3 Months",
      gender: "Unisex",
      type: "Rompers",
      image: sampleImage,
      description: "A lovely sample romper style for your baby's everyday wardrobe."
    },

    "Everyday Baby Set": {
      price: 599,
      age: "infant",
      ageLabel: "3–12 Months",
      gender: "Boys",
      type: "Clothing Sets",
      image: sampleImage,
      description: "A sample clothing set selected for your little one's everyday looks."
    },

    "Dreamy Nightwear": {
      price: 499,
      age: "newborn",
      ageLabel: "0–3 Months",
      gender: "Girls",
      type: "Nightwear",
      image: sampleImage,
      description: "A sample nightwear style for your baby's clothing collection."
    },

    "Tiny Sunshine Bodysuit": {
      price: 349,
      age: "infant",
      ageLabel: "3–12 Months",
      gender: "Unisex",
      type: "Bodysuits",
      image: sampleImage,
      description: "A sample bodysuit style for little everyday adventures."
    },

    "Little Blossom Set": {
      price: 649,
      age: "newborn",
      ageLabel: "0–3 Months",
      gender: "Girls",
      type: "Clothing Sets",
      image: sampleImage,
      description: "A sample newborn clothing set for your little one's wardrobe."
    },

    "Cozy Little Romper": {
      price: 449,
      age: "infant",
      ageLabel: "3–12 Months",
      gender: "Boys",
      type: "Rompers",
      image: sampleImage,
      description: "A sample infant romper style for everyday wear."
    },

    "Soft Cloud Bodysuit": {
      price: 329,
      age: "newborn",
      ageLabel: "0–3 Months",
      gender: "Unisex",
      type: "Bodysuits",
      image: sampleImage,
      description: "A sample bodysuit design for a newborn clothing collection."
    },

    "Little Star Night Suit": {
      price: 549,
      age: "infant",
      ageLabel: "3–12 Months",
      gender: "Girls",
      type: "Nightwear",
      image: sampleImage,
      description: "A sample night suit style for your little one's wardrobe."
    }
  };

  // ==========================================
  // 5. CART COUNT
  // ==========================================

  function getCart() {
    try {
      const savedCart = JSON.parse(
        localStorage.getItem("threadverseLittleCart") || "[]"
      );

      return Array.isArray(savedCart) ? savedCart : [];
    } catch (error) {
      return [];
    }
  }

  function updateCartCount() {
    const cart = getCart();

    const total = cart.reduce(function (sum, item) {
      return sum + (Number(item.quantity) || 0);
    }, 0);

    const countElement = document.getElementById("headerCartCount");

    if (countElement) {
      countElement.textContent = total;
    }
  }

  updateCartCount();

  // ==========================================
  // 6. SHOP PAGE FILTERS AND SEARCH
  // ==========================================

  const grid = document.getElementById("shopProductGrid");

  if (grid) {

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

    // Open product details when a product card is clicked.
    cards.forEach(function (card) {
      card.style.cursor = "pointer";

      card.addEventListener("click", function () {
        const productName = card.dataset.name;

        if (productName) {
          window.location.href =
            "product.html?name=" + encodeURIComponent(productName);
        }
      });
    });

    function getSelected(name) {
      const selected = document.querySelector(
        'input[name="' + name + '"]:checked'
      );

      return selected ? selected.value : "all";
    }

    function updateShop() {

      const searchValue = search ? search.value.toLowerCase().trim() : "";
      const age = getSelected("age");
      const gender = getSelected("gender");
      const type = getSelected("type");

      let visibleCards = [];

      cards.forEach(function (card) {

        const name = (card.dataset.name || "").toLowerCase();

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

      if (sort && sort.value === "low") {
        visibleCards.sort(function (a, b) {
          return Number(a.dataset.price) - Number(b.dataset.price);
        });
      }

      if (sort && sort.value === "high") {
        visibleCards.sort(function (a, b) {
          return Number(b.dataset.price) - Number(a.dataset.price);
        });
      }

      if (sort && sort.value === "name") {
        visibleCards.sort(function (a, b) {
          return (a.dataset.name || "").localeCompare(b.dataset.name || "");
        });
      }

      visibleCards.forEach(function (card) {
        grid.appendChild(card);
      });

      if (count) {
        count.textContent =
          visibleCards.length +
          (visibleCards.length === 1 ? " product" : " products");
      }

      if (noProducts) {
        noProducts.hidden = visibleCards.length !== 0;
      }

      const selectedLabels = [];

      if (age !== "all") selectedLabels.push(age);
      if (gender !== "all") selectedLabels.push(gender);
      if (type !== "all") selectedLabels.push(type);
      if (searchValue) selectedLabels.push('Search: "' + searchValue + '"');

      if (activeFilters) {
        activeFilters.textContent = selectedLabels.length
          ? "Active filters: " + selectedLabels.join(" · ")
          : "Showing all products";
      }
    }

    if (search) {
      search.addEventListener("input", updateShop);
    }

    if (sort) {
      sort.addEventListener("change", updateShop);
    }

    document.querySelectorAll(
      '.shop-page input[type="radio"]'
    ).forEach(function (input) {
      input.addEventListener("change", updateShop);
    });

    function clearAllFilters() {

      const ageAll = document.querySelector(
        'input[name="age"][value="all"]'
      );

      const genderAll = document.querySelector(
        'input[name="gender"][value="all"]'
      );

      const typeAll = document.querySelector(
        'input[name="type"][value="all"]'
      );

      if (ageAll) ageAll.checked = true;
      if (genderAll) genderAll.checked = true;
      if (typeAll) typeAll.checked = true;

      if (search) search.value = "";
      if (sort) sort.value = "featured";

      updateShop();
    }

    if (clearButton) {
      clearButton.addEventListener("click", clearAllFilters);
    }

    if (resetButton) {
      resetButton.addEventListener("click", clearAllFilters);
    }

    updateShop();
  }

  // ==========================================
  // 7. PRODUCT DETAILS PAGE
  // ==========================================

  const detailImage = document.getElementById("detailImage");

  if (detailImage) {

    const params = new URLSearchParams(window.location.search);
    const name = params.get("name");
    const product = products[name];

    if (!product) {

      const information = document.querySelector(".product-information");

      if (information) {
        information.innerHTML =
          '<h1>Product not found</h1>' +
          '<p>Please return to our collection and select a product.</p>' +
          '<a href="shop.html">Back to Shop</a>';
      }

      return;
    }

    document.title = name + " | THREADVERSE LITTLE";

    document.getElementById("detailName").textContent = name;
    document.getElementById("detailCategory").textContent = product.type;
    document.getElementById("detailPrice").textContent =
      "₹" + product.price;

    document.getElementById("detailDescription").textContent =
      product.description;

    document.getElementById("detailAge").textContent =
      "Age group: " + product.ageLabel;

    document.getElementById("detailGender").textContent =
      "Style: " + product.gender;

    detailImage.src = product.image;
    detailImage.alt = name;

    // Baby size options.
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

    // Quantity buttons.
    const quantityInput = document.getElementById("quantityInput");
    const decreaseQty = document.getElementById("decreaseQty");
    const increaseQty = document.getElementById("increaseQty");

    if (decreaseQty && quantityInput) {
      decreaseQty.addEventListener("click", function () {
        quantityInput.value = Math.max(
          1,
          Number(quantityInput.value) - 1
        );
      });
    }

    if (increaseQty && quantityInput) {
      increaseQty.addEventListener("click", function () {
        quantityInput.value = Math.min(
          10,
          Number(quantityInput.value) + 1
        );
      });
    }

    // Add to Cart.
    const addButton = document.getElementById("addToCart");
    const message = document.getElementById("cartMessage");

    if (addButton) {
      addButton.addEventListener("click", function () {

        const size = sizeSelect.value;
        const quantity = Number(quantityInput.value);

        if (!size) {
          message.textContent = "Please select a baby size first.";
          sizeSelect.focus();
          return;
        }

        const cart = getCart();

        const existingItem = cart.find(function (item) {
          return item.name === name && item.size === size;
        });

        if (existingItem) {
          existingItem.quantity =
            Number(existingItem.quantity) + quantity;
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

        message.textContent =
          "Added to your shopping cart successfully!";

        updateCartCount();
      });
    }
  }

});
