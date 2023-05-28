import React, {Component} from 'react';
import ReactApexChart from "react-apexcharts"

import "./style.scss"



class SalesReport extends Component {

    constructor(props) {
        super(props);
        this.state = {
            series: [{
                name: 'Sales',
                data: [30, 60, 40, 70, 50, 70, 60, 50, 60, 70, 90, 80]
            }, {
                name: 'Profit',
                data: [10, 20, 20, 30, 40, 30, 30, 40, 50, 50, 60, 20]
                // data: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Ag", "Sep", "Oct", "Nov", "Dec"]
                // data: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Ag", "Sep", "Oct", "Nov", "Dec"]
            }],
            options: {

                fill: {
                    type: 'gradient',
                    gradient: {
                        shade: 'dark',
                        type: "vertical",
                        // shadeIntensity: 0,
                        gradientToColors: undefined, // optional, if not defined - uses the shades of same color in series
                        inverseColors: true,
                        opacityFrom: 0.5,
                        opacityTo: 0.3,
                        stops: [0, 100,  100],
                        colorStops: []
                    }
                },

                legend: {
                    show: false
                },
                chart: {
                    height: 350,
                    type: 'area',
                    toolbar: {
                        show: false
                    }
                },
                dataLabels: {

                    enabled: false
                },
                stroke: {
                    curve: 'smooth'
                },
                xaxis: {
                    type: 'month',
                    categories: [
                        "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Ag", "Sep", "Oct", "Nov", "Dec"
                    ]
                },
                yaxis: {
                    title: "Tk",
                    type: 'numeric',
                    labels: {
                        formatter: function (value) {
                            return value + "K";
                        }
                    },
                    // categories: [
                    //     "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Ag", "Sep", "Oct", "Nov", "Dec"
                    // ]

                },
                tooltip: {
                    x: {
                        format: 'dd/MM/yy HH:mm'
                    },
                    y: {
                        format: '$'
                    },
                },
            },


        };
    }

    render() {
        return (

            <div id="sales-report-chart" className="">

                <div className="flex items-center justify-between ">
                    <h5 className="heading-6">Sales Report</h5>
                    <div id="sales-report-chart-legend" className="flex items-center gap-4">
                        <label htmlFor="sales">
                            <input type="checkbox" id="sales" className="hidden" checked="" value="Sales"/>
                            <div className="flex items-center gap-1">
                                <div className="h-[10px] w-[10px] rounded-full bg-primary-500"></div>
                                <p className="text-sm font-medium text-slate-600 dark:text-slate-300">Sales</p>
                            </div>
                        </label>

                        <label htmlFor="profit">
                            <input type="checkbox" id="profit" className="hidden" checked="" value="Profit"/>
                            <div className="flex items-center gap-1">
                                <div className="h-[10px] w-[10px] rounded-full bg-sky-500"></div>
                                <span className="text-sm font-medium text-slate-600 dark:text-slate-300">Profit</span>
                            </div>
                        </label>
                    </div>

                    {/*** filter my time ****/}
                    <select className="select select-sm w-full md:w-32">
                        <option value="1">Yearly</option>
                        <option value="2">Monthly</option>
                        <option value="2">Date &amp; Time</option>
                    </select>
                </div>

                <ReactApexChart  options={this.state.options} series={this.state.series} type="area" height={350}/>
            </div>

        );
    }
}

export default SalesReport;