import React, { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { FaArrowLeft, FaCheckCircle, FaSpinner, FaShoppingCart, FaTrash } from "react-icons/fa";
import Footer from "./Footer";
import { motion, AnimatePresence } from "framer-motion";
import { BeatLoader } from "react-spinners";
import { useCart } from "./CartContext";
import axios from "axios";

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { 
    cart, 
    clearCart, 
    updateQuantity, 
    removeFromCart 
  } = useCart();
  const img_url = "https://brembo.pythonanywhere.com/static/images/";
  
  // Calculate totals
  const cartTotal = cart.reduce(
    (total, item) => total + item.product_cost * (item.quantity || 1),
    0
  );
  
  const itemCount = cart.reduce(
    (count, item) => count + (item.quantity || 1),
    0
  );

  // Form state
  const [phone, setPhone] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [error, setError] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  const handlePayment = async (e) => {
    e.preventDefault();
    setIsProcessing(true);
    setError("");

    // Format phone number to match Safaricom requirements
    const formattedPhone = phone.startsWith('254') ? phone : `254${phone.substring(phone.length - 9)}`;

    try {
      const response = await axios.post(
        "https://brembo.pythonanywhere.com/api/mpesa_payment",
        {
          amount: cartTotal,
          phone: formattedPhone
        },
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
      );

      if (response.data.message) {
        setPaymentSuccess(true);
        clearCart();
      } else {
        setError("Payment initiation failed. Please try again.");
      }
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred during payment");
      console.error("Payment error:", err);
    } finally {
      setIsProcessing(false);
    }
  };

  if (cart.length === 0 && !paymentSuccess) {
    return (
      <motion.div
        className="bg-dark text-white min-vh-100"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container text-center py-5">
          <h2 className="text-warning mb-4">Your cart is empty</h2>
          <Link to="/" className="btn btn-outline-warning">
            <FaArrowLeft className="me-2" /> Continue Shopping
          </Link>
        </div>
        <Footer />
      </motion.div>
    );
  }

  return (
    <motion.div
      className="bg-dark text-white min-vh-100"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container-fluid">
        {/* Navigation */}
        <div className="m-3">
          <motion.button
            className="btn btn-outline-warning"
            onClick={() => navigate(-1)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaArrowLeft className="me-2" /> Back
          </motion.button>
        </div>

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

          {paymentSuccess ? (
            <motion.div
              className="col-lg-6 text-center p-5 bg-black rounded border border-secondary shadow"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <FaCheckCircle className="text-success mb-3" size={50} />
              <h3 className="text-warning">Thank you for your purchase!</h3>
              <p className="lead text-white">
                Your payment of <strong className="text-warning">KSh {cartTotal.toFixed(2)}</strong> was
                successful.
              </p>
              <p className="text-white-50">An MPESA prompt has been sent to your phone number.</p>
              <motion.button
                className="btn btn-warning mt-3 px-4"
                onClick={() => navigate("/")}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Continue Shopping
              </motion.button>
            </motion.div>
          ) : (
            <div className="row justify-content-center px-3">
              {/* Order Summary */}
              <motion.div
                className="col-lg-5 card shadow my-2 mx-3 p-0 bg-black border border-secondary"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <div className="card-header bg-dark text-warning">
                  <h4>Order Summary ({itemCount} items)</h4>
                </div>
                <div className="card-body" style={{ maxHeight: "500px", overflowY: "auto" }}>
                  {cart.map((item) => (
                    <motion.div
                      key={item.id}
                      className="row mb-3 align-items-center border-bottom border-secondary pb-3"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="col-md-3">
                        <img
                          src={img_url + item.product_photo}
                          alt={item.product_name}
                          className="img-fluid rounded"
                          style={{ height: "80px", width: "80px", objectFit: "cover" }}
                        />
                      </div>
                      <div className="col-md-6">
                        <h6 className="text-warning mb-1">{item.product_name}</h6>
                        <p className="small text-white-50 mb-1">
                          {item.product_desc?.slice(0, 50)}...
                        </p>
                        <div className="d-flex align-items-center">
                          <button 
                            className="btn btn-sm btn-outline-secondary"
                            onClick={() => updateQuantity(item.id, (item.quantity || 1) - 1)}
                            disabled={(item.quantity || 1) <= 1}
                          >
                            -
                          </button>
                          <span className="mx-2">{item.quantity || 1}</span>
                          <button 
                            className="btn btn-sm btn-outline-secondary"
                            onClick={() => updateQuantity(item.id, (item.quantity || 1) + 1)}
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <div className="col-md-3 text-end">
                        <h6 className="text-warning">
                          KSh {(item.product_cost * (item.quantity || 1)).toFixed(2)}
                        </h6>
                        <button 
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => removeFromCart(item.id)}
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
                <div className="card-footer bg-dark">
                  <div className="d-flex justify-content-between align-items-center">
                    <h5 className="m-0 text-white">Total:</h5>
                    <h4 className="m-0 text-warning">KSh {cartTotal.toFixed(2)}</h4>
                  </div>
                </div>
              </motion.div>

              {/* Payment Form */}
              <motion.div
                className="col-lg-5 card shadow my-2 mx-3 p-4 bg-black border border-secondary"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <h3 className="text-warning mb-4">Payment Details</h3>
                
                {isProcessing && (
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

                <form onSubmit={handlePayment}>
                  <div className="mb-4">
                    <label className="form-label text-white-50">M-Pesa Phone Number</label>
                    <div className="input-group">
                      <span className="input-group-text bg-dark text-white border-secondary">+254</span>
                      <input
                        type="tel"
                        className="form-control bg-dark text-white border-secondary"
                        placeholder="7XXXXXXXX"
                        value={phone}
                        onChange={(e) => {
                          // Remove any non-digit characters
                          const digits = e.target.value.replace(/\D/g, '');
                          // Ensure it's 9 digits max (after 254)
                          setPhone(digits.slice(0, 9));
                        }}
                        required
                        pattern="[0-9]{9}"
                        title="Enter your 9-digit M-Pesa number (without 254)"
                      />
                    </div>
                    <div className="form-text text-white-50">
                      You'll receive an STK Push payment request on this number
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="form-label text-white-50">Amount (KSh)</label>
                    <input
                      type="text"
                      readOnly
                      value={cartTotal.toFixed(2)}
                      className="form-control bg-dark text-warning text-center fw-bold border-secondary fs-4"
                    />
                  </div>

                  <motion.button
                    className="btn btn-warning w-100 py-3 fw-bold"
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={isProcessing || !phone || phone.length !== 9}
                  >
                    {isProcessing ? (
                      <>
                        <FaSpinner className="fa-spin me-2" />
                        Processing...
                      </>
                    ) : (
                      `Pay KSh ${cartTotal.toFixed(2)}`
                    )}
                  </motion.button>
                </form>

                <div className="mt-4 p-3 bg-dark rounded border border-secondary">
                  <h6 className="text-warning">How to pay:</h6>
                  <ol className="small text-white-50">
                    <li>Enter your M-Pesa registered phone number (format: 7XXXXXXXX)</li>
                    <li>Click "Pay Now" button</li>
                    <li>Check your phone for STK Push prompt</li>
                    <li>Enter your M-Pesa PIN when prompted</li>
                    <li>Wait for payment confirmation</li>
                  </ol>
                </div>
              </motion.div>
            </div>
          )}
        </div>
      </div>
      <Footer />

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
        .form-control:focus {
          background-color: #1a1a1a;
          color: white;
          border-color: #ffc107;
          box-shadow: 0 0 0 0.25rem rgba(255, 193, 7, 0.25);
        }
        .card-body::-webkit-scrollbar {
          width: 5px;
        }
        .card-body::-webkit-scrollbar-track {
          background: #333;
        }
        .card-body::-webkit-scrollbar-thumb {
          background: #ffc107;
          border-radius: 10px;
        }
      `}</style>
    </motion.div>
  );
};

export default Checkout;