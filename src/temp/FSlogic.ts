import fs from 'fs'
import { carts } from '../utils/cartClass'
import { products } from '../utils/productsClass'

export const checkCartLog = (path: string) => {
    fs.readFile(__dirname + `${path}`, "utf-8", (err, data) => {
        if (err) {
            console.log(err)
            return
        }
        carts.import(JSON.parse(data))

    })

}

export const checkProductLog = (path: string) => {
    fs.readFile(__dirname + `${path}`, "utf-8", (err, data) => {
        if (err) {
            console.log(err)
            return
        }
        products.import(JSON.parse(data))

    })

}

