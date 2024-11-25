import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

const Profile: React.FC = () => {
	const user = useSelector((state: RootState) => state.auth.user);

	return (
		<div className="mt-4 max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg">
			<div className="flex items-center space-x-4">
				<div className="w-16 h-16 bg-gray-300 rounded-full">
					<img src="/person.svg" />
				</div>{" "}
				<div>
					<h2 className="text-2xl font-semibold text-gray-900">
						{user?.fullname}
					</h2>
					<p className="text-gray-600">{user?.username}</p>
					<p className="text-sm text-gray-500">{user?.email}</p>
				</div>
			</div>
			<div className="mt-6">
				<div className="border-t border-gray-300 pt-4">
					<h3 className="text-lg font-medium text-gray-800">Account Info</h3>
					<ul className="mt-2 space-y-2 text-sm text-gray-600">
						<li>
							<strong>ID:</strong> {user?.id}
						</li>
						<li>
							<strong>Email:</strong> {user?.email}
						</li>
						<li>
							<strong>Username:</strong> {user?.username}
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
};

export default Profile;
