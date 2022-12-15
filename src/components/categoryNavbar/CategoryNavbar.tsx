import React, { useRef, useState } from "react";
import "./CategoryNavbar.scss";

import { Link } from "react-router-dom";
import Dropdown from "components/Dropdown/Dropdown";

const CategoryNavbar = (props) => {
    /**
     * 1. if _id exist that means it go to direct Product page
     * 2. if id that means it go to Product filter page
     * 3. if brand exist if refer with brand id
     * 4. cat means root category.
     *
     *
     * */

    const data = [
        {
            name: "Electronics",
            id: "electronics",
            _id: "",
            section: [
                [
                    {
                        name: "Mobiles",
                        id: "Mobiles",
                        rootCategory: "Electronics",
                        subMenu: [
                            { name: "Mi", brand: "mi" },
                            { name: "Realme", brand: "realme" },
                            { name: "Samsung", brand: "samsung" },
                            { name: "Infinix", brand: "infinix" },
                            { name: "OPPO", brand: "oppo" },
                            { name: "Apple", brand: "apple" },
                            { name: "Vivo", brand: "vivo" },
                            { name: "Honor", brand: "honor" },
                            { name: "Asus", brand: "asus" },
                            { name: "Poco X2" },

                            { name: "realme Narzo 10", _id: "613d230cc9247b736856e2a8" },
                            { name: "Infinix Hot 9", _id: "613d230cc9247b736856e2a8" },
                            { name: "IQOO 3", _id: "613d230cc9247b736856e2a8" },
                            { name: "iPhone SE", _id: "613d230cc9247b736856e2a8" },
                            { name: "Motorola razr", _id: "613d230cc9247b736856e2a8" },
                            { name: "realme Narzo 10A", _id: "613d230cc9247b736856e2a8" },
                            { name: "Motorola g8 power lite", _id: "613d230cc9247b736856e2a8" },
                        ],
                    },
                ],
                [
                    {
                        name: "Mobile Accessories",
                        cat: "mobile and accessories",
                        id: "mobile-accessories",
                        _id: "",
                        subMenu: [
                            { name: "Mobile Cases", id: "mobile-case" },
                            { name: "Headphones & Headsets", id: "Headphones" },
                            { name: "Power Banks", id: "Power-Banks" },
                            { name: "Mobile Battery", id: "Mobile Battery" },
                            { name: "Screen Guards", id: "Screen Guards" },
                            { name: "Memory Cards", id: "Mobile Sim - SD Card-Trays" },
                            { name: "Smart Headphones", id: "Headphones" },
                            { name: "Mobile Cables", id: "Mobile Cables" },
                            { name: "Mobile Chargers", id: "Mobile Chargers" },
                            { name: "OTG Adapters", id: "OTG Adapters" },
                        ],
                    },
                    {
                        name: "Smart Wearable Tech",
                        subMenu: [
                            { name: "Smart Watches", _id: "", id: "" },
                            { name: "Smart Glasses (VR)", _id: "", id: "" },
                            { name: "Smart Bands", _id: "", id: "" },
                        ],
                    },
                ],
                [
                    {
                        name: "Laptops",
                        cat: "computers",
                        id: "laptops",
                        subMenu: [{ name: "Gaming Laptops", id: "gaming laptop", _id: "" }],
                    },
                    {
                        name: "Desktop PCs",
                        cat: "computers",
                        id: "",
                        _id: "",
                        subMenu: [],
                    },
                    {
                        name: "Gaming & Accessories",
                        id: "Gaming and Accessories",
                        cat: "computers",
                        subMenu: [],
                    },
                    {
                        name: "Computer Accessories",
                        id: "Computer Accessories",
                        cat: "computers",
                        _id: "",
                        subMenu: [
                            { name: "External Hard Disks", id: "External Hard Disks" },
                            { name: "Pendrives", id: "Pendrives" },
                            { name: "Laptop Skins & Decals", id: "Laptop Skins and Decals" },
                            { name: "Laptop Bags", id: "Laptop Bags" },
                            { name: "Mouse", id: "Mouse" },
                        ],
                    },

                    {
                        name: "Computer Peripherals",
                        cat: "computers",
                        id: "computer peripherals",
                        subMenu: [
                            { name: "Printers & Ink Cartridges", id: "Printers & Inks" },
                            { name: "Monitors", id: "monitors" },
                            { name: "Tablets", cat: "mobile and accessories", id: "tablets" },
                            { name: "Apple iPads", id: "Apple iPads" },
                        ],
                    },
                ],
                [
                    {
                        name: "Speakers",
                        cat: "audio and video",
                        id: "Speakers",
                        subMenu: [
                            { name: "Home Audio Speakers", id: "" },
                            { name: "Microphone", id: "Microphone" },
                            { name: "Home Theatres", id: "" },
                            { name: "Soundbars", id: "" },
                            { name: "Bluetooth Speakers", id: "" },
                            { name: "DTH Set Top Box", id: "" },
                        ],
                    },
                    {
                        name: "Camera",
                        id: "Cameras",
                        cat: "Cameras and Accessories",
                        subMenu: [
                            { name: "DSLR & Mirrorless", id: "" },
                            { name: "Compact & Bridge Cameras", id: "" },
                            { name: "Sports & Action", id: "" },
                        ],
                    },
                    {
                        name: "Camera Accessories",
                        id: "Cameras and Accessories",
                        cat: "Cameras and Accessories",
                        subMenu: [
                            { name: "Lens", id: "Lens" },
                            { name: "Tripods", id: "Tripods" },
                        ],
                    },
                    {
                        id: "Network Components",
                        cat: "computers",
                        name: "Network Components",
                        subMenu: [{ name: "Routers", id: "Routers" }],
                    },
                ],
                [
                    {
                        name: "Featured",
                        id: "Featured",
                        subMenu: [
                            { name: "Google Assistant Store", id: "Google Assistant Store" },
                            { name: "Apple products", id: "Apple products" },
                        ],
                    },
                ],
            ],
        },
        {
            name: "TVs & Appliances",
            cat: "Home Entertainment",
            id: "Home Entertainment",
            section: [
                [
                    { name: "Television", rootCategory: "Electronics", id: "Televisions" },
                    { name: "New Launches", id: "" },
                    { name: "Smart & Ultra HD", id: "" },
                    {
                        name: "Top Brands",
                        id: "Televisions",
                        cat: "Home Entertainment",
                        rootCategory: "Electronics",
                        subMenu: [
                            { name: "Mi", brand: "mi" },
                            { name: "Vu", brand: "" },
                            { name: "Thomson", brand: "" },
                            { name: "Samsung", brand: "" },
                            { name: "iFFALCON by TCL", brand: "" },
                            { name: "Nokia", brand: "" },
                            { name: "LG", brand: "" },
                            { name: "realme", brand: "" },
                            { name: "Motorola", brand: "" },
                        ],
                    },
                    {
                        name: "Shop by Screen Size",
                        id: "",
                        subMenu: [
                            { name: "24 & below", id: "" },
                            { name: "28 - 32", id: "" },
                            { name: "39 - 43", id: "" },
                            { name: "48 - 55", id: "" },
                            { name: "60 & above", id: "" },
                        ],
                    },
                ],
                [
                    {
                        name: "Washing Machine",
                        id: "Washing Machine",
                        rootCategory: "Electronics",
                        subMenu: [
                            { name: "Fully Automatic Front Load", id: "Washing Machine" },
                            { name: "Semi Automatic Top Load", id: "Washing Machine" },
                            { name: "Fully Automatic Top Load", id: "Washing Machine" },
                        ],
                    },

                    {
                        name: "Air Conditioners",
                        id: "Air Conditioners",
                        rootCategory: "Electronics",
                        subMenu: [
                            { name: "Inverter AC", id: "" },
                            { name: "Split ACs", id: "" },
                            { name: "Window ACs", id: "" },
                        ],
                    },
                    {
                        name: "Shop By Brand",
                        id: "Air Conditioners",
                        rootCategory: "Electronics",
                        subMenu: [
                            { name: "LG", brand: "LG" },
                            { name: "Hitachi", brand: "Hitachi" },
                            { name: "LG", brand: "LG" },
                            { name: "Hitachi", brand: "Hitachi" },
                            { name: "Carrier", brand: "Carrier" },
                            { name: "Hitachi", brand: "Hitachi" },
                        ],
                    },
                    {
                        name: "Refrigerators",
                        rootCategory: "Electronics",
                        id: "Refrigerators",
                        subMenu: [
                            { name: "Single Door", id: "" },
                            { name: "Double Door", id: "" },
                            { name: "Triple door", id: "" },
                            { name: "Side by Side", id: "" },
                            { name: "Convertible", id: "" },
                        ],
                    },
                ],
                [
                    {
                        name: "Home And Kitchen Appliances",
                        rootCategory: "Home And Kitchen",
                        id: "Home And Kitchen",
                        subMenu: [
                            { name: "Microwave Ovens", id: "Microwave Ovens" },
                            { name: "Oven Toaster Grills (OTG)", id: "Oven Toaster Grills (OTG)" },
                            { name: "Juicer/Mixer/Grinder", id: "Juicer/Mixer/Grinder" },
                            { name: "Electric Kettle", id: "Electric Kettle" },
                            { name: "Induction Cooktops", id: "Induction Cooktops" },
                            { name: "Chimneys", id: "Chimneys" },
                            { name: "Hand Blenders", id: "Hand Blenders" },
                            { name: "Sandwich Makers", id: "Sandwich Makers" },
                            { name: "Pop Up Toasters", id: "Pop Up Toasters" },
                            { name: "Electric Cookers", id: "Electric Cookers" },
                            { name: "Wet Grinders", id: "Wet Grinders" },
                            { name: "Food Processors", id: "Food Processors" },
                            { name: "Coffee Makers", id: "Coffee Makers" },
                            { name: "Dishwashers", id: "Dishwashers" },
                        ],
                    },
                    { name: "Healthy Living Appliances", id: "" },
                ],
                [
                    {
                        name: "Small Home Appliances",
                        id: "Home And Kitchen",
                        subMenu: [
                            { name: "Irons", id: "Irons" },
                            { name: "Water Purifiers", id: "" },
                            { name: "Room Heaters", id: "Room Heaters" },
                            { name: "Fans", id: "Fans" },
                            { name: "Air Coolers", id: "Air Coolers" },
                            { name: "Inverters", id: "Inverters" },
                            { name: "Vacuum Cleaners", id: "" },
                            { name: "Voltage Stabilizers", id: "Voltage Stabilizers" },
                        ],
                    },
                ],
            ],
        },
        {
            name: "Men",
            ideal: "men",
            id: "Men",
            section: [
                [
                    {
                        name: "Footwear",
                        rootCategory: "Footwear",
                        id: "",
                        subMenu: [
                            { name: "Sports Shoes", id: "sports-shoes" },
                            { name: "Casual Shoes", id: "casual-shoes" },
                            { name: "Formal Shoes", id: "formal-shoes" },
                            { name: "Sandals & Floaters", id: "sandals-floaters" },
                            { name: "Boots", id: "boots" },
                            { name: "Running Shoes", id: "running-shoes" },
                            { name: "Sneakers", id: "sneakers" },
                        ],
                    },
                    {
                        name: "Men's Grooming",
                        id: "",
                        subMenu: [
                            { name: "Deodorants", id: "" },
                            { name: "Perfumes", id: "" },
                            { name: "Beard Care & Grooming", id: "" },
                            { name: "Shaving & Aftershave", id: "" },
                        ],
                    },
                ],
                [
                    { name: "Clothes", rootCategory: "Clothes", id: "" },
                    {
                        name: "Top wear",
                        rootCategory: "Clothes",
                        subMenu: [
                            { name: "T-Shirts", id: "t-sharts" },
                            { name: "Formal Shirts", id: "sharts" },
                            { name: "Casual Shirts", id: "sharts" },
                        ],
                    },
                    {
                        name: "Bottom wear",
                        rootCategory: "Clothes",
                        subMenu: [
                            { name: "Jeans", id: "jeans" },
                            { name: "Casual Trousers", id: "" },
                            { name: "Formal Trousers", id: "" },
                            { name: "Track pants", id: "" },
                            { name: "Shorts", id: "" },
                            { name: "Cargos", id: "" },
                            { name: "Three Fourths", id: "" },
                        ],
                    },
                    { name: "Suits, Blazers & Waistcoats", id: "" },
                    { name: "Ties, Socks, Caps & More", id: "" },
                    { name: "Fabrics", id: "" },
                ],
                [
                    {
                        name: "Winter Wear",
                        cat: "clothing and accessories",
                        id: "winter wear",
                        subMenu: [
                            { name: "Sweatshirts", id: "" },
                            { name: "Jackets", id: "Jackets" },
                            { name: "Sweater", id: "" },
                            { name: "Tracksuits", id: "" },
                        ],
                    },

                    {
                        name: "Ethnic wear",
                        cat: "clothing and accessories",
                        id: "Kurtas-Ethnic Sets and Bottom",
                        subMenu: [
                            { name: "Kurtas", id: "kurtas" },
                            { name: "Ethnic Sets", id: "ethnic sets" },
                            { name: "Sherwanis", id: "sherwanis" },
                            { name: "Ethnic Pyjama", id: "ethnic-pyjama" },
                            { name: "Dhoti", id: "dhoti" },
                            { name: "Palazzos", id: "palazzos" },
                            { name: "Panjabi", id: "panjabi" },
                            { name: "Lungi", id: "lungi" },
                        ],
                    },
                    {
                        name: "Innerwear & Loungewear",
                        cat: "clothing and accessories",
                        id: "Innerwear and Loungewear",
                        subMenu: [
                            { name: "Vests", id: "Vests" },
                            { name: "Boxers", id: "Boxers" },
                            { name: "Thermals", id: "Thermals" },
                            { name: "Night Suits", id: "Night Suits" },
                        ],
                    },
                    { name: "Raincoats & Windcheaters", id: "" },
                ],
                [
                    {
                        name: "Watches",
                        id: "",
                        subMenu: [
                            { name: "Fastrack", id: "" },
                            { name: "Casio", id: "" },
                            { name: "Titan", id: "" },
                            { name: "Fossil", id: "" },
                            { name: "Sonata", id: "" },
                        ],
                    },

                    {
                        name: "Accessories",
                        id: "",
                        subMenu: [
                            { name: "Backpacks", id: "" },
                            { name: "Wallets", id: "" },
                            { name: "Belts", id: "" },
                            { name: "Sunglasses", id: "" },
                            { name: "Luggage & Travel", id: "" },
                            { name: "Frames", id: "" },
                            { name: "Jewellery", id: "" },
                        ],
                    },
                    { name: "Sports & Fitness Store", id: "" },
                ],
                [
                    { name: "Smart Watches", id: "" },
                    { name: "Smart Bands", id: "" },
                    {
                        name: "Personal Care Appliances",
                        id: "",
                        subMenu: [
                            { name: "Trimmers", id: "" },
                            { name: "Shavers", id: "" },
                            { name: "Grooming Kits", id: "" },
                        ],
                    },
                    {
                        name: "Featured",
                        id: "",
                        subMenu: [
                            { name: "Watches Store", id: "" },
                            { name: "Footwear Club", id: "" },
                            { name: "Bags & Wallet", id: "" },
                            { name: "T-Shirt Store", id: "" },
                            { name: "Adidas", id: "" },
                            { name: "Beardo", id: "" },
                            { name: "Reebok", id: "" },
                            { name: "Skechers", id: "" },
                            { name: "Nike", id: "" },
                        ],
                    },
                ],
            ],
        },
        {
            name: "Women",
            id: "Women",
            ideal: "women",
            section: [
                [
                    { name: "Clothes", rootCategory: "Clothes" },
                    {
                        name: "Women Western & Maternity Wear",
                        id: "",
                        cat: "clothing and accessories",
                        ideal: "women",
                        rootCategory: "Clothes",
                        subMenu: [
                            { name: "Topwear", id: "" },
                            { name: "Dresses", id: "" },
                            { name: "Jeans", id: "jeans" },
                            { name: "Shorts", id: "" },
                            { name: "Skirts", id: "" },
                            { name: "Jeggings & Tights", id: "" },
                            { name: "Trousers & Capris", id: "" },
                        ],
                    },
                    {
                        name: "Lingerie & Sleepwear",
                        rootCategory: "Clothes",
                        subMenu: [
                            { name: "Bras", id: "" },
                            { name: "Panties", id: "" },
                            { name: "Lingerie Sets", id: "" },
                            { name: "Night Dresses & Nighties", id: "" },
                            { name: "Shapewear", id: "" },
                            { name: "Camisoles & Slips", id: "" },
                        ],
                    },
                    { name: "Swim & Beachwear", id: "" },
                    { name: "Party Dresses", id: "" },
                    { name: "Sports Wear", id: "" },
                    { name: "Winter Wear", id: "" },
                ],
                [
                    {
                        name: "Ethnic Wear",
                        rootCategory: "Clothes",
                        subMenu: [
                            { name: "Sarees", id: "sarees" },
                            { name: "Kurtas & Kurtis", id: "" },
                            { name: "Dress Material", id: "" },
                            { name: "Lehenga Choli", id: "" },
                            { name: "Blouse", id: "blouses" },
                            { name: "Kurta Sets & Salwar Suits", id: "" },
                            { name: "Gowns", id: "" },
                            { name: "Dupattas", id: "" },
                        ],
                    },
                    {
                        name: "Ethnic Bottoms",
                        rootCategory: "Clothes",
                        subMenu: [
                            { name: "Leggings & Churidars", id: "" },
                            { name: "Palazzos", id: "" },
                            { name: "Shararas", id: "" },
                            { name: "Salwars & Patiala", id: "" },
                            { name: "Dhoti Pants", id: "" },
                            { name: "Ethnic Trousers", id: "" },
                            { name: "Saree Shapewear & Petticoats", id: "" },
                        ],
                    },
                ],
                [
                    {
                        name: "Footwear",
                        rootCategory: "Footwear",
                        subMenu: [],
                    },
                    {
                        name: "Sandals",
                        rootCategory: "Footwear",
                        subMenu: [
                            { name: "Flats", id: "" },
                            { name: "Heels", id: "" },
                            { name: "Wedges", id: "" },
                        ],
                    },
                    {
                        name: "Shoes",
                        rootCategory: "Footwear",
                        subMenu: [
                            { name: "Sports Shoes", id: "" },
                            { name: "Casual Shoes", id: "" },
                            { name: "Boots", id: "" },
                        ],
                    },

                    { name: "Ballerinas", id: "" },

                    { name: "Watches", id: "", ideal: "women" },
                    { name: "Smart Watches", id: "", ideal: "women" },
                    {
                        name: "Personal Care Appliances",
                        ideal: "women",
                        subMenu: [
                            { name: "Hair Straightners", id: "" },
                            { name: "Hair Dryers", id: "" },
                            { name: "Epilators", id: "" },
                        ],
                    },
                ],

                [
                    {
                        name: "Beauty & Grooming",
                        cat: "Beauty and Grooming",
                        id: "",
                        subMenu: [
                            { name: "Make Up", id: "Makeup" },
                            { name: "Skin Care", id: "Body and Face Skin Care" },
                            { name: "Hair Care", id: "Hair Care and Accessory" },
                            { name: "Bath & Spa", id: "Bath and Shower" },
                            { name: "Deodorants & Perfumes", id: "Perfume" },
                        ],
                    },
                ],
            ],
        },
        {
            name: "Baby & Kids",
            id: "Baby & Kids",
            section: [
                [
                    { name: "Kids Clothes", id: "Kids Clothes" },
                    {
                        name: "Boys' Clothes",
                        id: "Boys' Clothes",
                        subMenu: [
                            { name: "T-Shirts", id: "T-Shirts" },
                            { name: "Shirts", id: "Shirts" },
                        ],
                    },
                    {
                        name: "Girls' Clothes",
                        id: "Girls' Clothes",
                        subMenu: [
                            { name: "Dresses & Skirts", id: "Dresses and Skirts" },
                            { name: "T-shirts & Tops", id: "T-shirts and Tops" },
                        ],
                    },
                ],
                [
                    {
                        name: "Toys",
                        id: "Toys",
                        subMenu: [
                            { name: "Remote Control Toys", id: "Remote Control Toys" },
                            { name: "Educational Toys", id: "Educational Toys" },
                            { name: "Soft Toys", id: "Soft Toys" },
                            { name: "Puzzles", id: "Puzzles" },
                            { name: "Helicopter & Drones", id: "Helicopter and Drones" },
                        ],
                    },
                ],
                [
                    {
                        name: "Baby Care",
                        id: "Baby Care",
                        subMenu: [
                            { name: "Diapers", id: "Diapers" },
                            { name: "Wipes", id: "Wipes" },
                        ],
                    },
                ],
            ],
        },
        {
            name: "Home & Furniture",
            id: "Home & Furniture",
            section: [
                [
                    {
                        name: "Kitchen, Cookware & Serveware",
                        cat: "Home And Kitchen",
                        id: "Home And Kitchen",
                        subMenu: [
                            { name: "Gas Stoves", id: "Pressure Cookers" },
                            { name: "Pressure Cookers", id: "Kitchen tools" },
                        ],
                    },
                ],
                [
                    {
                        name: "Bed Room Furniture",
                        id: "Bed Room Furniture",
                        cat: "Home And Kitchen",
                        subMenu: [
                            { name: "Beds", id: "Beds" },
                            { name: "Mattresses", id: "Mattresses" },
                            { name: "Wardrobes", id: "Wardrobes" },
                        ],
                    },
                    {
                        name: "Living Room Furniture",
                        id: "Living Room Furniture",
                        cat: "furniture",
                        subMenu: [
                            { name: "Sofa", id: "Sofa" },
                            { name: "Sofa Beds", id: "Sofa Beds" },
                            { name: "TV Units", id: "TV Units" },
                            { name: "Dining Tables & Chairs", id: "Dining Tables and Chairs" },
                            { name: "Coffee Tables", id: "Coffee Tables" },
                        ],
                    },
                ],
                [
                    {
                        name: "Home Lighting",
                        cat: "furniture",
                        id: "Home Lighting",
                        subMenu: [
                            { name: "Bulbs", id: "Bulbs" },
                            { name: "Wall Lamp", id: "Wall Lamp" },
                            { name: "Table Lamp", id: "Table Lamp" },
                        ],
                    },
                ],
            ],
        },
        {
            name: "Sports, Books & More",
            id: "Sports, Books & More",
            section: [
                [
                    {
                        name: "Sports",
                        id: "Sports",
                        _id: "",
                        subMenu: [
                            { name: "Cricket", id: "Cricket", _id: "" },
                            { name: "Badminton", id: "Badminton", _id: "" },
                            { name: "Football", id: "Football", _id: "" },
                        ],
                    },
                ],
                [
                    {
                        name: "Food Essentials",
                        id: "Food Essentials",
                        subMenu: [
                            { name: "Nuts & Dry Fruits", id: "Nuts and Dry Fruits" },
                            { name: "Tea, Coffee and Beverages", id: "Tea, Coffee and Beverages" },
                            { name: "Chocolates", id: "Chocolates" },
                        ],
                    },
                    {
                        name: "Health & Nutrition",
                        id: "Health & Nutrition",
                        subMenu: [
                            { name: "All Supplements", id: "All Supplements" },
                            { name: "Protein Supplements", id: "Protein Supplements" },
                            { name: "Vitamin Supplements", id: "Vitamin Supplements" },
                        ],
                    },
                ],
                [
                    {
                        name: "Books",
                        id: "Books",
                        subMenu: [{ name: "Entrance Exams", id: "Entrance Exams" }],
                    },
                    {
                        name: "Stationery",
                        id: "Stationery",
                        subMenu: [
                            { name: "Pens", id: "Pens" },
                            { name: "Diaries", id: "Diaries" },
                            { name: "Card Holders", id: "Card Holders" },
                            { name: "Desk Organizers", id: "Desk Organizers" },
                            { name: "Calculators", id: "Calculators" },
                        ],
                    },
                ],
            ],
        },
        { name: "Flights", id: "Flights" },
        { name: "Offer Zone", id: "Offer Zone" },
    ];

    const [openSectionId, setOpenSectionId] = React.useState<string>("");

    function handleMouseHover(e: MouseEvent, id, type) {
        if (type === "enter") {
            setOpenSectionId(id);
        } else {
            setOpenSectionId("");
        }
    }

    function findRootCategoryName(parentItem, item){
        let rootCategory = "";
        if (item.rootCategory) {
            rootCategory = item.rootCategory;
        } else if (parentItem.rootCategory) {
            rootCategory = parentItem.rootCategory;
        }
        return rootCategory
    }

    function findCategoryTreeName(parentItem, item){
        let catTree = "";
        if (item.id) {
            catTree = item.id;
        } else if (parentItem.id) {
            catTree = parentItem.id;
        }
        return catTree
    }

    function renderLastLevel(item, section, eachSec, subMenu) {
        const state = {};
        if (subMenu.brand) {
            state.brand = subMenu.brand;
        }
        return (
            <Link
                to={`/p/${findRootCategoryName(eachSec, subMenu)}?catTree=${findCategoryTreeName(eachSec, subMenu)}`}
                  state={{ideal: getIdeal(item, section, eachSec, subMenu), ...state}}
                className="category_submenu--each_column--row--submenu--name">
                {subMenu.name}
            </Link>
        );
    }

    // get ideal. priority for children
    function getIdeal(section, subSection, subSubSection, subSubSubSection){
        let ideal  = ""
        if(subSubSubSection && subSubSubSection.ideal){
            ideal = subSubSubSection.ideal
        } else if(subSubSection && subSubSection.ideal){
            ideal = subSubSection.ideal
        } else if(subSection && subSection.ideal) {
            ideal = subSection.ideal
        } else if(section && section.ideal) {
            ideal = section.ideal
        }
        return ideal;
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
                                        <Link state={{ideal: getIdeal(item, section, eachSec)}} className="row-title text-xs" to={`/p/${eachSec.rootCategory}?catTree=${eachSec.id}`}>
                                            {eachSec.name}
                                        </Link>
                                        <i className="collapse-icon fa fa-chevron-right" />
                                    </div>
                                    <div className="category_submenu--each_column--row--submenu">
                                        {eachSec.subMenu && eachSec.subMenu.map((subMenu, i) => renderLastLevel(item , section, eachSec, subMenu))}
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
                <div className="category_main_nav">
                    {data.map((item, i) => (
                        <div
                            key={i}
                            onMouseLeave={(e) => handleMouseHover(e, "", "leave")}
                            onMouseEnter={(e) => handleMouseHover(e, item.id, "enter")}
                            className="category_main_nav--item"
                        >
                            <li>{item.name}</li>
                            <Dropdown className="category_submenu_popup" isShow={openSectionId === item.id}>
                                <div>{renderSection(item)}</div>
                            </Dropdown>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CategoryNavbar;
