import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { addToCart, type CartItem } from "../redux/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { type RootState } from "../redux/store";

const ProductDetail: React.FC = () => {
	const { id } = useParams<{ id: string }>();
	const cart = useSelector((state: RootState) => state.cart);
	const [quantityInCart, setQuantityInCart] = useState(0);
	const [product, setProduct] = useState<Product>();
	const [error, setError] = useState("");
	const [addedToCart, setAddedToCart] = useState(false);
	const dispatch = useDispatch();

	useEffect(() => {
		const fetchProduct = async () => {
			setTimeout(async () => {
				const productRes = await fetch(
					`https://api-6bhltbpyma-uc.a.run.app/products/${id}`,
					{
						method: "GET",
						headers: {
							"Content-Type": "application/json",
						},
					}
				);
				if (productRes.ok) {
					const productData = await productRes?.json();
					if (
						productData &&
						Array.isArray(productData) &&
						productData.length > 0
					) {
						setProduct(productData[0]);
					}
				} else setError("Error Finding Item");
			}, 1000);
		};
		fetchProduct();
	}, [id]);

	useEffect(() => {
		const cartItem = cart?.items?.filter(
			(item) => Number(item.id) == Number(product?.id)
		)[0];
		setQuantityInCart(cartItem?.quantity || 0);
	}, [cart?.items, product?.id]);

	const handleAddToCart = () => {
		const cartItem: CartItem = {
			id: String(product?.id),
			name: product?.title || "",
			price: product?.price || 0,
			quantity: 1,
			imageUrl: product?.image || "",
		};
		dispatch(addToCart(cartItem));
		setAddedToCart(true);

		setTimeout(() => setAddedToCart(false), 1500);
	};

	if (error) {
		return <div className="text-center text-red-600">{error}</div>;
	}

	if (!product) {
		return <div className="m-auto mt-16 spinner"></div>;
	}

	return (
		<div className="max-w-7xl mx-auto p-6">
			<div className="flex flex-col md:flex-row space-x-8">
				<div className="flex-shrink-0 w-full md:w-1/3">
					<img
						src={product?.image}
						alt={product?.title}
						className="w-full h-96 object-contain rounded-lg shadow-lg"
					/>
				</div>
				<div className="mt-6 md:mt-0 md:w-2/3">
					<h1 className="text-3xl font-semibold text-gray-800">
						{product?.title}
					</h1>
					<p className="text-xl font-bold text-gray-600 mt-2">
						<span className="text-md align-top">$</span>
						<span className="text-3xl font-extrabold">
							{Math.floor(product?.price)}
						</span>
						<sup className="text-sm align-super">
							{Math.round((product?.price % 1) * 100)}
						</sup>
					</p>
					<div className="flex items-center space-x-2 mt-4">
						<span className="text-warning">★</span>
						<span className="text-gray-700">{product?.rating?.rate}</span>
						<span className="text-gray-500">
							({product?.rating?.count} reviews)
						</span>
					</div>
					<p className="text-gray-600 mt-4">{product?.description}</p>
					<p className="mt-4 text-gray-500">
						<span className="font-semibold">Category:</span> {product.category}
					</p>
					{addedToCart && (
						<div className="mt-4 text-green-500">Item added to cart!</div>
					)}
					<div className="mt-6 flex items-start justify-start gap-4">
						<button
							disabled={addedToCart}
							onClick={handleAddToCart}
							className="px-6 py-3 font-semibold rounded-lg shadow-md border-2 hover:border-primaryHover focus:outline-none transition-all duration-300"
						>
							Add to Cart
						</button>
						{quantityInCart > 0 && (
							<span className="text-sm text-gray-500">
								{quantityInCart} in cart.
							</span>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProductDetail;
