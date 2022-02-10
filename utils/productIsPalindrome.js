const isPalindrome = require('./isPalindrome')

module.exports = (producto) => {
    return (isPalindrome(String(producto.id)) ||
    isPalindrome(producto.brand) ||
    isPalindrome(producto.description))
}  