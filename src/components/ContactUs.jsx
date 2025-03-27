import { useState } from "react";
import Footer from "./Footer";
import { Link } from "react-router-dom";



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
    <div  className="justify-content-center bg-black ">
        <div className="bg-black">
        <nav className="m-4 text-center ">
                <Link id="navbar"  className="btn mx-2" to="/">Home</Link>
                <Link id="navbar"  className="btn mx-2" to="/addproducts">Add Products</Link>
                <Link id="navbar"  className="btn mx-2" to="/signin">Sign In</Link>
                <Link id="navbar"  className="btn mx-2" to="/signup">Sign Up</Link>
                
            </nav>
             
        </div>
        <div  className="row bg-black">
            <div className="col-md-6">
                <h1 id="contact">Contact Us</h1>
                <p className="text-white">We're here to help! Reach out with any questions, feedback, or order inquiries.</p>
                <section className="contact-info">
                    <h3 id="contact" >Contact Information</h3>
                    <p className="text-white">Phone: <b> +254 (712) 885-690</b> </p>
                    <p className="text-white">Email: @lunchboxconnect.co.ke</p>
                    <p className="text-white">Address: Modcom, westlands, Nairobi-Kenya</p>
                    <h2 id="ona">𝓦𝓮𝓵𝓬𝓸𝓶𝓮!!</h2>
                </section>
                
      
            </div>
      
            <div className="col-md-6">
                <div  className=" mt-4">
                    <div id="form" className="col-md-6 card shadow p-4 my-1">
                        <h2 >Suggestion Box</h2>
                        <form  className="contact-form" onSubmit={handleSubmit}>
                        <label className="text-warning" htmlFor="subject">Subject:</label>
                        <select id="subject" className="form-control" value={subject} onChange={(e) => setSubject(e.target.value)}>
                        <option value="">Select a subject</option>
                        <option value="order">Order Inquiry</option>
                        <option value="delivery">Delivery Issue</option>
                        <option value="feedback">Product Feedback</option>
                        <option value="partnership">Partnership Opportunities</option>
                        <option value="general">General Inquiry</option>
                        </select>
                        {subject === 'order' || subject === 'delivery' && (
                        <>
                            <label htmlFor="orderNumber">Order Number:</label>
                            <input type="text" id="orderNumber" className="form-control" value={orderNumber} onChange={(e) => setOrderNumber(e.target.value)} />
                        </>
                        )}
                        {subject === 'feedback' && (
                        <>
                            <label htmlFor="productName">Product Name:</label>
                            <input type="text" id="productName" className="form-control" value={productName} onChange={(e) => setProductName(e.target.value)} />
                        </>
                        )}
                        <label className="text-warning" htmlFor="message">Message:</label>
                        <textarea id="message" className="form-control" value={message} onChange={(e) => setMessage(e.target.value)}></textarea>
                        <label className="text-warning" htmlFor="file">Upload File:</label>
                        <input type="file" id="file" className="form-control" onChange={(e) => setFile(e.target.files[0])} />
                        <button id="form-button" className="btn btn-primary">Submit</button>
                        
      </form>
      
      </div>
        </div>
      </div>
      <Footer/>
      <section className="faq">
        
      </section>
    </div>


    </div>  );
};

export default ContactUs;