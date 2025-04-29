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
import Contact from './Components/Contact';
import TermCon from './Components/TermCon';
import Policy from './Components/Policy';
function App() {
	return (
		<div className='container border p-0'>
			<Navbar />
			<Routes>
				<Route exact path='/' element={<Home />}></Route>
				<Route exact path='/product' element={<Product />}></Route>
				<Route exact path="/product/:id" element={<ProductDetail />} />
				<Route exact path='/about' element={<About />}></Route>
				<Route exact path='/contact' element={<Contact />}></Route>
				<Route exact path='/signup' element={<Signup />}></Route>
				<Route exact path='/login' element={<Login />}></Route>
				<Route exact path='/privacy' element={<Policy />}></Route>
				<Route exact path='/terms' element={<TermCon />}></Route>
			</Routes>
			<Footer/>
		</div>
	);
}

export default App;
