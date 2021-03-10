import { timeStamp } from 'console'
import express from 'express'
const router = express.Router()
import { carts } from '../utils/cartClass'
import { products } from '../utils/productsClass'

// console.log(products.getProducts())

// let carts: Cart[] = [
//     {
//         id: "unid",
//         timestamp: 5,
//         products: [
//             {
//                 "name": "olga",
//                 "price": 3987,
//                 "id": "842ae59c-e781-4940-b6fd-1e7faabaa3e6",
//                 "timestamp": 1615051344837,
//                 "description": "a description",
//                 "picture": "url"
//             }
//         ]
//     }, {
//         id: "otroid",
//         timestamp: 8,
//         products: []
//     }
// ]

router.get('/', (req, res) => {
    res.send(carts.getCarts())
})

router.post('/create-cart', (req, res) => {
    const id = req.body.id
    if (id === undefined) {
        res.sendStatus(400)
    } else {
        carts.addCart(id)
        res.sendStatus(200)
    }

})

router.get('/:id', (req, res) => {
    const id: string = req.params.id
    if (!carts.getCart(id)) {
        res.sendStatus(404)
    } else {
        res.send(carts.getCart(id))
    }
})

router.post('/:id/:productID', (req, res) => {
    const id: string = req.params.id
    const productID: string = req.params.productID
    console.log(id, productID)
    if (!carts.getCart(id)) {
        res.sendStatus(404)
    } else if (!products.getProduct(productID)) {
        res.sendStatus(404)
    } else {
        const product = products.getProduct(productID)
        console.log("fetched product: ", product)
        carts.addToCart(id, product)
        res.sendStatus(200)
    }
})

router.delete('/:id/:productID', (req, res) => {
    const id: string = req.params.id
    const productID: string = req.params.productID
    if (!carts.getCart(id)) {
        res.sendStatus(404)
    } else if (!products.getProduct(productID)) {
        res.sendStatus(404)
    } else {
        const product = products.getProduct(productID)
        console.log("fetched product: ", product)
        carts.removeFromCart(id, productID)
        res.sendStatus(200)
    }

})



module.exports = router
