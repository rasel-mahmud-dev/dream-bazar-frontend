import React from 'react'

import "./Footer.scss"

const Footer = () => {
    return (
        <div className="footer">
                <div className="container">
                    <div className="row footer_row">
                        
                        <div className="col">
                            <h4 className="footer_col_title">Top Category</h4>
                            <ul>
                                <li>Clothes</li>
                                <li>Laptop</li>
                                <li>Mobile</li>
                                <li>Foods</li>
                            </ul>
                        </div>

                        <div className="col">
                            <h4 className="footer_col_title">Usefull Links</h4>
                            <ul>
                                <li>Terms and Conditions</li>
                                <li>Help Center</li>
                                <li>Privacy Policy</li>
                               
                            </ul>
                    
                        </div>

                        <div className="col">
                            <h4 className="footer_col_title">Ease Payment</h4>
                            <ul>
                                <li>Bkash</li>
                                <li>Nagot</li>
                                <li>Roket</li>
                                <li>Cash On Delevery</li>
                            </ul>
                        </div>
                    </div>
                    <div className="row">

                        <h3> Copyright © { new Date().getFullYear() } Ecomerce; Project Start on {new Date(1625128194637).toDateString() } </h3>
                    </div>
                </div>
        </div>
    )
}

export default Footer
