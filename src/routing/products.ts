import express, { Application } from 'express'
const router = express.Router()
const { v4: uuidv4 } = require('uuid');
import { products } from '../utils/productsClass'

const currentDate = new Date();
const timestamp = currentDate.getTime()

router.get('/', async (req, res) => {
    // console.log('routing', products.getProducts())
    res.send(await products.getProducts())
})

router.post('/', (req, res) => {
    console.log('post en /productos recibido, body: ', req.body)
    const { name, price, description, picture } = req.body
    products.addProduct(name, price, uuidv4(), timestamp, description, picture)
    res.sendStatus(201)
})

router.get('/:id', async (req, res) => {
    const id: string = (req.params.id)
    const product = await products.getProduct(id)
    if (!product) {
        res.sendStatus(404)
    }
    res.send(await products.getProduct(id))
})

router.delete('/:id', async (req, res) => {
    const id: string = req.params.id
    const product = await products.deleteProduct(id)
    console.log('router:', product)
    if (!product) {
        res.sendStatus(404)
    } else {
        res.sendStatus(202)
    }
})

router.patch('/:id', async (req, res) => {
    const id: string = req.params.id
    const body = req.body
    const product = await products.updateProduct(id, body)
    console.log('router:', product)
    if (!product) {
        res.sendStatus(404)
    }
    res.sendStatus(204)
})

module.exports = router