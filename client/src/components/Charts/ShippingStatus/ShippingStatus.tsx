import React, {Component} from 'react';
import ReactApexChart from "react-apexcharts"

import "./shippingStatus.scss"


class ShippingStatus extends Component<any, any> {

    orderSlats = [
        {_id: 'Pending', count: 50},
        {_id: 'Canceled', count: 200},
        {_id: 'Completed', count: 70},
    ]

    constructor(props) {
        super(props);
        this.state = {
            orderSlats: this.orderSlats,

            series: [70],
            options: {
                chart: {
                    height: 350,
                    type: 'radialBar',
                },
                plotOptions: {
                    radialBar: {
                        hollow: {
                            size: '70%',
                        }
                    },
                },
                labels: ['Shipping'],
                fill: {
                    type: 'color',
                    fill: "#ffff000"
                },
                stroke: {
                    lineCap: 'round',
                    fill: "#ffff000"
                },
            },
        }
    }


    render() {
        return (
            <div id="sales-report-chart" className=" order-report-pie ">
                <div className="flex items-center justify-between ">
                    <h5 className="heading-6">Shipping Status</h5>
                </div>

                <ReactApexChart options={this.state.options} series={this.state.series} type="radialBar" height={350}/>
            </div>

        );
    }
}

export default ShippingStatus;