import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleLogin = async () => {
		if (email.trim() && password.trim()) {
			const userRes = await fetch("https://something/login", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ email, password }),
			});

			if (!userRes.ok) {
				throw new Error("Login failed. Check your credentials.");
			}

			const user = await userRes.json();
			console.log("user:", user);

			dispatch(login(user));
			navigate("/");
		} else {
			alert("Invalid credentials");
		}
	};

	return (
		<div>
			<h1>Login</h1>
			<form>
				<input
					type="email"
					placeholder="Email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
				<input
					type="password"
					placeholder="Password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
				<button type="button" onClick={handleLogin}>
					Login
				</button>
			</form>
		</div>
	);
};

export default Login;
