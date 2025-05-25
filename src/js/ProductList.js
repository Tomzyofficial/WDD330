import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
  return `
    <li class="product-card">
      <p class="product-card__discount"></p>
      <a href="/product_pages/?product=${product.Id}">
        <img src="${product.Images.PrimaryMedium}" alt="Image of ${product.Name}">
        <h2 class="card__brand">${product.Brand.Name}</h2>
        <h3 class="card__name">${product.NameWithoutBrand}</h3>
        <p class="product-card__price">$${product.FinalPrice}</p>
      </a>
    </li>`;
}

// function to calculate and display the discount rate
function discountRate() {
  const prices = document.querySelectorAll(".product-card__price");
  const discounts = document.querySelectorAll(".product-card__discount");

  prices.forEach((priceEl, index) => {
    const discountEl = discounts[index]; // Match the discount with the corresponding price

    const suggestedPrice = 200; // Assuming this is the MSRP

    if (priceEl && discountEl) {
      const finalPrice = parseFloat(priceEl.textContent.replace("$", ""));

      if (finalPrice < suggestedPrice) {
        const rate = Math.round(
          ((suggestedPrice - finalPrice) / suggestedPrice) * 100,
        );
        discountEl.textContent = `${rate.toFixed(0)}% off`;
      } else {
        discountEl.textContent = "0% off"; // No discount
      }
    }
  });
}

/* Function to observe changes in the product list
first we have to select the product list element
use new MutationObserver to watch for changes
loop through added nodes
and check if they are product cards
if they are, check for the discount paragraph */
const productList = document.querySelector(".product");

const observer = new MutationObserver((mutationsList) => {
  mutationsList.forEach((mutation) => {
    mutation.addedNodes.forEach((node) => {
      if (node.nodeType === 1 && node.classList.contains("product-card")) {
        const discount = node.querySelector(".product-card__discount");
        if (discount) {
          discountRate();
        }
      }
    });
  });
});

observer.observe(productList, { childList: true });

export default class ProductList {
  constructor(catergory, dataSource, listElement) {
    this.category = catergory;
    this.dataSource = dataSource;
    this.listElement = listElement;
  }
  async init() {
    const list = await this.dataSource.getData(this.category);
    this.renderList(list);
    document.querySelector(".title").textContent = this.category;
  }
  renderList(list) {
    renderListWithTemplate(productCardTemplate, this.listElement, list);
  }
}
