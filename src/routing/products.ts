import express, { Application } from 'express'
const router = express.Router()
const { v4: uuidv4 } = require('uuid');
import { products } from '../utils/productsClass'

const currentDate = new Date();
const timestamp = currentDate.getTime()

router.get('/', async (req, res) => {
    const queryParams = req.query
    // console.log("el valor de la key: ", queryParams.word)
    if (Object.keys(queryParams).length > 0) {
        // console.log("HAY QUERY PARAMS EN GET")
        if (Object.keys(queryParams).includes("min" || "max")) {
            console.log("hay min o max en query params")
            let min: any
            let max: any
            queryParams.min ? min = queryParams.min : min = 0
            queryParams.max ? max = queryParams.max : max = 9999
            parseInt(min)
            parseInt(max)
            // console.log("max: ", typeof max)
            // console.log("min: ", typeof min)
            let productsWithParams = await products.getProducts()
            const filtered = productsWithParams.filter((product: any) => product.price > min && product.price < max)
            console.log(filtered)
            res.send(filtered)
            return
        } else {
            let productsWithParams = await products.getProducts()
            let includesKeyWord: any = []
            await productsWithParams.forEach((element: any) => {
                let stringElement = String(element)
                if (stringElement.includes(`${queryParams.word}`)) {
                    // console.log(element)
                    includesKeyWord.push(element)
                }
            });
            res.send(includesKeyWord)
            //con el return no pasa al res.send
            return
        }



    }
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
        return
    }
    res.send(await products.getProduct(id))
})

router.delete('/:id', async (req, res) => {
    const id: string = req.params.id
    const product = await products.deleteProduct(id)
    console.log('router:', product)
    if (!product) {
        console.log(product)
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
        return
    }
    res.sendStatus(204)
})

module.exports = router