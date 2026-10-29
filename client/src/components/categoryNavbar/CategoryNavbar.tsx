import React, {useEffect, useState} from "react";
import "./CategoryNavbar.scss";


import {Link} from "react-router-dom";
import Dropdown from "components/Dropdown/Dropdown";
import useWindowResize from "src/hooks/useWindowResize";
import useLanguage from "src/hooks/useLanguage";
import defaultCategoryNavData, { Item } from "./defaultData";

const CategoryNavbar = (props) => {


    const [isMobile, setMobile] = useState(true)

    let innerWidth = useWindowResize()

    const l = useLanguage()


    useEffect(() => {
        if (innerWidth < 1024) {
            setMobile(true)
        } else {
            setMobile(false)
        }
    }, [innerWidth])


    /**
     * 1. if _id exist that means it go to direct Product page
     * 2. if id that means it go to Product filter page
     * 3. if brand exist if refer with brand id
     * 4. cat means root category.
     *
     *
     * */

    const [data, setData] = useState<Item[]>(defaultCategoryNavData);

    useEffect(() => {
        fetch("/api/v1/configs/category_navbar")
            .then(res => res.json())
            .then(json => {
                const items = json?.data || json;
                if (Array.isArray(items) && items.length > 0) {
                    setData(items);
                }
            })
            .catch(() => {});
    }, []);


    const [openSectionId, setOpenSectionId] = React.useState<string>("");

    // for mobile view dropdown
    const [dropdownSection, setDropdownSection] = useState(null)

    function openOnMobileDevice(item) {
        setOpenSectionId(item?.id);
        setDropdownSection(item)
    }

    function handleMouseHover(e: React.MouseEvent<HTMLDivElement, MouseEvent>, id, type) {
        if (innerWidth > 780) {
            if (type === "enter") {
                setOpenSectionId(id);
            } else {
                setOpenSectionId("");
            }
        }
    }

    function findRootCategoryName(parentItem, item) {
        let rootCategory = "";
        if (item.rootCategory) {
            rootCategory = item.rootCategory;
        } else if (parentItem.rootCategory) {
            rootCategory = parentItem.rootCategory;
        }
        return rootCategory;
    }

    function findCategoryTreeName(parentItem, item) {
        let catTree = "";
        if (item.id) {
            catTree = item.id;
        } else if (parentItem.id) {
            catTree = parentItem.id;
        }
        return catTree;
    }

    function renderLastLevel(item, section, eachSec, subMenu) {
        const state: { brand?: string } = {};
        if (subMenu.brand) {
            state.brand = subMenu.brand;
        }
        return (
            <Link
                to={`/p/${findRootCategoryName(eachSec, subMenu)}?catTree=${findCategoryTreeName(eachSec, subMenu)}`}
                state={{
                    brand: getBrand(item, section, eachSec, subMenu),
                    ideal: getIdeal(item, section, eachSec, subMenu),
                    ...state,
                }}
                className="category_submenu--each_column--row--submenu--name"
            >
                {subMenu.name}
            </Link>
        );
    }

    // get ideal. priority for children
    function getIdeal(section, subSection, subSubSection, subSubSubSection) {
        let ideal = "";
        if (subSubSubSection && subSubSubSection.ideal) {
            ideal = subSubSubSection.ideal;
        } else if (subSubSection && subSubSection.ideal) {
            ideal = subSubSection.ideal;
        } else if (subSection && subSection.ideal) {
            ideal = subSection.ideal;
        } else if (section && section.ideal) {
            ideal = section.ideal;
        }
        return ideal;
    }

    // get ideal. priority for children
    function getBrand(section, subSection, subSubSection, subSubSubSection) {
        let brand = "";
        if (subSubSubSection && subSubSubSection.brand) {
            brand = subSubSubSection.brand;
        } else if (subSubSection && subSubSection.brand) {
            brand = subSubSection.brand;
        } else if (subSection && subSection.brand) {
            brand = subSection.brand;
        } else if (section && section.brand) {
            brand = section.brand;
        }
        return brand;
    }

    function renderSection(item) {
        if (item.section) {
            return (
                <div className="category_submenu">
                    {item.section.map((section, i) => (
                        <div key={i} className="category_submenu--each_column">
                            {section.map((eachSec, i) => (
                                <div key={i} className="category_submenu--each_column--row">
                                    <div className="category_submenu--each_column--row--title">
                                        <Link
                                            state={{
                                                brand: getBrand(item, section, eachSec, null),
                                                ideal: getIdeal(item, section, eachSec, null),
                                            }}
                                            className="row-title text-xs"
                                            to={`/p/${eachSec.rootCategory}?catTree=${eachSec.id}`}
                                        >
                                            {l(eachSec.name)}
                                        </Link>
                                        <i className="collapse-icon fa fa-chevron-right"/>
                                    </div>
                                    <div className="category_submenu--each_column--row--submenu">
                                        {eachSec.subMenu && eachSec.subMenu.map((subMenu, i) => renderLastLevel(item, section, eachSec, subMenu))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            );
        }
    }

    return (
        <div className="category_navigation">
            <div>
                <div className="category_main_nav overflow-x-auto md:overflow-x-visible scroll-x-transparent ">
                    {data.map((item, i) => (
                        <div
                            key={i}
                            onClick={() => openOnMobileDevice(item)}
                            onMouseLeave={(e) => handleMouseHover(e, "", "leave")}
                            onMouseEnter={(e) => handleMouseHover(e, item.id, "enter")}
                            className="category_main_nav--item"
                        >
                            <li className={`whitespace-nowrap ${openSectionId === item.id ? "text-primary-500 font-semibold " : ""}`}>
                                {l(item.name)}
                            </li>

                            {!isMobile && <Dropdown className="category_submenu_popup" isShow={openSectionId === item.id}>
                                <div>{renderSection(item)}</div>
                            </Dropdown>}
                        </div>
                    ))}
                </div>

                {isMobile && dropdownSection &&
                    <Dropdown withBackdrop={true} onClose={() => openOnMobileDevice(null)} className="category_submenu_popup overflow-hidden"
                              isShow={openSectionId === dropdownSection?.id}>
                        <div className="w-full">{renderSection(dropdownSection)}</div>
                    </Dropdown>}
            </div>
        </div>
    );
};

export default CategoryNavbar;
