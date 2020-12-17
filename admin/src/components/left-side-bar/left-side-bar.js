import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';


class LeftSideBar extends Component {
    state = {  }
    render() { 
        return (  
            // <div className>
            <React.Fragment>
                <div className="row py-2" style={{ fontSize: '18px' }}>
                    <div className="col-md-12 ">
                        <NavLink exact to="/dashboard" activeClassName="text-success">
                            <i className="fa fa-home pt-4 pr-3"></i>
                            <b>Home</b>
                        </NavLink>
                        
                    </div>
                </div>

                <div className="row py-2">
                    <div className="col-md-12">
                        <NavLink exact to="/orders" activeClassName="text-success">
                            <i className="fa fa-edit pt-4 pr-3"></i>
                            <b>Orders</b>
                            </NavLink>
                    </div>
                </div>

                <div className="row py-2">
                    <div className="col-md-12">
                        <i className="fa fa-download pt-4 pr-3"></i>
                        <b>Importers</b>
                    </div>
                </div>

                <div className="row py-2">
                    <div className="col-md-12">
                        <NavLink exact to="/products" activeClassName="text-success">
                            <i className="fa fa-edit pt-4 pr-3"></i>
                            <b>Products</b>
                        </NavLink>
                    </div>
                </div>
                
                <div className="row py-2">
                    <div className="col-md-12">
                        <NavLink exact to="/collections" activeClassName="text-success">
                            <i className="fa fa-dropbox pt-4 pr-3"></i>
                            <b>Collections</b>
                        </NavLink>
                        
                    </div>
                </div>

                <div className="row py-2">
                    <div className="col-md-12">
                        <NavLink exact to="/settings" activeClassName="text-success">
                            <i className="fa fa-dollar pt-4 pr-3"></i>
                            <b>Settings</b>
                        </NavLink>
                    </div>
                </div>

                <div className="row py-2">
                    <div className="col-md-12">
                        <i className="fa fa-question-circle pt-4 pr-3"></i>
                        <b>Help</b>
                    </div>
                </div>
            </React.Fragment>
                
            // </div>
        );
    }
}
 
export default LeftSideBar;