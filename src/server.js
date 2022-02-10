const port = '9000' || process.env.PORT
const express = require("express")
const app = express()
const cors = require("cors")
const Product = require('./producto/producto')
const { connect, getUri } = require("../db/db")
const applyDiscount = require("../utils/applyDiscount")

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
    Product.find()
        .then(products => {
            products.forEach(product => {
                product.price = applyDiscount(product)
            })
            return res.status(200).json(products)
        })
        .catch(err => {
            return res.status(400).json(err.message)
        })
})
app.post('/productos/busqueda', async (req, res) => {
    const body = req.body
    let query
    if (!isNaN(body.query)) 
        query = { "id" : Number(body.query) }
    else {
        query =  [{"brand":{ $regex: '.*' + String(body.query) + '.*' }},{"description":{ $regex: '.*' + String(body.query) + '.*' }}]
    }
    await Product.find().or(query)
        .then(products => {
            products.forEach(product => {
                product.price = applyDiscount(product)
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
