import { timeStamp } from 'console'
import express from 'express'
const router = express.Router()
import { Cart } from '../utils/cartClass'
import { products } from '../routing/products'

console.log(products)

let carts: Cart[] = [
    {
        id: "unid",
        timestamp: 5,
        products: [
            {
                "name": "olga",
                "price": 3987,
                "id": "842ae59c-e781-4940-b6fd-1e7faabaa3e6",
                "timestamp": 1615051344837,
                "description": "a description",
                "picture": "url"
            }
        ]
    }, {
        id: "otroid",
        timestamp: 8,
        products: []
    }
]

router.get('/', (req, res) => {
    res.send(carts)
    console.log(products)
})

router.get('/:id', (req, res) => {
    const id: string = req.params.id
    const cart = carts.find(item => item.id === id)
    if (!cart) {
        res.sendStatus(404)
    } else {
        res.send(cart)
    }
})

router.post('/:id/:product', (req, res) => {
    const id: string = req.params.id
    const cart = carts.find(item => item.id === id)
    //tengo que fijarme si existe el producto (en /routing/products) PERO PRODUCTS LLEGA COMO UNDEFINED
    const productId = req.params.product
    const product = products.find(item => item.id === productId)
    if (!cart) {
        res.sendStatus(404)
    } else {
        cart.products.push(product)
    }
})



module.exports = router
