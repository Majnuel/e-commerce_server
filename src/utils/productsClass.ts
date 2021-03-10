import { isProduct } from './productInterface'
import fs from 'fs'

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
    }
    getProduct(id: string) {
        const product = this.products.find(item => item.id === id)
        if (!product) {
            return undefined
        }
        return product
    }
    deleteProduct(id: string) {
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
