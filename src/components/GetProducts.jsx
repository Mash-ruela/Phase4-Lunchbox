import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Carousel from "./Carousel";
import Footer from "./Footer";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaSearch,
  FaShoppingCart,
  FaUser,
  FaHome,
  FaEnvelope,
  FaSignInAlt,
  FaUserPlus,
} from "react-icons/fa";
import { useCart } from "./CartContext";

const GetProducts = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [user, setUser] = useState(null);
  const [isHovered, setIsHovered] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const { addToCart } = useCart();
  const [showPopup, setShowPopup] = useState(false);

  const img_url = "https://brembo.pythonanywhere.com/static/images/";
  const navigate = useNavigate();
  const ADMIN_SECRET = "brembo";

  const getProducts = async () => {
    setError("");
    setLoading("Please wait...Receiving Products...");
    try {
      const response = await axios.get(
        "https://brembo.pythonanywhere.com/api/getproducts"
      );
      setProducts(response.data);
      setFilteredProducts(response.data);
      setLoading("");
    } catch (error) {
      setLoading("");
      setError(error.message);
      console.error("Error fetching products:", error);
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
      if (loggedInUser.isAdmin) {
        setShowAdminLogin(false);
      }
    }
  }, []);

  const handleAdminLogin = () => {
    if (adminPassword === ADMIN_SECRET) {
      const adminUser = {
        ...user,
        isAdmin: true,
      };
      setUser(adminUser);
      localStorage.setItem("user", JSON.stringify(adminUser));
      setShowAdminLogin(false);
      setAdminPassword("");
    } else {
      setError("Invalid admin password");
    }
  };

  const handleAddToCart = (product) => {
    if (!product?.id && !product?.product_id) {
      console.warn("Skipping product without valid ID:", product);
      setError("Product has no valid ID and cannot be added to cart.");
      return;
    }
    
    try {
      // Normalize the product object before adding to cart
      const productToAdd = {
        ...product,
        id: product.id || product.product_id, // Ensure consistent ID
        product_cost: parseFloat(product.product_cost) // Ensure cost is a number
      };

      console.log("Adding to cart:", productToAdd);
      addToCart(productToAdd);

      setTimeout(() => {
        const cartFromStorage = JSON.parse(localStorage.getItem('cart')) || [];
        const exists = cartFromStorage.find(item => 
          item.id === productToAdd.id || item.product_id === productToAdd.id
        );
        if (!exists) {
          setError("Failed to add item to cart. Please try again.");
          console.error("Cart after add attempt:", cartFromStorage);
        } else {
          setShowPopup(true);
          setTimeout(() => setShowPopup(false), 2000);
        }
      }, 100);
    } catch (err) {
      setError("An error occurred while adding to cart.");
      console.error("Add to cart error:", err);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, when: "beforeChildren" },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "tween", duration: 0.5 },
    },
  };

  const hoverVariants = {
    hover: {
      y: -5,
      boxShadow: "0 10px 20px rgba(0,0,0,0.2)",
      transition: { type: "tween", duration: 0.3 },
    },
  };

  const popupVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: "spring", damping: 25 } },
    exit: { y: 50, opacity: 0 },
  };

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
            exit={{ opacity: 0 }}
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
            exit={{ y: -50, opacity: 0 }}
          >
            <b className="text-danger">{error}</b>
          </motion.div>
        )}

        <AnimatePresence>
          {showPopup && (
            <motion.div
              className="add-to-cart-popup"
              variants={popupVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              Item added to cart!
            </motion.div>
          )}
        </AnimatePresence>

        <h1 id="main" className="text-center my-4">
          𝓛𝓾𝓷𝓬𝓱 𝓑𝓸𝔁 <b className="text ms-2">𓍯 𓌉</b>
        </h1>

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
                  <button className="btn btn-success" onClick={handleAdminLogin}>
                    Submit
                  </button>
                  <button
                    className="btn btn-secondary"
                    onClick={() => {
                      setShowAdminLogin(false);
                      setAdminPassword("");
                      setError("");
                    }}
                  >
                    Cancel
                  </button>
                </div>
                {error && <p className="text-danger mt-2">{error}</p>}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Search Bar */}
        <motion.div 
          className="row justify-content-center m-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="col-md-6 position-relative">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search for a product..."
              className="form-control search-input ps-4"
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
            />
            {searchQuery && (
              <span
                className="clear-search"
                onClick={() => {
                  setSearchQuery("");
                  setFilteredProducts(products);
                }}
              >
                ×
              </span>
            )}
          </div>
        </motion.div>

        {!searchQuery && <Carousel />}

        <motion.div 
          className="row" 
          variants={containerVariants} 
          initial="hidden" 
          animate="visible"
        >
          <AnimatePresence mode="wait">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product, index) => {
                if (!product || (!product.id && !product.product_name)) {
                  console.warn("Skipping invalid product:", product);
                  return null;
                }

                const key = product.id || `${product.product_name}-${index}`;

                return (
                  <motion.div 
                    className="col-md-3 mb-4" 
                    key={key} 
                    variants={itemVariants} 
                    layout
                    exit={{ opacity: 0 }}
                  >
                    <motion.div
                      className="card h-100 shadow bg-black text-white"
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
                          whileHover={{ scale: 1.05 }}
                          transition={{ type: "tween", duration: 0.3 }}
                        />
                        {isHovered === product.id && (
                          <motion.div
                            className="quick-view"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            onClick={() => navigate("/singleproduct", { state: { product } })}
                          >
                            Quick View
                          </motion.div>
                        )}
                      </div>
                      <div className="card-body">
                        <h5>{product.product_name}</h5>
                        <p className="text-warning">
                          {product.product_desc?.slice(0, 50)}...
                        </p>
                        <div className="d-flex justify-content-between align-items-center mt-2">
                          <b className="text-warning">Ksh{product.product_cost}.00</b>
                          <motion.button
                            className="btn btn-info"
                            onClick={() => handleAddToCart(product)}
                            title="Add to Cart"
                            whileTap={{ scale: 0.9 }}
                          >
                            <FaShoppingCart />
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                );
              })
            ) : (
              <motion.div 
                className="col-12 text-center py-5"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <h3 className="text-muted">No products found matching your search</h3>
                <button
                  className="btn btn-outline-primary mt-3"
                  onClick={() => {
                    setSearchQuery("");
                    setFilteredProducts(products);
                  }}
                >
                  Clear Search
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        <Footer />

        <style jsx>{`
          .loading-overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.7);
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
            0% {
              transform: rotate(0deg);
            }
            100% {
              transform: rotate(360deg);
            }
          }
          .error-banner {
            background: rgba(220, 53, 69, 0.1);
            padding: 15px;
            border-radius: 5px;
            margin: 20px auto;
            max-width: 80%;
            text-align: center;
            border-left: 5px solid #dc3545;
          }
          .card {
            background-color: #000;
            color: #fff;
            border: none;
            transition: all 0.3s ease;
            overflow: hidden;
          }
          .card-body {
            background-color: #000;
            color: #fff;
          }
          .card-body h5,
          .card-body p,
          .card-body b {
            color: #fff;
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
          }
          .quick-view {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            background: rgba(0, 0, 0, 0.7);
            color: white;
            text-align: center;
            padding: 10px;
            cursor: pointer;
          }
          .search-input {
            padding-left: 35px;
            border-radius: 20px;
            border: 2px solid #ddd;
          }
          .search-input:focus {
            border-color: #ffc107;
          }
          .search-icon {
            position: absolute;
            left: 12px;
            top: 12px;
            color: rgb(101, 103, 105);
          }
          .clear-search {
            position: absolute;
            right: 12px;
            top: 12px;
            color: #6c757d;
            cursor: pointer;
          }
          .admin-login-modal {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.7);
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
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
          }
          .admin-login-content h4 {
            margin-bottom: 20px;
            text-align: center;
          }
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
        `}</style>
      </motion.div>
    </div>
  );
};

export default GetProducts;