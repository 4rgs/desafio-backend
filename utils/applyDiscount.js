const productIsPalindrome = require('./productIsPalindrome')

module.exports = (product) => {
  if (productIsPalindrome(product))
    product.price = product.price * 0.5
  return product.price
}
