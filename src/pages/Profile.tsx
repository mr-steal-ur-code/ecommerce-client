import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useState } from "react";
import { updateUser } from "../redux/authSlice";
import PhotoCropper from "../components/PhotoCropper";

const Profile: React.FC = () => {
	const user = useSelector((state: RootState) => state.auth.user);
	const dispatch = useDispatch();
	const [editing, setEditing] = useState(false);
	const [formData, setFormData] = useState({
		fullname: user?.fullname || "",
		email: user?.email || "",
		username: user?.username || "",
	});

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleSave = () => {
		dispatch(
			updateUser({
				fullname: formData.fullname,
				email: formData.email,
				username: formData.username,
			})
		);
		setEditing(false);
	};

	return (
		<div className="mt-4 max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg">
			<div className="float-right">
				<span className="align-text-bottom mr-2 text-sm">edit</span>
				<label className="switch ">
					<input
						type="checkbox"
						checked={editing}
						onChange={() => setEditing(!editing)}
					/>
					<span className="slider"></span>
				</label>
			</div>

			<div className="flex items-center space-x-4">
				<PhotoCropper avatar={user?.avatar} />
				<div>
					<h2 className="text-2xl font-semibold text-gray-900">
						{editing ? (
							<input
								type="text"
								name="fullname"
								value={formData.fullname}
								onChange={handleChange}
								className="border-b border-gray-400 focus:outline-none"
							/>
						) : (
							user?.fullname
						)}
					</h2>
					{editing ? (
						<input
							type="text"
							name="username"
							value={formData.username}
							onChange={handleChange}
							className="border-b border-gray-400 focus:outline-none"
						/>
					) : (
						<p className="text-sm text-gray-500">{user?.username}</p>
					)}
				</div>
			</div>

			<div className="mt-6">
				<div className="border-t border-gray-300 pt-4">
					<h3 className="text-lg font-medium text-gray-800">Account Info</h3>
					<ul className="mt-2 space-y-2 text-sm text-gray-600">
						<li>
							<strong>Email:</strong>{" "}
							{editing ? (
								<input
									type="email"
									name="email"
									value={formData.email}
									onChange={handleChange}
									className="border-b border-gray-400 focus:outline-none"
								/>
							) : (
								user?.email
							)}
						</li>
						<li>
							<strong>ID:</strong> {user?.id}
						</li>
					</ul>
				</div>

				{editing && (
					<button
						onClick={handleSave}
						disabled={
							formData.fullname === user?.fullname &&
							formData.email === user?.email &&
							formData.username === user?.username
						}
						className={`mt-4 px-6 py-2 rounded-lg text-white ${
							formData.fullname !== user?.fullname ||
							formData.email !== user?.email ||
							formData.username !== user?.username
								? "bg-blue-500 hover:bg-blue-600"
								: "bg-gray-400 cursor-not-allowed"
						}`}
					>
						Save Changes
					</button>
				)}
			</div>
		</div>
	);
};

export default Profile;
