import { Menu, Popup } from "UI/index";
import React, {useState} from "react";
import { Link } from "react-router-dom";
import staticImagePath from "src/utills/staticImagePath";
import Dropdown from "components/Dropdown/Dropdown";
import Backdrop from "components/UI/Backdrop/Backdrop";
import Modal from "components/UI/Modal/Modal";
import Image from "UI/Image/Image";
import "./style.scss"

const { SubMenu } = Menu;

interface moreHomeNavDataType {
    name?: string;
    title?: string;
    ideal?: string;
    items?: { label: string; name: string; _id?: string }[];
}

const HomeCategoryNav = () => {
    const [moreHomeNavData, setMoreHomeNavData] =
        React.useState<moreHomeNavDataType | null>(null);

    const homeNavData = [
        {
            label: "Top Offer",
            logo: "f15c02bfeb02d15d.png",
            name: "kj98759e347",
        },
        {
            label: "Computers",
            logo: "69c6589653afdb9a.png",
            name: "Electronics",
            sub_menu: [
                {
                    label: "Computer Components",
                    logo: "",
                    name: "computer components",
                    sub_menu: [
                        { label: "All", name: "all" },
                        { label: "Motherboard", name: "Motherboard" },
                        { label: "Ram", name: "ram" },
                        { label: "Processor", name: "processor" },
                        { label: "SSD", name: "ssd" },
                        { label: "Powersupply", name: "powersupply" },
                        { label: "Casing", name: "casing" },
                    ],
                },
                {
                    label: "Desktop PCs",
                    name: "desktop pcs",
                    sub_menu: [
                        { label: "All In One PCs", id: "all in one pc" },
                        { label: "Mini PCs", id: "mini pcs" },
                        { label: "Tower PCs", id: "tower pcs" },
                    ],
                },
                {
                    label: "Laptops",
                    name: "laptop-store",
                },
            ],
        },
        {
            label: "Mobiles",
            logo: "22fddf3c7da4c4f4.png",
            name: "mobiles-store",
            type: "store",
        },
        {
            label: "Fashions",
            name: "clothing and accessories",
            logo: "82b3ca5fb2301045.png",
            sub_menu: [
                {
                    label: "Men's Top Wear",
                    name: "top wear",
                    ideal: "men",
                    sub_menu: [
                        { label: "All", name: "top wear" },
                        { label: "Men's T-Shirts", name: "t-sharts" },
                        {
                            label: "Men's Casual Shirts",
                            name: "Men's Casual Shirts",
                        },
                        {
                            label: "Men's Formal Shirts",
                            name: "Men's Formal Shirts",
                        },
                        { label: "Men's Kurtas", name: "Men's Kurtas" },
                        {
                            label: "Men's Ethnic Sets",
                            name: "Men's Ethnic Sets",
                        },
                        { label: "Men's Blazers", name: "Men's Blazers" },
                        { label: "Men's Raincoat", name: "Men's Raincoat" },
                        {
                            label: "Men's Windcheaters",
                            name: "Men's Windcheaters",
                        },
                        { label: "Men's Suit", name: "Men's Suit" },
                        { label: "Men's Fabrics", name: "Men's Fabrics" },
                    ],
                },
                {
                    label: "Men's Bottom Wear",
                    name: "top wear",
                    ideal: "men",
                    sub_menu: [
                        { label: "All", name: "top wear" },
                        { label: "Men's Jeans", name: "jeans" },
                        { label: "Men's Trousers", name: "Men's Trousers" },
                        { label: "Men's Trackpants", name: "Men's Trackpants" },
                        { label: "Men's Shorts", name: "Men's Shorts" },
                        { label: "Men's Cargos", name: "Men's Cargos" },
                        {
                            label: "Men's Threefourths",
                            name: "Men's Threefourths",
                        },
                        {
                            label: "Men's Pyjamas & Loungepants",
                            name: "Men's Pyjamas & Loungepants",
                        },
                        { label: "Men's Dhoti", name: "Men's Dhoti" },
                        {
                            label: "Men's Ethnic Pyjama",
                            name: "Men's Ethnic Pyjama",
                        },
                    ],
                },
                // {
                //   label: "Women Ethnic",
                //   name: "Women Ethnic",
                //   ideal: "women",
                //   for_category: ["top wear", "sarees"],
                //   sub_menu: [
                //     {label: "All", name: "All"},
                //     {label: "Women Sarees", name: "sarees", ideal: "women"},
                //     // {label: "Women Kurtas & Kurtis", name: "Women Kurtas & Kurtis"},
                //     // {label: "Women Kurta Sets & Salwar Suits", name: "Women Kurta Sets & Salwar Suits"},
                //     // {label: "Ethnic Dresses", name: "Ethnic Dresses"},
                //     // {label: "Women Dress Materials", name: "Women Dress Materials"},
                //     // {label: "Women Gowns", name: "Women Gowns"},
                //     // {label: "Women Lehenga Cholis", name: "Women Lehenga Cholis"},
                //     // {label: "Women Leggings & Patialas", name: "Women Leggings & Patialas"},
                //     // {label: "Women Palazzos & Shararas", name: "Women Palazzos & Shararas"},
                //     {label: "Women Blouse", name: "blouses"},
                //     // {label: "Women Dupatta", name: "Women Dupatta"}
                //   ]
                // },
                // {
                //   label: "Women Western",
                //   name: "Women Western",
                //   ideal: "women",
                //   for_category: ["top wear", "Dresses and Gowns", "Innerwear and Swimwear"],
                //   sub_menu: [
                //     { label: "All", name: ""},
                //     { label: "Women Tops", name: ""},
                //     { label: "Women Dresses", name: ""},
                //     { label: "Women T-shirts & Polo T-shirts", name: "t-sharts"},
                //     { label: "Women Jeans", name: "jeans"},
                //     { label: "Women Nighties & Night Dresses", name: ""},
                //     // { label: "Women Nightsuit", name: ""},
                //     // { label: "Women Track Pants", name: ""},
                //     // { label: "Women Trouser", name: ""},
                //     // { label: "Women Jumpsuit", name: ""},
                //     // { label: "Women Shapewear", name: ""},
                //     // { label: "Women Sports Bra", name: ""}
                //   ]
                // },
                // {
                //   label: "Men Footwear",
                //   name: "men-footwear",
                //   cat_name: "footwear",
                //   ideal: "men",
                //   sub_menu: [
                //     {label: "All", name: "All"},
                //     {label: "Men's Sports Shoes", name: "Men's Sports Shoes"},
                //     {label: "Men's Casual Shoes", name: "Men's Casual Shoes"},
                //     {label: "Men's Sandals & Floaters", name: "Men's Sandals & Floaters"},
                //     {label: "Men's Slippers & Flip Flops", name: "Men's Slippers & Flip Flops"},
                //     {label: "Men's Formal Shoes", name: "Men's Formal Shoes"},
                //     {label: "Men's Ethnic Shoes", name: "Men's Ethnic Shoes"},
                //     {label: "Active Footwear", name: "Active Footwear"},
                //     {label: "Combo Footwear", name: "Combo Footwear"},
                //     {label: "Shoe Care", name: "Shoe Care"},
                //   ]
                // },
                // {
                //   label: "Women Footwear",
                //   name: "women-footwear",
                //   ideal: "women",
                //   cat_name: "footwear",
                //   sub_menu: [
                //     {label: "All", name: "All"},
                //     {label: "Women Flats", name: "Women Flats"},
                //     {label: "Women Heels", name: "Women Heels"},
                //     {label: "Women Wedges", name: "Women Wedges"},
                //     {label: "Women Slipper Flip Flops", name: "Women Slipper Flip Flops"},
                //     {label: "Women Casual Shoes", name: "Women Casual Shoes"},
                //     {label: "Women Sports Shoes", name: "Women Sports Shoes"},
                //     {label: "Women Ballerinas", name: "Women Ballerinas"},
                //     {label: "Women Ethnic Shoes", name: "Women Ethnic Shoes"},
                //     {label: "Women Sneakers", name: "Women Sneakers"},
                //     {label: "Women Walking Shoes", name: "Women Walking Shoes"},
                //     {label: "Women Boots", name: "Women Boots"},
                //   ]
                // },
                // {
                //   label: "Watches and Accessories",
                //   name: "watches-and-accessories",
                //   sub_menu: [
                //     { label: "Men & Women Watches", name: "Men & Women Watches"},
                //     { label: "Men & Women Sunglasses", name: "Men & Women Sunglasses"},
                //     { label: "Wallets", name: "Wallets"},
                //     { label: "Men & Women Belts", name: "Men & Women Belts"},
                //     { label: "Women Fashion Jewellery", name: "Women Fashion Jewellery"},
                //     { label: "Men Fashion Jewellery", name: "Men Fashion Jewellery"},
                //     { label: "Precious Jewellery", name: "Precious Jewellery"},
                //     { label: "Precious Coins & Bars", name: "Precious Coins & Bars"},
                //     { label: "Precious Articles", name: "Precious Articles"},
                //     { label: "Frames & Contact Lenses", name: "Frames & Contact Lenses"},
                //     { label: "Kids Accessories", name: "Kids Accessories"}
                //   ]
                // },
                // {
                //   label: "Bags, Suitcases & Luggage",
                //   name: "Bags, Suitcases & Luggage",
                //   sub_menu: [
                //     { label: "All", name: "All"},
                //     { label: "Backpacks", name: "Backpacks"},
                //     { label: "Suitcases & Trolleys", name: "Suitcases & Trolleys"},
                //     { label: "Dufflebags", name: "Dufflebags"},
                //     { label: "Rucksacks", name: "Rucksacks"},
                //     { label: "Handbags", name: "Handbags"},
                //     { label: "Slingbags", name: "Slingbags"},
                //     { label: "Women's Clutches & Wallets", name: "Women's Clutches & Wallets"},
                //     { label: "Messenger Bags", name: "Messenger Bags"},
                //     { label: "Travel Accessories", name: "Travel Accessories"}
                //   ]
                // },
                // {
                //   label: "Kids",
                //   name: "Kids",
                //   sub_menu: [
                //     { label: "All", name: "All"},
                //     { label: "Girls Dresses", name: "Girls Dresses"},
                //     { label: "Boys & Girls Tshirts", name: "Boys & Girls Tshirts"},
                //     { label: "Boys & Girls Combosets", name: "Boys & Girls Combosets"},
                //     { label: "Boys & Girls Ethnic Wear", name: "Boys & Girls Ethnic Wear"},
                //     { label: "Boys & Girls Jeans", name: "Boys & Girls Jeans"},
                //     { label: "Boys & Girls Shorts", name: "Boys & Girls Shorts"},
                //     { label: "Boys & Girls Trackpants", name: "Boys & Girls Trackpants"},
                //     { label: "Boys & Girls Innerwear", name: "Boys & Girls Innerwear"},
                //     { label: "Infant Wear", name: "Infant Wear"},
                //     { label: "Kids Slipper Flip Flops", name: "Kids Slipper Flip Flops"},
                //     { label: "Kids Sports Shoes", name: "Kids Sports Shoes"}
                //   ]
                // },
                // {
                //   label: "Essentials",
                //   name: "Essentials"
                // },
                // {
                //   label: "Winter",
                //   name: "Winter",
                //   sub_menu: [
                //     { label: "All", name: "All"},
                //     { label: "Men's Jackets", name: "Men's Jackets", ideal: "men"},
                //     { label: "Men's Sweatshirts", name: "Men's Sweatshirts", ideal: "men"},
                //     { label: "Men's Sweaters", name: "Men's Sweaters",  ideal: "men"},
                //     { label: "Men's Thermals", name: "Men's Thermals",  ideal: "men"},
                //     { label: "Women's Jackets", name: "Women's Jackets",  ideal: "women"},
                //     { label: "Women's Sweatshirts", name: "Women's Sweatshirts",  ideal: "women"},
                //     { label: "Women's Sweaters & Cardigans", name: "Women's Sweaters & Cardigans",  ideal: "women"},
                //     { label: "Women's Shrugs", name: "Women's Shrugs",  ideal: "women"},
                //     { label: "Kids SweatShirts", name: "Kids SweatShirts"},
                //     { label: "Women Kurtas", name: "Women Kurtas",  ideal: "women"},
                //     { label: "Kids Jackets", name: "Kids Jackets"}
                //   ]
                // }
            ],
        },
        // {
        //   label: 'Electronics',
        //   name: "electronics",
        //   logo: "69c6589653afdb9a.png",
        //   sub_menu: [
        //     {label: "Audio", name: "audio and video", _name: "",
        //       sub_menu: [
        //         {label: "All", name: "All"},
        //         {label: "Bluetooth Headphones", name: "Bluetooth Headphones"},
        //         {label: "Wired Headphones", name: "Wired Headphones"},
        //         {label: "True Wireless Earbuds", name: "True Wireless Earbuds"},
        //         {label: "Bluetooth Speakers", name: "Bluetooth Speakers"},
        //         {label: "Soundbars", name: "Soundbars"},
        //         {label: "Home Theatres", name: "Home Theatres"},
        //         {label: "TV Streaming Device", name: "TV Streaming Device"},
        //         {label: "Remote Control", name: "Remote Control"},
        //         {label: "DTH Set top box", name: "DTH Set top box"},
        //         {label: "Headphones Pouch & Case Covers", name: "Headphones Pouch & Case Covers"}
        //       ]
        //     },
        //     {label: "Cameras & Accessories", name: "Cameras & Accessories", _name: ""},
        //     {label: "Computer Peripherals", name: "Computer Peripherals", _name: "",
        //       sub_menu: [
        //         {label: "All", name: "All", _name: ""},
        //         {label: "Printers", name: "Printers", _name: ""},
        //         {label: "Monitors", name: "Monitors", _name: ""},
        //         {label: "Projectors", name: "Projectors", _name: ""},
        //         {label: "Portable Projectors", name: "Portable Projectors", _name: ""},
        //         {label: "Toners", name: "Toners", _name: ""},
        //         {label: "Ink Cartridges", name: "Ink Cartridges", _name: ""},
        //         {label: "Ink Bottles", name: "Ink Bottles", _name: ""},
        //         {label: "Receipt Printers", name: "Receipt Printers", _name: ""},
        //         {label: "Lamination Machines", name: "Lamination Machines", _name: ""},
        //         {label: "Note Counting Machines", name: "Note Counting Machines", _name: ""},
        //         {label: "Barcode Scanners", name: "Barcode Scanners", _name: ""},
        //         {label: "Currency Detectors", name: "Currency Detectors", _name: ""}
        //       ]
        //     },
        //     {label: "Gaming", name: "Gaming", _name: ""},
        //     {label: "Laptop Accessories", name: "Laptop Accessories", _name: "",
        //       sub_menu: [
        //         { label: "All", name: "All", _name: ""},
        //         { label: "Mouse", name: "Mouse", _name: ""},
        //         { label: "Laptop Keyboards", name: "Laptop Keyboards", _name: ""},
        //         { label: "Router", name: "Router", _name: ""},
        //         { label: "Data Cards", name: "Data Cards", _name: ""},
        //         { label: "UPS", name: "UPS", _name: ""},
        //         { label: "USB Gadgets", name: "USB Gadgets", _name: ""},
        //         { label: "Security Software", name: "Security Software", _name: ""},
        //         { label: "Laptop Battery", name: "Laptop Battery", _name: ""},
        //         { label: "Laptop Adapter", name: "Laptop Adapter", _name: ""},
        //         { label: "Wireless USB Adapter", name: "Wireless USB Adapter", _name: ""},
        //         { label: "Processor", name: "Processor", _name: ""},
        //         { label: "Other Accessories", name: "Other Accessories", _name: ""}
        //       ]
        //     },
        //     {label: "Laptop and Desktop", name: "Laptop and Desktop", _name: "",
        //       sub_menu: [
        //         { label: "All", name: "All"},
        //         { label: "Laptops", name: "Laptops"},
        //         { label: "Gaming Laptops", name: "Gaming Laptops"},
        //         { label: "Desktop PCs", name: "Desktop PCs"},
        //         { label: "All In One PCs", name: "All In One PCs"},
        //         { label: "Mini PCs", name: "Mini PCs"},
        //         { label: "Tower PCs", name: "Tower PCs"},
        //         { label: "PC Finder", name: "PC Finder"},
        //         { label: "GST Invoice on Laptops", name: "GST Invoice on Laptops"},
        //         { label: "Laptop Buying Guide", name: "Laptop Buying Guide"}
        //       ]
        //     },
        //     {label: "MobileAccessory", name: "MobileAccessory", _name: ""},
        //     {label: "Powerbank", name: "Powerbank", _name: ""},
        //     {label: "Smart Home automation", name: "Smart Home automation", _name: ""},
        //     {label: "Smart Wearables", name: "Smart Wearables", _name: ""},
        //     {label: "Storage", name: "Storage", _name: "", sub_menu: [
        //         {label: "All", name: "All", _name: ""},
        //         {label: "MobileMemoryCard", name: "MobileMemoryCard", _name: ""},
        //         {label: "ComputerStoragePendrive", name: "ComputerStoragePendrive", _name: ""},
        //         {label: "MobileStoragePendrive", name: "MobileStoragePendrive", _name: ""},
        //         {label: "ExternalHardDrive", name: "ExternalHardDrive", _name: ""},
        //         {label: "InternalHardDrive", name: "InternalHardDrive", _name: ""}
        //       ]},
        //     {label: "Tablets", name: "Tablets", _name: ""},
        //   ]
        // },
        // // {label: 'Laptops', logo: "69c6589653afdb9a.png", name: "laptop-store", type: "store"},
        // {label:
        //     'Appliances',
        //   logo: "0ff199d1bd27eb98.png",
        //   name: "home entertainment",
        //   cat_tree: "televisions",
        //   sub_menu: [
        //     {label: "Televisions", cat_name:"Home Entertainment", name: "Televisions",  _name: "",
        //       sub_menu: [
        //         {label: "All", name: "All", _name: ""},
        //         {label: "New Launches", name: "New Launches", _name: ""},
        //         {label: "Top Sellers", name: "Top Sellers", _name: ""},
        //         {label: "24-32 Inch", name: "24-32 Inch", _name: ""},
        //         {label: "40-43 Inch", name: "40-43 Inch", _name: ""},
        //         {label: "50-55 Inch", name: "50-55 Inch", _name: ""},
        //         {label: "Big Screen TVs", name: "Big Screen TVs", _name: ""},
        //         {label: "Smart TVs", name: "Smart TVs", _name: ""},
        //         {label: "4K UHD TVs", name: "4K UHD TVs", _name: ""},
        //         {label: "The Frame", name: "The Frame", _name: ""},
        //         {label: "OLED TVs", name: "OLED TVs", _name: ""},
        //         {label: "QLED TVs", name: "QLED TVs", _name: ""},
        //         {label: "Nanocell TVs", name: "Nanocell TVs", _name: ""}
        //       ]
        //     },
        //     {label: "Washing Machines", name: "Washing Machines", _name: ""},
        //     {label: "Air Conditioners", name: "Air Conditioners", _name: ""},
        //     {label: "Refrigerators", name: "Refrigerators", _name: "",
        //       sub_menu: [
        //         {label: "All", name: "All", _name: ""},
        //         {label: "New Launches", name: "New Launches", _name: ""},
        //         {label: "Single Door", name: "Single Door", _name: ""},
        //         {label: "Double Door", name: "Double Door", _name: ""},
        //         {label: "Triple door", name: "Triple door", _name: ""},
        //         {label: "Side by Side", name: "Side by Side", _name: ""},
        //         {label: "4 Door", name: "4 Door", _name: ""},
        //         {label: "Mini Refrigerators", name: "Mini Refrigerators", _name: ""},
        //         {label: "Convertible", name: "Convertible", _name: ""},
        //         {label: "Bottom Mount", name: "Bottom Mount", _name: ""},
        //         {label: "Energy-Efficient", name: "Energy-Efficient", _name: ""}
        //       ]
        //     },
        //     {label: "Kitchen Appliances", name: "Kitchen Appliances", _name: "",
        //       sub_menu: [
        //         {label: "All", name: "All", _name: ""},
        //         {label: "New Launches", name: "New Launches", _name: ""},
        //         {label: "Microwave Ovens", name: "Microwave Ovens", _name: ""},
        //         {label: "Oven Toaster Grills (OTG)", name: "Oven Toaster Grills (OTG)", _name: ""},
        //         {label: "Juicer/Mixer/Grinder", name: "Juicer/Mixer/Grinder", _name: ""},
        //         {label: "Electric Kettle", name: "Electric Kettle", _name: ""},
        //         {label: "Induction Cooktops", name: "Induction Cooktops", _name: ""},
        //         {label: "Chimneys", name: "Chimneys", _name: ""},
        //         {label: "Coffee Makers", name: "Coffee Makers", _name: ""},
        //         {label: "Sandwich Makers", name: "Sandwich Makers", _name: ""},
        //         {label: "Pop Up Toasters", name: "Pop Up Toasters", _name: ""},
        //         {label: "Electric Cookers", name: "Electric Cookers", _name: ""},
        //         {label: "Wet Grinders", name: "Wet Grinders", _name: ""}
        //       ]
        //     },
        //     {label: "Home Appliances", name: "Home Appliances", _name: "",
        //       sub_menu: [
        //         {label: "All", name: "All", _name: ""},
        //         {label: "New Launches", name: "New Launches", _name: ""},
        //         {label: "Irons", name: "Irons", _name: ""},
        //         {label: "Water Purifiers", name: "Water Purifiers", _name: ""},
        //         {label: "Inverters", name: "Inverters", _name: ""},
        //         {label: "Vacuum Cleaners", name: "Vacuum Cleaners", _name: ""},
        //         {label: "Sewing Machines", name: "Sewing Machines", _name: ""},
        //         {label: "Voltage Stabilizers", name: "Voltage Stabilizers", _name: ""},
        //         {label: "Air Purifiers", name: "Air Purifiers", _name: ""},
        //         {label: "Landline Phones", name: "Landline Phones", _name: ""}
        //       ]
        //     },
        //     {label: "Seasonal Appliances", name: "Seasonal Appliances", _name: "",
        //       sub_menu: [
        //         { label: "All", name: "All", _name: ""},
        //         { label: "New Launches", name: "New Launches", _name: ""},
        //         { label: "Air Coolers", name: "Air Coolers", _name: ""},
        //         { label: "Fans", name: "Fans", _name: ""},
        //         { label: "Water Geysers", name: "Water Geysers", _name: ""},
        //         { label: "Immersion Rods", name: "Immersion Rods", _name: ""},
        //         { label: "Room Heater", name: "Room Heater", _name: ""},
        //       ]
        //     }
        //   ]
        // },
        // {label: "Home & Kitchen", name: "home & kitchen", logo: "ab7e2b022a4587dd.jpg"},
        // {label: 'Glosses', logo: "29327f40e9c4d26b.png", name: "kj98e759347"},
        // {label: 'Travels', logo: "71050627a56b4693.png", name: "kj98e759347"},
        // {label: 'Beauty, Toys & more', logo: "dff3f7adcf3a90c6.png", name: "kj98e759347"},
    ];

    const [openItemId, setOpenItemId] = React.useState(-1);

    const [openDropdownName, setOpenDropdownName] = React.useState<string>("");

    const [subMenuIds, setSubMenuIds] = React.useState([]);

    const [openSubMenuName, setOpenSubMenuName] = useState<string>("");

    // React.useEffect(()=>{
    //   setMoreHomeNavData({
    //     name: "Men's Top Wear",
    //     title: "MORE IN MEN'S TOP WEAR",
    //     items: [
    //       {label: "All", name: "All"},
    //       {label: "Men's T-Shirts", name: "Men's T-Shirts"},
    //       {label: "Men's Casual Shirts", name: "Men's Casual Shirts"},
    //       {label: "Men's Formal Shirts", name: "Men's Formal Shirts"},
    //       {label: "Men's Kurtas", name: "Men's Kurtas"},
    //       {label: "Men's Ethnic Sets", name: "Men's Ethnic Sets"},
    //       {label: "Men's Blazers", name: "Men's Blazers"},
    //       {label: "Men's Raincoat", name: "Men's Raincoat"},
    //       {label: "Men's Windcheaters", name: "Men's Windcheaters"},
    //       {label: "Men's Suit", name: "Men's Suit"},
    //       {label: "Men's Fabrics", name: "Men's Fabrics"}
    //     ]
    //   })
    // }, [])
    //
    //

    function handleMouseDown(nav, type, e) {
        if (type === "enter") {
            // console.log("parent mouse enter")

            if (nav.sub_menu) {
                if (!moreHomeNavData) {
                    if (nav.sub_menu[0].sub_menu) {
                        setMoreHomeNavData({
                            title: "MORE ON IN " + nav.sub_menu[0].name,
                            name: nav.sub_menu[0].id,
                            items: nav.sub_menu[0].sub_menu,
                        });
                    }
                }
            }
            // setOpenItemId(id)
            setOpenDropdownItem_id(nav.id);
        } else {
            setOpenDropdownItem_id(-1);
            // setOpenItemId(-1)
            // setSubMenuIds([])
            setMoreHomeNavData(null);
        }
    }

    function handleClickSubMenu(section) {
        if(!section) return;

        setOpenDropdownName(section.name)

        if(section.sub_menu){
            let subSub = section.sub_menu[0]
            if(subSub) {
                setOpenSubMenuName(subSub.name)
            }
        }
    }

    function handleMouseEnterOnSubCategory(subCat){
        setOpenSubMenuName(subCat.name)
    }

    // function renderSubCatMenu(d){
    //   const popupStyle = {
    //     position: "absolute",
    //     zIndex: 100,
    //     right: "50%",
    //     transform: `translateX(50%)`
    //   }
    //   let sub = d
    //   if(sub && sub.sub_menu){
    //     return (
    //       <Popup style={popupStyle} inProp={d.id === openItemId}>
    //         <Menu
    //           selectedKeys={["mail"]}
    //           defaultOpenKeys={subMenuIds}
    //         >
    //           {/*{ sub.sub_menu.map((s)=>(*/}
    //           {/*  s.sub_menu ? (*/}
    //           {/*    <SubMenu*/}
    //           {/*      key={s.id}*/}
    //           {/*      onMouseOver={()=>handleClickSubMenu(s.id, "enter")}*/}
    //           {/*      onMouseLeave={()=>handleClickSubMenu(s.id, "leave")}*/}
    //           {/*      title={*/}
    //           {/*        <span>*/}
    //           {/*            <i className="fa fa-heart" />*/}
    //           {/*            <span>{s.name}</span>*/}
    //           {/*          </span>*/}
    //           {/*      }>*/}
    //           {/*      {s.sub_menu && s.sub_menu.map(nsb=>(*/}
    //           {/*        <Menu.Item*/}
    //           {/*          key={nsb.id}>*/}
    //           {/*          <Link*/}
    //           {/*            to={`/p?cat=${d.id}&cat_tree=${nsb.id}`}>*/}
    //           {/*            {nsb.name}*/}
    //           {/*          </Link>*/}
    //           {/*        </Menu.Item>*/}
    //           {/*      ))}*/}
    //           {/*    */}
    //           {/*    </SubMenu>*/}
    //           {/*  )  : (*/}
    //           {/*    <Menu.Item*/}
    //           {/*      icon="fa fa-heart"*/}
    //           {/*      key={s.id}>*/}
    //           {/*      <Link to={`/p?cat=${s.id}&cat_tree=${d.id}`}>{s.name}</Link>*/}
    //           {/*    </Menu.Item>*/}
    //           {/*  )*/}
    //           {/*))*/}
    //           {/*}*/}
    //         </Menu>
    //       </Popup>
    //     )
    //   }
    // }
    //
    // function renderDropdownPanel(nav){
    //
    //   function expandMoreNavHandler(menu){
    //     if(menu && menu.sub_menu) {
    //       setMoreHomeNavData({
    //         name: menu.name,
    //         ideal: menu.ideal ? menu.ideal : null,
    //         title: 'MORE ON IN ' + menu.name,
    //         items: menu.sub_menu
    //       })
    //     } else {
    //       setMoreHomeNavData(null)
    //     }
    //   }
    //
    //   function collapseDropdownSubMenu(subMenu, e){
    //     // setMoreHomeNavData(null)
    //     e.stopPropagation()
    //     // console.log("diff.........")
    //   }
    //
    //   function expandDropdownSubMenu(subMenu, e){
    //     e.stopPropagation()
    //     if(subMenu.sub_menu){
    //       setMoreHomeNavData({
    //         title: 'MORE ON IN ' + subMenu.name,
    //         name: subMenu.id,
    //         items: subMenu.sub_menu
    //       })
    //     } else {
    //       setMoreHomeNavData(null)
    //     }
    //   }
    //
    //   function renderLink(nav, subName) {
    //     let forCategory = ""
    //     subName.for_category && subName.for_category.map(ct=>{
    //       forCategory += `${ct}--`
    //     })
    //     let to;
    //     if(subName.ideal){
    //       if(subName.cat_id) {
    //         to = `/${subName.cat_id}&catTree=${subName.id}&ideal=${subName.ideal}`
    //       } else {
    //         to = `/${nav.id}&catTree=${subName.id}&ideal=${subName.ideal}`
    //       }
    //     } else {
    //       if(subName.cat_id) {
    //         to = `/${subName.cat_id}&catTree=${subName.id}`
    //       } else {
    //         to = `/${subName.id}&catTree=${subName.id}`
    //       }
    //     }
    //     if(forCategory){
    //       to = to + `&category=${forCategory.slice(0, forCategory.length - 2)}`
    //     }
    //
    //     return <Link to={to}>{subName.name}</Link>
    //   }
    //
    //
    //   if(nav.id === openDropdownItem_id && nav.sub_menu){
    //     return (
    //       <div className="dropdown_panel__wrapper">
    //         <div className="dropdown_panel">
    //           <ul className="dropdown_panel--sub_menu dropdown_panel--left">
    //             {nav.sub_menu && nav.sub_menu.map(subName=>{
    //               return (
    //                 <div
    //                     key={subName.id}
    //                     onMouseEnter={(e)=>expandDropdownSubMenu(subName, e)}
    //                     onMouseLeave={(e)=>collapseDropdownSubMenu(subName, e)}
    //                     className={["dropdown_panel--item", moreHomeNavData && moreHomeNavData.id === subName.id ? "dropdown_panel--item--active" : ""].join(" ")}
    //                     onClick={()=>expandMoreNavHandler(subName)} >
    //                     {/*{ subName.ideal*/}
    //                     {/*  ? <Link to={`/p?cat=${nav.id}&cat_tree=${subName.id}&ideal=${subName.ideal}`}>{subName.name}</Link>*/}
    //                     {/*  : <Link to={`/p?cat=${nav.id}&cat_tree=${subName.id}`}>{subName.name}</Link>*/}
    //                     {/*}*/}
    //                     {renderLink(nav, subName)}
    //                     { subName.sub_menu &&  <i className="far fa-chevron-right" />}
    //                 </div>
    //               )
    //             })}
    //           </ul>
    //           { moreHomeNavData && <ul className="dropdown_panel--sub_menu_center_div">
    // 						<div className="top_arrow"/>
    // 					</ul> }
    //           { moreHomeNavData && <ul className="dropdown_panel--sub_menu dropdown_panel--more  ">
    // 						<h5 className="dropdown_panel--sub_menu--header">{moreHomeNavData.title}</h5>
    //             { moreHomeNavData.items && moreHomeNavData.items.length > 0 && moreHomeNavData.items.map((moreNav: any, index)=>(
    //               <div className="dropdown_panel--item" key={index}>
    //                 { moreNav.ideal ? (
    //                   <Link to={`/p/${nav.id}/?catTree=${moreNav.id}&ideal=${moreNav.ideal}`}>{moreNav.name}</Link>
    //                 ) : (
    //                   <Link to={`/p/${nav.id}?catTree=${moreNav.id}`}>{moreNav.name}</Link>
    //                 )
    //                 }
    //               </div>
    //             ))}
    //           </ul> }
    //         </div>
    //       </div>
    //     )
    //   }
    // }

    return (
        <div className="bg-white py-4 dark:bg-neutral-800 dark:text-white shadow-md">
            <div className="flex items-center justify-between max-w-8xl mx-auto px-4">
                {homeNavData.map((section) => (
                    <div key={section.name} className="relative">
                        <div className="flex flex-col items-center" onClick={()=>handleClickSubMenu(section)}>
                            <Image className="w-20" src={staticImagePath(section.logo)} />
                            <h4 className="text-sm font-medium">{section.label}</h4>
                        </div>

                        {openDropdownName ===  section.name && (
                            <div className="category-dropdown">
                                <div className="relative">
                                    { section?.sub_menu?.map((subMenu)=>(
                                        <div className="category-dropdown__submenu-panel" onMouseEnter={()=>handleMouseEnterOnSubCategory(subMenu)}>
                                            <div className={`category-sub-item ${openSubMenuName === subMenu.name  ? "active-category-sub-item": ""}`}>
                                                <h4 onClick={()=>setOpenSubMenuName(subMenu.name)} className="whitespace-nowrap cursor-pointer text-sm font-medium">{subMenu.label}</h4>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className='category-dropdown__submenu-panel__right'>
                                    {section?.sub_menu.map(subMenu=>subMenu.name === openSubMenuName && (
                                        <div>
                                            <div>
                                                {subMenu?.sub_menu?.map(subSubMenu=>(
                                                    <div>
                                                        <h4>{subSubMenu.label}</h4>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>

                            </div>
                        )}

                    </div>
                ))}

                {/*{ homeNavData.map((navData, i)=>{*/}
                {/*  return (*/}
                {/*    <li*/}
                {/*        key={i}*/}
                {/*        onMouseLeave={(e)=>handleMouseDown(navData, "leave", e)}*/}
                {/*        onMouseOver={(e)=>handleMouseDown(navData, "enter", e)}*/}
                {/*        className={`list-none cat_item`}>*/}
                {/*      <div>*/}
                {/*        { navData.type ? (*/}
                {/*            <Link to={`/p/s?cat=${navData.id}`}>*/}
                {/*          <div className="nav-logo">*/}
                {/*            <img src={staticImagePath(navData.logo)}  alt={navData.name}/>*/}
                {/*          </div>*/}
                {/*        </Link>*/}
                {/*        ) : (*/}
                {/*            // <Link to={`/p?cat=${navData.id}&${navData.cat_tree ? 'cat_tree='+ navData.cat_tree: ''}`}>*/}
                {/*            <div className="nav-logo">*/}
                {/*          <img src={staticImagePath(navData.logo)}  alt={navData.name}/>*/}
                {/*        </div>*/}
                {/*            // </Link>*/}
                {/*        )}*/}
                {/*      </div>*/}
                {/*      */}
                {/*      <h4 className="item_name hidden md:block">*/}
                {/*        { navData.type ? <Link className="item_link" to={`/p/s?cat=${navData.id}`}>{navData.name}</Link> :  navData.name }*/}
                {/*        /!*<Link className="item_link" to={`/p?cat=${navData.id}&${navData.cat_tree ? 'cat_tree='+ navData.cat_tree: ''}`}>{navData.name}</Link>*!/*/}
                {/*        { navData.sub_menu && <i className="fa fa-angle-down ml-3"/>}*/}
                {/*      </h4>*/}
                {/*      /!*{ renderSubCatMenu(navData)}*!/*/}
                {/*      { renderDropdownPanel(navData) }*/}
                {/*    </li>*/}
                {/*  )*/}
                {/*})*/}
                {/*}*/}
            </div>
        </div>
    );
};

export default HomeCategoryNav;
