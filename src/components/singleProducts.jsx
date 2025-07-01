import axios from "axios";
import { useState, useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import Footer from "./Footer";
import { motion, AnimatePresence } from "framer-motion";
import { BeatLoader } from "react-spinners";
import Reviews from "./Reviews";
import {
  FaArrowLeft,
  FaHome,
  FaShoppingCart,
  FaUser,
  FaSignInAlt,
  FaUserPlus,
  FaEnvelope,
  FaStar
} from "react-icons/fa";
import { useCart } from "./CartContext";

const SingleProduct = () => {
    const [phone, setPhone] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");
    const [product, setProduct] = useState(null);
    const [user, setUser] = useState(null);
    const [isHovered, setIsHovered] = useState(false);
    const [averageRating, setAverageRating] = useState(0);
    const navigate = useNavigate();
    const location = useLocation();
    const { addToCart } = useCart();
    const [showPopup, setShowPopup] = useState(false);

    const img_url = "https://brembo.pythonanywhere.com/static/images/";

    useEffect(() => {
        const loggedInUser = JSON.parse(localStorage.getItem("user"));
        if (loggedInUser) {
            setUser(loggedInUser);
        }

        if (!location.state?.product) {
            navigate("/");
        } else {
            setProduct(location.state.product);
            // Simulate fetching average rating (replace with actual API call)
            setAverageRating(4.5); // Example value
        }
    }, [location, navigate]);

    const submitForm = async (e) => {
        e.preventDefault();
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

    const handleAddToCart = () => {
        if (!product) return;
        
        addToCart(product);
        setShowPopup(true);
        setTimeout(() => setShowPopup(false), 2000);
    };

    if (!product) {
        return (
            <div className="d-flex justify-content-center align-items-center vh-100 bg-dark">
                <BeatLoader color="#ffc107" />
            </div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-dark text-white min-vh-100"
        >
            {/* Navigation and Header */}
            <div className="container-fluid">
                {/* Return Button */}
                <div className="m-3">
                    <motion.button
                        className="btn btn-outline-warning"
                        onClick={() => navigate(-1)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <FaArrowLeft className="me-2" /> Return
                    </motion.button>
                </div>

                <motion.nav 
                    className="navbar navbar-expand-lg navbar-dark bg-dark rounded-pill p-2 m-4"
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    <div className="container-fluid justify-content-center">
                        <ul className="navbar-nav flex-row flex-wrap">
                            <li className="nav-item mx-2">
                                <Link className="nav-link" to="/">
                                    <FaHome /> Home
                                </Link>
                            </li>
                            {user?.isAdmin && (
                                <li className="nav-item mx-2">
                                    <Link className="nav-link" to="/addproducts">
                                        <FaShoppingCart /> Add Products
                                    </Link>
                                </li>
                            )}
                            <li className="nav-item mx-2">
                                <Link className="nav-link" to="/contactus">
                                    <FaEnvelope /> Contact Us
                                </Link>
                            </li>
                            <li className="nav-item mx-2">
                                <Link className="nav-link" to="/cart">
                                    <FaShoppingCart /> Cart
                                </Link>
                            </li>
                            {!user ? (
                                <>
                                    <li className="nav-item mx-2">
                                        <Link className="nav-link" to="/signin">
                                            <FaSignInAlt /> Sign In
                                        </Link>
                                    </li>
                                    <li className="nav-item mx-2">
                                        <Link className="nav-link" to="/signup">
                                            <FaUserPlus /> Sign Up
                                        </Link>
                                    </li>
                                </>
                            ) : (
                                <>
                                    <li className="nav-item mx-2 text-warning d-flex align-items-center">
                                        <FaUser className="me-1 text-info" /> Welcome,&nbsp;
                                        <b>{user.username}</b>
                                    </li>
                                    <li className="nav-item mx-2">
                                        <button
                                            className="btn btn-danger"
                                            onClick={() => {
                                                localStorage.removeItem("user");
                                                setUser(null);
                                                navigate("/");
                                            }}
                                        >
                                            Log Out
                                        </button>
                                    </li>
                                </>
                            )}
                        </ul>
                    </div>
                </motion.nav>

                <AnimatePresence>
                    {showPopup && (
                        <motion.div
                            className="add-to-cart-popup"
                            initial={{ y: 50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: 50, opacity: 0 }}
                            transition={{ type: "spring", damping: 25 }}
                        >
                            Item added to cart!
                        </motion.div>
                    )}
                </AnimatePresence>

                <div className="row justify-content-center mt-2">
                    <motion.div 
                        initial={{ y: -50 }}
                        animate={{ y: 0 }}
                        transition={{ type: "spring", stiffness: 120 }}
                    >
                        <h1 className="text-center text-warning mb-4">
                            𝓛𝓾𝓷𝓬𝓱 𝓑𝓸𝔁 <b className="text ms-2">𓍯 𓌉</b>
                        </h1>
                    </motion.div>

                    {/* Product Details Row */}
                    <div className="row justify-content-center align-items-start mb-5 px-3">
                        {/* Product Image */}
                        <motion.div
                            className="col-md-5 col-lg-4 card shadow my-2 mx-3 p-0 bg-black border border-secondary"
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                            onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)}
                        >
                            <div className="position-relative overflow-hidden" style={{ height: "400px" }}>
                                <motion.img
                                    src={img_url + (product?.product_photo || '')}
                                    alt={product?.product_name || 'Product image'}
                                    className="w-100 h-100 object-fit-cover"
                                    whileHover={{ scale: isHovered ? 1.05 : 1 }}
                                    transition={{ duration: 0.3 }}
                                />
                                {isHovered && (
                                    <motion.div
                                        className="position-absolute bottom-0 start-0 end-0 bg-dark bg-opacity-75 text-center p-3"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                    >
                                        <h5 className="text-warning">{product.product_name}</h5>
                                    </motion.div>
                                )}
                            </div>
                        </motion.div>

                        {/* Product Info & Payment */}
                        <motion.div
                            className="col-md-5 col-lg-4 card shadow my-2 mx-3 p-4 bg-black border border-secondary"
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4 }}
                        >
                            <h2 className="text-warning mb-4">{product?.product_name}</h2>
                            
                            {/* Rating Display */}
                            <div className="d-flex align-items-center mb-3">
                                <div className="text-warning me-2">
                                    {[...Array(5)].map((_, i) => (
                                        <FaStar 
                                            key={i} 
                                            className={i < Math.floor(averageRating) ? "text-warning" : "text-secondary"} 
                                        />
                                    ))}
                                </div>
                                <span className="text-white-50">
                                    {averageRating.toFixed(1)} ({Math.floor(Math.random() * 100) + 1} reviews)
                                </span>
                            </div>
                            
                            <h3 className="mb-3">
                                <b className="text-warning">${product?.product_cost || 0}.00</b>
                            </h3>
                            <p className="text-white-50 mb-4 fs-5">"{product?.product_desc || ''}"</p>

                            <div className="d-flex justify-content-between mb-4">
                                <motion.button
                                    className="btn btn-outline-info"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={handleAddToCart}
                                >
                                    <FaShoppingCart className="me-2" /> Add to Cart
                                </motion.button>
                            </div>

                            <div className="border-top border-secondary pt-4">
                                <h4 className="text-warning mb-3">Make Payment</h4>
                                
                                {loading && (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="text-center my-3"
                                    >
                                        <BeatLoader color="#ffc107" size={10} />
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
                                        <label className="form-label text-white-50">Amount (USD)</label>
                                        <input
                                            type="number"
                                            readOnly
                                            value={product?.product_cost || 0}
                                            className="form-control bg-dark text-white text-center fw-bold border-secondary"
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label text-white-50">M-Pesa Number</label>
                                        <input
                                            type="tel"
                                            className="form-control bg-dark text-white border-secondary"
                                            placeholder="Enter Mpesa No 2547xxxxxxxx"
                                            onChange={(e) => setPhone(e.target.value)}
                                            required
                                            pattern="254[0-9]{9}"
                                            title="Please enter a valid M-Pesa number starting with 254"
                                        />
                                        <div className="form-text text-white-50">
                                            Format: 2547XXXXXXXX
                                        </div>
                                    </div>
                                    <motion.button
                                        className="btn btn-warning w-100 py-2 fw-bold"
                                        type="submit"
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        disabled={loading}
                                    >
                                        {loading ? "Processing..." : "Pay Now"}
                                    </motion.button>
                                </form>
                            </div>
                        </motion.div>
                    </div>

                    {/* Reviews Section - Full Width Below Product */}
                    <motion.div 
                        className="row justify-content-center mt-4 mb-5 px-3"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                    >
                        <div className="col-lg-10">
                            <div className="card shadow bg-black border border-secondary">
                                <div className="card-body p-4">
                                    <div className="d-flex justify-content-between align-items-center mb-4">
                                        <h3 className="card-title text-warning m-0">
                                            <i className="bi bi-chat-square-quote me-2"></i> Customer Reviews
                                        </h3>
                                        <div className="text-warning">
                                            <FaStar className="text-warning" /> {averageRating.toFixed(1)} out of 5
                                        </div>
                                    </div>
                                    <Reviews productId={product?.product_id} />
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>

                <Footer />
            </div>

            <style jsx>{`
                .add-to-cart-popup {
                    position: fixed;
                    bottom: 20px;
                    right: 20px;
                    background: #28a745;
                    color: white;
                    padding: 15px 25px;
                    border-radius: 5px;
                    z-index: 1000;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
                }
                .object-fit-cover {
                    object-fit: cover;
                }
                .card {
                    transition: all 0.3s ease;
                }
                .form-control:focus {
                    background-color: #1a1a1a;
                    color: white;
                    border-color: #ffc107;
                    box-shadow: 0 0 0 0.25rem rgba(255, 193, 7, 0.25);
                }
            `}</style>
        </motion.div>
    );
};

export default SingleProduct;