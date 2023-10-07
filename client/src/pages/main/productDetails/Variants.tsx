import React, {useEffect, useState} from 'react';


const finalVariants = [
    {
        sku: "1000",
        variant_id: "",
        tempId: Date.now(),
        attributes: [
            {
                attribute_id: "Color",
                attribute_value: "Red",
                image: "",
                variant_base: true
            },
            {
                attribute_id: "Size",
                attribute_value: "MD",
                refAttribute: "Color",
                image: "",
                variant_base: false
            },

        ],
        images: []
    },
    {
        sku: "1001",
        variant_id: "",
        tempId: Date.now(),
        attributes: [
            {
                attribute_id: "Color",
                attribute_value: "Blue",
                image: "",
                variant_base: true
            },
            {
                attribute_id: "Size",
                attribute_value: "XS",
                image: "",
                variant_base: false,
                refAttribute: "Color"
            },
            {
                attribute_id: "Size",
                attribute_value: "XL",
                image: "",
                variant_base: false,
                refAttribute: "Color"
            }
        ],
        images: []
    },
    {
        sku: "1003",
        variant_id: "",
        tempId: Date.now(),
        attributes: [
            {
                attribute_id: "Color",
                attribute_value: "White",
                image: "",
                variant_base: true
            },
            {
                attribute_id: "Size",
                attribute_value: "XXL",
                image: "",
                variant_base: false,
                refAttribute: "Color"
            },
        ],
        images: []
    }
]


const Variants = () => {

    const [group, setGroup] = useState({})

    const [selectedVariant, setSelectedVariant] = useState()
    const [selectedVariantAttribute, setAelectedVariantAttribute] = useState()

    useEffect(() => {
        let g = {}
        finalVariants.forEach(f => {
            f.attributes.forEach(a => {
                if (g[a.attribute_id]) {
                    g[a.attribute_id].push({...a, sku: f.sku})
                } else {
                    g[a.attribute_id] = [{...a, sku: f.sku}]
                }
            })
        })
        setGroup(g)
    }, []);

    function handleSelectVariant(c){
        setSelectedVariant(c.sku)
    }

    function renderColor() {
        return (
            <div className="mt-2">
                {group["Color"] && (
                    <div>
                        <h4>Color: </h4>
                        <div className="flex gap-2 mt-2">
                            {group["Color"].map(c=>(
                                <div className={`cursor-pointer py-2 px-4 ${selectedVariant === c.sku ? "bg-amber-200" : ""}`} onClick={()=>handleSelectVariant(c)}>
                                    {c.attribute_value}
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        )
    }

    function handleSelectVariantAttribute(c) {
        setAelectedVariantAttribute(c.attribute_value)
    }

    console.log(selectedVariant)

    function renderSize() {
        let a = finalVariants.find(f=>f.sku === selectedVariant)
        return (
            <div className="mt-2">
                {a && (
                    <div>
                        <h4>Size: </h4>
                        <div className="flex gap-2 mt-2">
                            {a.attributes.map(c=> c.attribute_id  !== "Color"  && (
                                <div className={`cursor-pointer py-2 px-4 ${selectedVariantAttribute === c.attribute_value ? "bg-amber-200" : ""}`}
                                     onClick={()=>handleSelectVariantAttribute(c)}>
                                    {c.attribute_value}
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        )
    }

    return (
        <div>


            {renderColor()}

            {renderSize()}

        </div>
    );
};

export default Variants;