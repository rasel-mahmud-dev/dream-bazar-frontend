import React from 'react';

const ButtonGroup = (props) => {
	const firstBtn = props.children[0]
	const content = props.children[1]
	const secondBtn = props.children[2]
	
	return (
		<div className="flex w-max items-stretch ">
			{React.cloneElement(firstBtn, { className: ` rounded-r-none !px-4 ${firstBtn.props.className}`})}
			
            <div className="flex items-center border !border-r-0 !border-l-0">
                {React.cloneElement(content)}
            </div>
			
			{React.cloneElement(secondBtn, { className: ` rounded-l-none !px-4 ${secondBtn.props.className}`})}
        </div>
	);
};

export default ButtonGroup;