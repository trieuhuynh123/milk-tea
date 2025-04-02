import { combineReducers } from "@reduxjs/toolkit";
import auth from "./auth";
import cart from "./cart";
import search from "./search";
import store from "./store";
import product from "./product";
import category from "./category";
import config from "./config";
import order from "./order";

export const reducer = combineReducers({
  auth,
  cart,
  search,
  store,
  product,
  category,
  config,
  order,
});
