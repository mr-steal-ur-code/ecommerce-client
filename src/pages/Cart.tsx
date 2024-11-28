import { useDispatch, useSelector } from "react-redux";
import { removeFromCart, updateQuantity, clearCart } from "../redux/cartSlice";
import { RootState } from "../redux/store";
import { Link } from "react-router-dom";

const Cart: React.FC = () => {
	const dispatch = useDispatch();
	const cart = useSelector((state: RootState) => state.cart);

	const handleRemoveFromCart = (id: string) => {
		if (
			!confirm(
				"Are you sure you want to remove this item from your cart? This action cannot be undone."
			)
		)
			return;
		dispatch(removeFromCart(id));
	};

	const handleUpdateQuantity = (id: string, quantity: number) => {
		dispatch(updateQuantity({ id, quantity }));
	};

	const handleClearCart = () => {
		if (
			!confirm(
				"Are you sure you want to clear your cart? This action cannot be undone, and all items in your cart will be removed."
			)
		)
			return;
		dispatch(clearCart());
	};

	return (
		<div className="container mx-auto p-2 md:p-6">
			<h1 className="flex flex-row gap-16 text-2xl font-bold mb-6">
				Shopping Cart{" "}
				<Link
					className="mt-4 bg-primary text-white px-4 py-2 rounded shadow-md hover:bg-primaryHover"
					to="/checkout"
				>
					Checkout
				</Link>
			</h1>
			{cart?.items?.length > 0 ? (
				<div className="space-y-4">
					{cart.items.map((item) => (
						<div
							key={item.id}
							className="flex p-4 md:items-center flex-col md:justify-between md:flex-row bg-gray-100 md:p-4 gap-4 rounded-lg shadow-md"
						>
							<img width={50} src={`${item?.imageUrl}`} />
							<div>
								<Link
									to={`/product/${item?.id}`}
									className="text-lg font-semibold"
								>
									{item.name}
								</Link>
								<p className="text-gray-600">
									{item.quantity} x ${item.price.toFixed(2)}
								</p>
							</div>
							<div className="mx-auto flex items-center space-x-2">
								<button
									onClick={() =>
										handleUpdateQuantity(item.id, item.quantity - 1)
									}
									className="bg-gray-300 text-gray-700 rounded px-2 py-1 hover:bg-gray-400"
								>
									-
								</button>
								<span className="text-lg font-semibold">{item.quantity}</span>
								<button
									onClick={() =>
										handleUpdateQuantity(item.id, item.quantity + 1)
									}
									className="bg-gray-300 text-gray-700 rounded px-2 py-1 hover:bg-gray-400"
								>
									+
								</button>
								<button
									onClick={() => handleRemoveFromCart(item.id)}
									className="text-red-600 hover:text-red-800"
								>
									Remove
								</button>
							</div>
						</div>
					))}
					<div className="mt-6 border-t pt-4">
						<p className="text-lg font-semibold">
							Total Quantity:{" "}
							<span className="font-bold">{cart.totalQuantity}</span>
						</p>
						<p className="text-lg font-semibold">
							Total Amount:{" "}
							<span className="font-bold text-green-600">
								${cart.totalAmount.toFixed(2)}
							</span>
						</p>
						<div className="flex flex-row justify-around items-center">
							<button
								onClick={handleClearCart}
								className="mt-4 bg-red-600 text-white px-4 py-2 rounded shadow-md hover:bg-red-700"
							>
								Clear Cart
							</button>
							<Link
								className="mt-4 bg-primary text-white px-4 py-2 rounded shadow-md hover:bg-primaryHover"
								to="/checkout"
							>
								Checkout
							</Link>
						</div>
					</div>
				</div>
			) : (
				<p className="text-gray-500 text-center mt-12">Your cart is empty.</p>
			)}
		</div>
	);
};

export default Cart;
