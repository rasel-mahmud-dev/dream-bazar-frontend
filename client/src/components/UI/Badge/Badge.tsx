import React, { FC, HTMLAttributes } from "react";

import { twMerge } from "tailwind-merge";

const Badge: FC<HTMLAttributes<HTMLSpanElement>> = (props) => {
	const { className = "",  ...attributes } = props;
	return (
		<span
			className={twMerge(
				`inline-block text-center whitespace-nowrap font-semibold relative bg-green-450/10 text-green-500 rounded px-2 py-0.5 text-[10px] font-bold`,
				className
			)}
			{...attributes}
		/>
	);
};

export default Badge