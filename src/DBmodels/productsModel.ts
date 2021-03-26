import mongoose from 'mongoose'

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    // we're connected!
    console.log('MongoDB connected')
});

const productsCollection = "products"

const productsSchema = new mongoose.Schema({
    name: { type: String, required: true, max: 100 },
    price: { type: Number, required: true },
    id: { type: String, required: true, max: 100 },
    timestamp: { type: Number, required: true },
    description: { type: String, required: true, max: 100 },
    picture: { type: String, required: true, max: 100 }
})

module.exports = mongoose.model(productsCollection, productsSchema)