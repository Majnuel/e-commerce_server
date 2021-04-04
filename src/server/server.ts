import express, { Application, Request, Response } from 'express'
const app: Application = express()
import dotenv from 'dotenv'
import { checkCartLog, checkProductLog } from '../temp/FSlogic'
const productModel = require('../DBmodels/productsModel')



checkCartLog('/fslog/cartslog.txt')
checkProductLog('/fslog/productslog.txt')


//DOTENV
const dotenvData = dotenv.config()
if (dotenvData.error) {
    throw dotenvData.error
}
const { PORT } = process.env

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.get('/', (req, res) => {
    res.send('Hello World')
})

app.listen(PORT, () => {
    console.log("Server running on port", PORT)
    const mongoose = require('mongoose');
    mongoose.connect('mongodb+srv://emma:borinda@cluster0.ydcxa.mongodb.net/productsDB?retryWrites=true&w=majority',
        {
            useNewUrlParser: true, useUnifiedTopology: true
        }
    )
})

app.use('/products', require('../routing/products'))
app.use('/carts', require('../routing/carts'))

