import React from "react";
import { useCart } from "./CartContext";
import { useNavigate, Link } from "react-router-dom";
import { FaTrash, FaArrowLeft, FaMoneyBillWave, FaPlus, FaMinus } from "react-icons/fa";
import Footer from "./Footer";
import { motion } from "framer-motion";

const Cart = () => {
  const { 
    cart, 
    removeFromCart, 
    clearCart, 
    updateQuantity,
    cartTotal,
    itemCount
  } = useCart();
  const navigate = useNavigate();
  const img_url = "https://brembo.pythonanywhere.com/static/images/";

  return (
    <motion.div
      className="container-fluid"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="row justify-content-center">
        <h1 id="main" className="text-center mt-4 mb-3">
          🛒 Your Cart ({itemCount} {itemCount === 1 ? 'item' : 'items'})
        </h1>

        <div className="text-center mb-3">
          <Link to="/" className="btn btn-outline-warning me-2">
            <FaArrowLeft /> Back to Shop
          </Link>
          {cart.length > 0 && (
            <button className="btn btn-outline-danger" onClick={clearCart}>
              <FaTrash /> Clear Cart
            </button>
          )}
        </div>

        {cart.length === 0 ? (
          <motion.div 
            className="text-center text-muted py-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <h4>Your cart is empty</h4>
            <Link className="btn btn-info mt-3" to="/">
              Browse Products
            </Link>
          </motion.div>
        ) : (
          <div className="row justify-content-center mx-auto" style={{ maxWidth: '1200px' }}>
            <div className="col-12 mb-4">
              <div className="card bg-dark text-white">
                <div className="card-body">
                  <div className="row fw-bold border-bottom pb-2">
                    <div className="col-md-4">Product</div>
                    <div className="col-md-2">Price</div>
                    <div className="col-md-2">Quantity</div>
                    <div className="col-md-2">Total</div>
                    <div className="col-md-2">Action</div>
                  </div>
                  
                  {cart.map((item) => {
                    // Use either id or product_id
                    const itemId = item.id || item.product_id;
                    
                    return (
                      <motion.div
                        key={`${itemId}-${item.quantity}`}
                        className="row align-items-center border-bottom py-3"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="col-md-4 d-flex align-items-center">
                          <img
                            src={img_url + item.product_photo}
                            className="me-3 rounded"
                            alt={item.product_name}
                            style={{ width: "60px", height: "60px", objectFit: "cover" }}
                          />
                          <div>
                            <h6 className="mb-0">{item.product_name}</h6>
                            <small className="text-muted">{item.product_desc?.slice(0, 50)}...</small>
                          </div>
                        </div>
                        <div className="col-md-2">
                          ${item.product_cost.toFixed(2)}
                        </div>
                        <div className="col-md-2">
                          <div className="d-flex align-items-center">
                            <button 
                              className="btn btn-outline-secondary btn-sm"
                              onClick={() => updateQuantity(itemId, (item.quantity || 1) - 1)}
                              disabled={(item.quantity || 1) <= 1}
                            >
                              <FaMinus />
                            </button>
                            <span className="mx-3">{item.quantity || 1}</span>
                            <button 
                              className="btn btn-outline-secondary btn-sm"
                              onClick={() => updateQuantity(itemId, (item.quantity || 1) + 1)}
                            >
                              <FaPlus />
                            </button>
                          </div>
                        </div>
                        <div className="col-md-2 text-warning">
                          ${(item.product_cost * (item.quantity || 1)).toFixed(2)}
                        </div>
                        <div className="col-md-2">
                          <button 
                            className="btn btn-outline-danger btn-sm" 
                            onClick={() => removeFromCart(itemId)}
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

        {cart.length > 0 && (
          <motion.div 
            className="text-center my-4 p-3 bg-dark rounded"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <h4 className="text-info">
              Subtotal ({itemCount} {itemCount === 1 ? 'item' : 'items'}): <b>${cartTotal.toFixed(2)}</b>
            </h4>
            <button 
              className="btn btn-success mt-3 px-4 py-2" 
              onClick={() => navigate("/checkout", { state: { cart } })}
            >
              <FaMoneyBillWave className="me-2" /> Proceed to Checkout
            </button>
          </motion.div>
        )}
      </div>
      <Footer />
    </motion.div>
  );
};

export default Cart;