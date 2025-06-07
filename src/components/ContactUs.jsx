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

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  const navItem = {
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 1, x: 0, transition: { duration: 0.5 } }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="justify-content-center bg-black"
    >
      <div className="bg-black">
        <motion.nav 
          variants={container}
          initial="hidden"
          animate="show"
          className="m-4 text-center"
        >
          {['Home', 'Add Products', 'Sign In', 'Sign Up'].map((link, index) => (
            <motion.div key={index} variants={navItem}>
              <Link 
                id="navbar" 
                className="btn mx-2"
                to={link.toLowerCase().replace(' ', '')}
                whileHover={{ scale: 1.05, color: "#ffc107" }}
              >
                {link}
              </Link>
            </motion.div>
          ))}
        </motion.nav>
      </div>
      
      <motion.div 
        className="row bg-black p-5"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <div className="col-md-6">
          <motion.h1 
            id="contact"
            variants={item}
            whileHover={{ scale: 1.02 }}
          >
            Contact Us
          </motion.h1>
          
          <motion.p 
            className="text-white"
            variants={item}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            We're here to help! Reach out with any questions, feedback, or order inquiries.
          </motion.p>
          
          <motion.section 
            className="contact-info"
            variants={item}
          >
            <motion.h3 
              id="contact"
              whileHover={{ scale: 1.02 }}
            >
              Contact Information
            </motion.h3>
            
            <motion.p 
              className="text-white"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              Phone: <b> +254 (712) 885-690</b>
            </motion.p>
            
            <motion.p 
              className="text-white"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              Email: @lunchboxconnect.co.ke
            </motion.p>
            
            <motion.p 
              className="text-white"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
            >
              Address: Modcom, westlands, Nairobi-Kenya
            </motion.p>
            
            <motion.h2 
              id="ona"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ 
                delay: 0.7,
                type: "spring",
                stiffness: 100
              }}
              whileHover={{ scale: 1.05 }}
            >
              𝓦𝓮𝓵𝓬𝓸𝓶𝓮!!
            </motion.h2>
          </motion.section>
        </div>
      
        <div className="col-md-6">
          <motion.div 
            className="mt-4"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <motion.div 
              id="form" 
              className="col-md-6 card shadow p-4 my-1"
              whileHover={{ 
                boxShadow: "0 10px 25px rgba(255, 193, 7, 0.3)",
                y: -5
              }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <motion.h2
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                Suggestion Box
              </motion.h2>
              
              <form className="contact-form" onSubmit={handleSubmit}>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <label className="text-warning" htmlFor="subject">Subject:</label>
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
                </motion.div>
                
                {subject === 'order' || subject === 'delivery' && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    transition={{ duration: 0.3 }}
                  >
                    <label htmlFor="orderNumber">Order Number:</label>
                    <input 
                      type="text" 
                      id="orderNumber" 
                      className="form-control" 
                      value={orderNumber} 
                      onChange={(e) => setOrderNumber(e.target.value)} 
                    />
                  </motion.div>
                )}
                
                {subject === 'feedback' && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    transition={{ duration: 0.3 }}
                  >
                    <label htmlFor="productName">Product Name:</label>
                    <input 
                      type="text" 
                      id="productName" 
                      className="form-control" 
                      value={productName} 
                      onChange={(e) => setProductName(e.target.value)} 
                    />
                  </motion.div>
                )}
                
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  <label className="text-warning" htmlFor="message">Message:</label>
                  <textarea 
                    id="message" 
                    className="form-control" 
                    value={message} 
                    onChange={(e) => setMessage(e.target.value)}
                  ></textarea>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                >
                  <label className="text-warning" htmlFor="file">Upload File:</label>
                  <input 
                    type="file" 
                    id="file" 
                    className="form-control" 
                    onChange={(e) => setFile(e.target.files[0])} 
                  />
                </motion.div>
                
                <motion.button
                  id="form-button"
                  className="btn btn-primary mt-3"
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: "0 0 10px rgba(255, 193, 7, 0.5)"
                  }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  Submit
                </motion.button>
              </form>
            </motion.div>
          </motion.div>
        </div>
        
        <Footer/>
      </motion.div>
    </motion.div>
  );
};

export default ContactUs;