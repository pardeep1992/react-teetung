import React, { Component } from 'react';
import CheckoutHeader from './checkout-header';
import CheckoutFooter from './checkout-footer';
import CheckoutForm from './checkout-form';

class Checkout extends Component {
    state = {  }
    render() { 
        return ( 
            <div>
                <CheckoutHeader />
                <CheckoutForm />
                <CheckoutFooter />
            </div>
         );
    }
}
 
export default Checkout;