const express = require('express');
const { newOrder, getSingleOrder, myOrders, orders, updateOrder, deleteOrder,createReview } = require('../controllers/orderController');router = express.Router();
const {isAuthenticatedUser, authorizeRoles} = require('../middleware/authenticate');

router.route('/order/new').post(isAuthenticatedUser,newOrder);
router.route('/order/:id').get(isAuthenticatedUser,getSingleOrder);
router.route('/myorders').get(isAuthenticatedUser,myOrders);

router.route('/review').put(isAuthenticatedUser, createReview)
//Admin Routes
router.route('/admin/orders').get(isAuthenticatedUser, authorizeRoles('admin'), orders)
router.route('/admin/order/:id').put(isAuthenticatedUser, authorizeRoles('admin'), updateOrder)
                        .delete(isAuthenticatedUser, authorizeRoles('admin'), deleteOrder);

module.exports = router;