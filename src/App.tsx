import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import ProductDetail from "./pages/ProductDetail";
import NotFound from "./pages/NotFound";
import { useSelector } from "react-redux";
import { RootState } from "./redux/store";
import Login from "./pages/Login";
import Header from "./components/Header";
import "./App.css";
import Footer from "./components/Footer";
import Profile from "./pages/Profile";

const App: React.FC = () => {
	const isAuthenticated = useSelector(
		(state: RootState) => state.auth.isAuthenticated
	);

	return (
		<BrowserRouter>
			<div className="flex flex-col min-h-screen">
				<Header />
				<main className="flex-grow pt-8 mx-8 md:mx-16">
					<Routes>
						<Route path="/login" element={<Login />} />
						<Route path="/profile" element={<Profile />} />
						<Route path="/" element={<Home />} />
						<Route path="/cart" element={<Cart />} />
						<Route
							path="/checkout"
							element={isAuthenticated ? <Checkout /> : <Login />}
						/>
						<Route path="/product/:id" element={<ProductDetail />} />
						<Route path="*" element={<NotFound />} />
					</Routes>
				</main>
				<Footer />
			</div>
		</BrowserRouter>
	);
};

export default App;
