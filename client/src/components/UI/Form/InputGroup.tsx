import { FC, forwardRef, InputHTMLAttributes, ReactNode, Ref } from "react";
import { twMerge } from "tailwind-merge";

import "./style.scss"

interface Props extends InputHTMLAttributes<HTMLInputElement> {
	name: string;
	state?: { [key: string]: { value?: string | number | any; errorMessage?: string } };
	label?: string;
    error?: string
	labelAddition?: () => ReactNode;
	inputClass?: string;
	labelClass?: string;
	onChange?: (e: any) => void;
	className?: string;
	value?: string;
	required?: boolean;
	ref?: Ref<HTMLInputElement>;
	as?: "textarea";
}

const InputGroup: FC<Props | any> = forwardRef((props, ref) => {
	const {
		name,
		value,
		required,
		labelAddition,
		state,
		type = "text",
		label,
		inputClass,
		labelClass,
		placeholder,
		onChange,
		className,
		as,
        error,
		...attr
	} = props;

    return (
		<div className={twMerge(`input-group mt-4 flex items-start flex-col md:flex-row`, className)}>
			{label && (
				<div className={`flex flex-wrap items-center gap-x-2 mb-2 md:mb-0 ${labelClass}`}>
					{label && (
						<label htmlFor={name} className={twMerge(` font-medium  flex items-center whitespace-nowrap`)}>
							{label}
							{required && <span className="text-red-500 ml-1">*</span>}
						</label>
					)}
					{labelAddition && labelAddition()}
				</div>
			)}

			<div className="w-full input">
				<div
					className={twMerge(
						`rounded-md flex  justify-between items-center  w-full `,
						inputClass
					)}
				>
					{as === "textarea" ? (
						<textarea
							{...attr}
                            ref={ref}
							name={name}
							value={state ? state[name]?.value : value ? value : undefined}
							id={name}
							placeholder={placeholder}
							onChange={onChange && onChange}
							className={inputClass}
                        ></textarea>
					) : (
						<input
							{...attr}
							ref={ref}
							name={name}
							value={state ? state[name]?.value : value ? value : undefined}
							type={type}
							id={name}
							placeholder={placeholder}
							onChange={onChange && onChange}
							className={inputClass}
						/>
					)}
					{!label && required && <span className="text-red-500 mr-2 font-bold">*</span>}

				</div>

				{error  && (
					<div className="mt-1">
						<span className="text-red-500 text-xs font-medium ">{error}</span>{" "}
					</div>
				)}
			</div>
		</div>
	);
});

export default InputGroup;
