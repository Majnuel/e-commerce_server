import { isProduct } from './productInterface'
const productModel = require('../DBmodels/productsModel')

class Products {
    products: isProduct[]
    constructor() {
        this.products = []
    }

    import(data: isProduct[]) {
        this.products = data
        return this.products
    }

    getProducts = async () => {
        let lista: any = []
        await productModel.find({})
            .then((productos: any) => {
                lista = productos
            })
            .catch((err: any) => console.log(err))
        return lista
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
        const newItemToMongoDB = new productModel(newProduct)
        newItemToMongoDB.save()
            .then(() => {
                console.log('producto agregado')
            })
            .catch((err: any) => {
                console.log(err)
            })
        return
    }

    getProduct = async (id: string) => {
        let product
        await productModel.findById(id)
            .then((producto: any) => {
                product = producto
            })
            .catch((err: any) => console.log(err))
        return product
    }

    deleteProduct = async (id: string) => {
        let product
        await productModel.findByIdAndDelete(id)
            .then((deletedItem: any) => {
                product = deletedItem
            })
            .catch((err: any) => console.log(err))
        return product
    }

    updateProduct = async (id: string, body: any) => {
        let product: any = {}
        const { name, price, picture, description } = body
        product.name = name
        product.price = price
        product.picture = picture
        product.description = description

        await productModel.findOneAndUpdate(
            { _id: id },
            { price: price, description: description, picture: picture, name: name },
            { new: true }
        )
        return product
    }
}

export const products = new Products()
