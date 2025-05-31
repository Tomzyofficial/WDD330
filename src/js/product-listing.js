import ExternalServices from "./ExternalServices.mjs";

import ProductList from "./ProductList";

import { loadHeaderFooter, getParam } from "./utils.mjs";

loadHeaderFooter();

const category = getParam("category");

const dataSource = new ExternalServices();

const ele = document.querySelector(".product-list");

const productList = new ProductList(category, dataSource, ele);
productList.init();
