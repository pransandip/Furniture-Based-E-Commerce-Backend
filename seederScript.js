require('dotenv').config()
const data = require('./data/products.json')
const { connectDB } = require('./db/db')
const Product = require('./models/Product')

connectDB()

const importData = async () => {
    try {
        await Product.deleteMany({})

        await Product.insertMany(data)

        console.log('Data Import Success')

        process.exit()
    } catch (error) {
        console.error('Error with data import', error)
        process.exit(1)
    }
}

importData();