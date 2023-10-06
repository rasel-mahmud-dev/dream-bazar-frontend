import React from "react";
import { Button, Image } from "UI/index";
import {BiCheck, BiStar} from "react-icons/bi";
import staticImagePath from "src/utills/staticImagePath";

let image = `c20-rmx3063-realme-original-imagfxfzjrkqtbhe.jpeg`;
let image2 = `c20-rmx3063-realme-original-imagfxfzjrkqtbhe.jpeg`;

const RatingReviews = () => {
    const reviews = [
        {
            ratings: 5,
            title: "day to day king",
            desc: "This is such a budget friendly Product.It also makes a good first impression as the overall look of the device is really impressive. The device also provides a decent display and camera with a storage space of 32 GB.",
            username: "Rasel Mahmud",
            customer_photos: [],
            created_at: new Date(),
        },
        {
            ratings: 5,
            title: "day to day king",
            desc: "This is such a budget friendly Product.It also makes a good first impression as the overall look of the device is really impressive. The device also provides a decent display and camera with a storage space of 32 GB.",
            username: "Rasel Mahmud",
            customer_photos: [],
            created_at: new Date(),
        },
    ];

    function calculateRate() {
        let subTotalRate = 0;
        let totalAmount = 0;
        rating.map((rate) => {
            subTotalRate += rate.rating * rate.amount;
            totalAmount += rate.amount;
        });
        return (subTotalRate / totalAmount).toFixed(1);
    }

    const rating = [
        { rating: 1, amount: 20 },
        { rating: 2, amount: 30 },
        { rating: 3, amount: 10 },
        { rating: 4, amount: 20 },
        { rating: 5, amount: 10 },
    ];

    function totalRating() {
        let totalAmount = 0;
        rating.map((rate) => {
            totalAmount += rate.amount;
        });
        return totalAmount;
    }

    return (
        <div className="mt-6">
            <h4 className="product_detail_title">Ratings & Reviews</h4>

            <div>
                <div className="flex mt-5 justify-between">
                    <div className="px-10">
                        <div className=" flex items-center font-bold text-4xl">
                            <span className="block font-bold text-5xl">{calculateRate()}</span>
                            <BiStar />
                        </div>
                        <h4 className="text-grey fs-14 mt-5"> {totalRating()} Total Ratings</h4>
                        <h4 className="text-grey fs-14 text-center">&</h4>
                        <h4 className="text-grey fs-14"> {reviews.length} Total Ratings</h4>
                    </div>
                    <div className="ml-10 w-full">
                        {rating.map((rat) => (
                            <div className="rate w-full">
                                <div className="flex items-center bg-transparent rating-star ">
                                    <span className="w-3">{rat.rating}</span>
                                    <BiStar />
                                </div>
                                <span className="user_rate-wrapper">
                                    <div style={{ width: (rat.amount * 100) / totalRating() + "%" }} className="user_rate" />
                                </span>
                                <span className="rate-amount text-grey fs-14 ml-5">{rat.amount}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mt-5">
                    <h4 className="heading-5">Customer Gallery</h4>
                    <div className="customer_gallery flex-wrap">
                        {new Array(30).fill("", 1, 30).map((a) => (
                            <div className="w-10">
                                <Image imgClass="rounded-none" className="m-2" src={staticImagePath(image2)} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="mt-5">
                {reviews.map((review) => (
                    <div className="rating">
                        <div className="flex items-center">
                            <div className="rating_badge">
                                <span>{review.ratings}</span>
                                <BiStar />
                            </div>
                            <h4 className="ml-2">{review.title}</h4>
                        </div>
                        <h4>{review.desc}</h4>
                        <Image className="mt-5 mb-2" src={image2} />

                        <div>
                            <h4 className="mr-40">{review.username}</h4>
                            <h5 className="flex items-center ">
                                <BiCheck />
                                Certified Buyer
                            </h5>
                            <h4 className="ml-2 date">{new Date(review.created_at).toDateString()}</h4>
                        </div>
                    </div>
                ))}
            </div>

            <Button className="text-primary" type="text">
                All Review
            </Button>
        </div>
    );
};

export default RatingReviews;