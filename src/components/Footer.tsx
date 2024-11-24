import React from "react";

const Footer: React.FC = () => {
	return (
		<footer className="bg-gray-800 text-white py-6">
			<div className="container mx-auto text-center">
				<p className="text-sm mb-4">
					© 2024 Your E-commerce Store. All rights reserved.
				</p>
				<div className="flex justify-center space-x-6">
					<a href="/about" className="text-sm hover:text-gray-400">
						About Us
					</a>
					<a href="/contact" className="text-sm hover:text-gray-400">
						Contact
					</a>
					<a href="/privacy-policy" className="text-sm hover:text-gray-400">
						Privacy Policy
					</a>
					<a href="/terms" className="text-sm hover:text-gray-400">
						Terms & Conditions
					</a>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
