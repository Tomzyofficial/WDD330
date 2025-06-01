import {
  getLocalStorage,
  loadHeaderFooter,
  getCartCount,
  updateCartCount,
} from "./utils.mjs";
import ShoppingCart from "./ShoppingCart";
loadHeaderFooter();

const cart = new ShoppingCart("so-cart", ".product-list");
cart.init();
/* if (cart.total > 0) {
  show our checkout button and total if there are items in the cart.
  document.querySelector(".list-footer").classList.remove("hide");
} */

const total = document.querySelector(".cart-total");

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart") || [];
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");
  if (cartItems) {
    let totalPrice = 0;
    cartItems.forEach((item) => {
      totalPrice += item.FinalPrice;
    });
    total.innerHTML = `Total: $${totalPrice.toFixed(2)}`;
  }
}

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Images.PrimaryMedium}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">
    <button class="add-button">+</button>
    <input type="number" id="item-quantity" value="1" min="1">
    <button class="decrease-button">-</button>

    </p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
  <p class="cart-remove__btn">X</p>
</li>`;

  return newItem;
}

// Add event listener to the product list to handle clicks on the remove button and remove the item from the cart
document.querySelector(".product-list").addEventListener("click", function (e) {
  if (e.target.classList.contains("cart-remove__btn")) {
    removeCartItem(e);
    getCartCount();
    updateCartCount();
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

document.addEventListener("click", function (event) {
  if (event.target.classList.contains("add-button")) {
    const input = event.target.nextElementSibling;
    if (input) input.value = parseInt(input.value) + 1;
  } else if (event.target.classList.contains("decrease-button")) {
    const input = event.target.previousElementSibling;
    if (input && parseInt(input.value) > 1) {
      input.value = parseInt(input.value) - 1;
    }
  }
});

renderCartContents();
