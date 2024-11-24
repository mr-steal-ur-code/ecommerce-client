import React from "react";
import { Link } from "react-router-dom";

const Home: React.FC = () => {
	return (
		<div>
			<h1>Welcome to the E-Commerce App</h1>
			<nav>
				<Link to="/cart">Cart</Link> | <Link to="/checkout">Checkout</Link>
			</nav>
			<p>Browse our products below:</p>
			<Link to="/product/1">Product 1</Link>
			<br />
			<Link to="/product/2">Product 2</Link>
		</div>
	);
};

export default Home;
