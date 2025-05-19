import { getLocalStorage, setLocalStorage } from "./utils.mjs";

export default class ProductDetails {
    constructor(productId, dataSource) {
        this.productId = productId;
        this.product = {};
        this.dataSource = dataSource;
    }
    async init() {
        this.product = await this.dataSource.findProductById(this.productId)
        this.renderProductDetails()
        document.getElementById("addToCart")
            .addEventListener('click', this.addProductToCart.bind(this));

    }
    addProductToCart(product) {
    const cartItems = getLocalStorage("so-cart") || [];
    cartItems.push(this.product);
    setLocalStorage("so-cart", cartItems);
    }
    renderProductDetails() {
        htmlTemplate(this.product)
    }
}
  
function htmlTemplate(product) {
    document.querySelector("h2").textContent = product.Brand.Name
    document.querySelector("h3").textContent = product.NameWithoutBrand
    const productImage = document.getElementById("productImage")
    productImage.src = product.Image
    productImage.alt = product.NameWithoutBrand

    document.querySelector(".product-card__price").textContent = product.FinalPrice

    document.querySelector(".product__color").textContent = product.Colors[0].ColorName
    document.querySelector(".product__description").innerHTMl = product.DesciptionHtmlSimple

    document.querySelector("#addToCart").dataset.id = product.Id
}