export interface HomeNavDataType {
    label: string,
    logo?: string,
    name: string,
    rootCategory?: string,
    cat_tree?: string
    sub_menu?: SubMenuType[]
}


interface SubMenuType extends HomeNavDataType{
    for_category?: string[]
    id?: string
    ideal?: string
    cat_name?: string
}

const homeNavData: HomeNavDataType[] = [
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
                rootCategory: "Electronics",
                logo: "",
                name: "Computer Components",
                sub_menu: [
                    { label: "All", name: "Computer Components" },
                    {
                        label: "Motherboard",
                        name: "Motherboard",
                    },
                    { label: "Ram", name: "Ram" },
                    { label: "Processor", name: "Processor" },
                    { label: "SSD", name: "SSD" },
                    { label: "Powersupply", name: "Powersupply" },
                    { label: "Casing", name: "Casing" },
                ],
            },
            {
                label: "Desktop PCs",
                name: "desktop pcs",
                sub_menu: [
                    { label: "All In One PCs", name: "all in one pc" },
                    { label: "Mini PCs", name: "mini pcs" },
                    { label: "Tower PCs", name: "tower pcs" },
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
        name: "Mobiles",
        rootCategory: "Electronics",
    },
    {
        rootCategory: "Clothes",
        label: "Fashions",
        name: "clothing and accessories",
        logo: "82b3ca5fb2301045.png",
        sub_menu: [
            {
                rootCategory: "Clothes",
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
                rootCategory: "Clothes",
                label: "Men's Bottom Wear",
                name: "men_top_wear",
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
            {
                rootCategory: "Clothes",
                label: "Women Ethnic",
                name: "Women Ethnic",
                ideal: "women",
                for_category: ["top wear", "sarees"],
                sub_menu: [
                    { label: "All", name: "All" },
                    {
                        label: "Women Sarees",
                        name: "sarees",
                        ideal: "women",
                    },
                    // {label: "Women Kurtas & Kurtis", name: "Women Kurtas & Kurtis"},
                    // {label: "Women Kurta Sets & Salwar Suits", name: "Women Kurta Sets & Salwar Suits"},
                    // {label: "Ethnic Dresses", name: "Ethnic Dresses"},
                    // {label: "Women Dress Materials", name: "Women Dress Materials"},
                    // {label: "Women Gowns", name: "Women Gowns"},
                    // {label: "Women Lehenga Cholis", name: "Women Lehenga Cholis"},
                    // {label: "Women Leggings & Patialas", name: "Women Leggings & Patialas"},
                    // {label: "Women Palazzos & Shararas", name: "Women Palazzos & Shararas"},
                    { label: "Women Blouse", name: "blouses" },
                    // {label: "Women Dupatta", name: "Women Dupatta"}
                ],
            },
            {
                rootCategory: "Clothes",
                label: "Women Western",
                name: "Women Western",
                ideal: "women",
                for_category: ["top wear", "Dresses and Gowns", "Innerwear and Swimwear"],
                sub_menu: [
                    { label: "All", name: "" },
                    { label: "Women Tops", name: "" },
                    { label: "Women Dresses", name: "" },
                    {
                        label: "Women T-shirts & Polo T-shirts",
                        name: "t-sharts",
                    },
                    { label: "Women Jeans", name: "jeans" },
                    { label: "Women Nighties & Night Dresses", name: "" },
                    // { label: "Women Nightsuit", name: ""},
                    // { label: "Women Track Pants", name: ""},
                    // { label: "Women Trouser", name: ""},
                    // { label: "Women Jumpsuit", name: ""},
                    // { label: "Women Shapewear", name: ""},
                    // { label: "Women Sports Bra", name: ""}
                ],
            },
            {
                rootCategory: "Clothes",
                label: "Men Footwear",
                name: "men-footwear",
                cat_name: "footwear",
                ideal: "men",
                sub_menu: [
                    { label: "All", name: "All" },
                    {
                        label: "Men's Sports Shoes",
                        name: "Men's Sports Shoes",
                    },
                    {
                        label: "Men's Casual Shoes",
                        name: "Men's Casual Shoes",
                    },
                    {
                        label: "Men's Sandals & Floaters",
                        name: "Men's Sandals & Floaters",
                    },
                    {
                        label: "Men's Slippers & Flip Flops",
                        name: "Men's Slippers & Flip Flops",
                    },
                    {
                        label: "Men's Formal Shoes",
                        name: "Men's Formal Shoes",
                    },
                    {
                        label: "Men's Ethnic Shoes",
                        name: "Men's Ethnic Shoes",
                    },
                    { label: "Active Footwear", name: "Active Footwear" },
                    { label: "Combo Footwear", name: "Combo Footwear" },
                    { label: "Shoe Care", name: "Shoe Care" },
                ],
            },
            {
                label: "Women Footwear",
                name: "women-footwear",
                ideal: "women",
                rootCategory: "Footwear",
                sub_menu: [
                    { label: "All", name: "Footwear", rootCategory: "Footwear" },
                    { label: "Women Flats", name: "Women Flats" },
                    { label: "Women Heels", name: "Women Heels" },
                    { label: "Women Wedges", name: "Women Wedges" },
                    {
                        label: "Women Slipper Flip Flops",
                        name: "Women Slipper Flip Flops",
                    },
                    {
                        label: "Women Casual Shoes",
                        name: "Women Casual Shoes",
                    },
                    {
                        label: "Women Sports Shoes",
                        name: "Women Sports Shoes",
                    },
                    { label: "Women Ballerinas", name: "Women Ballerinas" },
                    {
                        label: "Women Ethnic Shoes",
                        name: "Women Ethnic Shoes",
                    },
                    { label: "Women Sneakers", name: "Women Sneakers" },
                    {
                        label: "Women Walking Shoes",
                        name: "Women Walking Shoes",
                    },
                    { label: "Women Boots", name: "Women Boots" },
                ],
            },
            {
                label: "Watches and Accessories",
                name: "watches-and-accessories",
                sub_menu: [
                    {
                        label: "Men & Women Watches",
                        name: "Men & Women Watches",
                    },
                    {
                        label: "Men & Women Sunglasses",
                        name: "Men & Women Sunglasses",
                    },
                    { label: "Wallets", name: "Wallets" },
                    {
                        label: "Men & Women Belts",
                        name: "Men & Women Belts",
                    },
                    {
                        label: "Women Fashion Jewellery",
                        name: "Women Fashion Jewellery",
                    },
                    {
                        label: "Men Fashion Jewellery",
                        name: "Men Fashion Jewellery",
                    },
                    {
                        label: "Precious Jewellery",
                        name: "Precious Jewellery",
                    },
                    {
                        label: "Precious Coins & Bars",
                        name: "Precious Coins & Bars",
                    },
                    {
                        label: "Precious Articles",
                        name: "Precious Articles",
                    },
                    {
                        label: "Frames & Contact Lenses",
                        name: "Frames & Contact Lenses",
                    },
                    { label: "Kids Accessories", name: "Kids Accessories" },
                ],
            },
            {
                label: "Bags, Suitcases & Luggage",
                name: "Bags, Suitcases & Luggage",
                sub_menu: [
                    { label: "All", name: "All" },
                    { label: "Backpacks", name: "Backpacks" },
                    {
                        label: "Suitcases & Trolleys",
                        name: "Suitcases & Trolleys",
                    },
                    { label: "Dufflebags", name: "Dufflebags" },
                    { label: "Rucksacks", name: "Rucksacks" },
                    { label: "Handbags", name: "Handbags" },
                    { label: "Slingbags", name: "Slingbags" },
                    {
                        label: "Women's Clutches & Wallets",
                        name: "Women's Clutches & Wallets",
                    },
                    { label: "Messenger Bags", name: "Messenger Bags" },
                    {
                        label: "Travel Accessories",
                        name: "Travel Accessories",
                    },
                ],
            },
            {
                label: "Kids",
                name: "Kids",
                sub_menu: [
                    { label: "All", name: "All" },
                    { label: "Girls Dresses", name: "Girls Dresses" },
                    {
                        label: "Boys & Girls Tshirts",
                        name: "Boys & Girls Tshirts",
                    },
                    {
                        label: "Boys & Girls Combosets",
                        name: "Boys & Girls Combosets",
                    },
                    {
                        label: "Boys & Girls Ethnic Wear",
                        name: "Boys & Girls Ethnic Wear",
                    },
                    {
                        label: "Boys & Girls Jeans",
                        name: "Boys & Girls Jeans",
                    },
                    {
                        label: "Boys & Girls Shorts",
                        name: "Boys & Girls Shorts",
                    },
                    {
                        label: "Boys & Girls Trackpants",
                        name: "Boys & Girls Trackpants",
                    },
                    {
                        label: "Boys & Girls Innerwear",
                        name: "Boys & Girls Innerwear",
                    },
                    { label: "Infant Wear", name: "Infant Wear" },
                    {
                        label: "Kids Slipper Flip Flops",
                        name: "Kids Slipper Flip Flops",
                    },
                    {
                        label: "Kids Sports Shoes",
                        name: "Kids Sports Shoes",
                    },
                ],
            },
            {
                label: "Essentials",
                name: "Essentials",
            },
            {
                label: "Winter",
                name: "Winter",
                sub_menu: [
                    { label: "All", name: "All" },
                    {
                        label: "Men's Jackets",
                        name: "Men's Jackets",
                        ideal: "men",
                    },
                    {
                        label: "Men's Sweatshirts",
                        name: "Men's Sweatshirts",
                        ideal: "men",
                    },
                    {
                        label: "Men's Sweaters",
                        name: "Men's Sweaters",
                        ideal: "men",
                    },
                    {
                        label: "Men's Thermals",
                        name: "Men's Thermals",
                        ideal: "men",
                    },
                    {
                        label: "Women's Jackets",
                        name: "Women's Jackets",
                        ideal: "women",
                    },
                    {
                        label: "Women's Sweatshirts",
                        name: "Women's Sweatshirts",
                        ideal: "women",
                    },
                    {
                        label: "Women's Sweaters & Cardigans",
                        name: "Women's Sweaters & Cardigans",
                        ideal: "women",
                    },
                    {
                        label: "Women's Shrugs",
                        name: "Women's Shrugs",
                        ideal: "women",
                    },
                    { label: "Kids SweatShirts", name: "Kids SweatShirts" },
                    {
                        label: "Women Kurtas",
                        name: "Women Kurtas",
                        ideal: "women",
                    },
                    { label: "Kids Jackets", name: "Kids Jackets" },
                ],
            },
        ],
    },
    {
        label: "Electronics",
        name: "electronics",
        logo: "69c6589653afdb9a.png",
        sub_menu: [
            {
                label: "Audio",
                name: "audio and video",
                sub_menu: [
                    { label: "All", name: "All" },
                    {
                        label: "Bluetooth Headphones",
                        name: "Bluetooth Headphones",
                    },
                    { label: "Wired Headphones", name: "Wired Headphones" },
                    {
                        label: "True Wireless Earbuds",
                        name: "True Wireless Earbuds",
                    },
                    {
                        label: "Bluetooth Speakers",
                        name: "Bluetooth Speakers",
                    },
                    { label: "Soundbars", name: "Soundbars" },
                    { label: "Home Theatres", name: "Home Theatres" },
                    {
                        label: "TV Streaming Device",
                        name: "TV Streaming Device",
                    },
                    { label: "Remote Control", name: "Remote Control" },
                    { label: "DTH Set top box", name: "DTH Set top box" },
                    {
                        label: "Headphones Pouch & Case Covers",
                        name: "Headphones Pouch & Case Covers",
                    },
                ],
            },
            {
                label: "Cameras & Accessories",
                name: "Cameras & Accessories",
            },
            {
                label: "Computer Peripherals",
                name: "Computer Peripherals",
                sub_menu: [
                    { label: "All", name: "All" },
                    { label: "Printers", name: "Printers" },
                    { label: "Monitors", name: "Monitors" },
                    { label: "Projectors", name: "Projectors" },
                    {
                        label: "Portable Projectors",
                        name: "Portable Projectors",
                    },
                    { label: "Toners", name: "Toners" },
                    {
                        label: "Ink Cartridges",
                        name: "Ink Cartridges",
                    },
                    {
                        label: "Ink Bottles",
                        name: "Ink Bottles",
                    },
                    {
                        label: "Receipt Printers",
                        name: "Receipt Printers",
                    },
                    {
                        label: "Lamination Machines",
                        name: "Lamination Machines",
                    },
                    {
                        label: "Note Counting Machines",
                        name: "Note Counting Machines",
                    },
                    {
                        label: "Barcode Scanners",
                        name: "Barcode Scanners",
                    },
                    {
                        label: "Currency Detectors",
                        name: "Currency Detectors",
                    },
                ],
            },
            { label: "Gaming", name: "Gaming" },
            {
                label: "Laptop Accessories",
                name: "Laptop Accessories",
                sub_menu: [
                    { label: "All", name: "All" },
                    { label: "Mouse", name: "Mouse" },
                    {
                        label: "Laptop Keyboards",
                        name: "Laptop Keyboards",
                    },
                    { label: "Router", name: "Router" },
                    { label: "Data Cards", name: "Data Cards" },
                    { label: "UPS", name: "UPS" },
                    {
                        label: "USB Gadgets",
                        name: "USB Gadgets",
                    },
                    {
                        label: "Security Software",
                        name: "Security Software",
                    },
                    {
                        label: "Laptop Battery",
                        name: "Laptop Battery",
                    },
                    {
                        label: "Laptop Adapter",
                        name: "Laptop Adapter",
                    },
                    {
                        label: "Wireless USB Adapter",
                        name: "Wireless USB Adapter",
                    },
                    { label: "Processor", name: "Processor" },
                    {
                        label: "Other Accessories",
                        name: "Other Accessories",
                    },
                ],
            },
            {
                label: "Laptop and Desktop",
                name: "Laptop and Desktop",
                sub_menu: [
                    { label: "All", name: "All" },
                    { label: "Laptops", name: "Laptops" },
                    { label: "Gaming Laptops", name: "Gaming Laptops" },
                    { label: "Desktop PCs", name: "Desktop PCs" },
                    { label: "All In One PCs", name: "All In One PCs" },
                    { label: "Mini PCs", name: "Mini PCs" },
                    { label: "Tower PCs", name: "Tower PCs" },
                    { label: "PC Finder", name: "PC Finder" },
                    {
                        label: "GST Invoice on Laptops",
                        name: "GST Invoice on Laptops",
                    },
                    {
                        label: "Laptop Buying Guide",
                        name: "Laptop Buying Guide",
                    },
                ],
            },
            {
                label: "MobileAccessory",
                name: "MobileAccessory",
            },
            { label: "Powerbank", name: "Powerbank" },
            {
                label: "Smart Home automation",
                name: "Smart Home automation",
            },
            {
                label: "Smart Wearables",
                name: "Smart Wearables",
            },
            {
                label: "Storage",
                name: "Storage",
                sub_menu: [
                    { label: "All", name: "All" },
                    {
                        label: "MobileMemoryCard",
                        name: "MobileMemoryCard",
                    },
                    {
                        label: "ComputerStoragePendrive",
                        name: "ComputerStoragePendrive",
                    },
                    {
                        label: "MobileStoragePendrive",
                        name: "MobileStoragePendrive",
                    },
                    {
                        label: "ExternalHardDrive",
                        name: "ExternalHardDrive",
                    },
                    {
                        label: "InternalHardDrive",
                        name: "InternalHardDrive",
                    },
                ],
            },
            { label: "Tablets", name: "Tablets" },
        ],
    },
    // {label: 'Laptops', logo: "69c6589653afdb9a.png", name: "laptop-store", type: "store"},
    {
        label: "Appliances",
        logo: "0ff199d1bd27eb98.png",
        name: "home entertainment",
        cat_tree: "televisions",
        sub_menu: [
            {
                label: "Televisions",
                cat_name: "Home Entertainment",
                name: "Televisions",
                sub_menu: [
                    { label: "All", name: "All" },
                    {
                        label: "New Launches",
                        name: "New Launches",
                    },
                    {
                        label: "Top Sellers",
                        name: "Top Sellers",
                    },
                    { label: "24-32 Inch", name: "24-32 Inch" },
                    { label: "40-43 Inch", name: "40-43 Inch" },
                    { label: "50-55 Inch", name: "50-55 Inch" },
                    {
                        label: "Big Screen TVs",
                        name: "Big Screen TVs",
                    },
                    { label: "Smart TVs", name: "Smart TVs" },
                    { label: "4K UHD TVs", name: "4K UHD TVs" },
                    { label: "The Frame", name: "The Frame" },
                    { label: "OLED TVs", name: "OLED TVs" },
                    { label: "QLED TVs", name: "QLED TVs" },
                    {
                        label: "Nanocell TVs",
                        name: "Nanocell TVs",
                    },
                ],
            },
            {
                label: "Washing Machines",
                name: "Washing Machines",
            },
            {
                label: "Air Conditioners",
                name: "Air Conditioners",
            },
            {
                label: "Refrigerators",
                name: "Refrigerators",
                sub_menu: [
                    { label: "All", name: "All" },
                    {
                        label: "New Launches",
                        name: "New Launches",
                    },
                    {
                        label: "Single Door",
                        name: "Single Door",
                    },
                    {
                        label: "Double Door",
                        name: "Double Door",
                    },
                    {
                        label: "Triple door",
                        name: "Triple door",
                    },
                    {
                        label: "Side by Side",
                        name: "Side by Side",
                    },
                    { label: "4 Door", name: "4 Door" },
                    {
                        label: "Mini Refrigerators",
                        name: "Mini Refrigerators",
                    },
                    {
                        label: "Convertible",
                        name: "Convertible",
                    },
                    {
                        label: "Bottom Mount",
                        name: "Bottom Mount",
                    },
                    {
                        label: "Energy-Efficient",
                        name: "Energy-Efficient",
                    },
                ],
            },
            {
                label: "Kitchen Appliances",
                name: "Kitchen Appliances",
                sub_menu: [
                    { label: "All", name: "All" },
                    {
                        label: "New Launches",
                        name: "New Launches",
                    },
                    {
                        label: "Microwave Ovens",
                        name: "Microwave Ovens",
                    },
                    {
                        label: "Oven Toaster Grills (OTG)",
                        name: "Oven Toaster Grills (OTG)",
                    },
                    {
                        label: "Juicer/Mixer/Grinder",
                        name: "Juicer/Mixer/Grinder",
                    },
                    {
                        label: "Electric Kettle",
                        name: "Electric Kettle",
                    },
                    {
                        label: "Induction Cooktops",
                        name: "Induction Cooktops",
                    },
                    { label: "Chimneys", name: "Chimneys" },
                    {
                        label: "Coffee Makers",
                        name: "Coffee Makers",
                    },
                    {
                        label: "Sandwich Makers",
                        name: "Sandwich Makers",
                    },
                    {
                        label: "Pop Up Toasters",
                        name: "Pop Up Toasters",
                    },
                    {
                        label: "Electric Cookers",
                        name: "Electric Cookers",
                    },
                    {
                        label: "Wet Grinders",
                        name: "Wet Grinders",
                    },
                ],
            },
            {
                label: "Home Appliances",
                name: "Home Appliances",
                sub_menu: [
                    { label: "All", name: "All" },
                    {
                        label: "New Launches",
                        name: "New Launches",
                    },
                    { label: "Irons", name: "Irons" },
                    {
                        label: "Water Purifiers",
                        name: "Water Purifiers",
                    },
                    { label: "Inverters", name: "Inverters" },
                    {
                        label: "Vacuum Cleaners",
                        name: "Vacuum Cleaners",
                    },
                    {
                        label: "Sewing Machines",
                        name: "Sewing Machines",
                    },
                    {
                        label: "Voltage Stabilizers",
                        name: "Voltage Stabilizers",
                    },
                    {
                        label: "Air Purifiers",
                        name: "Air Purifiers",
                    },
                    {
                        label: "Landline Phones",
                        name: "Landline Phones",
                    },
                ],
            },
            {
                label: "Seasonal Appliances",
                name: "Seasonal Appliances",
                sub_menu: [
                    { label: "All", name: "All" },
                    {
                        label: "New Launches",
                        name: "New Launches",
                    },
                    {
                        label: "Air Coolers",
                        name: "Air Coolers",
                    },
                    { label: "Fans", name: "Fans" },
                    {
                        label: "Water Geysers",
                        name: "Water Geysers",
                    },
                    {
                        label: "Immersion Rods",
                        name: "Immersion Rods",
                    },
                    {
                        label: "Room Heater",
                        name: "Room Heater",
                    },
                ],
            },
        ],
    },
    {
        label: "Home & Kitchen",
        name: "home & kitchen",
        logo: "ab7e2b022a4587dd.jpg",
    },
    { label: "Glosses", logo: "29327f40e9c4d26b.png", name: "kj98e759347" },
    { label: "Travels", logo: "71050627a56b4693.png", name: "kj98e759347" },
    {
        label: "Beauty, Toys & more",
        logo: "dff3f7adcf3a90c6.png",
        name: "kj98e759347",
    },
];

export default homeNavData