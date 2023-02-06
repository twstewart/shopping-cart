export function currencyFormatter(currency) {
  return Intl.NumberFormat(undefined, {
    style: "currency",
    currency: "USD",
  }).format(currency);
}

export function addGlobalEventListener(type, selector, fn) {
  document.addEventListener(type, (e) => {
    if (e.target.matches(selector)) {
      fn(e);
    }
  });
}

export function saveToStorage(key, value) {
  sessionStorage.setItem(key, JSON.stringify(value));
}

export function getFromStorage(key) {
  return JSON.parse(sessionStorage.getItem(key));
}
