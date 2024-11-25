import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProductComponent from "../components/ProductComponent";

const Home: React.FC = () => {
	const [products, setProducts] = useState<Product[]>([]);
	const [sortedProducts, setSortedProducts] = useState<Product[]>([]);
	const [selectedCategory, setSelectedCategory] = useState("");
	const [selectedSort, setSelectedSort] = useState<string>("");
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

	useEffect(() => {
		let sortedProducts = [...products];
		if (selectedSort === "lowest") {
			sortedProducts.sort((a, b) => a.price - b.price);
		} else if (selectedSort === "highest") {
			sortedProducts.sort((a, b) => b.price - a.price);
		}

		if (selectedCategory) {
			sortedProducts = sortedProducts.filter(
				(product) => product?.category === selectedCategory
			);
		}

		setSortedProducts(sortedProducts);
	}, [products, selectedCategory, selectedSort]);

	const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setSelectedCategory(e.target.value);
	};

	const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setSelectedSort(e.target.value);
	};

	if (error) {
		return <div className="text-center text-red-600">{error}</div>;
	}

	return (
		<div className="min-h-screen bg-gray-100 p-4">
			<nav className="flex justify-end mb-4">
				<Link
					to="/cart"
					className="text-blue-600 hover:text-blue-800 underline transition duration-200 mx-2"
				>
					Cart
				</Link>
				<span>|</span>
				<Link
					to="/checkout"
					className="text-blue-600 hover:text-blue-800 underline transition duration-200 mx-2"
				>
					Checkout
				</Link>
			</nav>
			<header className="text-center mb-8">
				<h1 className="text-4xl font-bold text-gray-800">
					Welcome to CJ's E-Commerce App
				</h1>
				<p className="mt-2 text-gray-600 text-lg">Browse our products below:</p>
			</header>
			<div className="max-w-4xl mx-auto px-4">
				<div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mb-6">
					<div className="flex items-center gap-2 w-full sm:w-auto">
						<select
							value={selectedCategory}
							onChange={handleFilterChange}
							className="w-full sm:max-w-xs p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
						>
							<option value="">Select Category</option>
							<option value="men's clothing">Men's Clothing</option>
							<option value="women's clothing">Women's Clothing</option>
							<option value="jewelery">Jewelry</option>
							<option value="electronics">Electronics</option>
						</select>
					</div>
					<div className="flex items-center gap-2 w-full sm:w-auto">
						<select
							value={selectedSort}
							onChange={handleSortChange}
							className="w-full sm:max-w-xs p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
						>
							<option value="">Select Sort Option</option>
							<option value="lowest">Lowest Price</option>
							<option value="highest">Highest Price</option>
						</select>
					</div>
				</div>
			</div>

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
			{sortedProducts?.length > 0 ? (
				sortedProducts.map((product: Product) => (
					<ProductComponent key={product.id} product={product} />
				))
			) : (
				<div className="text-center text-gray-600">No products available</div>
			)}
		</div>
	);
};

export default Home;
