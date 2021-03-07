import express, { Application } from 'express'
const router = express.Router()
const { v4: uuidv4 } = require('uuid');
import { Product } from '../utils/productClass'

const currentDate = new Date();
const timestamp = currentDate.getTime()

export let products: Product[] = []

router.get('/', (req, res) => {
    res.send(products)
})

router.post('/', (req, res) => {
    console.log('post en /productos recibido, body: ', req.body)
    const { name, price, description, picture } = req.body
    const newProduct = new Product(name, price, uuidv4(), timestamp, description, picture)
    products.push(newProduct)
    res.sendStatus(201)
})

router.get('/:id', (req, res) => {
    const id: string = (req.params.id)
    const product = products.find(item => item.id === id)
    if (!product) {
        res.sendStatus(404)
    }
    //NO FUNCIONA
    // res.send(product).sendStatus(200)
    res.send(product)
})

router.delete('/:id', (req, res) => {
    const id: string = req.params.id
    const product = products.find(item => item.id === id)
    if (!product) {
        res.sendStatus(404)
    } else {

        products = products.filter(item => item.id != id)
        res.sendStatus(202)
    }
})

router.patch('/:id', (req, res) => {
    const id: string = req.params.id
    const product = products.find(item => item.id === id)
    if (!product) {
        res.sendStatus(404)
    } else {
        console.log(req.body)
        const { name, price, picture } = req.body
        product.name = name
        product.price = price
        product.picture = picture
    }
    res.sendStatus(204)
})

module.exports = router