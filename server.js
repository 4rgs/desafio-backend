const port = '9000' || process.env.PORT
const express = require("express")
const app = express()
const cors = require("cors")
const Product = require('./src/producto/producto')
const isPalindrome = require('./utils/isPalindrome')
const { connect, getUri } = require("./db/db")

const whitelist = ["http://localhost:3000"]

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error("Not allowed by CORS"))
    }
  },
  credentials: true,
}

app.use(cors(corsOptions))

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
        return res.status(400).json(err.message)
    })
})
app.get('/productos/busqueda',(req,res) => {
    let palindrome = false;
    Product.find()
    .then(products => {
        products.forEach(product => {
            if(isPalindrome(String(product.id))) palindrome = true
            if(isPalindrome(product.brand)) palindrome = true
            if(isPalindrome(product.description)) palindrome = true
            if(palindrome) product.price = product.price*0.5
            palindrome = false;
        })
        
        return res.status(200).json(products)
    })
    .catch(err => {
        return res.status(400).json(err.message)
    })
})
app.post('/productos/busqueda', (req,res) => {
    let palindrome = false;
    const body = req.body
    const {id,description,brand} = body 
    Product.find(req.body)
        .then(products => {
            products.forEach(product => {
                if(isPalindrome(String(product.id)) && id !== undefined) palindrome = true
                if(isPalindrome(product.brand) && brand !== undefined && brand.length >= 3) palindrome = true
                if(isPalindrome(product.description) && description !== undefined) palindrome = true
                if(palindrome) product.price = product.price*0.5
                palindrome = false;
            })
            if((description !== undefined && description.length >= 3)||
            (brand !== undefined && brand.length >= 3)||id !== undefined){
                return res.status(200).json(products)
            }else{
                return res.status(400).json('criterio de busqueda debe tener almenos 3 caracteres')
            }
        })
        .catch(err => {
            return res.status(400).json(err.message)
        })    
})

module.exports.app = app
