import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart, CartItem } from "../redux/cartSlice";
import { useEffect, useState } from "react";
import { type RootState } from "../redux/store";

interface ProductProps {
	product: Product;
}
const ProductComponent: React.FC<ProductProps> = ({ product }) => {
	const dispatch = useDispatch();
	const cart = useSelector((state: RootState) => state.cart);
	const [quantityInCart, setQuantityInCart] = useState(0);
	const [addedToCart, setAddedToCart] = useState(false);

	const handleAddToCart = () => {
		const cartItem: CartItem = {
			id: String(product.id),
			name: product?.title,
			price: product?.price,
			quantity: 1,
			imageUrl: product?.image,
		};
		dispatch(addToCart(cartItem));
		setAddedToCart(true);

		setTimeout(() => setAddedToCart(false), 2000);
	};

	useEffect(() => {
		const cartItem = cart?.items?.filter(
			(item) => Number(item.id) == Number(product?.id)
		)[0];
		setQuantityInCart(cartItem?.quantity || 0);
	}, [cart?.items, product?.id]);

	return (
		<div className="p-4 bg-white rounded-lg shadow-md my-3">
			<Link to={`/product/${product.id}`} className="block">
				{product.image && (
					<img
						src={product.image}
						alt={product.title}
						className="m-auto h-full w-32 object-cover rounded-t-lg"
					/>
				)}
			</Link>
			<div className="p-4">
				<Link to={`/product/${product.id}`} className="block">
					<h2 className="text-lg font-bold text-gray-800 truncate">
						{product.title}
					</h2>
				</Link>
				{addedToCart && (
					<div className="mt-2 text-green-500 text-right">
						Item added to cart
					</div>
				)}
				<div className="flex justify-between items-baseline">
					<p className="text-xl font-bold text-gray-600 mt-2">
						<span className="text-md align-top">$</span>
						<span className="text-3xl font-extrabold">
							{Math.floor(product?.price)}
						</span>
						<sup className="text-sm align-super">
							{Math.round((product?.price % 1) * 100)}
						</sup>
					</p>
					<div className="flex flex-row gap-2 items-start">
						{quantityInCart > 0 && (
							<span className="text-sm text-gray-500">
								{quantityInCart} in cart.
							</span>
						)}
						<button
							className="hover:text-green-500 transition-all duration-200 ease-in-out"
							disabled={addedToCart}
							onClick={handleAddToCart}
						>
							Add to cart
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProductComponent;
