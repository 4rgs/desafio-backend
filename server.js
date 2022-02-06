const port = '9000' || process.env.PORT
const express = require("express")
const app = express()
const Product = require('./src/producto/producto')
const isPalindrome = require('./utils/isPalindrome')
const { connect, getUri } = require("./db/db")


app.use(express.json());


(async ()=> {
    if (require.main === module) {
        const uri = await getUri()
        await connect({ uri }).then(
            app.listen(port,() => console.log(`PORT ${port}`))
        )
    }
})();

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

module.exports.app = app