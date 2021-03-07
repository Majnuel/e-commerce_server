import { Product } from './productClass'

export class Cart {
    id: string
    timestamp: number
    products: any[]
    constructor(id: string, timestamp: number, products: any[]) {
        this.id = id
        this.products = products
        this.timestamp = timestamp
    }
}