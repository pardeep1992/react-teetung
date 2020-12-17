import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';

class CheckoutFooter extends Component {
    state = {  }
    render() { 
        return ( 
            <div className="container border-top mt-5 pt-2 pb-3">
                <div className="row">
                    
                        <NavLink exact to="/returns" >
                            <small>Refund Policy</small>
                        </NavLink>
                        &nbsp; &nbsp; 
                    
                        <NavLink exact to="/privacy-policy" >
                            <small>Privacy Policy</small>
                        </NavLink>
                   
                        &nbsp; &nbsp;  
                        <NavLink exact to="/terms-of-services" >
                            <small>Terms of Service</small>
                        </NavLink>
                   
                </div>
            </div>
        );
    }
}
 
export default CheckoutFooter;