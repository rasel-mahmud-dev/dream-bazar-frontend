import React, {FC} from 'react';
import useAppSelector from "src/hooks/useAppSelector";
import {Button, Image} from "UI/index";
import staticImagePath from "src/utills/staticImagePath";
let image = `images/products_images/c20-rmx3063-realme-original-imagfxfzjrkqtbhe.jpeg`;


type RelevantProductsType = {
    product: {title?: string, brandId?: string, categoryId?: string}
}

const RelevantProducts: FC<RelevantProductsType> = (props) => {

    const {relevantProducts} = useAppSelector(state=>state.productState)
    let cacheName = ""
    for (let payloadKey in props.product) {
        cacheName+=payloadKey +"_"
    }


    const relatedDevices = [
        { title: "Xiaomi Redmi Note 10S", _id: "" },
        { title: "Xiaomi Redmi Note 10 Pro", _id: "" },
        { title: "Xiaomi Redmi 10", _id: "" },
        { title: "Xiaomi Redmi Note 10 5G", _id: "" },
        { title: "Xiaomi Redmi Note 9", _id: "" },
        { title: "Xiaomi Redmi 9T", _id: "" },
    ];


    return (
        <div>
            <h4 className="section_title mb-3">RELATED DEVICES</h4>
            <div className="flex flex-wrap justify-center">
                { relevantProducts && relevantProducts[cacheName]?.map((product) => (
                        <div className="w-32 m-2">
                            <div className="w-10 m-auto">
                                <Image className="m-auto" imgClass="!rounded-none" src={staticImagePath(product.coverPhoto)} />
                            </div>
                            <h4 className="mt-2 text-center font-medium text-xs">{product.title}</h4>
                        </div>
                    ))}
            </div>
            <Button className="text-primary" type="text">
                MORE RELATED DEVICES
            </Button>

            <div className="mt-5">
                <h4 className="section_title mb-3">POPULAR FROM XIAOMI</h4>
                <div className="flex flex-wrap">
                    {relatedDevices.map((dev) => (
                        <div className="w-32 m-2">
                            <div className="w-10 m-auto">
                                <Image className="m-auto" imgClass="!rounded-none" src={image} />
                            </div>
                            <h4 className="mt-2 text-center font-medium text-xs">{dev.title}</h4>
                        </div>
                    ))}
                </div>
                <Button className="text-primary" type="text">
                    MORE RELATED DEVICES{" "}
                </Button>
            </div>

        </div>
    );
};

export default RelevantProducts;