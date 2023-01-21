require('dotenv').config()
const cors = require('cors');
const session = require('express-session')
const path = require('path')
const express = require('express')
const config = require('./config/config')
const userRoutes = require('./routes/userRoutes')
const productRoutes = require('./routes/productRoutes')
const cartRoutes = require('./routes/cartRoutes')
const orderRoutes = require('./routes/orderRoutes')
const optRoutes = require('./routes/otpRoutes')
const adminRoutes = require('./routes/adminRoutes')
const { connectDB } = require('./db/db')
const app = express();

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: config.SESSION_SECRET,
    resave: true,
    saveUninitialized: true
}));

connectDB()

// Welcome Screen 
app.get("/", (req, res) => {
    return res.status(200).send({ message: "Welcome to E-Comm app" })
});

app.use('/api/user', userRoutes)
app.use('/api/products', productRoutes)
app.use('/api/cart', cartRoutes)
app.use('/api/order', orderRoutes)
app.use('/api/otp', optRoutes)
app.use('/api/admin', adminRoutes)

app.use('/', express.static(path.join(__dirname, './uploads/images')));

app.listen(config.PORT, () => {
    console.log(`Server is running on port ${config.PORT}.`);
});

