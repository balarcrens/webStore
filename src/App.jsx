import {
	Routes,
	Route
} from 'react-router-dom';
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import Product from './Components/Product';
import About from './Components/About';
import ProductDetail from './Components/ProductDetail';
import Footer from './Components/Footer';
import Signup from './Components/Signup';
import Login from './Components/Login';
function App() {
	return (
		<div className='container border'>
			<Navbar />
			<Routes>
				<Route exact path='/' element={<Home />}></Route>
				<Route exact path='/product' element={<Product />}></Route>
				<Route exact path="/product/:id" element={<ProductDetail />} />
				<Route exact path='/about' element={<About />}></Route>
				<Route exact path='/signup' element={<Signup />}></Route>
				<Route exact path='/login' element={<Login />}></Route>
			</Routes>
			<Footer/>
		</div>
	);
}

export default App;
