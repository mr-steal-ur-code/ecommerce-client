import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { logout } from "../redux/authSlice";

const Header: React.FC = () => {
	const dispatch = useDispatch();
	const isAuthenticated = useSelector(
		(state: RootState) => state.auth.isAuthenticated
	);
	const user = useSelector((state: RootState) => state.auth.user);

	const handleLogout = () => {
		dispatch(logout());
	};

	return (
		<header className="bg-blue-600 text-white p-4">
			<div className="max-w-7xl mx-auto flex items-center justify-between">
				{/* Logo */}
				<div className="text-2xl font-bold">
					<Link to="/">E-Commerce</Link>
				</div>

				{/* Navigation Links */}
				<nav className="space-x-4">
					<Link to="/" className="hover:text-gray-300">
						Home
					</Link>
					<Link to="/cart" className="hover:text-gray-300">
						Cart
					</Link>
					{isAuthenticated ? (
						<>
							<Link to="/checkout" className="hover:text-gray-300">
								Checkout
							</Link>
							<button onClick={handleLogout} className="hover:text-gray-300">
								Logout
							</button>
						</>
					) : (
						<Link to="/login" className="hover:text-gray-300">
							Login
						</Link>
					)}
				</nav>

				{/* User Info (Optional, if authenticated) */}
				{isAuthenticated && user && (
					<div className="ml-4">
						<span>Welcome, {user.name}</span>
					</div>
				)}
			</div>
		</header>
	);
};

export default Header;
