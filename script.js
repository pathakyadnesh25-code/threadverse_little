
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

// ==========================================
// THREADVERSE LITTLE - SHOPPING CART PAGE
// ==========================================

document.addEventListener("DOMContentLoaded", function () {

  const cartItemsContainer = document.getElementById("cartItems");

  // Run only on Cart page.
  if (!cartItemsContainer) return;

  const emptyCart = document.getElementById("emptyCart");
  const itemCount = document.getElementById("cartItemCount");
  const summaryItems = document.getElementById("summaryItems");
  const subtotalElement = document.getElementById("cartSubtotal");
  const totalElement = document.getElementById("cartTotal");
  const checkoutButton = document.getElementById("checkoutButton");
  const headerCount = document.getElementById("headerCartCount");

  function readCart() {
    try {
      const cart = JSON.parse(
        localStorage.getItem("threadverseLittleCart") || "[]"
      );

      return Array.isArray(cart) ? cart : [];
    } catch (error) {
      return [];
    }
  }

  function saveCart(cart) {
    localStorage.setItem(
      "threadverseLittleCart",
      JSON.stringify(cart)
    );
  }

  function formatPrice(amount) {
    return "₹" + Number(amount).toLocaleString("en-IN");
  }

  function updateCart() {

    const cart = readCart();

    cartItemsContainer.innerHTML = "";

    const totalQuantity = cart.reduce(function (sum, item) {
      return sum + (Number(item.quantity) || 0);
    }, 0);

    const subtotal = cart.reduce(function (sum, item) {
      return sum +
        (Number(item.price) * Number(item.quantity));
    }, 0);

    if (headerCount) {
      headerCount.textContent = totalQuantity;
    }

    if (itemCount) {
      itemCount.textContent =
        totalQuantity +
        (totalQuantity === 1 ? " item" : " items");
    }

    if (summaryItems) {
      summaryItems.textContent = totalQuantity;
    }

    if (subtotalElement) {
      subtotalElement.textContent = formatPrice(subtotal);
    }

    if (totalElement) {
      totalElement.textContent = formatPrice(subtotal);
    }

    // Show empty cart message.
    if (cart.length === 0) {
      emptyCart.hidden = false;
      cartItemsContainer.hidden = true;
      return;
    }

    emptyCart.hidden = true;
    cartItemsContainer.hidden = false;

    // Display each cart product.
    cart.forEach(function (item, index) {

      const article = document.createElement("article");
      article.className = "cart-item";

      const image = document.createElement("img");
      image.className = "cart-item-image";
      image.src = item.image || "";
      image.alt = item.name || "Baby clothing";

      image.addEventListener("error", function () {
        image.style.visibility = "hidden";
      });

      const info = document.createElement("div");
      info.className = "cart-item-info";

      const name = document.createElement("h3");
      name.textContent = item.name;

      const size = document.createElement("p");
      size.textContent = "Size: " + item.size;

      const unitPrice = document.createElement("p");
      unitPrice.textContent =
        "Price: " + formatPrice(item.price);

      const quantityBox = document.createElement("div");
      quantityBox.className = "cart-quantity";

      const decrease = document.createElement("button");
      decrease.type = "button";
      decrease.textContent = "−";
      decrease.dataset.action = "decrease";
      decrease.dataset.index = index;
      decrease.setAttribute("aria-label", "Decrease quantity");

      const quantity = document.createElement("span");
      quantity.textContent = item.quantity;

      const increase = document.createElement("button");
      increase.type = "button";
      increase.textContent = "+";
      increase.dataset.action = "increase";
      increase.dataset.index = index;
      increase.setAttribute("aria-label", "Increase quantity");

      quantityBox.appendChild(decrease);
      quantityBox.appendChild(quantity);
      quantityBox.appendChild(increase);

      info.appendChild(name);
      info.appendChild(size);
      info.appendChild(unitPrice);
      info.appendChild(quantityBox);

      const actions = document.createElement("div");
      actions.className = "cart-item-actions";

      const lineTotal = document.createElement("div");
      lineTotal.className = "cart-line-total";
      lineTotal.textContent =
        formatPrice(Number(item.price) * Number(item.quantity));

      const removeButton = document.createElement("button");
      removeButton.type = "button";
      removeButton.className = "remove-cart-item";
      removeButton.textContent = "Remove";
      removeButton.dataset.action = "remove";
      removeButton.dataset.index = index;

      actions.appendChild(lineTotal);
      actions.appendChild(removeButton);

      article.appendChild(image);
      article.appendChild(info);
      article.appendChild(actions);

      cartItemsContainer.appendChild(article);
    });
  }

  // Handle quantity changes and remove buttons.
  cartItemsContainer.addEventListener("click", function (event) {

    const button = event.target.closest("button[data-action]");

    if (!button) return;

    const index = Number(button.dataset.index);
    const action = button.dataset.action;

    const cart = readCart();

    if (!cart[index]) return;

    if (action === "increase") {
      if (Number(cart[index].quantity) < 10) {
        cart[index].quantity =
          Number(cart[index].quantity) + 1;
      }
    }

    if (action === "decrease") {
      if (Number(cart[index].quantity) > 1) {
        cart[index].quantity =
          Number(cart[index].quantity) - 1;
      }
    }

    if (action === "remove") {
      cart.splice(index, 1);
    }

    saveCart(cart);
    updateCart();
  });

  // Checkout placeholder.
  if (checkoutButton) {
    checkoutButton.addEventListener("click", function () {

      const cart = readCart();

      if (cart.length === 0) {
        alert("Your shopping cart is empty. Please add a product first.");
        return;
      }

      alert(
        "Your cart is ready! We will build the secure Checkout page in the next stage."
      );
    });
  }

  // Initial cart display.
  updateCart();

});

