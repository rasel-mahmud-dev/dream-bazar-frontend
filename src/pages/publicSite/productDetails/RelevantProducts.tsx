import React, {FC} from 'react';
import useAppSelector from "src/hooks/useAppSelector";
import {Button, Image} from "UI/index";
import fullLink from "src/utills/fullLink";
import staticImagePath from "src/utills/staticImagePath";

type RelevantProductsType = {
    product: {title?: string, brandId?: string, categoryId?: string}
}

const RelevantProducts: FC<RelevantProductsType> = (props) => {

    const {relevantProducts} = useAppSelector(state=>state.productState)
    let cacheName = ""
    for (let payloadKey in props.product) {
        cacheName+=payloadKey +"_"
    }

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
                MORE RELATED DEVICES{" "}
            </Button>
        </div>
    );
};

export default RelevantProducts;