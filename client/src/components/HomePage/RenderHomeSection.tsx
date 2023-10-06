import React, {FC} from 'react';
import {HomePageSection, HomePageSectionProduct} from "reducers/productSlice";
import LatestOffer from "components/HomePage/LatestOffer";
import {HomeSection} from "src/types/enum";
import CategorySection from "components/HomePage/CategorySection";
import DealsOfTheDay from "components/HomePage/DealsOfTheDay";
import {Link} from "react-router-dom";
import TopBrandsCarousel from "components/HomePage/TopBrandsCarousel";
import BiggestDealTopProductsCarousel from "components/HomePage/BiggestDealTopProductsCarousel";
import RecentlyViewed from "components/HomePage/RecentlyViewed";
import TopDealsOnTVsAppliances from "components/HomePage/TopDealsOnTVsAppliances";
import FeaturedProducts from "components/HomePage/FeaturedProducts";
import TrendingNow from "components/HomePage/TrendingNow";
import Loader from "UI/Loader/Loader";
import PopularProducts from "components/HomePage/PopularProducts";
import TopSelling from "components/HomePage/TopSelling";
import TopCategoryList from "components/HomePage/TopCategoryList";

type RenderHomeSectionProps = {
    section: HomePageSection
    isLoaded?: boolean
    sectionProducts: Array<Object>
}

const sectionData = {
    [HomeSection.DealsOfTheDay]: DealsOfTheDay,
    [HomeSection.TopBrandsCarousel]: TopBrandsCarousel,
    [HomeSection.BiggestDealTopProductsCarousel]: BiggestDealTopProductsCarousel,
    [HomeSection.PopularProducts]: PopularProducts,
    [HomeSection.TopSelling]: TopSelling,
    [HomeSection.BooksToysMore]: LatestOffer,
    [HomeSection.Categories]: CategorySection,
    [HomeSection.LatestOffer]: LatestOffer,
    [HomeSection.FeaturedProducts]: FeaturedProducts,
    [HomeSection.TrendingNow]: TrendingNow,
    [HomeSection.HomeANDKitchenEssentials]: LatestOffer,
    [HomeSection.RecentlyViewed]: RecentlyViewed,
    [HomeSection.TopDealsOnTVsAppliances]: TopDealsOnTVsAppliances,
    [HomeSection.HomeANDKitchenEssentials]: LatestOffer,
    [HomeSection.TopCategoryList]: TopCategoryList,
}


const RenderHomeSection: FC<RenderHomeSectionProps> = (props) => {
    const {section, sectionProducts, isLoaded} = props
    const Component = sectionData[section.id]

    return (
        <div className="mt-14">

            <div className="flex justify-between">
                <h2 className="home-section-title flex items-center gap-x-2">{section.name} <span>
                           {!isLoaded && <Loader size="xs" /> }
                </span> </h2>
                <Link to="/" className="font-medium text-primary-500">See all</Link>
            </div>

            <div className="mt-2">
                {Component && <Component isLoaded={isLoaded} sectionProducts={sectionProducts}/>}
            </div>
        </div>
    );
};

export default RenderHomeSection;