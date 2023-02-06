import storeData from "../data/store-data.json";
import { currencyFormatter } from "./utils";

const cartItemTemplate = document.querySelector("#cart-item-template");
const storeCartContainer = document.querySelector("#store-cart-container");
const cartBtn = document.querySelector("[data-cart-button]");
const cartItemsWrapper = document.querySelector("[data-cart-items-wrapper]");
const cartItemsEl = document.querySelector("[data-cart-items]");

const numOfCartItemsEl = document.querySelector("[data-cart-num-items]");
const cartItemsTotalEl = document.querySelector("[data-cart-items-total]");

let cart = [];

cartBtn.addEventListener("click", handleToggleCart);

function handleToggleCart(_e) {
  cartItemsWrapper.classList.toggle("invisible");
}

export function addItemToCart(cartItemId) {
  const existingItem = cart.find((cartItem) => cartItem.id === cartItemId);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ id: cartItemId, quantity: 1 });
  }

  renderCart();
}

function renderCart() {
  cartItemsEl.innerHTML = null;

  cart.forEach((cartItemEntry) => {
    const cartItem = storeData.find(({ id }) => id === cartItemEntry.id);

    const cartItemFragment = cartItemTemplate.content.cloneNode(true);

    const cartItemEl = cartItemFragment.querySelector("[data-cart-item]");
    cartItemEl.dataset.cartItemId = cartItem.id;

    const cartItemImageEl = cartItemFragment.querySelector("[data-cart-item-image]");
    cartItemImageEl.src = cartItem.imageUrl;

    const cartItemNameEl = cartItemFragment.querySelector("[data-cart-item-name]");
    cartItemNameEl.textContent = cartItem.name;

    const cartItemCategoryEl = cartItemFragment.querySelector("[data-cart-item-quantity]");
    cartItemCategoryEl.textContent = `x${cartItemEntry.quantity}`;

    const cartItemPriceEl = cartItemFragment.querySelector("[data-cart-item-price]");
    cartItemPriceEl.textContent = currencyFormatter(cartItem.priceCents / 100);

    cartItemsEl.append(cartItemEl);
  });

  calcTotalItemsInCart();
  calcTotalPriceOfItems();
}

function calcTotalItemsInCart() {
  let totalCartItems = 0;

  cart.forEach((cartItemEntry) => {
    if (cartItemEntry.quantity >= 1) {
      totalCartItems += cartItemEntry.quantity;
    } else {
      totalCartItems += 1;
    }
  });

  numOfCartItemsEl.textContent = totalCartItems;
}

function calcTotalPriceOfItems() {
  const totalPriceCents = cart.reduce((sum, cartItemEntry) => {
    const cartItem = storeData.find(({ id }) => id === cartItemEntry.id);

    if (cartItemEntry.quantity) {
      sum += cartItemEntry.quantity * cartItem.priceCents;
    } else {
      sum += cartItem.priceCents;
    }

    return sum;
  }, 0);

  cartItemsTotalEl.textContent = currencyFormatter(totalPriceCents / 100);
}

export default function setupCart() {}