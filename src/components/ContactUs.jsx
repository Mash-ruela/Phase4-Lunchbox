import { useState } from "react";
import Footer from "./Footer";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const ContactUs = () => {
  const [subject, setSubject] = useState('');
  const [orderNumber, setOrderNumber] = useState('');
  const [productName, setProductName] = useState('');
  const [message, setMessage] = useState('');
  const [file, setFile] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ subject, orderNumber, productName, message, file });
    setSubject('');
    setOrderNumber('');
    setProductName('');
    setMessage('');
    setFile(null);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-black text-white"
    >
      {/* Navigation Buttons */}
      <motion.nav 
        className="text-center py-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <motion.div className="d-inline-block mx-2" whileHover={{ scale: 1.05 }}>
          <Link to="/" className="btn btn-warning text-dark fw-bold px-4">Home</Link>
        </motion.div>

        <motion.div className="d-inline-block mx-2" whileHover={{ scale: 1.05 }}>
          <Link to="/addproducts" className="btn btn-warning text-dark fw-bold px-4">Add Products</Link>
        </motion.div>

        <motion.div className="d-inline-block mx-2" whileHover={{ scale: 1.05 }}>
          <Link to="/signin" className="btn btn-warning text-dark fw-bold px-4">Sign In</Link>
        </motion.div>

        <motion.div className="d-inline-block mx-2" whileHover={{ scale: 1.05 }}>
          <Link to="/signup" className="btn btn-warning text-dark fw-bold px-4">Sign Up</Link>
        </motion.div>
      </motion.nav>

      {/* Contact Section */}
      <div className="container py-5">
        <div className="row">
          {/* Left: Info */}
          <div className="col-md-6 mb-4">
            <motion.h1 whileHover={{ scale: 1.05 }} className="text-warning">
              Contact Us
            </motion.h1>
            <p>We're here to help! Reach out with any questions, feedback, or order inquiries.</p>

            <motion.div className="mt-4">
              <h3 className="text-warning">Contact Information</h3>
              <p><b>Phone:</b> +254 (745) 770-411</p>
              <p><b>Email:</b> ruelamacharia2007@gmail.com</p>
              <p><b>Address:</b> VarsityVille, Nairobi-Kenya</p>

              <motion.h2
                className="text-warning mt-4"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", stiffness: 100 }}
                whileHover={{ scale: 1.05 }}
              >
                𝓦𝓮𝓵𝓬𝓸𝓶𝓮!!
              </motion.h2>
            </motion.div>
          </div>

          {/* Right: Form */}
          <div className="col-md-6">
            <motion.div
              className="card p-4 bg-dark border-light shadow"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ y: -5, boxShadow: "0 10px 25px rgba(255, 193, 7, 0.3)" }}
            >
              <h2 className="text-warning mb-3">Suggestion Box</h2>

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="subject" className="form-label text-light">Subject:</label>
                  <select
                    id="subject"
                    className="form-control"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                  >
                    <option value="">Select a subject</option>
                    <option value="order">Order Inquiry</option>
                    <option value="delivery">Delivery Issue</option>
                    <option value="feedback">Product Feedback</option>
                    <option value="partnership">Partnership Opportunities</option>
                    <option value="general">General Inquiry</option>
                  </select>
                </div>

                {(subject === "order" || subject === "delivery") && (
                  <div className="mb-3">
                    <label htmlFor="orderNumber" className="form-label text-light">Order Number:</label>
                    <input
                      type="text"
                      id="orderNumber"
                      className="form-control"
                      value={orderNumber}
                      onChange={(e) => setOrderNumber(e.target.value)}
                    />
                  </div>
                )}

                {subject === "feedback" && (
                  <div className="mb-3">
                    <label htmlFor="productName" className="form-label text-light">Product Name:</label>
                    <input
                      type="text"
                      id="productName"
                      className="form-control"
                      value={productName}
                      onChange={(e) => setProductName(e.target.value)}
                    />
                  </div>
                )}

                <div className="mb-3">
                  <label htmlFor="message" className="form-label text-light">Message:</label>
                  <textarea
                    id="message"
                    className="form-control"
                    rows="4"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  ></textarea>
                </div>

                <div className="mb-3">
                  <label htmlFor="file" className="form-label text-light">Upload File:</label>
                  <input
                    type="file"
                    id="file"
                    className="form-control"
                    onChange={(e) => setFile(e.target.files[0])}
                  />
                </div>

                <motion.button
                  type="submit"
                  className="btn btn-warning text-dark fw-bold w-100"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Submit
                </motion.button>
              </form>
            </motion.div>
          </div>
        </div>
      </div>

      <Footer />
    </motion.div>
  );
};

export default ContactUs;
