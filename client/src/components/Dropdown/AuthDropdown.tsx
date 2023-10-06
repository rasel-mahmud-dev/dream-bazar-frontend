import React, {FC, HTMLAttributes, ReactNode} from "react";
import { Popup } from "UI/index";
import staticImagePath from "src/utills/staticImagePath";
import Avatar from "UI/Avatar/Avatar";

interface Props extends HTMLAttributes<HTMLDivElement> {
    isShow: boolean;
    auth: any;
    children?: ReactNode
}

const AuthDropdown: FC<Props> = (props) => {
    const { auth } = props;
    
    
    return (
        <Popup
            timeout={500}
            animationClass="nav-popup-menu"
            className={`bg-white dark:bg-neutral-800 ${props.className}`}
            inProp={props.isShow}
        >
			<div className="text-neutral-700 dark:text-neutral-50 flex items-center font-medium ">
                <Avatar className="w-8 h-8" imgClass="w-8 h-8" src={staticImagePath(auth?.avatar)} username={auth?.firstName}   alt=""/>
				<div className="ml-2">
					<h4>{auth?.username}</h4>
					<p>{auth?.email}</p>
				</div>
			</div>
            
            <div className="mt-2">
                {props.children}
            </div>
            
		</Popup>
    );
};

export default AuthDropdown;