// ==========================================
// THREADVERSE LITTLE - CHECKOUT FUNCTIONALITY
// ==========================================

document.addEventListener("DOMContentLoaded", function () {

  const checkoutForm = document.getElementById("checkoutForm");

  // Run only on Checkout page.
  if (!checkoutForm) return;

  const checkoutEmpty = document.getElementById("checkoutEmpty");
  const orderSuccess = document.getElementById("orderSuccess");
  const checkoutProducts = document.getElementById("checkoutProducts");

  function getCheckoutCart() {
    try {
      const cart = JSON.parse(
        localStorage.getItem("threadverseLittleCart") || "[]"
      );

      return Array.isArray(cart) ? cart : [];
    } catch (error) {
      return [];
    }
  }

  function money(amount) {
    return "₹" + Number(amount).toLocaleString("en-IN");
  }

  function showCheckoutCart() {

    const cart = getCheckoutCart();

    const count = cart.reduce(function (sum, item) {
      return sum + (Number(item.quantity) || 0);
    }, 0);

    const subtotal = cart.reduce(function (sum, item) {
      return sum + Number(item.price) * Number(item.quantity);
    }, 0);

    const headerCount = document.getElementById("headerCartCount");

    if (headerCount) {
      headerCount.textContent = count;
    }

    if (cart.length === 0) {
      checkoutForm.hidden = true;
      checkoutEmpty.hidden = false;
      return;
    }

    checkoutForm.hidden = false;
    checkoutEmpty.hidden = true;

    document.getElementById("checkoutItemCount").textContent = count;
    document.getElementById("checkoutSubtotal").textContent = money(subtotal);
    document.getElementById("checkoutTotal").textContent = money(subtotal);

    checkoutProducts.innerHTML = "";

    cart.forEach(function (item) {

      const product = document.createElement("div");
      product.className = "checkout-product";

      const image = document.createElement("img");
      image.src = item.image || "";
      image.alt = item.name || "Baby clothing";

      image.addEventListener("error", function () {
        image.style.visibility = "hidden";
      });

      const info = document.createElement("div");

      const name = document.createElement("h3");
      name.textContent = item.name;

      const size = document.createElement("p");
      size.textContent = "Size: " + item.size;

      const quantity = document.createElement("p");
      quantity.textContent = "Quantity: " + item.quantity;

      info.appendChild(name);
      info.appendChild(size);
      info.appendChild(quantity);

      const price = document.createElement("div");
      price.className = "checkout-product-price";
      price.textContent = money(
        Number(item.price) * Number(item.quantity)
      );

      product.appendChild(image);
      product.appendChild(info);
      product.appendChild(price);

      checkoutProducts.appendChild(product);
    });
  }

  // Display order information.
  showCheckoutCart();

  // Demo order submission only.
  checkoutForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const cart = getCheckoutCart();

    if (cart.length === 0) {
      alert("Your cart is empty. Please add a product first.");
      return;
    }

    if (!checkoutForm.reportValidity()) {
      return;
    }

    const payment = document.querySelector(
      'input[name="paymentMethod"]:checked'
    );

    if (!payment || payment.value !== "cod") {
      alert("Please select an available payment method.");
      return;
    }

    const formData = new FormData(checkoutForm);

    const demoOrder = {
      orderId: "TVL-DEMO-" + Date.now(),
      customer: {
        name: formData.get("customerName"),
        email: formData.get("customerEmail"),
        phone: formData.get("customerPhone")
      },
      address: {
        addressLine: formData.get("addressLine"),
        landmark: formData.get("landmark"),
        city: formData.get("city"),
        state: formData.get("state"),
        pincode: formData.get("pincode"),
        country: "India"
      },
      products: cart,
      paymentMethod: "Cash on Delivery (Demo)",
      subtotal: cart.reduce(function (sum, item) {
        return sum + Number(item.price) * Number(item.quantity);
      }, 0),
      createdAt: new Date().toISOString(),
      demoOnly: true
    };

    // Save only a demonstration order in this browser.
    try {
      const oldOrders = JSON.parse(
        localStorage.getItem("threadverseLittleDemoOrders") || "[]"
      );

      oldOrders.push(demoOrder);

      localStorage.setItem(
        "threadverseLittleDemoOrders",
        JSON.stringify(oldOrders)
      );
    } catch (error) {
      alert("Unable to save the demo order in this browser.");
      return;
    }

    document.getElementById("demoOrderId").textContent =
      demoOrder.orderId;

    checkoutForm.hidden = true;
    checkoutEmpty.hidden = true;
    orderSuccess.hidden = false;

    // Clear the demonstration cart after successful demo submission.
    localStorage.removeItem("threadverseLittleCart");

    const headerCount = document.getElementById("headerCartCount");

    if (headerCount) {
      headerCount.textContent = "0";
    }

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });

});
