import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Footer from "./Footer";
import { motion } from "framer-motion";
import { FaUserPlus, FaHome, FaPlusCircle, FaSignInAlt, FaUser } from "react-icons/fa";

const SignUp = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState("");
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const navigate = useNavigate();

    const submitForm = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError("");
        setSuccess("");
        try {
            setLoading("Creating account... Please wait");
            const data = new FormData();
            data.append("username", username);
            data.append("email", email);
            data.append("phone", phone);
            data.append("password", password);

            const response = await axios.post(
                "https://brembo.pythonanywhere.com/api/signup",
                data,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            if (response.data.success) {
                setSuccess(response.data.success);
                setTimeout(() => {
                    navigate("/signin");
                }, 2000);
            } else {
                setError("Registration failed. Try again.");
            }
        } catch (err) {
            setError(err.response?.data?.message || "Something went wrong.");
        } finally {
            setIsSubmitting(false);
            setLoading("");
        }
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
            <div id="ona" className="text-center">
                <motion.h1 id="main" whileHover={{ scale: 1.02 }}>
                    𝓛𝓾𝓷𝓬𝓱 𝓑𝓸𝔁 <span className="text-warning">𓇋 𓌉</span>
                </motion.h1>
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
                            <Link className="nav-link d-flex align-items-center" to="/">
                                <FaHome className="me-1" /> Home
                            </Link>
                        </li>
                        <li className="nav-item mx-2">
                            <Link className="nav-link d-flex align-items-center" to="/addproducts">
                                <FaPlusCircle className="me-1" /> Add Products
                            </Link>
                        </li>
                        <li className="nav-item mx-2">
                            <Link className="nav-link d-flex align-items-center" to="/signin">
                                <FaSignInAlt className="me-1" /> Sign In
                            </Link>
                        </li>
                        <li className="nav-item mx-2">
                            <Link className="nav-link active d-flex align-items-center" to="/signup">
                                <FaUserPlus className="me-1" /> Sign Up
                            </Link>
                        </li>
                    </ul>
                </div>
            </motion.nav>

            <motion.div
                id="form"
                className="col-md-5 col-lg-4 card shadow-lg p-4 my-3 border-0"
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.4 }}
            >
                <motion.div className="text-center mb-4" whileHover={{ scale: 1.05 }}>
                    <FaUser className="display-4 text-warning mb-3" />
                    <h2 id="orangered">Sign Up</h2>
                </motion.div>

                {error && (
                    <motion.div className="alert alert-danger">{error}</motion.div>
                )}
                {loading && (
                    <motion.div className="alert alert-warning">
                        <div className="spinner-border spinner-border-sm me-2" role="status"></div>
                        {loading}
                    </motion.div>
                )}
                {success && (
                    <motion.div className="alert alert-success">
                        {success}
                        <div className="spinner-border spinner-border-sm ms-2" role="status"></div>
                    </motion.div>
                )}

                <form onSubmit={submitForm}>
                    <div className="mb-3">
                        <label id="orangered" className="form-label">Username</label>
                        <input
                            type="text"
                            className="form-control form-control-lg"
                            placeholder="Enter Username"
                            required
                            onChange={(e) => setUsername(e.target.value)}
                            disabled={isSubmitting}
                        />
                    </div>
                    <div className="mb-3">
                        <label id="orangered" className="form-label">Email</label>
                        <input
                            type="email"
                            className="form-control form-control-lg"
                            placeholder="Enter Email"
                            onChange={(e) => setEmail(e.target.value)}
                            disabled={isSubmitting}
                        />
                    </div>
                    <div className="mb-3">
                        <label id="orangered" className="form-label">Phone</label>
                        <input
                            type="text"
                            className="form-control form-control-lg"
                            placeholder="Enter Phone"
                            required
                            onChange={(e) => setPhone(e.target.value)}
                            disabled={isSubmitting}
                        />
                    </div>
                    <div className="mb-4">
                        <label id="orangered" className="form-label">Password</label>
                        <input
                            type="password"
                            className="form-control form-control-lg"
                            placeholder="Enter Password"
                            required
                            onChange={(e) => setPassword(e.target.value)}
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
                                Signing Up...
                            </>
                        ) : (
                            <>
                                <FaUserPlus className="me-2" />
                                Sign Up
                            </>
                        )}
                    </motion.button>
                </form>

                <div className="text-center mt-4">
                    <p className="text-muted">
                        Already have an account?{' '}
                        <Link to="/signin" className="text-warning">Sign In</Link>
                    </p>
                </div>
            </motion.div>

            <Footer />

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

                .text-muted {
                    color: #aaa !important;
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

export default SignUp;
