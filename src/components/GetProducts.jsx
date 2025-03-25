import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const GetProducts = () => {
    let [products,setProducts]=useState([])
    let [error,setError]=useState("")
    let [loading,setLoading]=useState("")
    let [filteredProducts,setFilteredProducts]=useState([])

    const img_url="https://brembo.pythonanywhere.com/static/images/"
    const navigate=useNavigate();
    

    const getProducts=async()=>{
        setError("")
        setLoading("please wait...Receiving Products...")
        try {
            const response= await axios.get("https://brembo.pythonanywhere.com/api/getProducts")
            setProducts(response.data);
            setFilteredProducts(response.data)
            setLoading("")
        } catch (error) {
          setLoading("") 
          setError(error.message)
        }
    }
    const handleSearch=(value) =>{
        const filtered=products && products.filter((product)=> 
            product.product_name.toLowerCase().includes(value.toLowerCase())
    )
        setFilteredProducts(filtered);
    }
    // useEffect(function,dependancy)

    useEffect(()=>{
        getProducts();
    },[])
    return ( 
        <div id="body" className="row">
            <b className="text-warning">{loading}</b>
            <b className="text-danger">{error}</b>
            {/* {navbar} */}
            
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
            {/* {carousel} */}
            {/* {content} */}
            <div className="justify-content-center m-3">
                <div className="col-md-6">
                <input type="text" placeholder="Search for a product by name" className="form-control" onChange={(e)=>handleSearch(e.target.value)}/>
                </div>
            </div>

            {filteredProducts.map((product)=>(
              <div className="col-md-3 justify-content-center mb-4">
              <div id="card" className="card shadow-danger">
                  <img src={img_url+product.product_photo} alt="" className="product_img" />
                  <div className="card-body">
                      <h5 className="mt-2">{product.product_name}</h5>
                      <p className="text-warning">{product.product_desc.slice(0,10)}</p>
                      <b className="text-warning">{product.product_cost} $</b>

                      <button className="btn btn-dark w-100" onClick={()=>navigate("/singleproduct",{state:{product}})}>View Product</button>
                  </div>
              </div>
          </div>

            ))}
            
            {/* {footer} */}
        </div>
     );
}
 
export default GetProducts; 