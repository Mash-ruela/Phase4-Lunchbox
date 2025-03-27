import './App.css';
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.min.js"
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import AddProducts from './components/AddProducts';
import GetProducts from './components/GetProducts';
import SingleProduct from './components/singleProducts';
import ContactUs from './components/ContactUs';

function App() {
  return (
    <Router>
      <div>
   
        <Routes>
          <Route path='/signup' element={<SignUp/>}/>
          <Route path='/signin' element={<SignIn/>}/>
          <Route path='/addproducts' element={<AddProducts/>}/>
          <Route path='/' element={<GetProducts/>}/>
          <Route path='/singleproduct' element={<SingleProduct/>}/>
          <Route path='/contactus' element={<ContactUs/>}/>

        
        </Routes>
      </div>
      
    </Router>
  );
}

export default App;
