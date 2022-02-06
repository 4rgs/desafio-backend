const port = '9000' || process.env.PORT
const express = require("express")
const app = express()
const mongoose = require('mongoose');


const Product = require('./src/producto/producto')
const isPalindrome = require('./utils/isPalindrome')
app.use(express.json())

const db = await mongoose.connect(`mongodb://productListUser:productListPassword@127.0.0.1:27017/promotions?authSource=admin`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then( (dbConnection) => {
    db = dbConnection
    afterwards()
    
}).catch(err => {
    console.log('Failed to connect to MongoDB', err)
});

app.get('/productos',(req,res) => {
    Product.find()
    .then(products => {
        return res.status(200).json(products)
    })
    .catch(err => {
        return res.status(420).json(err.message)
    })
})
app.get('/productos/busqueda', (req,res) => {
    const body = req.body
    const {id,description,brand} = body 
    Product.find(req.body)
        .then(products => {
            products.forEach(product => {
                if((isPalindrome(product.id) && id !== undefined) || 
                    (isPalindrome(product.brand) && brand !== undefined)|| 
                    (isPalindrome(product.description) && description !== undefined)){
                        product.price = product.price*0.5
                }
            })
            return res.status(200).json(products)
        })
        .catch(err => {
            return res.status(400).json(err.message)
        })    
})
function afterwards(){
    if (require.main === module) {
        app.listen(port,() => console.log(`PORT ${port}`))
    }
    db.disconnect();
}



module.exports.app = app