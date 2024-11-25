import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [showGuestInfo, setShowGuestInfo] = useState(false);
	const [error, setError] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleLogin = async () => {
		if (username.trim() && password.trim()) {
			setIsLoading(true);
			setTimeout(async () => {
				const userRes = await fetch(
					"https://api-6bhltbpyma-uc.a.run.app/login",
					{
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify({ username, password }),
					}
				);

				if (!userRes.ok) {
					setError("Invalid Credentials");
					setIsLoading(false);
				} else {
					setError("");

					const user = await userRes.json();
					console.log("user:", user);

					dispatch(login(user));
					navigate("/");
				}
			}, 1500);
		} else {
			setError("Both fields are required.");
		}
	};

	return (
		<div className="flex items-center justify-center p-8 bg-gray-100">
			<div className="w-full max-w-sm bg-white rounded-lg shadow-md p-6">
				<div className="relative mb-4">
					<button
						onClick={() => setShowGuestInfo(!showGuestInfo)}
						className="text-sm text-blue-600 hover:underline focus:outline-none"
					>
						{showGuestInfo ? "Hide" : "Show"} Guest Login Credentials
					</button>
					{showGuestInfo && (
						<div className="absolute left-0 mt-2 p-4 bg-white shadow-lg rounded-lg border border-gray-300 w-full">
							<p className="text-gray-800 mb-2">Username: guest1</p>
							<p className="text-gray-800">Password: password</p>
						</div>
					)}
				</div>
				<h1 className="text-2xl font-semibold text-gray-800 text-center mb-4">
					Login
				</h1>
				{error && (
					<div className="mb-4 text-red-600 text-sm font-medium">{error}</div>
				)}
				<form className="space-y-4">
					<input
						type="text"
						placeholder="Username"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						disabled={isLoading}
						className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
					/>
					<input
						type="password"
						placeholder="Password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						disabled={isLoading}
						className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
					/>
					<button
						disabled={isLoading}
						type="button"
						onClick={handleLogin}
						className="w-full px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:outline-none"
					>
						{isLoading ? "Logging in..." : "Login"}
					</button>
				</form>
			</div>
		</div>
	);
};

export default Login;
