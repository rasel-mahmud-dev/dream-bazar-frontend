
import React, {FC} from 'react';
import {HomePageSection, HomePageSectionProduct} from "reducers/productSlice";
import LatestOffer from "components/HomePage/LatestOffer";
import {HomeSection} from "src/types/enum";
import CategorySection from "components/HomePage/CategorySection";


type MappedProductAttrProps = {
    section: HomePageSection
    homePageSectionProducts: HomePageSectionProduct
}


const sectionData = {
    [HomeSection.LatestOffer]: LatestOffer,
    [HomeSection.PopularProducts]: LatestOffer,
    [HomeSection.BooksToysMore]: LatestOffer,
    [HomeSection.Categories]: CategorySection,
    [HomeSection.LatestOffer]: LatestOffer,
    [HomeSection.TrendingNow]: LatestOffer,
    [HomeSection.HomeANDKitchenEssentials]: LatestOffer,
}


const MappedProductAttr: FC<MappedProductAttrProps> = (props) => {
    const {section, homePageSectionProducts} = props

    const Component = sectionData[section.sectionSlug]

    const ClotheColors = ["sarees", "t-shart"]


    return (
        <div className="mt-6">

            <h2 className="home-section-title">{section.sectionName}</h2>

            <div className="mt-2">
                {Component && <Component sectionProduct={homePageSectionProducts[section.sectionSlug]}  />}
            </div>


        </div>
    );
};

export default MappedProductAttr;