
document.addEventListener("DOMContentLoaded", () => {
  const productList = document.getElementById("product-list");
  const productDetails = document.getElementById("product-details");
  const wishlistEl = document.getElementById("wishlist");

  if (productList) {
    products.forEach(p => {
      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `
        <img src="${p.images[0]}" alt="${p.name}">
        <h3>${p.name}</h3>
        <p>${p.price}</p>
        <button onclick="location.href='product.html?id=${p.id}'">Detalji</button>
      `;
      productList.appendChild(card);
    });
  }

  if (productDetails) {
    const id = new URLSearchParams(window.location.search).get("id");
    const p = products.find(p => p.id == id);
    if (p) {
      productDetails.innerHTML = `
        <h2>${p.name}</h2>
        <div>${p.images.map(src => '<img src="' + src + '" width="300">').join("")}</div>
        <p>Cena: ${p.price}</p>
        <button onclick="addToWishlist(${p.id})">Dodaj u wishlist ❤️</button>
        <br><br>
        <a href="${p.buyLink}" target="_blank">Kupi proizvod</a>
      `;
    }
  }

  if (wishlistEl) {
    const ids = JSON.parse(localStorage.getItem("wishlist") || "[]");
    const items = products.filter(p => ids.includes(p.id));
    items.forEach(p => {
      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `
        <img src="${p.images[0]}" alt="${p.name}">
        <h3>${p.name}</h3>
        <p>${p.price}</p>
        <a href="${p.buyLink}" target="_blank">Kupi</a>
      `;
      wishlistEl.appendChild(card);
    });
  }

  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", e => {
      e.preventDefault();
      const user = document.getElementById("username").value;
      const pass = document.getElementById("password").value;
      const stored = JSON.parse(localStorage.getItem("users") || "{}");
    
        location.href = "index.html";
    });
  }

  const registerForm = document.getElementById("registerForm");
  if (registerForm) {
    registerForm.addEventListener("submit", e => {
      e.preventDefault();
      const user = document.getElementById("newUsername").value;
      const pass = document.getElementById("newPassword").value;
      const stored = JSON.parse(localStorage.getItem("users") || "{}");
      stored[user] = pass;
      localStorage.setItem("users", JSON.stringify(stored));
      location.href = "index.html";
    });
  }
});

function addToWishlist(id) {
  const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
  if (!wishlist.includes(id)) {
    wishlist.push(id);
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }
}
