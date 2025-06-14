<<<<<<< HEAD
import { getParam, loadHeaderFooter } from "./utils.mjs";
=======
import { getLocalStorage, setLocalStorage } from "./utils.mjs";
>>>>>>> 37a5af5dd56e5683d626f2b15ccb10053bbc1b57
import ProductData from "./ProductData.mjs";
import ProductDetails from "./ProductDetails.mjs";

loadHeaderFooter();

const dataSource = new ProductData("tents");
const productId = getParam("product");

const product = new ProductDetails(productId, dataSource);
product.init();

// add to cart button event handler
/* async function addToCartHandler(e) {
  const product = await dataSource.findProductById(e.target.dataset.id);
  addProductToCart(product);
}
 */
// add listener to Add to Cart button
/* document
  .getElementById("addToCart")
  .addEventListener("click", addToCartHandler); */
