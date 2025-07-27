let products = [
  {
    id: 1,
    name: "Wireless Headphones",
    price: 99.99,
    description: "Premium noise-cancelling wireless headphones with 30-hour battery life.",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop&q=80",
    category: "electronics",
    rating: 4.8,
    onSale: false,
  },
  {
    id: 2,
    name: "Smart Watch",
    price: 199.99,
    description: "Advanced fitness tracking with heart rate monitoring and GPS.",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop&q=80",
    category: "electronics",
    rating: 4.6,
    onSale: true,
  },
  {
    id: 3,
    name: "Bluetooth Speaker",
    price: 79.99,
    description: "Portable speaker with 360° sound and waterproof design.",
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=300&fit=crop&q=80",
    category: "electronics",
    rating: 4.7,
    onSale: false,
  },
  {
    id: 4,
    name: "Phone Case",
    price: 24.99,
    description: "Durable protective case with wireless charging support.",
    image: "https://images.unsplash.com/photo-1556656793-08538906a9f8?w=400&h=300&fit=crop&q=80",
    category: "accessories",
    rating: 4.3,
    onSale: true,
  },
  {
    id: 5,
    name: "Laptop Stand",
    price: 49.99,
    description: "Ergonomic adjustable laptop stand for better posture.",
    image: "https://images.unsplash.com/photo-1641247530943-6af2b42e5f06?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "accessories",
    rating: 4.5,
    onSale: false,
  },
  {
    id: 6,
    name: "Gaming Mouse",
    price: 69.99,
    description: "High-precision gaming mouse with customizable RGB lighting.",
    image: "https://images.unsplash.com/photo-1527814050087-3793815479db?w=400&h=300&fit=crop&q=80",
    category: "electronics",
    rating: 4.9,
    onSale: true,
  },
];

let cart = [];
let currentFilter = "all";

function renderProducts() {
  const container = document.getElementById("product-container");
  container.innerHTML = "";

  let filteredProducts = products;

  if (currentFilter !== "all") {
    if (currentFilter === "sale") {
      filteredProducts = products.filter((product) => product.onSale);
    } else {
      filteredProducts = products.filter(
        (product) => product.category === currentFilter
      );
    }
  }

  filteredProducts.forEach((product, index) => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.style.animationDelay = `${index * 0.1}s`;

    const stars =
      "★".repeat(Math.floor(product.rating)) +
      "☆".repeat(5 - Math.floor(product.rating));

    card.innerHTML = `
            ${product.onSale ? '<div class="sale-badge">SALE</div>' : ""}
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-info">
              <h3 class="product-name">${product.name}</h3>
              <div class="product-price">$${product.price.toFixed(2)}</div>
              <p class="product-description">${product.description}</p>
              <div class="product-rating">
                <span class="stars">${stars}</span>
                <span class="rating-text">(${product.rating})</span>
              </div>
              <button class="add-to-cart" onclick="addToCart(${product.id})">
                Add to Cart
              </button>
            </div>
          `;

    container.appendChild(card);
  });
}

function addToCart(productId) {
  const product = products.find((p) => p.id === productId);
  if (product) {
    cart.push({ ...product, cartId: Date.now() + Math.random() });
    updateCartCount();
    showCartToast();

    // Add visual feedback
    const button = event.target;
    button.classList.add("added");
    button.textContent = "Added!";
    setTimeout(() => {
      button.classList.remove("added");
      button.textContent = "Add to Cart";
    }, 1000);
  }
}

function removeFromCart(cartId) {
  cart = cart.filter((item) => item.cartId !== cartId);
  updateCartCount();
  renderCart();
}

function updateCartCount() {
  document.getElementById("cart-count").textContent = cart.length;
}

function showCartToast() {
  const toast = document.getElementById("cart-toast");
  toast.classList.add("show");
  setTimeout(() => {
    toast.classList.remove("show");
  }, 2000);
}

function renderCart() {
  const cartBody = document.getElementById("cart-body");
  const cartTotal = document.getElementById("cart-total");

  if (cart.length === 0) {
    cartBody.innerHTML = `
            <div class="empty-cart">
              <div class="empty-cart-icon">🛒</div>
              <p>Your cart is empty</p>
            </div>
          `;
    cartTotal.querySelector(".total-amount").textContent = "$0.00";
    return;
  }

  cartBody.innerHTML = cart
    .map(
      (item) => `
          <div class="cart-item">
            <img src="${item.image}" alt="${item.name}" class="cart-item-image">
            <div class="cart-item-info">
              <div class="cart-item-name">${item.name}</div>
              <div class="cart-item-price">$${item.price.toFixed(2)}</div>
            </div>
            <button class="remove-item" onclick="removeFromCart(${item.cartId})">
              🗑️
            </button>
          </div>
        `
    )
    .join("");

  const total = cart.reduce((sum, item) => sum + item.price, 0);
  cartTotal.querySelector(".total-amount").textContent = `$${total.toFixed(2)}`;
}

function openCart() {
  renderCart();
  document.getElementById("cart-modal").classList.add("show");
}

function closeCart() {
  document.getElementById("cart-modal").classList.remove("show");
}

// Event listeners
document.getElementById("cart-button").addEventListener("click", openCart);
document.getElementById("close-cart").addEventListener("click", closeCart);

// Close cart when clicking outside
document.getElementById("cart-modal").addEventListener("click", (e) => {
  if (e.target === document.getElementById("cart-modal")) {
    closeCart();
  }
});

// Filter functionality
document.querySelectorAll(".filter-button").forEach((button) => {
  button.addEventListener("click", () => {
    document
      .querySelectorAll(".filter-button")
      .forEach((btn) => btn.classList.remove("active"));

    button.classList.add("active");
    currentFilter = button.dataset.category;
    renderProducts();
  });
});

// Initialize
renderProducts();