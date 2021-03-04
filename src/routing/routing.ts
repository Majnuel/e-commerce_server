import express, { Application } from 'express'
const router = express.Router()

let products: any[] = []

router.get('/', (req, res) => {
    res.send(products)
})

router.post('/', (req, res) => {
    console.log('post en /productos recibido, body: ', req.body)
    products.push(req.body)
    res.sendStatus(201)
})

router.get('/:id', (req, res) => {
    const id: number = parseInt(req.params.id)
    const product = products.find(item => item.id)
    //NO FUNCIONA
    // res.send(product).sendStatus(200)
    res.send(product)
})

router.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const product = products.find(item => item.id === id)
    if (!product) {
        res.sendStatus(404)
    }
    products = products.filter(item => item.id != id)
    res.sendStatus(202)
})

router.patch('/:id', (req, res) => {
    const id: number = parseInt(req.params.id)
    const product = products.find(item => item.id === id)
    if (!product) {
        res.sendStatus(404)
    }
    console.log(req.body)
    const { title, price, thumbnail } = req.body
    product.title = title
    product.price = price
    product.thumbnail = thumbnail
    res.sendStatus(204)

})

module.exports = router