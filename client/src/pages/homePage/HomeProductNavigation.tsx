import {Menu, Popup} from "UI/index";
import React from "react";
import fullLink from "src/utills/fullLink";
 import {Link} from "react-router-dom"
let id;

const { SubMenu } = Menu

interface moreHomeNavDataType {
  id?: string,
  title?: string,
  ideal?: string,
  items?: { name: string, id: string,  _id?: string}[],
  
}

const HomeProductNavigation = () => {
  
  const [moreHomeNavData, setMoreHomeNavData] = React.useState<moreHomeNavDataType | null>(null)
  
  const homeNavData = [
    {name: 'Top Offer', logo: "images/nav-images/f15c02bfeb02d15d.png", id: "kj98759e347"},
    {
      name: 'Computers', logo: "images/nav-images/69c6589653afdb9a.png", id: "computers",
      sub_menu: [
        {
          name: 'Computer Components',
          logo: "",
          id:"computer components",
          sub_menu: [
            {name: "All", id: "computer components"},
            {name: "Motherboard", id: "motherboard"},
            {name: "Ram", id: "ram"},
            {name: "Processor", id: "processor"},
            {name: "SSD", id: "ssd"},
            {name: "Powersupply", id: "powersupply"},
            {name: "Casing", id: "casing"}
          ]
        },
        {
          name: "Desktop PCs",
          id: "desktop pcs",
          sub_menu: [
            {name: "All In One PCs", "id": "all in one pc"},
            {name: "Mini PCs", "id": "mini pcs"},
            {name: "Tower PCs", "id": "tower pcs"}
          ]
        },
        {
          name: "Laptops",
          id: "laptop-store",
        }
      ]
    },
    {name: 'Mobiles', logo: "images/nav-images/22fddf3c7da4c4f4.png", id: "mobiles-store", type: "store"},
    {
      name: 'Fashions',
      id: "clothing and accessories",
      logo: "images/nav-images/82b3ca5fb2301045.png",
      sub_menu: [
        {
          name: "Men's Top Wear",
          id: "top wear",
          ideal: "men",
          sub_menu: [
            {name: "All", id: "top wear"},
            {name: "Men's T-Shirts", id: "t-sharts"},
            {name: "Men's Casual Shirts", id: "Men's Casual Shirts"},
            {name: "Men's Formal Shirts", id: "Men's Formal Shirts"},
            {name: "Men's Kurtas", id: "Men's Kurtas"},
            {name: "Men's Ethnic Sets", id: "Men's Ethnic Sets"},
            {name: "Men's Blazers", id: "Men's Blazers"},
            {name: "Men's Raincoat", id: "Men's Raincoat"},
            {name: "Men's Windcheaters", id: "Men's Windcheaters"},
            {name: "Men's Suit", id: "Men's Suit"},
            {name: "Men's Fabrics", id: "Men's Fabrics"}
          ]
        },
        {
          name: "Men's Bottom Wear",
          id: "top wear",
          ideal: "men",
          sub_menu: [
            { name: "All", id: "top wear"},
            { name: "Men's Jeans", id: "jeans"},
            { name: "Men's Trousers", id: "Men's Trousers"},
            { name: "Men's Trackpants", id: "Men's Trackpants"},
            { name: "Men's Shorts", id: "Men's Shorts"},
            { name: "Men's Cargos", id: "Men's Cargos"},
            { name: "Men's Threefourths", id: "Men's Threefourths"},
            { name: "Men's Pyjamas & Loungepants", id: "Men's Pyjamas & Loungepants"},
            { name: "Men's Dhoti", id: "Men's Dhoti"},
            { name: "Men's Ethnic Pyjama", id: "Men's Ethnic Pyjama"}
          ]
        },
        {
          name: "Women Ethnic",
          id: "Women Ethnic",
          ideal: "women",
          for_category: ["top wear", "sarees"],
          sub_menu: [
            {name: "All", id: "All"},
            {name: "Women Sarees", id: "sarees", ideal: "women"},
            // {name: "Women Kurtas & Kurtis", id: "Women Kurtas & Kurtis"},
            // {name: "Women Kurta Sets & Salwar Suits", id: "Women Kurta Sets & Salwar Suits"},
            // {name: "Ethnic Dresses", id: "Ethnic Dresses"},
            // {name: "Women Dress Materials", id: "Women Dress Materials"},
            // {name: "Women Gowns", id: "Women Gowns"},
            // {name: "Women Lehenga Cholis", id: "Women Lehenga Cholis"},
            // {name: "Women Leggings & Patialas", id: "Women Leggings & Patialas"},
            // {name: "Women Palazzos & Shararas", id: "Women Palazzos & Shararas"},
            {name: "Women Blouse", id: "blouses"},
            // {name: "Women Dupatta", id: "Women Dupatta"}
          ]
        },
        {
          name: "Women Western",
          id: "Women Western",
          ideal: "women",
          for_category: ["top wear", "Dresses and Gowns", "Innerwear and Swimwear"],
          sub_menu: [
            { name: "All", id: ""},
            { name: "Women Tops", id: ""},
            { name: "Women Dresses", id: ""},
            { name: "Women T-shirts & Polo T-shirts", id: "t-sharts"},
            { name: "Women Jeans", id: "jeans"},
            { name: "Women Nighties & Night Dresses", id: ""},
            // { name: "Women Nightsuit", id: ""},
            // { name: "Women Track Pants", id: ""},
            // { name: "Women Trouser", id: ""},
            // { name: "Women Jumpsuit", id: ""},
            // { name: "Women Shapewear", id: ""},
            // { name: "Women Sports Bra", id: ""}
          ]
        },
        {
          name: "Men Footwear",
          id: "men-footwear",
          cat_id: "footwear",
          ideal: "men",
          sub_menu: [
            {name: "All", id: "All"},
            {name: "Men's Sports Shoes", id: "Men's Sports Shoes"},
            {name: "Men's Casual Shoes", id: "Men's Casual Shoes"},
            {name: "Men's Sandals & Floaters", id: "Men's Sandals & Floaters"},
            {name: "Men's Slippers & Flip Flops", id: "Men's Slippers & Flip Flops"},
            {name: "Men's Formal Shoes", id: "Men's Formal Shoes"},
            {name: "Men's Ethnic Shoes", id: "Men's Ethnic Shoes"},
            {name: "Active Footwear", id: "Active Footwear"},
            {name: "Combo Footwear", id: "Combo Footwear"},
            {name: "Shoe Care", id: "Shoe Care"},
          ]
        },
        {
          name: "Women Footwear",
          id: "women-footwear",
          ideal: "women",
          cat_id: "footwear",
          sub_menu: [
            {name: "All", id: "All"},
            {name: "Women Flats", id: "Women Flats"},
            {name: "Women Heels", id: "Women Heels"},
            {name: "Women Wedges", id: "Women Wedges"},
            {name: "Women Slipper Flip Flops", id: "Women Slipper Flip Flops"},
            {name: "Women Casual Shoes", id: "Women Casual Shoes"},
            {name: "Women Sports Shoes", id: "Women Sports Shoes"},
            {name: "Women Ballerinas", id: "Women Ballerinas"},
            {name: "Women Ethnic Shoes", id: "Women Ethnic Shoes"},
            {name: "Women Sneakers", id: "Women Sneakers"},
            {name: "Women Walking Shoes", id: "Women Walking Shoes"},
            {name: "Women Boots", id: "Women Boots"},
          ]
        },
        {
          name: "Watches and Accessories",
          id: "watches-and-accessories",
          sub_menu: [
            { name: "Men & Women Watches", id: "Men & Women Watches"},
            { name: "Men & Women Sunglasses", id: "Men & Women Sunglasses"},
            { name: "Wallets", id: "Wallets"},
            { name: "Men & Women Belts", id: "Men & Women Belts"},
            { name: "Women Fashion Jewellery", id: "Women Fashion Jewellery"},
            { name: "Men Fashion Jewellery", id: "Men Fashion Jewellery"},
            { name: "Precious Jewellery", id: "Precious Jewellery"},
            { name: "Precious Coins & Bars", id: "Precious Coins & Bars"},
            { name: "Precious Articles", id: "Precious Articles"},
            { name: "Frames & Contact Lenses", id: "Frames & Contact Lenses"},
            { name: "Kids Accessories", id: "Kids Accessories"}
          ]
        },
        {
          name: "Bags, Suitcases & Luggage",
          id: "Bags, Suitcases & Luggage",
          sub_menu: [
            { name: "All", id: "All"},
            { name: "Backpacks", id: "Backpacks"},
            { name: "Suitcases & Trolleys", id: "Suitcases & Trolleys"},
            { name: "Dufflebags", id: "Dufflebags"},
            { name: "Rucksacks", id: "Rucksacks"},
            { name: "Handbags", id: "Handbags"},
            { name: "Slingbags", id: "Slingbags"},
            { name: "Women's Clutches & Wallets", id: "Women's Clutches & Wallets"},
            { name: "Messenger Bags", id: "Messenger Bags"},
            { name: "Travel Accessories", id: "Travel Accessories"}
          ]
        },
        {
          name: "Kids",
          id: "Kids",
          sub_menu: [
            { name: "All", id: "All"},
            { name: "Girls Dresses", id: "Girls Dresses"},
            { name: "Boys & Girls Tshirts", id: "Boys & Girls Tshirts"},
            { name: "Boys & Girls Combosets", id: "Boys & Girls Combosets"},
            { name: "Boys & Girls Ethnic Wear", id: "Boys & Girls Ethnic Wear"},
            { name: "Boys & Girls Jeans", id: "Boys & Girls Jeans"},
            { name: "Boys & Girls Shorts", id: "Boys & Girls Shorts"},
            { name: "Boys & Girls Trackpants", id: "Boys & Girls Trackpants"},
            { name: "Boys & Girls Innerwear", id: "Boys & Girls Innerwear"},
            { name: "Infant Wear", id: "Infant Wear"},
            { name: "Kids Slipper Flip Flops", id: "Kids Slipper Flip Flops"},
            { name: "Kids Sports Shoes", id: "Kids Sports Shoes"}
          ]
        },
        {
          name: "Essentials",
          id: "Essentials"
        },
        {
          name: "Winter",
          id: "Winter",
          sub_menu: [
            { name: "All", id: "All"},
            { name: "Men's Jackets", id: "Men's Jackets", ideal: "men"},
            { name: "Men's Sweatshirts", id: "Men's Sweatshirts", ideal: "men"},
            { name: "Men's Sweaters", id: "Men's Sweaters",  ideal: "men"},
            { name: "Men's Thermals", id: "Men's Thermals",  ideal: "men"},
            { name: "Women's Jackets", id: "Women's Jackets",  ideal: "women"},
            { name: "Women's Sweatshirts", id: "Women's Sweatshirts",  ideal: "women"},
            { name: "Women's Sweaters & Cardigans", id: "Women's Sweaters & Cardigans",  ideal: "women"},
            { name: "Women's Shrugs", id: "Women's Shrugs",  ideal: "women"},
            { name: "Kids SweatShirts", id: "Kids SweatShirts"},
            { name: "Women Kurtas", id: "Women Kurtas",  ideal: "women"},
            { name: "Kids Jackets", id: "Kids Jackets"}
          ]
        }
      ]
    },
    {
      name: 'Electronics',
      id: "electronics",
      logo: "images/nav-images/69c6589653afdb9a.png",
      sub_menu: [
        {name: "Audio", id: "audio and video", _id: "",
          sub_menu: [
            {name: "All", id: "All"},
            {name: "Bluetooth Headphones", id: "Bluetooth Headphones"},
            {name: "Wired Headphones", id: "Wired Headphones"},
            {name: "True Wireless Earbuds", id: "True Wireless Earbuds"},
            {name: "Bluetooth Speakers", id: "Bluetooth Speakers"},
            {name: "Soundbars", id: "Soundbars"},
            {name: "Home Theatres", id: "Home Theatres"},
            {name: "TV Streaming Device", id: "TV Streaming Device"},
            {name: "Remote Control", id: "Remote Control"},
            {name: "DTH Set top box", id: "DTH Set top box"},
            {name: "Headphones Pouch & Case Covers", id: "Headphones Pouch & Case Covers"}
          ]
        },
        {name: "Cameras & Accessories", id: "Cameras & Accessories", _id: ""},
        {name: "Computer Peripherals", id: "Computer Peripherals", _id: "",
          sub_menu: [
            {name: "All", id: "All", _id: ""},
            {name: "Printers", id: "Printers", _id: ""},
            {name: "Monitors", id: "Monitors", _id: ""},
            {name: "Projectors", id: "Projectors", _id: ""},
            {name: "Portable Projectors", id: "Portable Projectors", _id: ""},
            {name: "Toners", id: "Toners", _id: ""},
            {name: "Ink Cartridges", id: "Ink Cartridges", _id: ""},
            {name: "Ink Bottles", id: "Ink Bottles", _id: ""},
            {name: "Receipt Printers", id: "Receipt Printers", _id: ""},
            {name: "Lamination Machines", id: "Lamination Machines", _id: ""},
            {name: "Note Counting Machines", id: "Note Counting Machines", _id: ""},
            {name: "Barcode Scanners", id: "Barcode Scanners", _id: ""},
            {name: "Currency Detectors", id: "Currency Detectors", _id: ""}
          ]
        },
        {name: "Gaming", id: "Gaming", _id: ""},
        {name: "Laptop Accessories", id: "Laptop Accessories", _id: "",
          sub_menu: [
            { name: "All", id: "All", _id: ""},
            { name: "Mouse", id: "Mouse", _id: ""},
            { name: "Laptop Keyboards", id: "Laptop Keyboards", _id: ""},
            { name: "Router", id: "Router", _id: ""},
            { name: "Data Cards", id: "Data Cards", _id: ""},
            { name: "UPS", id: "UPS", _id: ""},
            { name: "USB Gadgets", id: "USB Gadgets", _id: ""},
            { name: "Security Software", id: "Security Software", _id: ""},
            { name: "Laptop Battery", id: "Laptop Battery", _id: ""},
            { name: "Laptop Adapter", id: "Laptop Adapter", _id: ""},
            { name: "Wireless USB Adapter", id: "Wireless USB Adapter", _id: ""},
            { name: "Processor", id: "Processor", _id: ""},
            { name: "Other Accessories", id: "Other Accessories", _id: ""}
          ]
        },
        {name: "Laptop and Desktop", id: "Laptop and Desktop", _id: "",
          sub_menu: [
            { name: "All", id: "All"},
            { name: "Laptops", id: "Laptops"},
            { name: "Gaming Laptops", id: "Gaming Laptops"},
            { name: "Desktop PCs", id: "Desktop PCs"},
            { name: "All In One PCs", id: "All In One PCs"},
            { name: "Mini PCs", id: "Mini PCs"},
            { name: "Tower PCs", id: "Tower PCs"},
            { name: "PC Finder", id: "PC Finder"},
            { name: "GST Invoice on Laptops", id: "GST Invoice on Laptops"},
            { name: "Laptop Buying Guide", id: "Laptop Buying Guide"}
          ]
        },
        {name: "MobileAccessory", id: "MobileAccessory", _id: ""},
        {name: "Powerbank", id: "Powerbank", _id: ""},
        {name: "Smart Home automation", id: "Smart Home automation", _id: ""},
        {name: "Smart Wearables", id: "Smart Wearables", _id: ""},
        {name: "Storage", id: "Storage", _id: "", sub_menu: [
            {name: "All", id: "All", _id: ""},
            {name: "MobileMemoryCard", id: "MobileMemoryCard", _id: ""},
            {name: "ComputerStoragePendrive", id: "ComputerStoragePendrive", _id: ""},
            {name: "MobileStoragePendrive", id: "MobileStoragePendrive", _id: ""},
            {name: "ExternalHardDrive", id: "ExternalHardDrive", _id: ""},
            {name: "InternalHardDrive", id: "InternalHardDrive", _id: ""}
          ]},
        {name: "Tablets", id: "Tablets", _id: ""},
      ]
    },
    // {name: 'Laptops', logo: "images/nav-images/69c6589653afdb9a.png", id: "laptop-store", type: "store"},
    {name:
        'Appliances',
      logo: "images/nav-images/0ff199d1bd27eb98.png",
      id: "home entertainment",
      cat_tree: "televisions",
      sub_menu: [
        {name: "Televisions", cat_id:"Home Entertainment", id: "Televisions",  _id: "",
          sub_menu: [
            {name: "All", id: "All", _id: ""},
            {name: "New Launches", id: "New Launches", _id: ""},
            {name: "Top Sellers", id: "Top Sellers", _id: ""},
            {name: "24-32 Inch", id: "24-32 Inch", _id: ""},
            {name: "40-43 Inch", id: "40-43 Inch", _id: ""},
            {name: "50-55 Inch", id: "50-55 Inch", _id: ""},
            {name: "Big Screen TVs", id: "Big Screen TVs", _id: ""},
            {name: "Smart TVs", id: "Smart TVs", _id: ""},
            {name: "4K UHD TVs", id: "4K UHD TVs", _id: ""},
            {name: "The Frame", id: "The Frame", _id: ""},
            {name: "OLED TVs", id: "OLED TVs", _id: ""},
            {name: "QLED TVs", id: "QLED TVs", _id: ""},
            {name: "Nanocell TVs", id: "Nanocell TVs", _id: ""}
          ]
        },
        {name: "Washing Machines", id: "Washing Machines", _id: ""},
        {name: "Air Conditioners", id: "Air Conditioners", _id: ""},
        {name: "Refrigerators", id: "Refrigerators", _id: "",
          sub_menu: [
            {name: "All", id: "All", _id: ""},
            {name: "New Launches", id: "New Launches", _id: ""},
            {name: "Single Door", id: "Single Door", _id: ""},
            {name: "Double Door", id: "Double Door", _id: ""},
            {name: "Triple door", id: "Triple door", _id: ""},
            {name: "Side by Side", id: "Side by Side", _id: ""},
            {name: "4 Door", id: "4 Door", _id: ""},
            {name: "Mini Refrigerators", id: "Mini Refrigerators", _id: ""},
            {name: "Convertible", id: "Convertible", _id: ""},
            {name: "Bottom Mount", id: "Bottom Mount", _id: ""},
            {name: "Energy-Efficient", id: "Energy-Efficient", _id: ""}
          ]
        },
        {name: "Kitchen Appliances", id: "Kitchen Appliances", _id: "",
          sub_menu: [
            {name: "All", id: "All", _id: ""},
            {name: "New Launches", id: "New Launches", _id: ""},
            {name: "Microwave Ovens", id: "Microwave Ovens", _id: ""},
            {name: "Oven Toaster Grills (OTG)", id: "Oven Toaster Grills (OTG)", _id: ""},
            {name: "Juicer/Mixer/Grinder", id: "Juicer/Mixer/Grinder", _id: ""},
            {name: "Electric Kettle", id: "Electric Kettle", _id: ""},
            {name: "Induction Cooktops", id: "Induction Cooktops", _id: ""},
            {name: "Chimneys", id: "Chimneys", _id: ""},
            {name: "Coffee Makers", id: "Coffee Makers", _id: ""},
            {name: "Sandwich Makers", id: "Sandwich Makers", _id: ""},
            {name: "Pop Up Toasters", id: "Pop Up Toasters", _id: ""},
            {name: "Electric Cookers", id: "Electric Cookers", _id: ""},
            {name: "Wet Grinders", id: "Wet Grinders", _id: ""}
          ]
        },
        {name: "Home Appliances", id: "Home Appliances", _id: "",
          sub_menu: [
            {name: "All", id: "All", _id: ""},
            {name: "New Launches", id: "New Launches", _id: ""},
            {name: "Irons", id: "Irons", _id: ""},
            {name: "Water Purifiers", id: "Water Purifiers", _id: ""},
            {name: "Inverters", id: "Inverters", _id: ""},
            {name: "Vacuum Cleaners", id: "Vacuum Cleaners", _id: ""},
            {name: "Sewing Machines", id: "Sewing Machines", _id: ""},
            {name: "Voltage Stabilizers", id: "Voltage Stabilizers", _id: ""},
            {name: "Air Purifiers", id: "Air Purifiers", _id: ""},
            {name: "Landline Phones", id: "Landline Phones", _id: ""}
          ]
        },
        {name: "Seasonal Appliances", id: "Seasonal Appliances", _id: "",
          sub_menu: [
            { name: "All", id: "All", _id: ""},
            { name: "New Launches", id: "New Launches", _id: ""},
            { name: "Air Coolers", id: "Air Coolers", _id: ""},
            { name: "Fans", id: "Fans", _id: ""},
            { name: "Water Geysers", id: "Water Geysers", _id: ""},
            { name: "Immersion Rods", id: "Immersion Rods", _id: ""},
            { name: "Room Heater", id: "Room Heater", _id: ""},
          ]
        }
      ]
    },
    {name: "Home & Kitchen", id: "home & kitchen", logo: "images/nav-images/ab7e2b022a4587dd.jpg"},
    {name: 'Glosses', logo: "images/nav-images/29327f40e9c4d26b.png", id: "kj98e759347"},
    {name: 'Travels', logo: "images/nav-images/71050627a56b4693.png", id: "kj98e759347"},
    {name: 'Beauty, Toys & more', logo: "images/nav-images/dff3f7adcf3a90c6.png", id: "kj98e759347"},
  ]
  
  
  const [openItemId, setOpenItemId] = React.useState(-1)
  
  const [openDropdownItem_id, setOpenDropdownItem_id] = React.useState(-1)
  
  const [subMenuIds, setSubMenuIds] = React.useState([])
  
  
  // React.useEffect(()=>{
  //   setMoreHomeNavData({
  //     id: "Men's Top Wear",
  //     title: "MORE IN MEN'S TOP WEAR",
  //     items: [
  //       {name: "All", id: "All"},
  //       {name: "Men's T-Shirts", id: "Men's T-Shirts"},
  //       {name: "Men's Casual Shirts", id: "Men's Casual Shirts"},
  //       {name: "Men's Formal Shirts", id: "Men's Formal Shirts"},
  //       {name: "Men's Kurtas", id: "Men's Kurtas"},
  //       {name: "Men's Ethnic Sets", id: "Men's Ethnic Sets"},
  //       {name: "Men's Blazers", id: "Men's Blazers"},
  //       {name: "Men's Raincoat", id: "Men's Raincoat"},
  //       {name: "Men's Windcheaters", id: "Men's Windcheaters"},
  //       {name: "Men's Suit", id: "Men's Suit"},
  //       {name: "Men's Fabrics", id: "Men's Fabrics"}
  //     ]
  //   })
  // }, [])
  //
  //
  
  function handleMouseDown(nav, type, e){
    if(type === "enter"){
      // console.log("parent mouse enter")
      
      if(nav.sub_menu) {
        if(!moreHomeNavData) {
          if(nav.sub_menu[0].sub_menu) {
            setMoreHomeNavData({
              title: 'MORE ON IN ' + nav.sub_menu[0].name,
              id: nav.sub_menu[0].id,
              items: nav.sub_menu[0].sub_menu
            })
          }
        }
      }
      // setOpenItemId(id)
      setOpenDropdownItem_id(nav.id)
      
    } else {
      setOpenDropdownItem_id(-1)
      // setOpenItemId(-1)
      // setSubMenuIds([])
      setMoreHomeNavData(null)
    }
  }
  
  function handleClickSubMenu(subMenuId, type){
    if(type === "enter"){
      // @ts-ignore
      setSubMenuIds(subMenuIds.indexOf(subMenuId) !== -1 ? [] : [subMenuId])
    } else{
      setSubMenuIds([])
    }
  }
  
  function renderSubCatMenu(d){
    const popupStyle = {
      position: "absolute",
      zIndex: 100,
      right: "50%",
      transform: `translateX(50%)`
    }
    let sub = d
    if(sub && sub.sub_menu){
      return (
        <Popup style={popupStyle} bg="white"  inProp={d.id === openItemId}>
          <Menu
            selectedKeys={["mail"]}
            defaultOpenKeys={subMenuIds}
          >
            { sub.sub_menu.map((s)=>(
              s.sub_menu ? (
                <SubMenu
                  key={s.id}
                  onMouseOver={()=>handleClickSubMenu(s.id, "enter")}
                  onMouseLeave={()=>handleClickSubMenu(s.id, "leave")}
                  title={
                    <span>
                        <i className="fa fa-heart" />
                        <span>{s.name}</span>
                      </span>
                  }>
                  {s.sub_menu && s.sub_menu.map(nsb=>(
                    <Menu.Item
                      key={nsb.id}>
                      <Link
                        to={`/p?cat=${d.id}&cat_tree=${nsb.id}`}>
                        {nsb.name}
                      </Link>
                    </Menu.Item>
                  ))}
                
                </SubMenu>
              )  : (
                <Menu.Item
                  icon="fa fa-heart"
                  key={s.id}>
                  <Link to={`/p?cat=${s.id}&cat_tree=${d.id}`}>{s.name}</Link>
                </Menu.Item>
              )
            ))
            }
          </Menu>
        </Popup>
      )
    }
  }
  
  function renderDropdownPanel(nav){
    
    function expandMoreNavHandler(menu){
      if(menu && menu.sub_menu) {
        setMoreHomeNavData({
          id: menu.id,
          ideal: menu.ideal ? menu.ideal : null,
          title: 'MORE ON IN ' + menu.name,
          items: menu.sub_menu
        })
      } else {
        setMoreHomeNavData(null)
      }
    }
    
    function collapseDropdownSubMenu(subMenu, e){
      // setMoreHomeNavData(null)
      e.stopPropagation()
      // console.log("diff.........")
    }
    
    function expandDropdownSubMenu(subMenu, e){
      e.stopPropagation()
      if(subMenu.sub_menu){
        setMoreHomeNavData({
          title: 'MORE ON IN ' + subMenu.name,
          id: subMenu.id,
          items: subMenu.sub_menu
        })
      } else {
        setMoreHomeNavData(null)
      }
    }
    
    function renderLink(nav, subName) {
      let forCategory = ""
      subName.for_category && subName.for_category.map(ct=>{
        forCategory += `${ct}--`
      })
      let to;
      if(subName.ideal){
        if(subName.cat_id) {
          to = `/p?cat=${subName.cat_id}&cat_tree=${subName.id}&ideal=${subName.ideal}`
        } else {
          to = `/p?cat=${nav.id}&cat_tree=${subName.id}&ideal=${subName.ideal}`
        }
      } else {
        if(subName.cat_id) {
          to = `/p?cat=${subName.cat_id}&cat_tree=${subName.id}`
        } else {
          to = `/p?cat=${subName.id}&cat_tree=${subName.id}`
        }
      }
      if(forCategory){
        to = to + `&category=${forCategory.slice(0, forCategory.length - 2)}`
      }
      
      return <Link to={to}>{subName.name}</Link>
    }
    
    
    if(nav.id === openDropdownItem_id && nav.sub_menu){
      return (
        <div className="dropdown_panel__wrapper">
          <div className="dropdown_panel">
            <ul className="dropdown_panel--sub_menu dropdown_panel--left">
              {nav.sub_menu && nav.sub_menu.map(subName=>{
                return (
                  <div
                    onMouseEnter={(e)=>expandDropdownSubMenu(subName, e)}
                    onMouseLeave={(e)=>collapseDropdownSubMenu(subName, e)}
                    className={["dropdown_panel--item", moreHomeNavData && moreHomeNavData.id === subName.id ? "dropdown_panel--item--active" : ""].join(" ")}
                    onClick={()=>expandMoreNavHandler(subName)} >
                    {/*{ subName.ideal*/}
                    {/*  ? <Link to={`/p?cat=${nav.id}&cat_tree=${subName.id}&ideal=${subName.ideal}`}>{subName.name}</Link>*/}
                    {/*  : <Link to={`/p?cat=${nav.id}&cat_tree=${subName.id}`}>{subName.name}</Link>*/}
                    {/*}*/}
                    {renderLink(nav, subName)}
                    { subName.sub_menu &&  <i className="far fa-chevron-right" />}
                  </div>
                )
              })}
            </ul>
            { moreHomeNavData && <ul className="dropdown_panel--sub_menu_center_div">
							<div className="top_arrow"/>
						</ul> }
            { moreHomeNavData && <ul className="dropdown_panel--sub_menu dropdown_panel--more  ">
							<h5 className="dropdown_panel--sub_menu--header">{moreHomeNavData.title}</h5>
              { moreHomeNavData.items && moreHomeNavData.items.length > 0 && moreHomeNavData.items.map((moreNav: any)=>(
                <div className="dropdown_panel--item">
                  { moreNav.ideal ? (
                    <Link to={`/p?cat=${nav.id}&cat_tree=${moreNav.id}&ideal=${moreNav.ideal}`}>{moreNav.name}</Link>
                  ) : (
                    <Link to={`/p?cat=${nav.id}&cat_tree=${moreNav.id}`}>{moreNav.name}</Link>
                  )
                  }
                </div>
              ))}
						</ul> }
          </div>
        </div>
      )
    }
  }
  
  return (
    <div className="home_page_product_nav">
      <div className="home_page_product_nav--container">
        { homeNavData.map((navData, i)=>{
          return (
            <li
              onMouseLeave={(e)=>handleMouseDown(navData, "leave", e)}
              onMouseOver={(e)=>handleMouseDown(navData, "enter", e)}
              className="home_page_product_nav--item">
              { navData.type ? (
                <Link to={`/p/s?cat=${navData.id}`}>
                  <div className="nav-logo">
                    <img src={fullLink(navData.logo)}  alt={navData.name}/>
                  </div>
                </Link>
              ) : (
                // <Link to={`/p?cat=${navData.id}&${navData.cat_tree ? 'cat_tree='+ navData.cat_tree: ''}`}>
                <div className="nav-logo">
                  <img src={fullLink(navData.logo)}  alt={navData.name}/>
                </div>
                // </Link>
              )}
              
              <h4 className="item_name">
                { navData.type ? <Link className="item_link" to={`/p/s?cat=${navData.id}`}>{navData.name}</Link> :  navData.name }
                {/*<Link className="item_link" to={`/p?cat=${navData.id}&${navData.cat_tree ? 'cat_tree='+ navData.cat_tree: ''}`}>{navData.name}</Link>*/}
                { navData.sub_menu && <i className="fa fa-angle-down ml-3"/>}
              </h4>
              {/*{ renderSubCatMenu(navData)}*/}
              { renderDropdownPanel(navData) }
            </li>
          )
        })
        }
      </div>
    </div>
  )
}

export default HomeProductNavigation