import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Carousel from "./Carousel";
import Footer from "./Footer";
import { motion, AnimatePresence } from "framer-motion";
import { FaSearch, FaShoppingCart, FaUser, FaHome, FaEnvelope, FaSignInAlt, FaUserPlus } from "react-icons/fa";
import { div } from "framer-motion/client";

const GetProducts = () => {
    let [products, setProducts] = useState([]);
    let [error, setError] = useState("");
    let [loading, setLoading] = useState("");
    let [filteredProducts, setFilteredProducts] = useState([]);
    const [user, setUser] = useState(null);
    const [isHovered, setIsHovered] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [adminPassword, setAdminPassword] = useState("");
    const [showAdminLogin, setShowAdminLogin] = useState(false);

    const img_url = "https://brembo.pythonanywhere.com/static/images/";
    const navigate = useNavigate();
    const ADMIN_SECRET = "brembo"; // Change this to your actual admin secret

    const getProducts = async () => {
        setError("");
        setLoading("Please wait...Receiving Products...");
        try {
            const response = await axios.get("https://brembo.pythonanywhere.com/api/getproducts");
            setProducts(response.data);
            setFilteredProducts(response.data);
            setLoading("");
        } catch (error) {
            setLoading("");
            setError(error.message);
        }
    };

    const handleSearch = (value) => {
        setSearchQuery(value);
        const filtered = products.filter((product) =>
            product.product_name.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredProducts(filtered);
    };

    useEffect(() => {
        getProducts();
        const loggedInUser = JSON.parse(localStorage.getItem("user"));
        if (loggedInUser) {
            setUser(loggedInUser);
            // Check if user is admin
            if (loggedInUser.isAdmin) {
                setShowAdminLogin(false);
            }
        }
    }, []);

    const handleAdminLogin = () => {
        if (adminPassword === ADMIN_SECRET) {
            const adminUser = {
                ...user,
                isAdmin: true
            };
            setUser(adminUser);
            localStorage.setItem("user", JSON.stringify(adminUser));
            setShowAdminLogin(false);
            setAdminPassword("");
        } else {
            setError("Invalid admin password");
        }
    };

    const handlePurchase = (productId) => {
        if (!user) {
            navigate("/signup");
        } else {
            navigate(`/singleproduct`);
        }
    };

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                when: "beforeChildren"
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.5
            }
        }
    };

    const hoverVariants = {
        hover: {
            y: -5,
            boxShadow: "0 10px 20px rgba(0,0,0,0.2)",
            transition: {
                duration: 0.3
            }
        }
    };

    // Skeleton loader component
    const ProductSkeleton = () => (
        <div className="col-md-3 mb-4">
            <div className="card h-100">
                <div className="skeleton-img"></div>
                <div className="card-body">
                    <div className="skeleton-line"></div>
                    <div className="skeleton-line short"></div>
                    <div className="skeleton-line shorter"></div>
                    <div className="skeleton-button"></div>
                </div>
            </div>
        </div>
    );

    return (
       <div className="container-fluid">
         <motion.div 
            id="body" 
            className="row"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
        >
            {loading && (
                <motion.div 
                    className="loading-overlay"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                >
                    <div className="spinner"></div>
                    <b className="text-warning">{loading}</b>
                </motion.div>
            )}

            {error && (
                <motion.div 
                    className="error-banner"
                    initial={{ y: -50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 100 }}
                >
                    <b className="text-danger">{error}</b>
                </motion.div>
            )}

            <motion.div 
                id="ona"
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
            >
                <h1 id="main" className="text-center my-4">
                    <motion.span 
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        𝓛𝓾𝓷𝓬𝓱 𝓑𝓸𝔁
                    </motion.span>
                    <motion.b 
                        className="text ms-2"
                        animate={{ rotate: [0, 10, -10, 0] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                    >
                        𓍯 𓌉
                    </motion.b>
                </h1>
            </motion.div>

            {/* Navbar */}
            <motion.nav 
                className="navbar navbar-expand-lg navbar-dark bg-dark rounded-pill p-2 m-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
            >
                <div className="container-fluid justify-content-center">
                    <ul className="navbar-nav flex-row flex-wrap">
                        <li className="nav-item mx-2">
                            <Link 
                                className="nav-link d-flex align-items-center"
                                to="/"
                                whileHover={{ scale: 1.1 }}
                            >
                                <FaHome className="me-1" /> Home
                            </Link>
                        </li>
                        
                        {/* Show Add Products only if admin */}
                        {user?.isAdmin && (
                            <li className="nav-item mx-2">
                                <Link className="nav-link d-flex align-items-center" to="/addproducts">
                                    <FaShoppingCart className="me-1" /> Add Products
                                </Link>
                            </li>
                        )}
                        <li className="nav-item mx-2">
                            <Link className="nav-link d-flex align-items-center" to="/contactus">
                                <FaEnvelope className="me-1" /> Contact Us
                            </Link>
                        </li>

                        {!user ? (
                            <>
                                <li className="nav-item mx-2">
                                    <Link className="nav-link d-flex align-items-center" to="/signin">
                                        <FaSignInAlt className="me-1" /> Sign In
                                    </Link>
                                </li>
                                <li className="nav-item mx-2">
                                    <Link className="nav-link d-flex align-items-center" to="/signup">
                                        <FaUserPlus className="me-1" /> Sign Up
                                    </Link>
                                </li>
                            </>
                        ) : (
                            <>
                                <li className="nav-item mx-2">
                                    <span className="nav-link text-warning d-flex align-items-center">
                                        <FaUser className="me-1 text-info" /> Welcome, <b className="ms-1 text-white ">{user.username}</b>
                                    </span>
                                </li>
                                {!user.isAdmin && (
                                    <li className="nav-item mx-2">
                                        <motion.button 
                                            className="btn btn-info d-flex align-items-center"
                                            onClick={() => setShowAdminLogin(true)}
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            Admin Login
                                        </motion.button>
                                    </li>
                                )}
                                <li className="nav-item mx-2">
                                    <motion.button 
                                        className="btn btn-danger d-flex align-items-center"
                                        onClick={() => {
                                            localStorage.removeItem("user");
                                            setUser(null);
                                            navigate("/");
                                        }}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        Log Out
                                    </motion.button>
                                </li>
                            </>
                        )}
                        
                    </ul>
                </div>
            </motion.nav>

            {/* Admin Login Modal */}
            {showAdminLogin && (
                <motion.div 
                    className="admin-login-modal"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <div className="admin-login-content">
                        <h4>Admin Login</h4>
                        <input
                            type="password"
                            placeholder="Enter admin password"
                            className="form-control mb-2"
                            value={adminPassword}
                            onChange={(e) => setAdminPassword(e.target.value)}
                        />
                        <div className="d-flex justify-content-between">
                            <motion.button 
                                className="btn btn-success"
                                onClick={handleAdminLogin}
                                whileHover={{ scale: 1.05 }}
                            >
                                Submit
                            </motion.button>
                            <motion.button 
                                className="btn btn-secondary"
                                onClick={() => {
                                    setShowAdminLogin(false);
                                    setAdminPassword("");
                                    setError("");
                                }}
                                whileHover={{ scale: 1.05 }}
                            >
                                Cancel
                            </motion.button>
                        </div>
                        {error && <p className="text-danger mt-2">{error}</p>}
                    </div>
                </motion.div>
            )}

            {/* Search Bar */}
            <motion.div 
                className="row justify-content-center m-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
            >
                <div className="col-md-6 position-relative">
                    <FaSearch className="search-icon" />
                    <input
                        type="text"
                        placeholder="Search for a product by name..."
                        className="form-control search-input ps-4"
                        value={searchQuery}
                        onChange={(e) => handleSearch(e.target.value)}
                    />
                    {searchQuery && (
                        <motion.span 
                            className="clear-search"
                            onClick={() => {
                                setSearchQuery("");
                                setFilteredProducts(products);
                            }}
                            whileHover={{ scale: 1.2 }}
                        >
                            ×
                        </motion.span>
                    )}
                </div>
            </motion.div>

            {/* Only show Carousel when there's no search query */}
            {!searchQuery && <Carousel />}

            {loading ? (
                <div className="row">
                    {[...Array(8)].map((_, index) => (
                        <ProductSkeleton key={index} />
                    ))}
                </div>
            ) : (
                <motion.div 
                    className="row"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <AnimatePresence>
                        {filteredProducts.length > 0 ? (
                            filteredProducts.map((product) => (
                                <motion.div 
                                    className="col-md-3 mb-4"
                                    key={product.id}
                                    variants={itemVariants}
                                    layout
                                >
                                    <motion.div 
                                        id="card" 
                                        className="card h-100 shadow"
                                        variants={hoverVariants}
                                        whileHover="hover"
                                        onMouseEnter={() => setIsHovered(product.id)}
                                        onMouseLeave={() => setIsHovered(null)}
                                    >
                                        <div className="card-img-container">
                                            <motion.img 
                                                src={img_url + product.product_photo} 
                                                alt={product.product_name}
                                                className="product_img"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                transition={{ duration: 0.5 }}
                                                whileHover={{ scale: 1.05 }}
                                            />
                                            {isHovered === product.id && (
                                                <motion.div 
                                                    className="quick-view"
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    transition={{ duration: 0.3 }}
                                                    onClick={() => navigate(`/product/${product.id}`)}
                                                >
                                                    Quick View
                                                </motion.div>
                                            )}
                                        </div>
                                        <div className="card-body">
                                            <h5 className="mt-2">{product.product_name}</h5>
                                            <p className="text-warning">{product.product_desc.slice(0, 50)}...</p>
                                            <div className="d-flex justify-content-between align-items-center">
                                                <b className="text-warning">${product.product_cost}.00</b>
                                                <motion.button 
                                                    className="btn btn-dark"
                                                    onClick={() => handlePurchase(product.id)}
                                                    whileHover={{ scale: 1.05 }}
                                                    whileTap={{ scale: 0.95 }}
                                                >
                                                    Purchase
                                                </motion.button>
                                            </div>
                                        </div>
                                    </motion.div>
                                </motion.div>
                            ))
                        ) : (
                            <motion.div 
                                className="col-12 text-center py-5"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                            >
                                <h3 className="text-muted">No products found matching your search</h3>
                                <motion.button 
                                    className="btn btn-outline-primary mt-3"
                                    onClick={() => {
                                        setSearchQuery("");
                                        setFilteredProducts(products);
                                    }}
                                    whileHover={{ scale: 1.05 }}
                                >
                                    Clear Search
                                </motion.button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            )}

            <Footer />
            
            <style jsx>{`
                .loading-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: rgba(0,0,0,0.7);
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    z-index: 1000;
                }
                
                .spinner {
                    width: 50px;
                    height: 50px;
                    border: 5px solid #f3f3f3;
                    border-top: 5px solid #ffc107;
                    border-radius: 50%;
                    animation: spin 1s linear infinite;
                    margin-bottom: 20px;
                }
                
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
                
                .error-banner {
                    background: rgba(220,53,69,0.1);
                    padding: 15px;
                    border-radius: 5px;
                    margin: 20px auto;
                    max-width: 80%;
                    text-align: center;
                    border-left: 5px solid #dc3545;
                }
                
                .card {
                    transition: all 0.3s ease;
                    border: none;
                    overflow: hidden;
                }
                
                .card-img-container {
                    position: relative;
                    overflow: hidden;
                    height: 200px;
                }
                
                .product_img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    transition: transform 0.5s ease;
                }
                
                .quick-view {
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    background: rgba(0,0,0,0.7);
                    color: white;
                    text-align: center;
                    padding: 10px;
                    cursor: pointer;
                }
                
                .search-input {
                    padding-left: 35px;
                    border-radius: 20px;
                    border: 2px solid #ddd;
                    transition: all 0.3s;
                }
                
                .search-input:focus {
                    border-color: #ffc107;
                    box-shadow: 0 0 0 0.25rem rgba(255, 193, 7, 0.25);
                }
                
                .search-icon {
                    position: absolute;
                    left: 12px;
                    top: 12px;
                    color: #6c757d;
                }
                
                .clear-search {
                    position: absolute;
                    right: 12px;
                    top: 12px;
                    color: #6c757d;
                    cursor: pointer;
                    font-size: 1.2rem;
                }
                
                /* Skeleton loading styles */
                .skeleton-img {
                    height: 200px;
                    background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
                    background-size: 200% 100%;
                    animation: shimmer 1.5s infinite;
                }
                
                .skeleton-line {
                    height: 15px;
                    background: #f0f0f0;
                    margin-bottom: 10px;
                    border-radius: 4px;
                    animation: shimmer 1.5s infinite;
                }
                
                .skeleton-line.short {
                    width: 60%;
                }
                
                .skeleton-line.shorter {
                    width: 40%;
                    height: 10px;
                }
                
                .skeleton-button {
                    height: 35px;
                    background: #f0f0f0;
                    margin-top: 20px;
                    border-radius: 4px;
                    animation: shimmer 1.5s infinite;
                }
                
                @keyframes shimmer {
                    0% { background-position: -200% 0; }
                    100% { background-position: 200% 0; }
                }

                /* Admin login modal styles */
                .admin-login-modal {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: rgba(0,0,0,0.7);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    z-index: 1000;
                }

                .admin-login-content {
                    background: white;
                    padding: 20px;
                    border-radius: 10px;
                    width: 300px;
                    box-shadow: 0 5px 15px rgba(0,0,0,0.3);
                }

                .admin-login-content h4 {
                    margin-bottom: 20px;
                    text-align: center;
                }
            `}</style>
        </motion.div>

       </div>
    );
};

export default GetProducts;