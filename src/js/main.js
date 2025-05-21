import ProductData from "./ProductData.mjs";

import ProductList from "./ProductList";

import { loadHeaderFooter } from "./utils.mjs";

const dataSource = new ProductData("tents");

const ele = document.querySelector(".product-list");

const productList = new ProductList("tents", dataSource, ele);
productList.init();

loadHeaderFooter();