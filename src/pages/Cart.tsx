import { useDispatch, useSelector } from "react-redux";
import {
	addToCart,
	removeFromCart,
	updateQuantity,
	clearCart,
} from "../redux/cartSlice";
import { RootState } from "../redux/store";

const Cart = () => {
	const dispatch = useDispatch();
	const cart = useSelector((state: RootState) => state.cart);

	const handleAddToCart = () => {
		dispatch(
			addToCart({
				id: "1",
				name: "Product A",
				price: 20,
				quantity: 1,
				imageUrl: "image.jpg",
			})
		);
	};

	const handleRemoveFromCart = (id: string) => {
		dispatch(removeFromCart(id));
	};

	const handleUpdateQuantity = (id: string, quantity: number) => {
		dispatch(updateQuantity({ id, quantity }));
	};

	const handleClearCart = () => {
		dispatch(clearCart());
	};

	return (
		<div>
			<h1>Cart</h1>
			{cart?.items?.map?.((item) => (
				<div key={item.id}>
					<p>{item.name}</p>
					<p>
						{item.quantity} x ${item.price}
					</p>
					<button onClick={() => handleRemoveFromCart(item.id)}>Remove</button>
					<button
						onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
					>
						+
					</button>
					<button
						onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
					>
						-
					</button>
				</div>
			))}
			<p>Total Quantity: {cart.totalQuantity}</p>
			<p>Total Amount: ${cart.totalAmount.toFixed(2)}</p>
			<button onClick={handleClearCart}>Clear Cart</button>
		</div>
	);
};

export default Cart;
