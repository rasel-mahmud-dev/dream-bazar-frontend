import React from 'react';
import "./style.scss";
import {FaMailBulk} from "react-icons/all";
import Card from "UI/Form/Card/Card";

const DashboardHome = () => {
    
    const stats= [
        {name: "Pending Withdraw", value: 500.0},
        {name: "Total Commission Given", value: 5_832.0},
        {name: "Already Withdrawn", value: 600},
        {name: "Out For Delivery", value: 5000}
    ]
    
    
    return (
        <div className="my-10">
            <Card>
                <h3 className="text-neutral-800 font-semibold text-xl">Business Analytics </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 slats-list mt-5">
                    {stats.map((slat, i)=>(
                        <div className="bg-neutral-100/80 p-5 rounded-lg slat-item flex justify-between">
                            <p className={`font-semibold text-md`}>{slat.name}</p>
                            <p className={`font-semibold text-md slat-value`}>{slat.value}</p>
                        </div>
                    ))}
                </div>
            </Card>
            <Card>
                <h3 className="text-neutral-800 font-semibold text-xl">Seller Wallet </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mt-5">
                    
                    <div className="border border-neutral-100 shadow-xxs p-8 rounded-lg  flex flex-col justify-between items-center">
                            <FaMailBulk className="text-4xl" />
                            <div>
                                <p className={`text-center mt-3 font-semibold text-2xl slat-value`}>$9,3434</p>
                                <p className={`text-center mt-3 font-semibold text-neutral-700  text-md`}>Withdrawable Balance</p>
                            </div>
                        
                        </div>
                    
                    {stats.map((slat, i)=>(
                        <div className="border border-neutral-100 shadow-xxs p-5 rounded-lg  flex justify-between items-center">
                            <div>
                                <p className={`font-semibold text-2xl slat-value`}>${slat.value}</p>
                                <p className={`font-semibold text-neutral-700  text-md`}>{slat.name}</p>
                            </div>
                            <FaMailBulk className="text-2xl" />
                        </div>
                    ))}
                </div>
            </Card>
            
  
            <Card>
                <h3 className="text-neutral-800 font-semibold text-xl">Top Selling Products</h3>
                <div className="flex flex-col gap-5 mt-5">
                    {stats.map((slat, i)=>(
                        <div className="bg-neutral-100/80 p-5 rounded-lg flex justify-between">
                            <div>
                                <img src="C:/Users/RaseL/AppData/Local/Temp/top-selling-product.png" alt=""/>
                                <p className={`font-semibold text-md`}>{slat.name}</p>
                            </div>
                            <p className={`font-semibold text-md slat-value`}>
                                <div className="bg-green-450 p-2 px-3  rounded-md text-white">Sold {slat.value}</div>
                            </p>
                                
                        </div>
                    ))}
                </div>
            </Card>
            <Card>
                <h3 className="text-neutral-800 font-semibold text-xl">Most Popular Products</h3>
                <div className="flex flex-col gap-5 mt-5">
                    {stats.map((slat, i)=>(
                        <div className="bg-neutral-100/80 p-5 rounded-lg flex justify-between">
                            <div>
                                <img src="C:/Users/RaseL/AppData/Local/Temp/most-popular-product.png" alt=""/>
                                <p className={`font-semibold text-md`}>{slat.name}</p>
                            </div>
                            <p className={`font-semibold text-md slat-value`}>
                                <div className="bg-green-450 p-2 px-3  rounded-md text-white">Sold {slat.value}</div>
                            </p>
                            
                        </div>
                    ))}
                </div>
            </Card>
            
  </div>
    );
};

export default DashboardHome;