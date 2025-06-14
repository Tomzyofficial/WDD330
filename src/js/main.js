import ProductData from "./ProductData.mjs";
<<<<<<< HEAD

import ProductList from "./ProductList";

import { loadHeaderFooter } from "./utils.mjs";

const dataSource = new ProductData("tents");

const ele = document.querySelector(".product-list");

const productList = new ProductList("tents", dataSource, ele);
productList.init();

loadHeaderFooter();
=======
import ProductList from "./ProductList.mjs";

const dataSource = new ProductData("tents");

const element = document.querySelector(".product-list");

const productList = new ProductList("Tents", dataSource, element);

productList.init();
>>>>>>> 37a5af5dd56e5683d626f2b15ccb10053bbc1b57
