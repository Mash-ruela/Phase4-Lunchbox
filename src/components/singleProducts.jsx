import axios from "axios";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Footer from "./Footer";
import { motion } from "framer-motion";
import { BeatLoader } from "react-spinners";

const SingleProduct = () => {
    const [phone, setPhone] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");
    const [product, setProduct] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();

    const img_url = "https://brembo.pythonanywhere.com/static/images/";

    useEffect(() => {
        if (!location.state?.product) {
            navigate("/singleproduct"); // Redirect to home if no product data
        } else {
            setProduct(location.state.product);
        }
    }, [location, navigate]);

    const submitForm = async (e) => {
        e.preventDefault();
        
        // Add null check for product
        if (!product) {
            setError("Product information is not available");
            return;
        }

        setError("");
        setSuccess("");
        setLoading(true);

        try {
            const data = new FormData();
            data.append("phone", phone);
            data.append("amount", product.product_cost);

            const response = await axios.post(
                "https://brembo.pythonanywhere.com/api/mpesa_payment",
                data
            );
            setSuccess(response.data.message);
        } catch (error) {
            setError(error.response?.data?.message || error.message || "Payment failed");
        } finally {
            setLoading(false);
        }
    };

    if (!product) {
        return (
            <div className="d-flex justify-content-center align-items-center vh-100">
                <BeatLoader color="#36d7b7" />
            </div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="container-fluid">
                <div className="row justify-content-center mt-3">
                    <motion.div 
                        id="ona"
                        initial={{ y: -50 }}
                        animate={{ y: 0 }}
                        transition={{ type: "spring", stiffness: 120 }}
                    >
                        <h1 id="main" className="text-center">
                            𝓛𝓾𝓷𝓬𝓱 𝓑𝓸𝔁 <b className="text">𓇋 𓌉</b>
                        </h1>
                    </motion.div>

                    <nav className="m-4 text-center">
                        {["/", "/addproducts", "/signin", "/signup"].map((path) => (
                            <motion.div
                                key={path}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="d-inline-block mx-2"
                            >
                                <Link id="navbar" className="btn btn-outline-primary" to={path}>
                                    {path === "/" ? "Home" : 
                                     path === "/addproducts" ? "Add Products" :
                                     path === "/signin" ? "Sign In" : "Sign Up"}
                                </Link>
                            </motion.div>
                        ))}
                    </nav>

                    <div className="row justify-content-center align-items-start">
                        <motion.div
                            id="cardo"
                            className="col-md-4 col-lg-3 card shadow my-2 mx-3 p-0"
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            <motion.img
                                src={img_url + (product?.product_photo || '')}
                                alt={product?.product_name || 'Product image'}
                                className="card-img-top"
                                whileHover={{ scale: 1.02 }}
                                transition={{ duration: 0.3 }}
                            />
                        </motion.div>

                        <motion.div
                            id="cardo"
                            className="col-md-4 col-lg-3 card shadow my-2 mx-3 p-4"
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4 }}
                        >
                            <h2 className="text-info mb-4">{product?.product_name}</h2>
                            <h3 className="mb-3">
                                <b className="text-warning">${product?.product_cost || 0}.00</b>
                            </h3>
                            <h5 className="text-warning mb-4">"{product?.product_desc || ''}"</h5>

                            {loading && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="text-center my-3"
                                >
                                    <BeatLoader color="#36d7b7" size={10} />
                                    <p className="text-muted mt-2">Processing payment...</p>
                                </motion.div>
                            )}

                            {error && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="alert alert-danger"
                                >
                                    {error}
                                </motion.div>
                            )}

                            {success && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="alert alert-success"
                                >
                                    {success}
                                </motion.div>
                            )}

                            <form onSubmit={submitForm}>
                                <div className="mb-3">
                                    <input
                                        type="number"
                                        readOnly
                                        value={product?.product_cost || 0}
                                        className="form-control text-center fw-bold"
                                    />
                                </div>
                                <div className="mb-3">
                                    <input
                                        type="tel"
                                        className="form-control"
                                        placeholder="Enter Mpesa No 2547xxxxxxxx"
                                        onChange={(e) => setPhone(e.target.value)}
                                        required
                                        pattern="254[0-9]{9}"
                                        title="Please enter a valid M-Pesa number starting with 254"
                                    />
                                </div>
                                <motion.button
                                    id="form-button"
                                    className="btn btn-primary w-100 py-2"
                                    type="submit"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    disabled={loading}
                                >
                                    {loading ? "Processing..." : "Pay Now"}
                                </motion.button>
                            </form>
                        </motion.div>
                    </div>
                </div>

                <Footer />
            </div>
        </motion.div>
    );
};

export default SingleProduct;