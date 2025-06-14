import { getCartCount, getLocalStorage, setLocalStorage, updateCartCount, alertMessage } from "./utils.mjs";

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }
  async init() {
    this.product = await this.dataSource.findProductById(this.productId)
    this.renderProductDetails()
    document.getElementById("add-to-cart")
      .addEventListener('click', this.addProductToCart.bind(this));

  }
  addProductToCart() {

    let cartContents = getLocalStorage("so-cart");
    //check to see if there was anything there
    if (!cartContents) {
      cartContents = [];
    }
    /*  if (cartContents.some(item => item.Id === this.product.Id)) {
       alertMessage(`${this.product.NameWithoutBrand} is already in your cart!`);
       return;
     } */

    // then add the current product to the list
    cartContents.push(this.product);
    setLocalStorage("so-cart", cartContents);
    alertMessage(`${this.product.NameWithoutBrand} added to cart!`);

    getCartCount();
    updateCartCount();

    // get the cart icon for animation whenever an item is added
    const cartIcon = document.querySelector(".cart");
    // animate the cart icon      
    cartIcon.classList.add("animate");
    // remove the animation class after 1 second
    setTimeout(() => {
      cartIcon.classList.remove("animate");
    }, 1000);
  }

  renderProductDetails() {
    htmlTemplate(this.product)
  }
}

function htmlTemplate(product) {
  /* document.querySelector("h2").textContent = product.Brand.Name
  document.querySelector("h3").textContent = product.NameWithoutBrand
  const productImage = document.getElementById("productImage")
  productImage.src = product.Image.PrimaryLarge
  productImage.alt = product.NameWithoutBrand

  document.getElementById("productPrice").textContent = `$${product.FinalPrice}`;

  document.getElementById("productColor").textContent = product.Colors[0].ColorName
  document.getElementById("productDesc").innerHTML = product.DescriptionHtmlSimple

  document.getElementById("addToCart").dataset.id = product.Id */

  document.querySelector("h2").textContent = product.Category.charAt(0).toUpperCase() + product.Category.slice(1);
  document.querySelector("#p-brand").textContent = product.Brand.Name;
  document.querySelector("#p-name").textContent = product.NameWithoutBrand;

  const productImage = document.querySelector("#p-image");
  productImage.src = product.Images.PrimaryExtraLarge;
  productImage.alt = product.NameWithoutBrand;
  const euroPrice = new Intl.NumberFormat('de-DE',
    {
      style: 'currency', currency: 'EUR',
    }).format(Number(product.FinalPrice) * 0.85);
  document.querySelector("#p-price").textContent = `${euroPrice}`;
  document.querySelector("#p-color").textContent = product.Colors[0].ColorName;
  document.querySelector("#p-description").innerHTML = product.DescriptionHtmlSimple;

  document.querySelector("#add-to-cart").dataset.id = product.Id;
}