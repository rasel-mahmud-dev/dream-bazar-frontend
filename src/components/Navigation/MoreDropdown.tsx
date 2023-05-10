import React, {FC, HTMLAttributes} from 'react';
import {Link} from "react-router-dom";
import Dropdown from "components/Dropdown/Dropdown";
import {FaSun, FiMoon} from "react-icons/all";
import theme from "tailwindcss/defaultTheme";

interface Props extends HTMLAttributes<HTMLDivElement> {
    isShow: boolean,
    onChangeTheme: (e: {target: {value: string}})=>void
    theme: "dark" | "light"
    lang: "bn" | "en"
}

const MoreDropdown: FC<Props> = (props) => {

    const {theme, onChangeTheme, lang, isShow, className} = props


    function handleToggleTheme(){
        onChangeTheme(theme === "dark" ? {target: {value: "light"}}: {target: {value: "dark"}})
    }

    return (
        <Dropdown isShow={isShow} className={className ?? ""}>
            <div className="px-4 pb-4">
                <h4 className="heading-5 py-2"><Link to="/seller/join/registration">Became a seller</Link></h4>
                <ul>
                    <li onClick={handleToggleTheme} className="flex dark:text-white text-dark-700 items-center gap-x-1 ">
                        { theme === "dark" ? <FaSun />: <FiMoon /> }
                        <span>{ theme === "dark" ? "Day" : "Dark" }</span>
                    </li>

                    <li className="flex dark:text-white text-dark-700 items-center gap-x-1 ">
                        { lang === "en" ? "Bangla" :  "English" }
                    </li>

                    <li className="flex dark:text-white text-dark-700 items-center gap-x-1 ">
                        <Link to="/seller/join/registration">Create a Seller</Link>
                    </li>
                    <li className="flex dark:text-white text-dark-700 items-center gap-x-1 ">
                        <Link to="/admin/join/login">Admin Login</Link>
                    </li>
                    <li className="flex dark:text-white text-dark-700 items-center gap-x-1 ">
                        <Link to="/store-list">store</Link>
                    </li>
                    <li className="flex dark:text-white text-dark-700 items-center gap-x-1 ">
                        <Link to="/store-list">store</Link>
                    </li>
                    <li className="flex dark:text-white text-dark-700 items-center gap-x-1 ">
                        <Link to="/store-list">store</Link>
                    </li>
                </ul>
            </div>
        </Dropdown>
    );

};

export default MoreDropdown;