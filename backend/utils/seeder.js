const products = require('../data/products.json');
const Product = require('../models/productModel');
const dontev = require('dotenv')
const connectDb= require('../config/database');
const connectDatabase = require('../config/database');


dontev.config({path:'backend/config/config.env'})
connectDatabase();
const seedProducts = async ()=>{
    try{
        await Product.deleteMany();
        console.log("products deleted ")
        await Product.insertMany(products); 
        console.log("all products added "); 
    }catch(error){
        console.log(error.message)
    }
    process.exit();  

}

seedProducts();