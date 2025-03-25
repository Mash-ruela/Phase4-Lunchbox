import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const AddProducts = () => {
    let[product_name,setProductName]=useState("")
    let[product_desc,setProductDesc]=useState("")
    let[product_cost,setProductCost]=useState("")
    let[product_photo,setProductPhoto]=useState("")
    let[error,setError]=useState("")
    let[loading,setLoading]=useState("")
    let[success,setSuccess]=useState("")

    const navigate=useNavigate()
    const user = localStorage.getItem("user");

    const checkUser=()=>{
        if (!user) {
            localStorage.clear()
            return navigate("/signin")
        }
    }
    useEffect(()=> checkUser(),[user])
    const submitForm= async (e)=>{
        e.preventDefault()
        try {
            setError("")
            setSuccess("")
            setLoading("please wait as we submit your data")

            const data = new FormData();
            data.append("product_name", product_name)
            data.append("product_desc", product_desc)
            data.append("product_cost", product_cost)
            data.append("product_photo", product_photo)

            const response = await axios.post("https://brembo.pythonanywhere.com/api/addproducts", data)

            console.log(response)
            setLoading("")
            setSuccess(response.data.success);
            setProductName("")
            setProductDesc("")
            setProductCost("")
            

        } catch (error) {
            console.log(error)
            setLoading("")
            setError(error.message)
        }
    }

    return (
         
        <div id="body" className="row justify-content-center mt-4">
            <div id="ona">
                <h1 >𝓛𝓾𝓷𝓬𝓱 𝓑𝓸𝔁 <b className="text">𓇋 𓌉</b></h1>
                </div>
            <div>
            <nav className="m-4 text-center">
                <Link id="navbar"  className="btn mx-2" to="/">Home</Link>
                <Link id="navbar"  className="btn mx-2" to="/addproducts">Add Products</Link>
                <Link id="navbar"  className="btn mx-2" to="/signin">Sign In</Link>
                <Link id="navbar"  className="btn mx-2" to="/signup">Sign Up</Link>
                
            </nav>
            </div>
            
            
            <div id="form" className="col-md-6 card shadow p-4">
            <h2>Add Product</h2>
            <b className="text-warning">{loading}</b>
            <b className="text-danger">{error}</b>
            <b className="text-success">{success}</b>
            <form onSubmit={submitForm}>


                <input type="text" className="form-control" placeholder="Enter Product Name" required onChange={(e)=>setProductName(e.target.value)} value={product_name}/><br />
                <textarea name="" id="" className="form-control" placeholder="Product Description" required onChange={(e)=>setProductDesc(e.target.value)} value={product_desc}></textarea><br />
                <input type="number" className="form-control " placeholder="Product Cost" onChange={(e)=>setProductCost(e.target.value)} value={product_cost}/><br />
                <label htmlFor="" className="form-label" onChange={(e)=>setProductPhoto(e.target.files[0])} >Product Photo</label><br />
                <input type="file" className="form-control" onChange={(e)=>setProductPhoto(e.target.files[0])}/><br />
                <button id="form-button" className="btn btn-primary">Add Product</button>

            </form>
            </div>
        </div>
     );
}
 
export default AddProducts;