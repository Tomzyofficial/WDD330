import { getLocalStorage } from "./utils.mjs";

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");
}

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Image}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
  <p class="cart-remove__btn">X</p>
</li>`;

  return newItem;
}

// Add event listener to the product list to handle clicks on the remove button and remove the item from the cart
document.querySelector(".product-list").addEventListener("click", function (e) {
  if (e.target.classList.contains("cart-remove__btn")) {
    removeCartItem(e);
  }
});

function removeCartItem(e) {
  // Find the cart-card element
  const cartCard = e.target.closest(".cart-card");
  const name = cartCard.querySelector(".card__name").textContent;
  const cartItems = getLocalStorage("so-cart");
  const itemIndex = cartItems.findIndex((item) => item.Name === name);
  if (itemIndex > -1) {
    cartItems.splice(itemIndex, 1);
    localStorage.setItem("so-cart", JSON.stringify(cartItems));
    renderCartContents();
  }
}

renderCartContents();
