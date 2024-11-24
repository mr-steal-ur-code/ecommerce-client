import React, { useState } from "react";
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

	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const handleLogout = () => {
		dispatch(logout());
	};

	return (
		<header className="bg-blue-600 text-white">
			<div className="max-w-7xl mx-auto p-4 flex items-center justify-between">
				<div className="text-2xl font-bold">
					<Link to="/">E-Commerce</Link>
				</div>

				<button
					className="md:hidden flex items-center text-white"
					onClick={() => setIsMenuOpen(!isMenuOpen)}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="h-6 w-6"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M4 6h16M4 12h16M4 18h16"
						/>
					</svg>
				</button>

				<nav
					className={`${
						isMenuOpen ? "max-h-10" : "sm:max-h-0 md:max-h-10"
					} transition-[max-height] duration-300 overflow-hidden md:flex md:items-center space-y-4 md:space-y-0 md:space-x-4 absolute md:static top-16 md:top-auto left-0 w-full md:w-auto bg-blue-600 md:bg-transparent z-10 ease-in-out`}
				>
					<div className="mb-2 flex flex-row gap-6 items-center justify-center">
						<Link to="/" className="hover:text-gray-300 block md:inline">
							Home
						</Link>
						<Link to="/cart" className="hover:text-gray-300 block md:inline">
							Cart
						</Link>
						{isAuthenticated ? (
							<>
								<Link
									to="/checkout"
									className="hover:text-gray-300 block md:inline"
								>
									Checkout
								</Link>
								<Link
									to="/profile"
									className="hover:text-gray-300 block md:inline"
								>
									Profile
								</Link>
								<button
									onClick={handleLogout}
									className="hover:text-gray-300 block md:inline"
								>
									Logout
								</button>
							</>
						) : (
							<Link to="/login" className="hover:text-gray-300 block md:inline">
								Login
							</Link>
						)}
					</div>
				</nav>
			</div>
		</header>
	);
};

export default Header;
