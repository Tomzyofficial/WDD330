import { getLocalStorage } from "./utils.mjs";

const total = document.querySelector(".cartTotal");

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");
  if (cartItems) {
    //If the cart has items, iterate through the array and get the prices for the items. Add up the prices and display them in the div
    console.log("Products Exist!");
    let totalPrice = 0;
    cartItems.forEach((item) => {
      totalPrice += item.FinalPrice;
    });
    total.innerHTML = `Total: $${totalPrice.toFixed(2)}`;
    total.style.display = "block";
  } else {
    console.log("No Products...");
  }
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
</li>`;

  return newItem;
}

renderCartContents();
