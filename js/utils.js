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
