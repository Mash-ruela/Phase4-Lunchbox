import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Carousel from "./Carousel";
import Footer from "./Footer";

const GetProducts = () => {
    let [products, setProducts] = useState([]);
    let [error, setError] = useState("");
    let [loading, setLoading] = useState("");
    let [filteredProducts, setFilteredProducts] = useState([]);

    const [user, setUser] = useState(null);

    const img_url = "https://brembo.pythonanywhere.com/static/images/";
    const navigate = useNavigate();

    const getProducts = async () => {
        setError("");
        setLoading("Please wait...Receiving Products...");
        try {
            const response = await axios.get("https://brembo.pythonanywhere.com/api/getproducts");
            setProducts(response.data);
            setFilteredProducts(response.data);
            setLoading("");
        } catch (error) {
            setLoading("");
            setError(error.message);
        }
    };

    const handleSearch = (value) => {
        const filtered = products.filter((product) =>
            product.product_name.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredProducts(filtered);
    };

    useEffect(() => {
        getProducts();
        const loggedInUser = JSON.parse(localStorage.getItem("user"));
        if (loggedInUser) {
            setUser(loggedInUser);
        }
    }, []);

    const handlePurchase = () => {
        if (!user) {
            navigate("/signup");
        } else {
            navigate("/purchase");
        }
    };

    return (
        <div id="body" className="row">
            <b className="text-warning">{loading}</b>
            <b className="text-danger">{error}</b>

            <div id="ona">
                <h1 id="main">𝓛𝓾𝓷𝓬𝓱 𝓑𝓸𝔁 <b className="text">𓇋 𓌉</b></h1>
            </div>

            {/* Navbar */}
            <nav className="m-4 text-center">
                <Link id="navbar" className="btn mx-2" to="/">Home</Link>
                <Link id="navbar" className="btn mx-2" to="/addproducts">Add Products</Link>

                {!user ? (
                    <>
                        <Link id="navbar" className="btn mx-2" to="/signin">Sign In</Link>
                        <Link id="navbar" className="btn mx-2" to="/signup">Sign Up</Link>
                    </>
                ) : (
                    <>
                        <span className="mx-2">Welcome, <b>{user.username}</b>!</span>
                        <button className="btn btn-danger mx-2" onClick={() => {
                            localStorage.removeItem("user");
                            setUser(null);
                            navigate("/");
                        }}>
                            Log Out
                        </button>
                    </>
                )}
                <Link id="navbar" className="btn mx-2" to="/contactus">Contact Us</Link>
            </nav>

            {/* Search Bar */}
            <div className="justify-content-center m-3">
                <div className="col-md-6">
                    <input
                        type="text"
                        placeholder="Search for a product by name"
                        className="form-control"
                        onChange={(e) => handleSearch(e.target.value)}
                    />
                </div>
            </div>

            <Carousel />

            {filteredProducts.map((product) => (
                <div className="col-md-3 justify-content-center mb-4" key={product.id}>
                    <div id="card" className="card shadow-danger">
                        <img src={img_url + product.product_photo} alt="" className="product_img" />
                        <div className="card-body">
                            <h5 className="mt-2">{product.product_name}</h5>
                            <p className="text-warning">{product.product_desc.slice(0, 10)}...</p>
                            <b className="text-warning">${product.product_cost}.00</b>

                            <button className="btn btn-dark w-100 mt-2" onClick={handlePurchase}>
                                Purchase
                            </button>
                        </div>
                    </div>
                </div>
            ))}

            <Footer />
        </div>
    );
};

export default GetProducts;
