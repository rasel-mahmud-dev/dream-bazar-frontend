import { Menu, Popup } from "UI/index";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import staticImagePath from "src/utills/staticImagePath";
import Dropdown from "components/Dropdown/Dropdown";
import Backdrop from "components/UI/Backdrop/Backdrop";
import Modal from "components/UI/Modal/Modal";
import Image from "UI/Image/Image";
import "./style.scss";


import homeNavData from "./data";

const { SubMenu } = Menu;

interface moreHomeNavDataType {
    name?: string;
    title?: string;
    ideal?: string;
    items?: { label: string; name: string; _id?: string }[];
}

const HomeCategoryNav = () => {
    const [moreHomeNavData, setMoreHomeNavData] = React.useState<moreHomeNavDataType | null>(null);



    const [openItemId, setOpenItemId] = React.useState(-1);

    const [openDropdownName, setOpenDropdownName] = React.useState<string>("");

    const [subMenuIds, setSubMenuIds] = React.useState([]);

    let [dropdownStyle, setDropdownStyle] = useState<{
        right?: string | number;
        left?: string | number;
        transform?: string;
    }>({
        left: "50%",
        transform: "translateX(-50%)",
    });

    const [openSubMenuName, setOpenSubMenuName] = useState<string>("");

    const dropdownRef = useRef<HTMLDivElement>();

    // assume min width of dropdown panel
    const MAX_DROPDOWN_WIDTH = 288;

    function handleClickSubMenu(e:  React.MouseEvent<HTMLDivElement, MouseEvent>, section: any) {
        // @ts-ignore
        let offsetLeft = e.target.offsetLeft;

        // check if category item x position is greater than dropdown width than set dropdown position as category item position.
        if (offsetLeft > MAX_DROPDOWN_WIDTH) {
            // out of x right viewport;
            if (offsetLeft + MAX_DROPDOWN_WIDTH > window.innerWidth) {
                setDropdownStyle({ transform: "translateX(0)", right: -50 });
            } else {
                setDropdownStyle({
                    transform: "translateX(-50%)",
                    left: "50%",
                });
            }
        } else {
            setDropdownStyle({ left: "auto", transform: "translateX(0)" });
        }

        if (!section) return;

        setOpenDropdownName(section.name);

        if (section.sub_menu) {
            let subSub = section.sub_menu[0];
            if (subSub) {
                setOpenSubMenuName(subSub.name);
            }
        }
    }

    function handleCloseDropdown() {
        setOpenDropdownName("");
    }

    function handleMouseEnterOnSubCategory(subCat) {
        setOpenSubMenuName(subCat.name);
    }

    return (
        <div className="bg-white py-4 dark:bg-neutral-800 dark:text-white shadow-md">
            <div className="flex items-center justify-between max-w-8xl mx-auto px-4 ">
                {homeNavData.map((section) => (
                    <div
                        key={section.name}
                        className="relative"
                        onMouseEnter={(e) => handleClickSubMenu(e, section)}
                        onMouseLeave={handleCloseDropdown}
                    >
                        <div className="flex flex-col items-center pointer-events-none">
                            <Image className="w-20" src={staticImagePath(section.logo)} />
                            <h4 className="text-sm font-medium">{section.label}</h4>
                        </div>

                        <Dropdown isShow={openDropdownName === section.name && section?.sub_menu && section?.sub_menu.length > 0}>
                            <div className={`category-dropdown`} style={dropdownStyle} ref={dropdownRef}>
                                <div className="relative">
                                    {section?.sub_menu?.map((subMenu) => (
                                        <div
                                            key={subMenu.name}
                                            className="category-dropdown__submenu-panel"
                                            onMouseEnter={() => handleMouseEnterOnSubCategory(subMenu)}
                                        >
                                            <div
                                                className={`category-sub-item ${openSubMenuName === subMenu.name ? "active-category-sub-item" : ""}`}
                                            >
                                                <h4
                                                    onClick={() => setOpenSubMenuName(subMenu.name)}
                                                    className="whitespace-nowrap cursor-pointer text-sm font-medium"
                                                >
                                                    <Link to={`/p/${subMenu.rootCategory}?catTree=${subMenu.name}`}>{subMenu.label}</Link>
                                                </h4>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="category-dropdown__submenu-panel__right">
                                    {section.sub_menu &&
                                        section.sub_menu.length > 0 &&
                                        section.sub_menu.map(
                                            (subMenu) =>
                                                subMenu.name === openSubMenuName && (
                                                    <div key={subMenu.name}>
                                                        <div>
                                                            {subMenu?.sub_menu && subMenu.sub_menu.length > 0 ? (
                                                                subMenu.sub_menu.map((subSubMenu) => (
                                                                    <div key={subSubMenu.name}>
                                                                        <h4>
                                                                            <Link
                                                                                to={`/p/${
                                                                                    subSubMenu.rootCategory
                                                                                        ? subSubMenu.rootCategory
                                                                                        : subMenu.rootCategory
                                                                                }?catTree=${subSubMenu.name}`}
                                                                            >
                                                                                {subSubMenu.label}
                                                                            </Link>
                                                                        </h4>
                                                                    </div>
                                                                ))
                                                            ) : (
                                                                <div>
                                                                    <h4>No sub category found</h4>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                )
                                        )}
                                </div>
                            </div>
                        </Dropdown>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HomeCategoryNav;
