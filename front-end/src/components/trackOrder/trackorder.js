import React, { Component } from 'react';
import Header from '../header/header';
import Footer from '../footer/footer';

class TrackOrder extends Component {
    state = {  }
    render() { 
        return ( 
            <div>
                <Header />
                <div className="container">
                    <h2>Track Your Order</h2>
                </div>

                <div className="container">
                    <div className="row">
                        <div className="input-group mb-5 col-md-4 mx-auto">
                            <input type="text" className="form-control" placeholder="Enter your Tracking Number" />
                            <div className="input-group-append">
                                <button className="btn btn-success" type="button">Track</button>
                            </div>
                        </div>
                    </div>

                </div>
               

                <div className="container my-4">
                    <h2>Tracking FAQ</h2>
                    <p><b>Can I add or remove products from my order?</b></p>
                    <p className="text-muted">Sorry! To ensure your order arrives on time, we generally begin processing an order as soon as it is placed. As a result we are unable to make any changes to your order after it is placed.</p>
                </div>

                <Footer />
            </div>
        );
    }
}
 
export default TrackOrder;