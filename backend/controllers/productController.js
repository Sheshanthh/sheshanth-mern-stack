const Product = require('../models/productModel');
const ErrorHandler = require('../utils/errorhandler');
const APIFeatures = require('../utils/apiFeatures');

// Get all products
// Get all products
exports.getProduct = async (req, res, next) => {
    try {
        const resPerPage = 3; // Number of results per page
        const apiFeatures = new APIFeatures(Product.find(), req.query)
            .search() // Apply search
            .filter() // Apply filter
            .paginate(resPerPage); // Apply pagination with resPerPage

        const products = await apiFeatures.query;
        let buildQuery = () => {
            return new APIFeatures(Product.find(), req.query).search().filter()
        } // Execute the query
        const totalProductsCount = await Product.countDocuments({}); 
        res.status(200).json({
            success: true,
            count: totalProductsCount,
            resPerPage,
            products
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error fetching products",
            error: error.message
        });
    }
};

// Get a single product by ID
exports.getSingleProduct = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return next(new ErrorHandler("Product not found", 404));
        }

        res.status(200).json({
            success: true,
            product
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error fetching product",
            error: error.message
        });
    }
};

// Create a new product
exports.newProduct = async (req, res, next) => {
    try {
        const { name, description, price, category } = req.body;

        if (!name || !description || !price || !category) {
            return res.status(400).json({
                success: false,
                message: "Please provide all required fields (name, description, price, category)"
            });
        }
                   
        req.body.user = req.user.id
        const product = await Product.create(req.body);

        res.status(201).json({
            success: true,
            product
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error creating product",
            error: error.message
        });
    }
};

//  pdate a product
exports.updateProduct = async (req, res, next) => {
    try {
        let product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        product = await Product.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        res.status(200).json({
            success: true,
            product
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error updating product",
            error: error.message
        });
    }
};

// Delete a product
exports.deleteProduct = async (req, res, next) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Product removed"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error deleting product",
            error: error.message
        });
    }
};