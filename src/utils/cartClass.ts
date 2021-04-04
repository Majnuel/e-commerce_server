import { isCart } from '../utils/cartInterface'
import { isProduct } from './productInterface'


//EL ID DEL CARRO VA A SER EL ID DEL USUARIO
// const writeData = (source: string) => {
//     fs.writeFile(process.cwd() + '/src/temp/fslog/cartslog.txt', source, (err) => {
//         console.log(err)
//     })
//     return
// }

class Carts {
    carts: isCart[]
    constructor() {
        this.carts = []
    }

    import(data: isCart[]) {
        this.carts = data
        return this.carts
    }
    getCarts() {
        return this.carts
    }
    addCart(id: string) {
        const newCart: any = {
            id: id,
            timestamp: Date.now(),
            products: []
        }
        this.carts.push(newCart)
    }
    getCart(id: string) {
        const cart = this.carts.find(item => item.id == id)
        if (!cart) {
            return undefined
        } else {
            return cart;
        }
    }

    addToCart(cartID: string, product: any) {
        const cart = this.carts.find(item => item.id == cartID)
        if (!cart) {
            return undefined;
        } else {
            product.quantity = 1
            cart.products.push(product)
        }
    }

    removeFromCart(cartID: string, product: any) {
        const cart = this.carts.find(item => item.id == cartID)
        console.log(cart)
        if (!cart) {
            return undefined;
        } else {
            console.log(product.id)
            const itemToRemove = cart.products.find(item => item.id == product)
            console.log(itemToRemove)
            if (!itemToRemove) {
                return undefined
            } else {
                cart.products = cart.products.filter(items => itemToRemove.id != itemToRemove.id)
            }
        }
    }
}

export const carts = new Carts