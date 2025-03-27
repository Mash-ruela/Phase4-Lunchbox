import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Footer from "./Footer";

const SignIn = () => {
    let [username,setUsername] = useState("")
    let [password,setPassword] = useState("")
    let [loading,setLoading] = useState("")
    let [error,setError] = useState("")

    let navigate = useNavigate()

    const submitForm = async (e) => {
        e.preventDefault()
        try {
            setLoading("Hold On...")
            setError("")

            const data = new FormData()
            data.append("username",username)
            data.append("password",password)

            const response = await axios.post("https://brembo.pythonanywhere.com/api/signin",data)
            
            if (response.data.User) {
                localStorage.setItem("User", JSON.stringify(response.data.User));
                // Immediately redirect after sign-in
                navigate("/", { replace: true });
            } else {
                setLoading("");
                setError(response.data.Message);
            }

        } catch (error) {
            setLoading("")
            setError("Something went Wrong")
        }
    }

    return ( 
        <div id="body" className="row justify-content-center mt-5">
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
            <div id="form" className="col-md-6 card shadow p-4 my-1">
                <h2>Sign In</h2>
                <b className="text-danger">{error}</b>
                <b className="text-warning">{loading}</b>
                <form  onSubmit={submitForm}>
                    <input type="text" className="form-control" placeholder="Username" required onChange={(e)=>setUsername(e.target.value)} /> <br />
                    <input type="password" className="form-control" placeholder="Password" required onChange={(e)=>setPassword(e.target.value)} /> <br />
                    <button id="form-button" className="btn btn-primary" type="submit">Sign In</button>
                </form> <br />
                <p>Don't have an Account?<Link to="/signup">SignUp</Link></p> 
            </div>
            <Footer/>
        </div>

    );
}
 
export default SignIn;