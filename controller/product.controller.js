const Product = require('../models/Product')
const { sendResponseError } = require('../middleware/middleware')

const getProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        res.json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};

const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        res.json(product);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};


const addProduct = async (req, res) => {
    try {
        console.log(req.body)
        await Product.create({ ...req.body, imageUrl: req.file.filename })
        res.status(201).send({ akg: 1, massage: 'Product added successfully' })

    } catch (err) {
        console.log('Error : ', err)
        sendResponseError(500, 'Something wrong please try again', res)
    }
}

const deleteProduct = async (req, res) => {
    try {
        await Product.findByIdAndRemove(req.params.id)
        res.status(200).send({ status: 'Product successfully deleted' })
    } catch (e) {
        console.log(err)
        sendResponseError(500, `Error ${err}`, res)
    }
}

module.exports = {
    getProducts,
    getProductById,
    addProduct,
    deleteProduct,
};
