import React, {useState} from 'react';
import "./category-section.scss"


const CategorySection = (props) => {

    const {} = useState([])

    let cat = [{name: "Processor", slug: "", id: ""},
        {name: "Processor", slug: "", id: ""},
        {name: "Motherboard", slug: "", id: ""},

        {name: "Graphics Card", slug: "", id: ""},

        {name: "Monitor", slug: "", id: ""},

        {name: "RAM", slug: "", id: ""},

        {name: "SSD", slug: "", id: ""},

        {name: "HDD", slug: "", id: ""},

        {name: "Sharee", slug: "", id: "", image: "static/sharee/526c8b264113390dad5f4ee6327a14eb.jpg_200x200q80-product.jpg_.webp"},
        {name: "T-Shirts", slug: "", id: "", image: "static/categories/9b5dcdbb8e76b893fc283db9c7280d12.jpg"},

        {name: "Smart Watches", slug: "", id: "", image: "static/categories/f9ac4d4221f555f557a13b63c4b0b3db.jpg"},

        {name: "CPU Cooler", slug: "", id: ""},


        {name: "Case Fan", slug: "", id: ""},
        {name: "Lens Cleaner", slug: "", id: "", image: "static/categories/f9ac4d4221f555f557a13b63c4b0b3db.jpg"},
        {name: "Juice Drinks", slug: "", id: "", image: "static/categories/b3875802e4927a7c28da69fab21683d2.jpg"},
        {name: "In Ear Phone", slug: "", id: "", image: "static/categories/b3875802e4927a7c28da69fab21683d2.jpg"},


        {name: "Keyboard", slug: "", id: ""},

        {name: "Mouse", slug: "", id: ""},

        {name: "Headphone", slug: "", id: ""},
        {name: "Webcam", slug: "", id: ""},

        {name: "Gaming Chair", slug: "", id: ""}]


    return (
        <div className="category-section">
            {cat.map(category => (
                <div className="category-item">
                    <div>
                        {category.image ? <img src={category.image} alt=""/> : <span className="missing-image-text">Category</span>}
                    </div>
                    <h4>{category.name}</h4>
                </div>
            ))}
        </div>
    );
};

export default CategorySection;