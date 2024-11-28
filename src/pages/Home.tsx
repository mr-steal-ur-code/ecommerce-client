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
					className="text-center min-w-20 text-blue-600 bg-white rounded-lg p-1 hover:bg-gray-200 hover:text-blue-800 mx-2 transition-all duration-300"
				>
					Cart
				</Link>
				<Link
					to="/checkout"
					className="text-center min-w-20 text-blue-600 bg-white rounded-lg p-1 hover:bg-gray-200 hover:text-blue-800 mx-2 transition-all duration-300"
				>
					Checkout
				</Link>
			</nav>
			<header className="text-center mb-2">
				<p className="mt-2 text-gray-600 text-lg">Browse our products below</p>
			</header>
			<div className="flex justify-end items-center gap-2 w-full text-sm mb-6">
				<select
					value={selectedCategory}
					onChange={handleFilterChange}
					className="border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-primaryHover"
				>
					<option value="">Select Category</option>
					<option value="men's clothing">Men's Clothing</option>
					<option value="women's clothing">Women's Clothing</option>
					<option value="jewelery">Jewelry</option>
					<option value="electronics">Electronics</option>
				</select>
				<select
					value={selectedSort}
					onChange={handleSortChange}
					className="border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-primaryHover"
				>
					<option value="">Select Sort Option</option>
					<option value="lowest">Lowest Price</option>
					<option value="highest">Highest Price</option>
				</select>
			</div>

			{loading && (
				<div>
					<div className="mb-16">
						<div className="skeleton-stacked skeleton skeleton-image"></div>
						<div className="skeleton-stacked skeleton skeleton-text sm:w-[80%] w-[60%]"></div>
					</div>
					<div className="skeleton-stacked skeleton skeleton-image"></div>
					<div className="skeleton-stacked skeleton skeleton-text sm:w-[80%] w-[60%]"></div>
				</div>
			)}
			{sortedProducts?.length ? (
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
