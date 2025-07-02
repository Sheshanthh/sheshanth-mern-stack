import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProduct } from "../actions/productActions";
import { useParams, Link } from "react-router-dom";
import Loader from './layouts/Loader';
import MetaData from "./MetaData";
import { addCartItem } from "../actions/cartActions";

export default function ProductDetail() {

    const { loading, product } = useSelector((state) => state.productState);

    const dispatch = useDispatch();
    const { id } = useParams();
    const [quantity, setQuantity] = useState(1);
    const increaseQty = () => {
        if (product.stock === 0 || quantity >= product.stock) return;
        setQuantity((prevQuantity) => prevQuantity + 1);
    }

    const decreaseQty = () => {
        if (quantity === 1) return;
        setQuantity((prevQuantity) => prevQuantity - 1);
    }

    useEffect(() => {
        dispatch(getProduct(id));
    }, [dispatch, id]);

    return (
        <Fragment>
            {loading ? <Loader /> :
                <Fragment>
                    <MetaData title={product.name} />
                    <div className="row f-flex justify-content-around">
                        {/* Product Image */}
                        <div className="col-12 col-lg-5 img-fluid" id="product_image">
                         <img src={product?.image || "./images/products/3.jpg"} alt="product" height="500" width="500" />
                        </div>

                        {/* Product Information */}
                        <div className="col-12 col-lg-5 mt-5">
                            {/* Product Name wrapped with Link */}
                            <h3><Link to={`/product/${product?.id}`}>{product?.name}</Link></h3>
                            <p id="product_id">Product # {product?._id}</p>
                            <hr />

                            {/* Product Rating */}
                            <div className="rating-outer">
                                <div className="rating-inner" style={{ width: `${(product?.ratings / 5) * 100}%` }}></div>
                            </div>
                            <span id="no_of_reviews">({product?.numOfReviews} Reviews)</span>
                            <hr />

                            {/* Product Price */}
                            <p id="product_price">${product?.price}</p>

                            {/* Stock Counter */}
                            <div className="stockCounter d-inline">
                                <span className="btn btn-danger minus" onClick={decreaseQty}>-</span>
                                <input type="number" className="form-control count d-inline" value={quantity} readOnly />
                                <span className="btn btn-primary plus" onClick={increaseQty}>+</span>
                            </div>

                            {/* Add to Cart Button wrapped with Link */}
                            <Link 
                                to={product?.stock > 0 ? `/product/${product?.id}` : "#"}  
                                className={`btn btn-primary d-inline ml-4 ${product?.stock <= 0 ? 'disabled' : ''}`} 
                                onClick={(e) => {
                                    if (product?.stock <= 0) {
                                        e.preventDefault(); // Prevent navigation if out of stock
                                    } else {
                                        dispatch(addCartItem(product._id, quantity)); // Correct function call
                                    }
                                }}
                            >
                                Add to Cart
                            </Link>



                            <hr />

                            {/* Stock Status */}
                            <p>Status: <span id="stock_status">{product?.stock > 0 ? "In Stock" : "Out of Stock"}</span></p>
                            <hr />

                            {/* Product Description */}
                            <h4 className="mt-2">Description:</h4>
                            <p>{product?.description}</p>
                            <hr />

                            {/* Product Seller */}
                            <p id="product_seller mb-3">Sold by: <strong>{product.seller || "Amazon"}</strong></p>

                            {/* Review Button */}
                            <button id="review_btn" type="button" className="btn btn-primary mt-4" data-toggle="modal" data-target="#ratingModal">
                                Submit Your Review
                            </button>

                            {/* Rating Modal */}
                            <div className="row mt-2 mb-5">
                                <div className="rating w-50">
                                    <div className="modal fade" id="ratingModal" tabIndex="-1" role="dialog" aria-labelledby="ratingModalLabel" aria-hidden="true">
                                        <div className="modal-dialog" role="document">
                                            <div className="modal-content">
                                                <div className="modal-header">
                                                    <h5 className="modal-title" id="ratingModalLabel">Submit Review</h5>
                                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                        <span aria-hidden="true">&times;</span>
                                                    </button>
                                                </div>
                                                <div className="modal-body">
                                                    <ul className="stars">
                                                        <li className="star"><i className="fa fa-star"></i></li>
                                                        <li className="star"><i className="fa fa-star"></i></li>
                                                        <li className="star"><i className="fa fa-star"></i></li>
                                                        <li className="star"><i className="fa fa-star"></i></li>
                                                        <li className="star"><i className="fa fa-star"></i></li>
                                                    </ul>

                                                    <textarea name="review" id="review" className="form-control mt-3"></textarea>

                                                    <button className="btn my-3 float-right review-btn px-4 text-white" data-dismiss="modal" aria-label="Close">Submit</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Fragment>
            }
        </Fragment>
    );
}
