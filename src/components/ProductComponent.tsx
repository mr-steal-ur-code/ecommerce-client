import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart, CartItem } from "../redux/cartSlice";

interface ProductProps {
	product: Product;
}
const ProductComponent: React.FC<ProductProps> = ({ product }) => {
	const dispatch = useDispatch();

	const handleAddToCart = () => {
		const cartItem: CartItem = {
			id: String(product.id),
			name: product?.title,
			price: product?.price,
			quantity: 1,
			imageUrl: product?.image,
		};
		dispatch(addToCart(cartItem));
	};

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
				<p className="flex flex-row justify-between text-xl font-semibold text-gray-700 mt-2">
					${product.price}
					<button onClick={handleAddToCart}>Add to cart</button>
				</p>
			</div>
		</div>
	);
};

export default ProductComponent;
