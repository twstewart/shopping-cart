import storeItems from "../data/store-data.json";
import { addItemToCart } from "./cart";
import { addGlobalEventListener, currencyFormatter } from "./utils";

const storeItemTemplate = document.querySelector("#store-item-template");
const storeWrapper = document.querySelector("[data-store-wrapper]");

function renderStoreItem(storeItem) {
  const storeItemFragment = storeItemTemplate.content.cloneNode(true);

  const storeItemEl = storeItemFragment.querySelector("[data-store-item]");
  storeItemEl.dataset.storeItemId = storeItem.id;

  const itemImageEl = storeItemFragment.querySelector("[data-store-item-image]");
  itemImageEl.src = storeItem.imageUrl;

  const itemCategoryEl = storeItemFragment.querySelector("[data-store-item-category]");
  itemCategoryEl.textContent = storeItem.category;

  const itemNameEl = storeItemFragment.querySelector("[data-store-item-name]");
  itemNameEl.textContent = storeItem.name;

  const itemPriceEl = storeItemFragment.querySelector("[data-store-item-price]");
  itemPriceEl.textContent = currencyFormatter(storeItem.priceCents / 100);

  storeWrapper.append(storeItemEl);
}

export default function setupStore() {
  addGlobalEventListener("click", "[data-add-to-cart]", (e) => {
    const storeItemEl = e.target.closest("[data-store-item]");
    const { storeItemId: id } = storeItemEl.dataset;

    addItemToCart(parseInt(id));
  });

  storeItems.forEach(renderStoreItem);
}
