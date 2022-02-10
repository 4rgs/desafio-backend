const productIsPalindrome = require('./productIsPalindrome')
const isValidInput = require('./isValidInput')

module.exports = (product) => {
    if (productIsPalindrome(product) && isValidInput(product)) product.price = product.price * 0.5
    return product.price
}  