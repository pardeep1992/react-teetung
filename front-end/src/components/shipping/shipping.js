import React, { Component } from 'react';
import Header from '../header/header';
import Footer from '../footer/footer';
import ShippingContent from './shippingcontent';

class Shipping extends Component {
    state = {  }
    render() { 
        return (
            <div>
                <Header />
                <ShippingContent />
                <Footer />
            </div> 
            
            );
    }
}
 
export default Shipping;