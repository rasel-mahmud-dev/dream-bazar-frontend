import React from "react";
import {backend} from "src/apis";
import {BsFacebook, BsGoogle} from "react-icons/all";

const SocialLogin = ({className = ""}) => {
    return (
        <div className={className}>
			<button className="bg-google justify-center items-center flex w-full px-4 py-3 border-none text-white font-semibold text-md rounded-md">
				<a href={`${backend}/api/auth/google`} className="flex items-center">
					<BsGoogle className="mr-2 text-md"/>
					Login With Google
				</a>
			</button>

			<button className="bg-facebook justify-center items-center flex w-full px-4 py-3 mt-3 border-none text-white font-semibold text-md rounded-md">
				<a href={`${backend}/api/auth/facebook`} className="flex items-center">
					<BsFacebook className="mr-2 text-md"/>
					Login With Facebook
				</a>
			</button>
		</div>
    );
};

export default SocialLogin;
