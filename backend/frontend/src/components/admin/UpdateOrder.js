import { Fragment, useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from "react-router-dom";
import { orderDetail as orderDetailAction, updateOrder } from "../../actions/orderActions";
import { toast } from "react-toastify";
import { clearOrderUpdated, clearError } from "../../slices/orderSlice";
import { Link } from "react-router-dom";

export default function UpdateOrder() {
    const { loading, isOrderUpdated, error, orderDetail } = useSelector(state => state.orderState);
    
    // Safely destructure with null protection
    const { 
        user, 
        orderItems = [], 
        shippingInfo, 
        totalPrice = 0, 
        paymentInfo,
        _id: orderIdDetail
    } = orderDetail || {};

    // Handle nested nulls with optional chaining
    const isPaid = paymentInfo?.status === 'succeeded';
    const [orderStatus, setOrderStatus] = useState("Processing");
    const { id: orderId } = useParams();
    const dispatch = useDispatch();

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(updateOrder(orderId, { orderStatus }));
    };

    useEffect(() => {
        if (isOrderUpdated) {
            toast.success('Order Updated Successfully!', {
                onClose: () => dispatch(clearOrderUpdated())
            });
            return;
        }

        if (error) {
            toast.error(error, {
                onClose: () => dispatch(clearError())
            });
            return;
        }

        dispatch(orderDetailAction(orderId));
    }, [isOrderUpdated, error, dispatch, orderId]);

    useEffect(() => {
        if (orderDetail?.orderStatus) {
            setOrderStatus(orderDetail.orderStatus);
        }
    }, [orderDetail]);

    return (
        <div className="row">
            <div className="col-12 col-md-2">
                <Sidebar />
            </div>
            
            <div className="col-12 col-md-10">
                <Fragment>
                    <div className="row d-flex justify-content-around">
                        <div className="col-12 col-lg-8 mt-5 order-details">
                            {/* Safe ID display */}
                            <h1 className="my-5">Order # {orderDetail?._id || "Loading..."}</h1>

                            <h4 className="mb-4">Shipping Info</h4>
                            {/* Safe nested access */}
                            <p><b>Name:</b> {user?.name || "-"}</p>
                            <p><b>Phone:</b> {shippingInfo?.phoneNo || "-"}</p>
                            <p className="mb-4">
                                <b>Address:</b> {[
                                    shippingInfo?.address,
                                    shippingInfo?.city,
                                    shippingInfo?.postalCode,
                                    shippingInfo?.state,
                                    shippingInfo?.country
                                ].filter(Boolean).join(", ") || "No address provided"}
                            </p>
                            <p><b>Amount:</b> ${totalPrice?.toFixed(2)}</p>

                            <hr />

                            <h4 className="my-4">Payment</h4>
                            <p className={isPaid ? 'text-success' : 'text-danger'}>
                                <b>{isPaid ? 'PAID' : 'NOT PAID'}</b>
                            </p>

                            <h4 className="my-4">Order Status:</h4>
                            <p className={orderStatus?.includes('Delivered') ? 'text-success' : 'text-danger'}>
                                <b>{orderStatus || "Processing"}</b>
                            </p>

                            <h4 className="my-4">Order Items:</h4>
                            <hr />
                            <div className="cart-item my-1">
                                {orderItems?.map(item => (
                                    <div className="row my-5" key={item?.product}>
                                        <div className="col-4 col-lg-2">
                                            <img 
                                                src={item?.image} 
                                                alt={item?.name} 
                                                height="45" 
                                                width="65" 
                                                onError={(e) => e.target.src = '/fallback-image.jpg'}
                                            />
                                        </div>
                                        <div className="col-5 col-lg-5">
                                            <Link to={`/product/${item?.product}`}>
                                                {item?.name || "Unnamed Product"}
                                            </Link>
                                        </div>
                                        <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                                            <p>${item?.price?.toFixed(2) || "0.00"}</p>
                                        </div>
                                        <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                                            <p>{item?.quantity || 0} Piece(s)</p>
                                        </div>
                                    </div>
                                )) || <p>No items in this order</p>}
                            </div>
                        </div>

                        {/* Status Update Section */}
                        <div className="col-12 col-lg-3 mt-5">
                            <div className="card shadow">
                                <div className="card-body">
                                    <h4 className="card-title mb-4">Update Status</h4>
                                    <select
                                        className="form-select mb-3"
                                        value={orderStatus}
                                        onChange={(e) => setOrderStatus(e.target.value)}
                                        disabled={loading}
                                    >
                                        <option value="Processing">Processing</option>
                                        <option value="Shipped">Shipped</option>
                                        <option value="Delivered">Delivered</option>
                                    </select>
                                    <button
                                        className="btn btn-primary w-100"
                                        onClick={submitHandler}
                                        disabled={loading}
                                    >
                                        {loading ? 'Updating...' : 'Update Status'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </Fragment>
            </div>
        </div>
    );
}