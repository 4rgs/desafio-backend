module.exports = (string) => {
    var primeraMitad = string.replace(/[^0-9a-zA-Z]/g, '').toLowerCase();
    var otraMitad = primeraMitad.split('').reverse().join('');
    return otraMitad === primeraMitad;
}  