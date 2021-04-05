import express, { Application } from 'express'
const router = express.Router()
const { v4: uuidv4 } = require('uuid');
import { products } from '../utils/productsClass'

const currentDate = new Date();
const timestamp = currentDate.getTime()

const incomingQuery = async (params: any) => {
    console.log("params: ", params)
    let min: any;
    let max: any;
    params.hasOwnProperty("min") ? min = parseInt(params.min) : min = 0
    params.hasOwnProperty("max") ? max = parseInt(params.max) : max = 99999
    if (min >= max) {
        console.log("[Max-price] should be higher than [Min-price]")
        return
    }
    let allProducts = await products.getProducts()
    const filtered = allProducts.filter((product: any) =>
        product.price >= min && product.price <= max
    )
    return filtered
}

const checkForName = (params: any) => {
    if (params.name) {
        return true
    } else {
        return false
    }
}

router.get('/', async (req, res) => {
    const queryParams = req.query
    // console.log(queryParams)
    if (queryParams.hasOwnProperty("min") || queryParams.hasOwnProperty("max")) {
        console.log("properties? yes")
        const filteredProducts = await incomingQuery(queryParams)
        res.send(filteredProducts)
        return
    } else if (checkForName(queryParams)) {
        let productsWithParams = await products.getProducts()
        let includesKeyWord: any = []
        await productsWithParams.forEach((element: any) => {
            let stringElement = String(element)
            if (stringElement.includes(`${queryParams.name}`)) {
                // console.log(element)
                includesKeyWord.push(element)
            }
        });
        res.send(includesKeyWord)
        //con el return no pasa al res.send
        return
    }


    // if (Object.keys(queryParams).length > 0) {
    //     console.log(Object.keys(queryParams))
    //     console.log("HAY QUERY PARAMS EN GET")
    //     console.log(Object.keys(queryParams).includes("min" || "max"))
    //     if (Object.keys(queryParams).includes("min")) {
    //         console.log("hay min en query params")
    //         let min: any
    //         let max: any
    //         queryParams.min ? min = queryParams.min : min = 0
    //         queryParams.max ? max = queryParams.max : max = 9999
    //         String(min)
    //         String(max)
    //         console.log("max: ", typeof max)
    //         console.log("min: ", typeof min)
    //         let productsWithParams = await products.getProducts()
    //         console.log("products: ", productsWithParams)
    //         const filtered = await productsWithParams.filter((product: any) => {
    //             product.price > min && product.price < max
    //             console.log("inside filter(): ", product)
    //         })
    //         console.log("filtered: ", filtered)
    //         res.send(filtered)
    //         return
    //     } else if ((Object.keys(queryParams).includes("max"))) {
    //         console.log("hay max en query params")
    //         let min: any
    //         let max: any
    //         queryParams.min ? min = queryParams.min : min = 0
    //         queryParams.max ? max = queryParams.max : max = 9999
    //         parseInt(min)
    //         parseInt(max)
    //         console.log("max: ", typeof max)
    //         console.log("min: ", typeof min)
    //         let productsWithParams = await products.getProducts()
    //         const filtered = productsWithParams.filter((product: any) => {
    //             product.price > min && product.price < max
    //             console.log("inside filter(): ", product)
    //         })
    //         console.log(filtered)
    //         res.send(filtered)
    //         return
    //     } else {
    //         let productsWithParams = await products.getProducts()
    //         let includesKeyWord: any = []
    //         await productsWithParams.forEach((element: any) => {
    //             let stringElement = String(element)
    //             if (stringElement.includes(`${queryParams.name}`)) {
    //                 // console.log(element)
    //                 includesKeyWord.push(element)
    //             }
    //         });
    //         res.send(includesKeyWord)
    //         //con el return no pasa al res.send
    //         return
    //     }
    // }

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