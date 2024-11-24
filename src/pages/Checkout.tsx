import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

const Checkout: React.FC = () => {
	const [isSubmitted, setIsSubmitted] = useState(false);
	const cart = useSelector((state: RootState) => state.cart);

	const handleFormSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		setIsSubmitted(true);
	};

	return (
		<div className="container mx-auto p-6">
			<h1 className="text-3xl font-bold mb-6">Checkout</h1>
			{cart.items.length > 0 ? (
				<div className="flex flex-col lg:flex-row gap-6">
					<div className="lg:w-1/2 bg-gray-100 p-6 rounded-lg shadow-md">
						<h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
						<div className="space-y-4">
							{cart.items.map((item) => (
								<div
									key={item.id}
									className="flex items-center justify-between border-b pb-2"
								>
									<div>
										<p className="font-semibold">{item.name}</p>
										<p className="text-gray-600">
											{item.quantity} x ${item.price.toFixed(2)}
										</p>
									</div>
									<p className="font-bold">
										${(item.quantity * item.price).toFixed(2)}
									</p>
								</div>
							))}
						</div>
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
						</div>
					</div>

					<div className="lg:w-1/2 bg-white p-6 rounded-lg shadow-md">
						{isSubmitted ? (
							<div className="text-center">
								<h2 className="text-2xl font-semibold text-green-600 mb-4">
									Thank you!
								</h2>
								<p>Your details have been submitted successfully.</p>
								<p className="text-gray-500 mt-2">
									This is a demo project. No actual purchases will be processed.
								</p>
							</div>
						) : (
							<form className="space-y-4" onSubmit={handleFormSubmit}>
								<div>
									<label
										htmlFor="name"
										className="block text-sm font-medium text-gray-700"
									>
										Name
									</label>
									<input
										id="name"
										type="text"
										className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
										placeholder="Your Name"
										required
									/>
								</div>
								<div>
									<label
										htmlFor="email"
										className="block text-sm font-medium text-gray-700"
									>
										Email
									</label>
									<input
										id="email"
										type="email"
										className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
										placeholder="Your Email"
										required
									/>
								</div>
								<div>
									<label
										htmlFor="address"
										className="block text-sm font-medium text-gray-700"
									>
										Shipping Address
									</label>
									<textarea
										id="address"
										className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
										placeholder="Your Shipping Address"
										rows={3}
										required
									></textarea>
								</div>
								<button
									type="submit"
									className="w-full bg-blue-600 text-white py-2 rounded-md shadow-md hover:bg-blue-700 focus:outline-none"
								>
									Complete Purchase
								</button>
							</form>
						)}
					</div>
				</div>
			) : (
				<p className="text-gray-500 text-center mt-12">
					Your cart is empty. Please add items to proceed to checkout.
				</p>
			)}
		</div>
	);
};

export default Checkout;
