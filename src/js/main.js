import ProductData from "./ProductData.mjs";
import ProductList from "./productList.mjs";

const dataSource = new ProductData("tents");

const ele = document.querySelector(".product-list");

const products = new ProductList("Tents", dataSource, ele);
products.init();