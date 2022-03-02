const mongoose = require('mongoose')

const Product = new mongoose.Schema({
  id: { type: Number },
  brand: { type: String, default: '' },
  description: { type: String, default: '' },
  image: { type: String, default: '' },
  price: { type: Number, default: 0 },
})

module.exports = mongoose.model('Product', Product)
