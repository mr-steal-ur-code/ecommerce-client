import { FC } from "react";
import { MdPerson } from "react-icons/md";
import { Link } from "react-router-dom";

interface AvatarProps {
	imageUrl?: string;
	height?: string;
	width?: string;
}

const Avatar: FC<AvatarProps> = ({ imageUrl, height, width }) => {
	return (
		<Link className="cursor-pointer" to={"/profile"}>
			{imageUrl ? (
				<img
					height={height || "50px"}
					width={width || "50px"}
					className="bg-bkg2 rounded-full"
					alt="avatar"
					src={imageUrl}
					referrerPolicy="no-referrer"
				/>
			) : (
				<MdPerson className="bg-bkg2 rounded-full text-content" size={45} />
			)}
		</Link>
	);
};

export default Avatar;
