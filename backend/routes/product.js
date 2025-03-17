const express=require('express');
const { route } = require('../app');
const { getProduct, newProduct, getSingleProduct, updateProduct, deleteProduct } = require('../controllers/productController');
const router = express.Router();
const {isAuthenticatedUser,authorizeRoles} = require('../middleware/authenticate')

router.route('/products').get(getProduct);
router.route('/admin/product/new').post(isAuthenticatedUser,authorizeRoles("admin"),newProduct);

router.route('/product/:id')
                            .put(updateProduct)
                            .delete(deleteProduct)
                            .get(getSingleProduct);
                            

module.exports = router