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

type RenderHomeSectionProps = {
    section: HomePageSection
    homePageSectionProducts: HomePageSectionProduct
}

const sectionData = {
    [HomeSection.DealsOfTheDay]: DealsOfTheDay,
    [HomeSection.TopBrandsCarousel]: TopBrandsCarousel,
    [HomeSection.BiggestDealTopProductsCarousel]: BiggestDealTopProductsCarousel,
    [HomeSection.PopularProducts]: LatestOffer,
    [HomeSection.BooksToysMore]: LatestOffer,
    [HomeSection.Categories]: CategorySection,
    [HomeSection.LatestOffer]: LatestOffer,
    [HomeSection.FeaturedProducts]: FeaturedProducts,
    [HomeSection.TrendingNow]: LatestOffer,
    [HomeSection.HomeANDKitchenEssentials]: LatestOffer,
    [HomeSection.RecentlyViewed]: RecentlyViewed,
    [HomeSection.TopDealsOnTVsAppliances]: TopDealsOnTVsAppliances,
    [HomeSection.HomeANDKitchenEssentials]: LatestOffer,
}


const RenderHomeSection: FC<RenderHomeSectionProps> = (props) => {
    const {section, homePageSectionProducts} = props


    const Component = sectionData[section.sectionSlug]

    return (
        <div className="mt-14">

            <div className="flex justify-between">
                <h2 className="home-section-title">{section.sectionName}</h2>
                <Link to="/" className="font-medium text-primary-500">See all</Link>
            </div>

            <div className="mt-2">
                {Component && <Component sectionProduct={homePageSectionProducts[section.sectionSlug]}/>}
            </div>
        </div>
    );
};

export default RenderHomeSection;