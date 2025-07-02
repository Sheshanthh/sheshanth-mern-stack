/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/jsx-no-comment-textnodes */
import { Fragment, useEffect, useState } from "react";
import MetaData from "./MetaData";
import { getProducts } from "../actions/productActions";
import { useDispatch, useSelector } from "react-redux";
import Loader from "./layouts/Loader";
import Product from "./product/Product";
import { toast } from "react-toastify";
import Pagination from "react-js-pagination";

export default function Home() {
    const dispatch = useDispatch();
    const { products, loading, error, productsCount, resPerPage } = useSelector((state) => state.productsState);
    const [currentPage, setCurrentPage] = useState(1);

    const setCurrentPageNo = (pageNo) => {
        setCurrentPage(pageNo);
    };

    useEffect(() => {
        if (error) {
            toast.error(error, {
            });
            return;
        }
        dispatch(getProducts(null ,null ,null,null, currentPage)); // Ensure `getProducts` correctly handles pagination
    }, [error, dispatch, currentPage]);

    return (
        <Fragment>
            {loading ? <Loader /> :
                <Fragment>
                    <MetaData title={'Buy Best Products'} />
                    <h1 id="products_heading" className="text-center">Latest Products</h1>
                    <section id="products" className="container mt-5">
                        <div className="row">
                            {products && products.length > 0 ? (
                                products.map(product => (
                                    <Product col={3} key={product._id} product={product} />
                                ))
                            ) : (
                                <h4 className="text-center">No Products Found</h4>
                            )}
                        </div>
                    </section>
                    {productsCount > resPerPage && (
                        <div className="d-flex justify-content-center mt-5">
                            <Pagination 
                                activePage={currentPage}
                                onChange={setCurrentPageNo}
                                totalItemsCount={productsCount}
                                itemsCountPerPage={resPerPage}
                                pageRangeDisplayed={5}
                                nextPageText={'Next'}
                                prevPageText={'Prev'}
                                firstPageText={'First'}
                                lastPageText={'Last'}
                                itemClass={'page-item'}
                                linkClass={'page-link'}
                            />     
                        </div>
                    )}
                </Fragment>
            }
        </Fragment>
    );
}
