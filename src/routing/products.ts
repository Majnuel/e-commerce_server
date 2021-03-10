import express, { Application } from 'express'
const router = express.Router()
const { v4: uuidv4 } = require('uuid');
import { products } from '../utils/productsClass'

const currentDate = new Date();
const timestamp = currentDate.getTime()

router.get('/', (req, res) => {
    res.send(products.getProducts())
})

router.post('/', (req, res) => {
    console.log('post en /productos recibido, body: ', req.body)
    const { name, price, description, picture } = req.body
    products.addProduct(name, price, uuidv4(), timestamp, description, picture)
    res.sendStatus(201)
})

router.get('/:id', (req, res) => {
    const id: string = (req.params.id)
    const product = products.getProduct(id)
    if (!product) {
        res.sendStatus(404)
    }
    res.send(product)
})

router.delete('/:id', (req, res) => {
    const id: string = req.params.id
    const product = products.deleteProduct(id)
    if (!product) {
        res.sendStatus(404)
    } else {
        res.sendStatus(202)
    }
})

router.patch('/:id', (req, res) => {
    const id: string = req.params.id
    const body = req.body
    const product = products.updateProduct(id, body)
    if (!product) {
        res.sendStatus(404)
    }
    res.sendStatus(204)
})

module.exports = router