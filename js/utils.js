export function currencyFormatter(currency) {
  return Intl.NumberFormat(undefined, {
    style: "currency",
    currency: "USD",
  }).format(currency);
}
