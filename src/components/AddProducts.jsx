import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaHome, FaPlusCircle, FaSignOutAlt } from "react-icons/fa";

const AddProducts = () => {
    const [productName, setProductName] = useState("");
    const [productDesc, setProductDesc] = useState("");
    const [productCost, setProductCost] = useState("");
    const [productPhoto, setProductPhoto] = useState(null);
    const [loading, setLoading] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user"));

    // redirect if not signed in
    useEffect(() => {
        if (!user || !user.username) {
            localStorage.clear();
            navigate("/signin");
        }
    }, [navigate, user]);

    const submitForm = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError("");
        setSuccess("");
        try {
            setLoading("Submitting product... Please wait");

            const data = new FormData();
            data.append("product_name", productName);
            data.append("product_desc", productDesc);
            data.append("product_cost", productCost);
            data.append("product_photo", productPhoto);

            const response = await axios.post(
                "https://brembo.pythonanywhere.com/api/addproducts",
                data,
                { headers: { "Content-Type": "multipart/form-data" } }
            );

            setLoading("");
            setSuccess("Product added successfully!");
            setProductName("");
            setProductDesc("");
            setProductCost("");
            setProductPhoto(null);

        } catch (err) {
            console.error(err);
            setLoading("");
            setError("Failed to add product. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleLogout = () => {
        localStorage.clear();
        navigate("/signin");
    };

    return (
        <motion.div
            id="body"
            className="row justify-content-center mt-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
        >
            {/* Header */}
            <div id="ona" className="text-center mb-4">
                <motion.h1 id="main" whileHover={{ scale: 1.02 }}>
                    𝓛𝓾𝓷𝓬𝓱 𝓑𝓸𝔁 <span className="text-warning">𓇋 𓌉</span>
                </motion.h1>
            </div>

            {/* Navbar */}
            <motion.nav
                className="navbar navbar-expand-lg navbar-dark bg-dark rounded-pill p-2 m-4"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
            >
                <div className="container-fluid justify-content-center">
                    <ul className="navbar-nav flex-row flex-wrap">
                        <li className="nav-item mx-2">
                            <Link className="nav-link d-flex align-items-center" to="/">
                                <FaHome className="me-1" /> Home
                            </Link>
                        </li>
                        <li className="nav-item mx-2">
                            <Link className="nav-link active d-flex align-items-center" to="/addproducts">
                                <FaPlusCircle className="me-1" /> Add Products
                            </Link>
                        </li>
                        <li className="nav-item mx-2">
                            <button className="nav-link btn btn-link d-flex align-items-center" onClick={handleLogout}>
                                <FaSignOutAlt className="me-1" /> Logout
                            </button>
                        </li>
                    </ul>
                </div>
            </motion.nav>

            {/* Form Card */}
            <motion.div
                id="form"
                className="col-md-5 col-lg-4 card shadow-lg p-4 my-3 border-0"
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.4 }}
            >
                <motion.div className="text-center mb-4" whileHover={{ scale: 1.05 }}>
                    <FaPlusCircle id="orangered" className="display-4  mb-3" />
                    <h2 className="text-warning" >Add Product</h2>
                </motion.div>

                {error && <motion.div className="alert alert-danger">{error}</motion.div>}
                {loading && <motion.div className="alert alert-warning text-center">{loading}</motion.div>}
                {success && <motion.div className="alert alert-success">{success}</motion.div>}

                <form onSubmit={submitForm}>
                    <div className="mb-3">
                        <label htmlFor="productName" id="orangered" className="form-label">Name</label>
                        <input
                            id="productName"
                            type="text"
                            className="form-control form-control-lg"
                            placeholder="Product Name"
                            required
                            value={productName}
                            onChange={(e) => setProductName(e.target.value)}
                            disabled={isSubmitting}
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="productDesc" id="orangered" className="form-label">Description</label>
                        <textarea
                            id="productDesc"
                            className="form-control form-control-lg"
                            placeholder="Product Description"
                            rows={3}
                            required
                            value={productDesc}
                            onChange={(e) => setProductDesc(e.target.value)}
                            disabled={isSubmitting}
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="productCost" id="orangered" className="form-label">Cost</label>
                        <input
                            id="productCost"
                            type="number"
                            className="form-control form-control-lg"
                            placeholder="Product Cost"
                            required
                            value={productCost}
                            onChange={(e) => setProductCost(e.target.value)}
                            disabled={isSubmitting}
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="productPhoto" id="orangered" className="form-label">Photo</label>
                        <input
                            id="productPhoto"
                            type="file"
                            className="form-control form-control-lg"
                            required
                            onChange={(e) => setProductPhoto(e.target.files[0])}
                            disabled={isSubmitting}
                        />
                    </div>

                    <motion.button
                        type="submit"
                        className="btn btn-warning w-100 py-2"
                        disabled={isSubmitting}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        {isSubmitting ? (
                            <>
                                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                Adding...
                            </>
                        ) : (
                            <>Add Product</>
                        )}
                    </motion.button>
                </form>
            </motion.div>

            <style jsx>{`
                #body {
                    min-height: 100vh;
                    background: linear-gradient(135deg, rgb(83, 82, 82) 0%, #2e2e2e 100%);
                    color: #f0f0f0;
                }

                #form {
                    background: rgba(12, 12, 12, 0.95);
                    backdrop-filter: blur(8px);
                    border-radius: 15px;
                    overflow: hidden;
                }

                #main {
                    font-size: 3rem;
                    margin: 1rem 0;
                    color: #f9d342;
                }

                .form-label {
                    color: #ccc;
                }

                .form-control {
                    background-color: #2a2a2a;
                    color: #fff;
                    border: 1px solid #444;
                }

                .form-control::placeholder {
                    color: #888;
                }

                .form-control:focus {
                    background-color: #2a2a2a;
                    color: #fff;
                    border-color: #f9d342;
                    box-shadow: none;
                }

                .nav-link {
                    transition: all 0.3s ease;
                    border-radius: 20px;
                    padding: 5px 15px;
                    color: #f0f0f0 !important;
                }

                .nav-link:hover {
                    background: rgba(255, 255, 255, 0.1);
                    transform: translateY(-2px);
                }

                .nav-link.active {
                    background: rgba(255, 193, 7, 0.2);
                    font-weight: bold;
                }

                .alert {
                    color: #fff;
                }

                .alert-danger {
                    background-color: #a94442;
                }

                .alert-warning {
                    background-color: #c09853;
                }

                .alert-success {
                    background-color: #3c763d;
                }

                .text-warning {
                    color: #f9d342 !important;
                }

                @media (max-width: 768px) {
                    #main {
                        font-size: 2.5rem;
                    }

                    #form {
                        width: 90%;
                    }
                }

                @media (max-width: 576px) {
                    #main {
                        font-size: 2rem;
                    }

                    .navbar-nav {
                        flex-wrap: nowrap;
                        overflow-x: auto;
                        padding-bottom: 10px;
                    }

                    .nav-item {
                        flex: 0 0 auto;
                    }
                }
            `}</style>
        </motion.div>
    );
};

export default AddProducts;
