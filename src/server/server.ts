import express, { Application, Request, Response } from 'express'
const app: Application = express()


app.use(express.urlencoded({ extended: true }))
app.use(express.json())

const port = 8080

app.get('/', (req, res) => {
    res.send('Hello World')
})

app.listen(port, () => {
    console.log("Server running on port", port)
})

app.use('/products', require('../routing/routing'))