import React, { Component } from 'react'; 
import {NavLink} from 'react-router-dom';
import visa from '../images/visa.svg';
import amex from '../images/amex.svg';
import mastercard from '../images/mastercard.svg';
import discover from '../images/discover.svg';
import paypal from '../images/paypal.svg';

class Footer extends Component {
    state = {  }
    render() { 
        return ( 
            <div className="container-fluid footer_bg">
                <div className="container pt-5">
                    <div className="row border-bottom mt-5">
                        <div className="col-sm-6">
                            <h5>STORE INFORMATION</h5>
                            <p className="text-muted">
                            Tee Tung <br />
                            Email us: support@teetung.com <br />
                            7780 Cambridge Manor Pl suite DFort MyersFlorida33907 <br />
                            United States
                            </p>
                        </div>

                        <div className="col-sm-3">
                            <h5>SUPPORT</h5>
                            <NavLink exact to="/support">Help Center</NavLink> <br/>
                            <NavLink exact to="/returns">Returns and Refunds</NavLink> <br/>
                            <NavLink exact to="/shipping">Shipping</NavLink> <br/>
                            <NavLink exact to="/ip">DMCA</NavLink> <br/>
                        </div>

                        <div className="col-sm-3">
                        <h5>SUPPORT</h5>
                            <NavLink exact to="/about-us">About us</NavLink> <br/>
                            <NavLink exact to="/privacy-policy">Privacy Policy</NavLink> <br/>
                            <NavLink exact to="/terms-of-services">Terms of Service</NavLink> <br/>
                            <NavLink exact to="/contact-us">Contact Us</NavLink> <br/>
                        </div>
                    </div>

                    <div className="row pt-3">
                        <div className="col-sm-6 text-muted center-at-mobile">
                            <small> © 2019 Tee Tung. All rights reserved. </small>
                        </div>
                        <div className="col-sm-6">
                            <p className="float-right center-at-mobile">
                                <img src={visa} width="35" className="m-1 img-fluid" alt=" "/>
                                <img src={amex} width="35" className="m-1 img-fluid" alt=" "/>
                                <img src={mastercard} width="35" className="m-1 img-fluid" alt=" "/>
                                <img src={discover} width="35" className="m-1 img-fluid" alt=" "/>
                                <img src={paypal} width="35" className="m-1 img-fluid" alt=" "/>
                            </p>
                        </div>
                    </div>
                </div>               
            </div>
            
         );
    }
}
 
export default Footer;