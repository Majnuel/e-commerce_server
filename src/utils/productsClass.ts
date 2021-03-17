import { isProduct } from './productInterface'
import fs from 'fs'
const { crudDB } = require('../temp/crud.db')
const knex = require('knex')(crudDB)

//creacion de tabla
// knex.schema.createTable('products', (table: any) => {
//     table.string('name')
//     // table.number('price')
//     table.string('price')
//     table.string('id')
//     // table.number('timestamp')
//     table.string('timestamp')
//     table.string('description')
//     table.string('picture')
// })
//     .then(() => console.log('table created!'))
//     .catch((err: any) => { console.log(err) })


const writeData = (source: string) => {
    fs.writeFile(process.cwd() + '/src/temp/fslog/productslog.txt', source, (err) => {
        console.log(err)
    })
    return
}

class Products {
    products: isProduct[]
    constructor() {
        this.products = []
    }

    import(data: isProduct[]) {
        this.products = data
        return this.products
    }
    getProducts() {
        //LEER DESDE LA BASE
        knex.from('products').select('*')
            .then((rows: any) => console.log(rows))
            .catch((err: any) => { console.log(err) })
        return this.products
    }
    addProduct(name: string, price: number, id: string, timestamp: number, description: string, picture: string) {
        const newProduct: isProduct = {
            name: name,
            price: price,
            id: id,
            timestamp: timestamp,
            description: description,
            picture: picture
        }
        this.products.push(newProduct)
        const stringified = JSON.stringify(this.products)
        writeData(stringified)

        knex('products').insert(newProduct)
            .then(() => console.log('product inserted'))
            .catch((err: any) => console.log(err))

    }
    getProduct(id: string) {
        knex('products').where('id', `${id}`).then((item: string) => console.log(item))

        const product = this.products.find(item => item.id === id)
        if (!product) {
            return undefined
        }
        return product
    }
    deleteProduct(id: string) {
        knex('products').where('id', `${id}`).del().then(() => console.log('row deleted'))

        const product = this.products.find(item => item.id === id)
        if (!product) {
            return undefined
        }
        this.products = this.products.filter(item => item.id != id)
        const stringified = JSON.stringify(this.products)
        writeData(stringified)

        return product
    }
    updateProduct(id: string, body: any) {
        knex('products').where('id', `${id}`).update({
            ...body
        }).then(() => console.log(id, 'updated'))

        const product = this.products.find(item => item.id === id)
        if (!product) {
            return undefined
        }
        console.log(body)
        const { name, price, picture } = body
        product.name = name
        product.price = price
        product.picture = picture
        const stringified = JSON.stringify(this.products)
        writeData(stringified)
        return product
    }
}

export const products = new Products()
