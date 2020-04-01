/**
 * Format product price (purely for demonstration).
 *
 * This function can be refactored...
 * For example using "locales", options, etc
 *
 * @param {number} number
 * @param {object} options
 */
export default function formatProductPrice(price, currency) {
  return new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: currency
  }).format(price);
}
