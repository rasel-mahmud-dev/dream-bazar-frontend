import React, {FC, HTMLAttributes, ReactNode, useRef} from "react";
import staticImagePath from "src/utills/staticImagePath.js";
import {twMerge} from "tailwind-merge";

interface Props extends HTMLAttributes<HTMLInputElement> {
    label?: string;
    name: string;
    preview?: string;
    previewImageClass?: string;
    defaultValue?: string;
    errorMessage?: string;
    labelAddition?: () => ReactNode;
    inputClass?: string;
    labelClass?: string;
    onChange: (e: any) => void;
    className?: string;
    required?: boolean;
}

const FileUpload: FC<Props> = (props) => {
	const {
		name,
		previewImageClass = "",
		label,
		required,
		labelAddition,
		preview = true,
		inputClass = "",
		labelClass = "",
		defaultValue,
		errorMessage,
		placeholder,
		onChange,
		className,
	} = props;

	const imageInputRef = useRef();

	const [base64, setBase64] = React.useState("");

	function handleChange(e) {
		let file = e.target.files[0];

		let reader = new FileReader();
		reader.onload = function (event) {
			setBase64(event.target.result as string);
			onChange({ target: { name, value: file} });
		};
		reader.readAsDataURL(file);
	}

	function handleCompress(e) {}

	function chooseImage() {
		imageInputRef.current && (imageInputRef.current as HTMLInputElement).click();
	}
 

	return (
		<div className={twMerge(`mt-4 flex items-start flex-col md:flex-row`, className)}>
			<div className={`flex flex-wrap items-center gap-x-2 mb-2 md:mb-0 ${labelClass}`}>
				{label && (
					<label htmlFor={name} className={twMerge(`block font-medium text-gray-900  flex items-center`)}>
						{label}
						{required && <span className="text-red-500 ml-1">*</span>}
					</label>
				)}
				{labelAddition && labelAddition()}
			</div>

			<input
				ref={imageInputRef}
				name={name}
				hidden={true}
				type="file"
				accept="image/jpeg"
				id={name}
				placeholder={placeholder}
				onChange={handleChange}
			/>
   
			{ (!base64 && !defaultValue) && (
					<div className="" onClick={chooseImage}>
						<img src={staticImagePath("photo-thumb.jpg")} className={`border-2 border-dashed p-1 w-full ${previewImageClass}`} alt="" />
					</div>
				)}

			{preview && base64 && <img onClick={chooseImage} onLoad={handleCompress} src={base64} className={`border-2 border-dashed p-1 ${previewImageClass}`} alt="" />}
			{defaultValue && typeof defaultValue === "string" && !base64 && (
				<img  onClick={chooseImage} src={staticImagePath(defaultValue)} className={`border-2 border-dashed p-1 w-full ${previewImageClass}`} alt="" />
			)}
            
            {errorMessage && <div className="mt-1"> <span className="text-red-500 ">{errorMessage}</span> </div> }
            
		</div>
	);
}

export default FileUpload