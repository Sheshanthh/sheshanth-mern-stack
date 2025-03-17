import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearAuthError, login } from '../../actions/userActions';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import MetaData from '../MetaData';
import { toast, Toaster } from 'react-hot-toast';

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    
    const { isAuthenticated, error } = useSelector(state => state.authState);
    const redirect = location.search ? '/' + location.search.split('=')[1] : '/';

    const submitHandler = (e) => {
        e.preventDefault();
        if (!email || !password) {
            toast.error('Please fill in all fields');
            return;
        }
        dispatch(login(email, password));
    };

    useEffect(() => {
        if (error) {
            toast.error(error); // Display the error message
            dispatch(clearAuthError()); // Clear the error from the state
        }

        if (isAuthenticated) {
            toast.success('Logged in successfully!');
            navigate(redirect);
        }
    }, [isAuthenticated, error, navigate, redirect, dispatch]);

    return (
        <>
            <MetaData title="Login" />
            <Toaster position="top-right" />
            <div className="row justify-content-center align-items-center" style={{ height: '100vh' }}> 
                <div className="col-12 col-md-6 col-lg-4">
                    <form onSubmit={submitHandler} className="shadow-lg p-4">
                        <h1 className="mb-3 text-center">Login</h1>
                        <div className="form-group">
                            <label htmlFor="email_field">Email</label>
                            <input
                                type="email"
                                id="email_field"
                                className="form-control"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password_field">Password</label>
                            <input
                                type="password"
                                id="password_field"
                                className="form-control"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                            />
                        </div>
                        <div className="d-flex justify-content-between">
                            <Link to="/password/forgot" className="mb-4">Forgot Password?</Link>
                            <Link to="/register" className="mt-3">New User?</Link>
                        </div>
                        <button
                            id="login_button"
                            type="submit"
                            className="btn btn-block py-3 btn-primary"
                        >
                            LOGIN
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}