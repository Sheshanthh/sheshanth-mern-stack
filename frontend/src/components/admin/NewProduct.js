import { Fragment, useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { createNewProduct } from "../../actions/productActions";
import { clearError, clearProductCreated } from "../../slices/productSlice";
import { toast } from "react-toastify";

export default function NewProduct() {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [stock, setStock] = useState(0);
    const [seller, setSeller] = useState("");
    const [images, setImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([]);
    
    const { loading, isProductCreated, error } = useSelector(state => state.productState || {});

    const categories = [
        'Electronics',
        'Mobile Phones',
        'Laptops',
        'Accessories',
        'Headphones',
        'Food',
        'Books',
        'Clothes/Shoes',
        'Beauty/Health',
        'Sports',
        'Outdoor',
        'Home'
    ];

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const onImagesChange = (e) => {
        const files = Array.from(e.target.files);

        // Reset images when new selection is made
        setImagesPreview([]);
        setImages([]);

        files.forEach(file => {
            if(!file.type.startsWith('image')) {
                toast.error('Only image files are allowed');
                return;
            }

            const reader = new FileReader();

            reader.onload = () => {
                if(reader.readyState === 2) {
                    setImagesPreview(oldArray => [...oldArray, reader.result]);
                    setImages(oldArray => [...oldArray, file]);
                }
            }

            reader.readAsDataURL(file);
        });
    }

    const submitHandler = (e) => {
        e.preventDefault();
        
        // Basic validation
        if(!name || !price || !description || !category || images.length === 0) {
            toast.error('Please fill all required fields');
            return;
        }

        const formData = new FormData();
        formData.append('name', name);
        formData.append('price', price);
        formData.append('stock', stock);
        formData.append('description', description);
        formData.append('seller', seller);
        formData.append('category', category);
        
        images.forEach(image => {
            formData.append('images', image);
        });

        dispatch(createNewProduct(formData));
    }

    useEffect(() => {
        if(isProductCreated) {
            toast.success('Product Created Successfully!', {
                onClose: () => {
                    dispatch(clearProductCreated());
                    navigate('/admin/products');
                }
            });
        }

        if(error) {
            toast.error(error.toString(), {
                onClose: () => dispatch(clearError())
            });
        }
    }, [isProductCreated, error, dispatch, navigate]);

    return (
        <div className="row">
            <div className="col-12 col-md-2">
                <Sidebar />
            </div>
            <div className="col-12 col-md-10">
                <Fragment>
                    <div className="wrapper my-5"> 
                        <form onSubmit={submitHandler} className="shadow-lg" encType='multipart/form-data'>
                            <h1 className="mb-4">New Product</h1>

                            <div className="form-group">
                                <label htmlFor="name_field">Name *</label>
                                <input
                                    type="text"
                                    id="name_field"
                                    className="form-control"
                                    onChange={e => setName(e.target.value)}
                                    value={name}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="price_field">Price *</label>
                                <input
                                    type="number"
                                    id="price_field"
                                    className="form-control"
                                    onChange={e => setPrice(e.target.value)}
                                    value={price}
                                    min="0"
                                    step="0.01"
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="description_field">Description *</label>
                                <textarea 
                                    className="form-control"
                                    id="description_field" 
                                    rows="8"
                                    onChange={e => setDescription(e.target.value)}
                                    value={description}
                                    required
                                ></textarea>
                            </div>

                            <div className="form-group">
                                <label htmlFor="category_field">Category *</label>
                                <select 
                                    onChange={e => setCategory(e.target.value)} 
                                    className="form-control" 
                                    id="category_field"
                                    value={category}
                                    required
                                >
                                    <option value="">Select</option>
                                    {categories.map(category => (
                                        <option key={category} value={category}>{category}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="form-group">
                                <label htmlFor="stock_field">Stock</label>
                                <input
                                    type="number"
                                    id="stock_field"
                                    className="form-control"
                                    onChange={e => setStock(e.target.value)}
                                    value={stock}
                                    min="0"
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="seller_field">Seller Name</label>
                                <input
                                    type="text"
                                    id="seller_field"
                                    className="form-control"
                                    onChange={e => setSeller(e.target.value)}
                                    value={seller}
                                />
                            </div>
                            
                            <div className='form-group'>
                                <label>Images *</label>
                                <div className='custom-file'>
                                    <input
                                        type='file'
                                        name='product_images'
                                        className='custom-file-input'
                                        id='customFile'
                                        multiple
                                        onChange={onImagesChange}
                                        accept="image/*"
                                        required
                                    />
                                    <label className='custom-file-label' htmlFor='customFile'>
                                        {images.length > 0 
                                            ? `${images.length} files selected` 
                                            : 'Choose Images'}
                                    </label>
                                </div>
                                <div className="mt-3">
                                    {imagesPreview.map((image, index) => (
                                        <img
                                            className="mr-2"
                                            key={index}
                                            src={image}
                                            alt={`Preview ${index + 1}`}
                                            width="55"
                                            height="52"
                                            style={{objectFit: 'cover'}}
                                        />
                                    ))}
                                </div>
                            </div>

                            <button
                                id="login_button"
                                type="submit"
                                disabled={loading}
                                className="btn btn-block py-3 btn-primary"
                            >
                                {loading ? (
                                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                ) : 'CREATE'}
                            </button>
                        </form>
                    </div>
                </Fragment>
            </div>
        </div>
    )
}