import React from "react";
import {BiCart, BiDollar, CgProductHunt} from "react-icons/all";
import "./Dashboard.scss";

import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Card from "UI/Form/Card/Card";
import VisitorChart from "./dashboardHome/visitorChart/VisitorChart"


const AdminDashboardHome = () => {
    const slats = [
        {icon: <BiDollar/>, value: "53,223,013,12", label: "Total Sales", iconClassName: "bg-orange-400 outline-orange-100", unit: "$"},
        {icon: <BiCart/>, value: "423", label: "Total Orders", iconClassName: "bg-green-400 outline-green-100"},
        {icon: <CgProductHunt/>, value: "2231", label: "Total Products", iconClassName: "bg-blue-400 outline-blue-100"}
    ];


    
    return (
        <div>
			<h3 className="heading-2 py-4">Admin Dashboard</h3>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4">
				{slats.map((stat) => (
                    <Card>
						<div className="flex items-center gap-x-4 py-3">
							<div
                                className={`text-white w-12 h-12 flex items-center justify-center rounded-full outline outline-8 ${stat.iconClassName}`}>
								{stat.icon}
							</div>
							<div>
								<h5 className="heading-6 text-neutral-400">{stat.label}</h5>
								<h2 className="heading-2">
									{stat.unit} {stat.value}
								</h2>
							</div>
						</div>
					</Card>
                ))}
			</div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                
                <BarChartDemo />
            
            <Card>
                <h3 className="heading-4 mb-4 px-4">Business Analytics </h3>
                <div className="flex justify-center">
                    <VisitorChart />
                </div>
            </Card>
            
            </div>
            
		</div>
    );
};

export default AdminDashboardHome;



const data = [
    {
        name: 'Jan',
        uv: 400,
        pv: 200,
    },
    {
        name: 'Feb',
        uv: 1000,
        pv: 1298,
    },
    {
        name: 'Mar',
        uv: 2000,
        pv: 9800,
    },
    {
        name: 'Apr',
        uv: 2780,
        pv: 3908,
    },
    {
        name: 'May',
        uv: 1890,
        pv: 4800,
    },
    {
        name: 'Jun',
        uv: 2390,
        pv: 3800,
    },
    {
        name: 'Jul',
        uv: 3490,
        pv: 4300,
    },
    {
        name: 'Aug',
        uv: 3490,
        pv: 4300,
    },
    {
        name: 'Sep',
        uv: 3490,
        pv: 4300,
    },
    {
        name: 'Oct',
        uv: 3490,
        pv: 4300,
    },
    {
        name: 'Nov',
        uv: 6490,
        pv: 4300,
    },
    {
        name: 'Dec',
        uv: 3490,
        pv: 4300,
    },
];

function BarChartDemo(){

    let width = window.innerWidth - 20


    return (
        <Card className="bg-white shadow-xxs !px-0 overflow-x-auto">

                <h3 className="heading-4 mb-4 px-4">Business Analytics </h3>
            <BarChart
                width={width}
                height={300}
                data={data}
                margin={{
                    top: 5,
                    right: 20,
                    left: 0,
                    bottom: 5,
                }}
            >
          <CartesianGrid strokeDasharray="3 3" className="rounded-full" />
          <XAxis dataKey="name"  className="rounded-full" />
          <YAxis className="rounded-full" />
          <Tooltip />
                {/*<Legend />*/}

                <Bar dataKey="pv" fill="#8884d8" />
          <Bar dataKey="uv" fill="#82ca9d"  />

        </BarChart>


        </Card>
    )
}