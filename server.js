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
const isValidInput = (body) => {
    if ((body.description !== undefined && body.description.length >= 3) ||
        (body.brand !== undefined && body.brand.length >= 3) ||
        (body.id !== undefined)) {
        return true
    } else {
        return false
    }
}

app.use(cors(corsOptions))

app.use(express.json());


(async () => {
    if (require.main === module) {
        const uri = await getUri()
        await connect({ uri }).then(
            app.listen(port, () => console.log(`PORT ${port}`))
        )
    }
})();

app.get('/productos', (req, res) => {
    Product.find()
        .then(products => {
            return res.status(200).json(products)
        })
        .catch(err => {
            return res.status(400).json(err.message)
        })
})
app.get('/productos/busqueda', (req, res) => {
    let palindrome = false;
    Product.find()
        .then(products => {
            products.forEach(product => {
                if (isPalindrome(String(product.id)) ||
                    isPalindrome(product.brand) ||
                    isPalindrome(product.description))
                    palindrome = true
                if (palindrome && isValidInput(product)) product.price = product.price * 0.5
                palindrome = false;
            })
            return res.status(200).json(products)
        })
        .catch(err => {
            return res.status(400).json(err.message)
        })
})
app.post('/productos/busqueda', async (req, res) => {
    let palindrome = false;
    const body = req.body
    let query
    if (!isNaN(body.query)) 
        query = { "id" : Number(body.query) }
    else 
        query =  [{"brand":{ $regex: '.*' + body.query + '.*' }},{"description":{ $regex: '.*' + body.query + '.*' }}]
    await Product.find().or(query)
        .then(products => {
            products.forEach(product => {
                if (isPalindrome(String(product.id)) ||
                    isPalindrome(product.brand) ||
                    isPalindrome(product.description))
                    palindrome = true
                if (palindrome && isValidInput(product)) product.price = product.price * 0.5
                palindrome = false;
            })
            if(Array.isArray(query)){
                if(query[0].brand.$regex.length <= 6  || query[1].description.$regex.length <= 6) return res.status(400).json("criterio de busqueda debe ser de minimo 3 caracteres")     
            }
            return res.status(200).json(products)
        })
        .catch(err => {
            return res.status(400).json(err.message)
        })
})

module.exports.app = app
