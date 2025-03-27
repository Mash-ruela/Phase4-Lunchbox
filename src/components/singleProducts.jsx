import axios from "axios";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import Footer from "./Footer";

const SingleProduct = () => {
   
        let [phone,setPhone]=useState("");
        let [loading,setLoading]=useState("");
        let [success,setSuccess]=useState("");
        let[error,setError]=useState("");

        const {product} =useLocation().state || {}
        const img_url = "https://ndege25.pythonanywhere.com/static/images/"
        const submitForm= async(e) =>{
            e.preventDefault();
            setError("")
            setSuccess("")
            setLoading("Please wait as we process payment...");
            try {
                const data=new FormData()
                data.append("phone",phone)
                data.append("amount",product.product_cost)

                const response= await axios.post("https://ndege25.pythonanywhere.com/api/mpesa_payment",data)
                setLoading("")
                setSuccess(response.data.message)
            } catch (error) {
               setLoading("") 
               setError(error.message)
            }
        }

    
    return ( 
        <div>
            <div id="body" className="row justify-content-center mt-3">
            <div id="ona">
                <h1 id="main">𝓛𝓾𝓷𝓬𝓱 𝓑𝓸𝔁 <b className="text">𓇋 𓌉</b></h1>
                </div>
            <div>
            <nav className="m-4 text-center">
                <Link id="navbar"  className="btn mx-2" to="/">Home</Link>
                <Link id="navbar"  className="btn mx-2" to="/addproducts">Add Products</Link>
                <Link id="navbar"  className="btn mx-2" to="/signin">Sign In</Link>
                <Link id="navbar"  className="btn mx-2" to="/signup">Sign Up</Link>
                
                
            </nav>
            </div>
            
                <div id="cardo" className="col-md-3 card shadow my-2">
                    <img src={img_url + product.product_photo} alt="" />
                </div>
                <div id="cardo" className="col-md-3 card shadow my-2">
                    <h2 className="text-info">{product.product_name}</h2>
                    <h3><b className="text-warning">${product.product_cost}.00</b></h3>
                    <h5 className="text-warning" >"{product.product_desc}"</h5>

                    <b className="text-warning">{loading}</b>
                    <b className="text-danger">{error}</b>
                    <b className="text-success">{success}</b>
                    <form onSubmit={submitForm}>
                        <input type="number" readOnly value={product.product_cost} className="form-control" /><br />
                        <input type="tel" className="form-control" placeholder="Enter Mpesa No 2547xxxxxxxx" onChange={(e)=>setPhone(e.target.value)} /><br /><br />
                        <button id="form-button" className="btn btn-primary my-1">Pay Now</button>
                    </form>
                </div>
                <br />
            </div>
            
            <div >
            <Footer/>

            </div>
            
        </div>
     );
}
 
export default SingleProduct;