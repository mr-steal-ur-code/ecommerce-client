import React from "react";
import { useParams } from "react-router-dom";

const ProductDetail: React.FC = () => {
	const { id } = useParams<{ id: string }>();

	return (
		<div>
			<h1>Product Detail</h1>
			<p>Viewing details for product ID: {id}</p>
		</div>
	);
};

export default ProductDetail;
