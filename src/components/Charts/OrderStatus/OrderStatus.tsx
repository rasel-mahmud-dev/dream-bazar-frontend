import React, {Component} from 'react';
import ReactApexChart from "react-apexcharts"

import "./style.scss"


class OrderStatus extends Component<any, any> {

    orderSlats = [
        {_id: 'Pending', count: 50},
        {_id: 'Canceled', count: 200},
        {_id: 'Completed', count: 70},
    ]

    constructor(props) {
        super(props);
        this.state = {
            orderSlats: this.orderSlats,
            series: this.orderSlats.map(or=>or.count),
            options: {

                labels: this.orderSlats.map(or=>or._id),
                chart: {
                    width: '100%',
                    type: 'pie',
                    height: 350,
                },
                dataLabels: {
                    enabled: false
                    // formatter(val, opts) {
                    //     const name = opts.w.globals.labels[opts.seriesIndex]
                    //     return [name, val.toFixed(1) + '%']
                    // }
                },

                responsive: [{
                    breakpoint: 480,
                    options: {
                        chart: {
                            width: 200
                        },
                        legend: {
                            show: false
                        }
                    }
                }],
                legend: {
                    position: 'bottom',
                    offsetY: 0,
                    formatter: function(seriesName, opts) {
                        let total = opts.w.globals.series.reduce((a, c)=>a+c, 0);
                        let item = opts.w.globals.series[opts.seriesIndex]

                        return `
                            <div class="pie-label">
                                <p>${item}</p>
                                <p>${seriesName}</p>
                            </div>
                        `
                    }
                    // height: 20,
                },
                plotOptions: {
                    pie: {
                        expandOnClick: false,
                        donut: {
                            labels: {
                                show: true,
                                name: {
                                    text: "assdfsdfsdd",
                                    align: 'center',
                                    color: "red"

                                },
                                value: {
                                    text: undefined,
                                    fontSize: '28px',
                                    fontFamily: 'Helvetica, Arial, sans-serif',
                                    fontWeight: 600,
                                    color: '#1f1f1f',
                                },
                                total: {
                                    show: true,
                                    showAlways: false,
                                    label: 'Total',
                                    fontSize: '14px',
                                    fontFamily: 'Helvetica, Arial, sans-serif',
                                    fontWeight: 600,
                                    color: '#94a3b8',
                                    formatter: function (w) {
                                        return w.globals.seriesTotals.reduce((a, b) => {
                                            return a + b
                                        }, 0)
                                    }
                                }
                            }
                        }
                    }
                }
            },
        };
    }


    render() {
        return (
            <div id="sales-report-chart" className=" order-report-pie ">
                <div className="flex items-center justify-between ">
                    <h5 className="heading-6">Order Status</h5>
                </div>

                <ReactApexChart options={this.state.options} series={this.state.series} type="donut" width={350}/>

            </div>

        );
    }
}

export default OrderStatus;