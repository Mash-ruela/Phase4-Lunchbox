import axios from "axios";
import { useState } from "react";
import {Link} from "react-router-dom"

const SignUp = () => {
    // create variables

    let[username,setUsername]=useState("");
    let[email,setEmail]=useState("");
    let[phone,setPhone]=useState("");
    let[password,setPassword]=useState("");
    let [loading,setLoading]=useState("");
    let[success,setSuccess]=useState("");
    let[error,setError]=useState("")
    const  submitForm=async(e)=>{
        e.preventDefault();
        try {
            setLoading("please wait while we submit your data")
            const data=new FormData();
            data.append("username",username);
            data.append("email",email)
            data.append("phone",phone)
            data.append("password",password)


            const response= await axios.post("https://brembo.pythonanywhere.com/api/signup",data)
            setLoading("")
            setSuccess(response.data.success)
        } catch (error) {
           setLoading("");
           setError("something went wrong") 
        }
    }
    return ( 

        <div id="body" className="row justify-content-center mt-4">
            <div id="ona">
                <h1 id="main" className=" p-4">𝓛𝓾𝓷𝓬𝓱 𝓑𝓸𝔁 <b className="text">𓇋 𓌉</b></h1>
                
            </div>
            <div>
            <nav className="m-4">
                <Link id="navbar"  className="btn mx-2" to="/">Home</Link>
                <Link id="navbar"  className="btn mx-2" to="/addproducts">Add Products</Link>
                <Link id="navbar"  className="btn mx-2" to="/signin">Sign In</Link>
                <Link id="navbar"  className="btn mx-2" to="/signup">Sign Up</Link>
                
            </nav>
            </div>
            <br />
            <br />
            <div id="form" className="col-md-6 card shadow-danger p-4">
                <h2>Sign Up</h2>
                <b className="text-danger">{error}</b>
                <b className="text-warning">{loading}</b>
                <b className="text-success">{success}</b>
                <form id="form" onSubmit={submitForm}> 

                <input type="text" className="form-control" placeholder="Enter Username" required onChange={(e)=> setUsername(e.target.value)}/> <br />
                <input type="email" className="form-control " placeholder="Enter Email" onChange={(e)=>setEmail(e.target.value)}/> <br />
                <input type="text" className="form-control" placeholder="Enter Phone" required onChange={(e)=>setPhone(e.target.value)}/> <br />
                <input type="password" className="form-control" placeholder="Enter Password" required onChange={(e)=>setPassword(e.target.value)}/> <br />
                <button id="form-button" className="btn btn-primary">Sign Up</button>
                </form>

                <p>Already have an account?<Link to="/signin">Sign In</Link></p>
            </div>
        </div>
     );
}
 
export default SignUp;