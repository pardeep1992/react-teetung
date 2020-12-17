import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';

class CollectionsNameAndBtn extends Component {
    render() { 
        return (  
            <React.Fragment>
                <div className="row mt-3">
                    <div className="col-md-12">
                        <h4 className="pl-2">Settings</h4>
                        <section className="my-4">
                            <div className="row">
                                <NavLink exact to="/general-settings" className="SettingWrapper col-lg-4 col-12 p-3">
                                    <div className="SettingInner d-flex border">
                                        <div className="IconWrapper p-3">
                                            <i className="fa fa-cog" aria-hidden="true"></i>
                                        </div>
                                        <div className="Info pl-2">
                                            <h6 className="Title">General</h6>
                                            <div className="Description">View and update your store details</div>
                                        </div>
                                    </div>
                                </NavLink>
                                
                                <a className="SettingWrapper col-lg-4 col-12 p-3">
                                    <div className="SettingInner d-flex border">
                                        <div className="IconWrapper p-3">
                                            <i className="fa fa-credit-card" aria-hidden="true"></i>
                                        </div>
                                        <div className="Info pl-2">
                                            <h6 className="Title">Payment</h6>
                                            <div className="Description">Configure payment options for your store</div>
                                        </div>
                                    </div>
                                </a>

                                <a className="SettingWrapper col-lg-4 col-12 p-3">
                                    <div className="SettingInner d-flex border">
                                        <div className="IconWrapper p-3">
                                            <i className="fa fa-globe" aria-hidden="true"></i>
                                        </div>
                                        <div className="Info pl-2">
                                            <h6 className="Title">Online Store</h6>
                                            <div className="Description">Change settings for pages on your online store</div>
                                        </div>
                                    </div>
                                </a>

                                <a className="SettingWrapper col-lg-4 col-12 p-3">
                                    <div className="SettingInner d-flex border">
                                        <div className="IconWrapper p-3">
                                            <i className="fa fa-search" aria-hidden="true"></i>
                                        </div>
                                        <div className="Info pl-2">
                                            <h6 className="Title">Tracking</h6>
                                            <div className="Description">Add and manage tracking codes on your store</div>
                                        </div>
                                    </div>
                                </a>

                                <a className="SettingWrapper col-lg-4 col-12 p-3">
                                    <div className="SettingInner d-flex border">
                                        <div className="IconWrapper p-3">
                                            <i className="fa fa-truck" aria-hidden="true"></i>
                                        </div>
                                        <div className="Info pl-2">
                                            <h6 className="Title">Shipping</h6>
                                            <div className="Description">Manage how you ship orders to customers</div>
                                        </div>
                                    </div>
                                </a>

                                <NavLink exact to="/checkout-settings" className="SettingWrapper col-lg-4 col-12 p-3">
                                    <div className="SettingInner d-flex border">
                                        <div className="IconWrapper p-3">
                                            <i className="fa fa-shopping-cart" aria-hidden="true"></i>
                                        </div>
                                        <div className="Info pl-2">
                                            <h6 className="Title">Checkout</h6>
                                            <div className="Description">Customize your online checkout process</div>
                                        </div>
                                    </div>
                                </NavLink>

                                <NavLink exact to="/pages" className="SettingWrapper col-lg-4 col-12 p-3">
                                    <div className="SettingInner d-flex border">
                                        <div className="IconWrapper p-3">
                                            <i className="fa fa-file-o" aria-hidden="true"></i>
                                        </div>
                                        <div className="Info pl-2">
                                            <h6 className="Title">Pages</h6>
                                            <div className="Description">View and update your pages</div>
                                        </div>
                                    </div>
                                </NavLink>
                            </div>
                        </section>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default CollectionsNameAndBtn;