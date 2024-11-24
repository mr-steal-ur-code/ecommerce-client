import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProductComponent from "../components/ProductComponent";

const Home: React.FC = () => {
	const [products, setProducts] = useState<Product[]>();
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		const fetchProducts = async () => {
			setLoading(true);
			setTimeout(async () => {
				const productRes = await fetch(
					"https://api-6bhltbpyma-uc.a.run.app/products",
					{
						method: "GET",
						headers: {
							"Content-Type": "application/json",
						},
					}
				);
				if (productRes.ok) {
					setLoading(false);
					setProducts(await productRes.json());
				} else {
					setLoading(false);
					setError("Error Fetching Products");
				}
			}, 1000);
		};
		fetchProducts();
	}, []);

	return (
		<div>
			<h1>Welcome to the E-Commerce App</h1>
			<nav>
				<Link to="/cart">Cart</Link> | <Link to="/checkout">Checkout</Link>
			</nav>
			<p>Browse our products below:</p>
			{loading && (
				<div>
					<div className="mb-16">
						<div className="skeleton skeleton-image"></div>
						<div className="skeleton skeleton-text sm:w-[80%] w-[60%]"></div>
					</div>
					<div className="skeleton skeleton-image"></div>
					<div className="skeleton skeleton-text sm:w-[80%] w-[60%]"></div>
				</div>
			)}
			{products?.map((product: Product) => (
				<ProductComponent
					key={product?.id}
					product={product}
				></ProductComponent>
			))}
		</div>
	);
};

export default Home;
