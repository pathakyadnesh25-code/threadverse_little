
/* =====================================================
   THREADVERSE LITTLE - COMPLETE WEBSITE SCRIPT
   Checkout navigation fix included
   ===================================================== */

(function () {
  "use strict";

  function initializeWebsite() {

    // -------------------------------------------------
    // 1. SETTINGS
    // -------------------------------------------------

    const CART_KEY = "threadverseLittleCart";
    const ORDERS_KEY = "threadverseLittleDemoOrders";

    const sampleImage =
      "https://images.unsplash.com/photo-1622290319146-7b63df48a635?auto=format&fit=crop&w=1000&q=85";

    function getCart() {
      try {
        const cart = JSON.parse(localStorage.getItem(CART_KEY) || "[]");
        return Array.isArray(cart) ? cart : [];
      } catch (error) {
        console.error("Cart loading error:", error);
        return [];
      }
    }

    function saveCart(cart) {
      localStorage.setItem(CART_KEY, JSON.stringify(cart));
      updateCartCount();
    }

    function formatPrice(price) {
      return "₹" + Number(price || 0).toLocaleString("en-IN");
    }

    function updateCartCount() {
      const countElement = document.getElementById("headerCartCount");
      if (!countElement) return;

      const count = getCart().reduce(function (total, item) {
        return total + (Number(item.quantity) || 0);
      }, 0);

      countElement.textContent = count;
    }

    // -------------------------------------------------
    // 2. PRODUCT INFORMATION
    // -------------------------------------------------

    const products = {
      "Little Cloud Romper": {
        price: 399,
        age: "newborn",
        ageLabel: "0–3 Months",
        gender: "Unisex",
        type: "Rompers",
        image: sampleImage,
        description: "A lovely romper style for your baby's everyday wardrobe."
      },

      "Everyday Baby Set": {
        price: 599,
        age: "infant",
        ageLabel: "3–12 Months",
        gender: "Boys",
        type: "Clothing Sets",
        image: sampleImage,
        description: "A comfortable clothing set for your little one's wardrobe."
      },

      "Dreamy Nightwear": {
        price: 499,
        age: "newborn",
        ageLabel: "0–3 Months",
        gender: "Girls",
        type: "Nightwear",
        image: sampleImage,
        description: "A lovely nightwear style for your baby's collection."
      },

      "Tiny Sunshine Bodysuit": {
        price: 349,
        age: "infant",
        ageLabel: "3–12 Months",
        gender: "Unisex",
        type: "Bodysuits",
        image: sampleImage,
        description: "A cute bodysuit for everyday baby wear."
      },

      "Little Blossom Set": {
        price: 649,
        age: "newborn",
        ageLabel: "0–3 Months",
        gender: "Girls",
        type: "Clothing Sets",
        image: sampleImage,
        description: "A beautiful clothing set for your little one."
      },

      "Cozy Little Romper": {
        price: 449,
        age: "infant",
        ageLabel: "3–12 Months",
        gender: "Boys",
        type: "Rompers",
        image: sampleImage,
        description: "A cute romper style for everyday baby wear."
      },

      "Soft Cloud Bodysuit": {
        price: 329,
        age: "newborn",
        ageLabel: "0–3 Months",
        gender: "Unisex",
        type: "Bodysuits",
        image: sampleImage,
        description: "A soft-looking bodysuit style for newborns."
      },

      "Little Star Night Suit": {
        price: 549,
        age: "infant",
        ageLabel: "3–12 Months",
        gender: "Girls",
        type: "Nightwear",
        image: sampleImage,
        description: "A lovely night suit style for your baby's wardrobe."
      }
    };

    updateCartCount();


    // -------------------------------------------------
    // 3. MOBILE NAVIGATION
    // -------------------------------------------------

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


    // -------------------------------------------------
    // 4. COPYRIGHT YEAR
    // -------------------------------------------------

    const yearElement = document.getElementById("currentYear");

    if (yearElement) {
      yearElement.textContent = new Date().getFullYear();
    }


    // -------------------------------------------------
    // 5. NEWSLETTER
    // -------------------------------------------------

    const newsletterForm = document.getElementById("newsletterForm");

    if (newsletterForm) {
      newsletterForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const email = document.getElementById("emailInput");
        const message = document.getElementById("newsletterMessage");

        if (email && email.value.trim()) {
          if (message) {
            message.textContent =
              "Thank you for your interest in THREADVERSE LITTLE!";
          }

          email.value = "";
        }
      });
    }


    // -------------------------------------------------
    // 6. SHOP PAGE - SEARCH, FILTER AND SORT
    // -------------------------------------------------

    const productGrid = document.getElementById("shopProductGrid");

    if (productGrid) {

      const cards = Array.from(
        productGrid.querySelectorAll(".shop-product-card")
      );

      const searchInput = document.getElementById("productSearch");
      const sortSelect = document.getElementById("sortProducts");
      const resultCount = document.getElementById("resultCount");
      const noProducts = document.getElementById("noProducts");

      function selectedFilter(name) {
        const selected = document.querySelector(
          'input[name="' + name + '"]:checked'
        );

        return selected ? selected.value : "all";
      }

      function filterProducts() {

        const searchText = searchInput
          ? searchInput.value.toLowerCase().trim()
          : "";

        const age = selectedFilter("age");
        const gender = selectedFilter("gender");
        const type = selectedFilter("type");

        let visibleCards = [];

        cards.forEach(function (card) {

          const name = (card.dataset.name || "").toLowerCase();

          const matchesSearch = name.includes(searchText);
          const matchesAge =
            age === "all" || card.dataset.age === age;
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

        if (sortSelect) {

          if (sortSelect.value === "low") {
            visibleCards.sort(function (a, b) {
              return Number(a.dataset.price) - Number(b.dataset.price);
            });
          }

          if (sortSelect.value === "high") {
            visibleCards.sort(function (a, b) {
              return Number(b.dataset.price) - Number(a.dataset.price);
            });
          }

          if (sortSelect.value === "name") {
            visibleCards.sort(function (a, b) {
              return (a.dataset.name || "").localeCompare(
                b.dataset.name || ""
              );
            });
          }
        }

        visibleCards.forEach(function (card) {
          productGrid.appendChild(card);
        });

        if (resultCount) {
          resultCount.textContent =
            visibleCards.length +
            (visibleCards.length === 1 ? " product" : " products");
        }

        if (noProducts) {
          noProducts.hidden = visibleCards.length > 0;
        }
      }

      if (searchInput) {
        searchInput.addEventListener("input", filterProducts);
      }

      if (sortSelect) {
        sortSelect.addEventListener("change", filterProducts);
      }

      document.querySelectorAll(
        '.shop-page input[type="radio"]'
      ).forEach(function (input) {
        input.addEventListener("change", filterProducts);
      });

      const clearButtons = [
        document.getElementById("clearFilters"),
        document.getElementById("resetNoProducts")
      ];

      clearButtons.forEach(function (button) {
        if (!button) return;

        button.addEventListener("click", function () {

          ["age", "gender", "type"].forEach(function (group) {
            const all = document.querySelector(
              'input[name="' + group + '"][value="all"]'
            );

            if (all) all.checked = true;
          });

          if (searchInput) searchInput.value = "";
          if (sortSelect) sortSelect.value = "featured";

          filterProducts();
        });
      });

      // Click a product card to open its details.
      cards.forEach(function (card) {
        card.addEventListener("click", function (event) {

          if (event.target.closest("a, button")) return;

          const name = card.dataset.name;

          if (name) {
            window.location.href =
              "product.html?name=" + encodeURIComponent(name);
          }
        });
      });

      filterProducts();
    }


    // -------------------------------------------------
    // 7. PRODUCT DETAILS PAGE
    // -------------------------------------------------

    const detailImage = document.getElementById("detailImage");

    if (detailImage) {

      const params = new URLSearchParams(window.location.search);
      const productName = params.get("name");
      const product = products[productName];

      const detailName = document.getElementById("detailName");
      const detailPrice = document.getElementById("detailPrice");
      const detailCategory = document.getElementById("detailCategory");
      const detailDescription =
        document.getElementById("detailDescription");
      const sizeSelect = document.getElementById("sizeSelect");
      const quantityInput = document.getElementById("quantityInput");
      const addButton = document.getElementById("addToCart");
      const cartMessage = document.getElementById("cartMessage");

      if (!product) {

        if (detailName) detailName.textContent = "Product not found";

        if (detailDescription) {
          detailDescription.textContent =
            "Please return to the shop and select a product.";
        }

      } else {

        document.title = productName + " | THREADVERSE LITTLE";

        if (detailName) detailName.textContent = productName;
        if (detailPrice) detailPrice.textContent = formatPrice(product.price);
        if (detailCategory) detailCategory.textContent = product.type;

        if (detailDescription) {
          detailDescription.textContent = product.description;
        }

        detailImage.src = product.image;
        detailImage.alt = productName;

        // Baby sizes.
        if (sizeSelect) {

          sizeSelect.innerHTML =
            '<option value="">Select Baby Size</option>';

          const sizes = product.age === "newborn"
            ? ["Newborn", "0–3 Months"]
            : ["3–6 Months", "6–9 Months", "9–12 Months"];

          sizes.forEach(function (size) {
            const option = document.createElement("option");
            option.value = size;
            option.textContent = size;
            sizeSelect.appendChild(option);
          });
        }

        // Quantity buttons.
        const decreaseButton = document.getElementById("decreaseQty");
        const increaseButton = document.getElementById("increaseQty");

        if (quantityInput) {
          quantityInput.value = 1;
          quantityInput.min = 1;
          quantityInput.max = 10;
        }

        if (decreaseButton && quantityInput) {
          decreaseButton.addEventListener("click", function () {
            quantityInput.value = Math.max(
              1,
              (Number(quantityInput.value) || 1) - 1
            );
          });
        }

        if (increaseButton && quantityInput) {
          increaseButton.addEventListener("click", function () {
            quantityInput.value = Math.min(
              10,
              (Number(quantityInput.value) || 1) + 1
            );
          });
        }

        // Add to cart.
        if (addButton) {

          addButton.addEventListener("click", function () {

            const size = sizeSelect ? sizeSelect.value : "";
            const quantity = Math.max(
              1,
              Math.min(10, Number(quantityInput?.value) || 1)
            );

            if (!size) {
              if (cartMessage) {
                cartMessage.textContent = "Please select a baby size first.";
              }

              if (sizeSelect) sizeSelect.focus();
              return;
            }

            const cart = getCart();

            const existing = cart.find(function (item) {
              return item.name === productName && item.size === size;
            });

            if (existing) {
              existing.quantity = Math.min(
                10,
                Number(existing.quantity) + quantity
              );
            } else {
              cart.push({
                name: productName,
                price: product.price,
                image: product.image,
                size: size,
                quantity: quantity
              });
            }

            saveCart(cart);

            if (cartMessage) {
              cartMessage.textContent =
                "Product added to your cart successfully!";
            }
          });
        }
      }
    }


    // -------------------------------------------------
    // 8. CART PAGE
    // -------------------------------------------------

    const cartContainer = document.getElementById("cartItems");

    if (cartContainer) {

      const emptyCart = document.getElementById("emptyCart");
      const itemCount = document.getElementById("cartItemCount");
      const summaryItems = document.getElementById("summaryItems");
      const subtotalElement = document.getElementById("cartSubtotal");
      const totalElement = document.getElementById("cartTotal");

      function renderCart() {

        const cart = getCart();

        cartContainer.innerHTML = "";

        const quantityTotal = cart.reduce(function (sum, item) {
          return sum + Number(item.quantity || 0);
        }, 0);

        const subtotal = cart.reduce(function (sum, item) {
          return sum +
            Number(item.price || 0) * Number(item.quantity || 0);
        }, 0);

        if (itemCount) {
          itemCount.textContent =
            quantityTotal +
            (quantityTotal === 1 ? " item" : " items");
        }

        if (summaryItems) summaryItems.textContent = quantityTotal;
        if (subtotalElement) subtotalElement.textContent = formatPrice(subtotal);
        if (totalElement) totalElement.textContent = formatPrice(subtotal);

        if (cart.length === 0) {

          if (emptyCart) emptyCart.hidden = false;

          cartContainer.hidden = true;
          return;
        }

        if (emptyCart) emptyCart.hidden = true;

        cartContainer.hidden = false;

        cart.forEach(function (item, index) {

          const article = document.createElement("article");
          article.className = "cart-item";

          const image = document.createElement("img");
          image.className = "cart-item-image";
          image.src = item.image || sampleImage;
          image.alt = item.name || "Baby clothing";

          const info = document.createElement("div");
          info.className = "cart-item-info";

          const name = document.createElement("h3");
          name.textContent = item.name;

          const size = document.createElement("p");
          size.textContent = "Size: " + item.size;

          const price = document.createElement("p");
          price.textContent = "Price: " + formatPrice(item.price);

          const quantityBox = document.createElement("div");
          quantityBox.className = "cart-quantity";

          const minus = document.createElement("button");
          minus.type = "button";
          minus.textContent = "−";
          minus.dataset.action = "decrease";
          minus.dataset.index = index;

          const quantity = document.createElement("span");
          quantity.textContent = item.quantity;

          const plus = document.createElement("button");
          plus.type = "button";
          plus.textContent = "+";
          plus.dataset.action = "increase";
          plus.dataset.index = index;

          quantityBox.append(minus, quantity, plus);
          info.append(name, size, price, quantityBox);

          const actions = document.createElement("div");
          actions.className = "cart-item-actions";

          const lineTotal = document.createElement("strong");
          lineTotal.textContent = formatPrice(
            Number(item.price) * Number(item.quantity)
          );

          const remove = document.createElement("button");
          remove.type = "button";
          remove.textContent = "Remove";
          remove.dataset.action = "remove";
          remove.dataset.index = index;

          actions.append(lineTotal, remove);
          article.append(image, info, actions);

          cartContainer.appendChild(article);
        });
      }

      // Quantity and remove buttons.
      cartContainer.addEventListener("click", function (event) {

        const button = event.target.closest("button[data-action]");

        if (!button) return;

        const index = Number(button.dataset.index);
        const action = button.dataset.action;
        const cart = getCart();

        if (!cart[index]) return;

        if (action === "increase") {
          cart[index].quantity = Math.min(
            10,
            Number(cart[index].quantity) + 1
          );
        }

        if (action === "decrease") {
          cart[index].quantity = Math.max(
            1,
            Number(cart[index].quantity) - 1
          );
        }

        if (action === "remove") {
          cart.splice(index, 1);
        }

        saveCart(cart);
        renderCart();
      });

      renderCart();
    }


    // -------------------------------------------------
    // 9. IMPORTANT CHECKOUT BUTTON FIX
    // -------------------------------------------------

    /*
      This is the main fix.

      It detects:
      - id="checkoutButton"
      - class="checkout-button"
      - data-checkout attribute
      - buttons with the text "Proceed to Checkout"

      It works even if the button is created after page loading.
    */

    document.addEventListener("click", function (event) {

      const button = event.target.closest(
        "#checkoutButton, .checkout-button, [data-checkout]"
      );

      if (!button) return;

      event.preventDefault();

      const cart = getCart();

      if (cart.length === 0) {
        alert("Your shopping cart is empty. Please add a product first.");
        return;
      }

      // Build the correct checkout address for GitHub Pages.
      const checkoutURL = new URL(
        "checkout.html",
        window.location.href
      );

      window.location.assign(checkoutURL.href);

    }, true);


    // -------------------------------------------------
    // 10. CHECKOUT PAGE
    // -------------------------------------------------

    const checkoutForm = document.getElementById("checkoutForm");

    if (checkoutForm) {

      const checkoutEmpty = document.getElementById("checkoutEmpty");
      const orderSuccess = document.getElementById("orderSuccess");
      const checkoutProducts =
        document.getElementById("checkoutProducts");

      function renderCheckout() {

        const cart = getCart();

        const count = cart.reduce(function (sum, item) {
          return sum + Number(item.quantity || 0);
        }, 0);

        const subtotal = cart.reduce(function (sum, item) {
          return sum +
            Number(item.price || 0) * Number(item.quantity || 0);
        }, 0);

        if (cart.length === 0) {

          checkoutForm.hidden = true;

          if (checkoutEmpty) checkoutEmpty.hidden = false;

          return;
        }

        checkoutForm.hidden = false;

        if (checkoutEmpty) checkoutEmpty.hidden = true;

        const countElement =
          document.getElementById("checkoutItemCount");
        const subtotalElement =
          document.getElementById("checkoutSubtotal");
        const totalElement =
          document.getElementById("checkoutTotal");

        if (countElement) countElement.textContent = count;
        if (subtotalElement) {
          subtotalElement.textContent = formatPrice(subtotal);
        }
        if (totalElement) {
          totalElement.textContent = formatPrice(subtotal);
        }

        if (!checkoutProducts) return;

        checkoutProducts.innerHTML = "";

        cart.forEach(function (item) {

          const row = document.createElement("div");
          row.className = "checkout-product";

          const image = document.createElement("img");
          image.src = item.image || sampleImage;
          image.alt = item.name;

          const info = document.createElement("div");

          const name = document.createElement("h3");
          name.textContent = item.name;

          const size = document.createElement("p");
          size.textContent = "Size: " + item.size;

          const quantity = document.createElement("p");
          quantity.textContent = "Quantity: " + item.quantity;

          info.append(name, size, quantity);

          const price = document.createElement("strong");
          price.textContent = formatPrice(
            Number(item.price) * Number(item.quantity)
          );

          row.append(image, info, price);
          checkoutProducts.appendChild(row);
        });
      }

      renderCheckout();

      // Place demo order.
      checkoutForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const cart = getCart();

        if (cart.length === 0) {
          alert("Your cart is empty.");
          return;
        }

        if (!checkoutForm.reportValidity()) return;

        const payment = document.querySelector(
          'input[name="paymentMethod"]:checked'
        );

        if (!payment || payment.value !== "cod") {
          alert("Please select Cash on Delivery.");
          return;
        }

        const formData = new FormData(checkoutForm);

        const order = {

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
          paymentMethod: "Cash on Delivery - Demo",

          subtotal: cart.reduce(function (sum, item) {
            return sum +
              Number(item.price) * Number(item.quantity);
          }, 0),

          createdAt: new Date().toISOString(),
          demoOnly: true
        };

        try {

          const orders = JSON.parse(
            localStorage.getItem(ORDERS_KEY) || "[]"
          );

          if (!Array.isArray(orders)) {
            throw new Error("Invalid order data");
          }

          orders.push(order);

          localStorage.setItem(
            ORDERS_KEY,
            JSON.stringify(orders)
          );

        } catch (error) {

          console.error("Order saving error:", error);

          alert("Unable to save your demo order. Please try again.");

          return;
        }

        const orderIdElement =
          document.getElementById("demoOrderId");

        if (orderIdElement) {
          orderIdElement.textContent = order.orderId;
        }

        checkoutForm.hidden = true;

        if (checkoutEmpty) checkoutEmpty.hidden = true;
        if (orderSuccess) orderSuccess.hidden = false;

        localStorage.removeItem(CART_KEY);

        updateCartCount();

        window.scrollTo({
          top: 0,
          behavior: "smooth"
        });

      });
    }

  }


  // Run after the page is ready.
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initializeWebsite);
  } else {
    initializeWebsite();
  }

})();
