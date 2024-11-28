import { useState, useRef, useEffect } from "react";
import Cropper from "cropperjs";
import "cropperjs/dist/cropper.css";
import { useDispatch } from "react-redux";
import { updateUser } from "../redux/authSlice";

type CropperProps = {
	avatar: string;
};
const PhotoCropper: React.FC<CropperProps> = ({ avatar }) => {
	const [image, setImage] = useState<any>(null);
	const cropperRef = useRef<any>(null);
	const inputEl = useRef<HTMLInputElement>(null);
	const dispatch = useDispatch();

	const handleFileChange = (e: any) => {
		const file = e.target.files[0];
		if (file) {
			const reader = new FileReader();
			reader.onload = () => {
				setImage(reader.result);
			};
			reader.readAsDataURL(file);
		}
	};

	const handleClose = () => {
		setImage(null);
		(inputEl.current as HTMLInputElement).value = "";
	};

	const handleCrop = async () => {
		if (cropperRef.current) {
			const cropper = cropperRef.current.cropper;
			const croppedCanvas = cropper.getCroppedCanvas();
			const resizedCanvas = document.createElement("canvas");
			const resizedContext = resizedCanvas.getContext("2d");
			resizedCanvas.width = 200;
			resizedCanvas.height = 200;
			resizedContext?.drawImage(
				croppedCanvas,
				0,
				0,
				resizedCanvas.width,
				resizedCanvas.height
			);
			try {
				const resizedDataUrl = resizedCanvas.toDataURL();
				dispatch(updateUser({ avatar: resizedDataUrl }));
				handleClose();
			} catch (error: any) {
				console.log("Error saving cropped Image:", error);
			}
		}
	};

	useEffect(() => {
		if (image && cropperRef.current) {
			const cropper = new Cropper(cropperRef.current, {
				aspectRatio: 1,
				viewMode: 1,
				center: true,
			});
			return () => {
				cropper.destroy();
			};
		}
	}, [image]);

	return (
		<div className="flex flex-row items-center justify-center pb-4">
			<img
				onClick={() => inputEl?.current?.click()}
				className="rounded-xl cursor-pointer shadow-md hover:opacity-80"
				height="80px"
				width="80px"
				src={avatar || "/person.svg"}
				alt="Avatar"
			/>
			<div className="mt-4 text-center">
				<input
					ref={inputEl}
					style={{ display: "none" }}
					type="file"
					onChange={handleFileChange}
				/>
				{image && (
					<div className="fixed inset-0 z-50 bg-black bg-opacity-75 flex flex-col items-center justify-center">
						<div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl bg-white rounded-lg shadow-lg relative">
							<img
								ref={cropperRef}
								src={image}
								alt="Cropper Preview"
								className="w-full rounded-lg"
							/>
							<div className="flex flex-row">
								<div
									className="w-full rounded-b-lg cursor-pointer py-2 text-red-500 hover:bg-gray-200 hover:text-red-700"
									onClick={() => handleClose()}
								>
									Cancel
								</div>
								<div
									className="w-full rounded-b-lg cursor-pointer py-2 text-green-500 hover:bg-gray-200 hover:text-green-700"
									onClick={handleCrop}
								>
									Save
								</div>
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default PhotoCropper;
