const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const errorMiddleware = require('./middleware/error');

// Load env vars first
dotenv.config({ path: path.join(__dirname, 'config/config.env') });

const app = express();

// Route imports
const products = require('./routes/product');
const auth = require('./routes/auth');
const order = require('./routes/order');
const payment = require('./routes/payment');

app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/api/v1/', products);
app.use('/api/v1/', auth);
app.use('/api/v1/', order);
app.use('/api/v1/', payment);

if(process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, '../frontend/build')));
    app.get('*', (req, res) =>{
        res.sendFile(path.resolve(__dirname, '../frontend/build/index.html'))
    })
}
// Error middleware
app.use(errorMiddleware);

module.exports = app;