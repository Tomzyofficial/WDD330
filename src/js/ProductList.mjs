import renderListWithTemplate from "./utils.mjs";
function productCardTemplate(product) {
  return `
    <div class="product-card">
      <a href="product_pages/products=${product.Id}" class="product-card__link">
        <img src="${product.Image}" alt="${product.Name}">
      <h2 class="card__brand">${product.Brand.Name}</h2>
      <p class="card__name">${product.Name}</p>
      <p class="product-card__price">Price: $${product.FinalPrice}</p>
      </a>
    </div>
  `;
}

export default class ProductList {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
  }
  async init() {
    const list = await this.dataSource.getData()
    this.renderList(list);
  }
  renderList(list) {
    renderListWithTemplate(productCardTemplate, this.listElement, list);
  }
}