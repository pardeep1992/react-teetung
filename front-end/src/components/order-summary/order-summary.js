import React, { Component } from 'react';
import Header from '../header/header';
import Footer from '../footer/footer';
import Cookies from 'universal-cookie';
import baseUrl from '../services/axios-url';
const axios = require('axios');

class OrderSummary extends Component {
    state = {  
        orderDetail: [],
        customerInfo: [],
        variants: [],
        subTotal: ''
    }
    
    componentDidMount() { 
        const cookies = new Cookies();
        
        if(cookies.get('UserKey')){
            cookies.remove('UserKey')
            // console.log(cookies.get('UserKey'))
        }


        let data = [];

        data = {
            "ordernumber":this.props.location.state.orderId
        }
        
        var self = this;
        axios.post(baseUrl+'get_order_by_customer_data', data)
        .then(function (response) {
            console.log(response.data)
            if(response.data.responseCode === 200){
                self.setState({
                    customerInfo: response.data.order,
                    orderDetail: response.data.order[0].orderdetails,
                    variants: response.data.order[0].variants,
                    subTotal: response.data.order[0].order[0].totalamount
                })
            }
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
    }

    render() { 
        // console.log(this.props.location.state.orderId)
        return (  
            <React.Fragment>
                <Header />

                <div className="container p-2">

                <div className="alert alert-success alert-dismissible fade show">
                    <button type="button" className="close" data-dismiss="alert">&times;</button>
                    <strong>Success!</strong> Your order has been confirmed. Please find your order summary below
                </div>

                    <h2>Your Order Summary</h2>
                     
                    <div className="col-md-2"></div>
                    <div className="col-md-12">
                        <table className="table order-summary-table table-hover table-striped">
                        <tbody>
                            <tr>
                                <td>Order Number</td>
                                <td>
                                    {
                                        this.state.customerInfo.length > 0 ? 
                                        this.state.customerInfo[0].ordernumber : ''
                                    }
                                </td>
                                <td>Email</td>
                                <td>
                                    {
                                        this.state.customerInfo.length > 0 ? 
                                        this.state.customerInfo[0].email : ''
                                    }
                                </td>
                            </tr>
                            <tr>
                                <td>Name</td>
                                <td>
                                    {
                                        this.state.customerInfo.length > 0 ? 
                                        this.state.customerInfo[0].fullname : ''
                                    }
                                </td>
                                <td>Address</td>
                                <td>
                                    {
                                        this.state.customerInfo.length > 0 ? 
                                        this.state.customerInfo[0].address : ''
                                    }
                                </td>
                            </tr>
                            <tr>
                                <td>City</td>
                                <td>
                                    {
                                        this.state.customerInfo.length > 0 ? 
                                        this.state.customerInfo[0].city : ''
                                    }
                                </td>
                                <td>Province</td>
                                <td>
                                    {
                                        this.state.customerInfo.length > 0 ? 
                                        this.state.customerInfo[0].province : ''
                                    }
                                </td>
                            </tr>
                            <tr>
                                <td>Country</td>
                                <td>
                                    {
                                        this.state.customerInfo.length > 0 ? 
                                        this.state.customerInfo[0].country : ''
                                    }
                                </td>
                                <td>Zip</td>
                                <td>
                                    {
                                        this.state.customerInfo.length > 0 ? 
                                        this.state.customerInfo[0].zipcode : ''
                                    }
                                </td>
                            </tr>
                            <tr>
                                <td>Payment Method</td>
                                <td>
                                    {
                                        this.state.customerInfo.length > 0 ? 
                                        this.state.customerInfo[0].paymentmethod : ''
                                    }
                                </td>
                                <td></td>
                                <td></td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                    

                    <div className="row my-5">
                        <div className="col-md-1"></div>
                        <div className="col-md-10">
                            
                            <div className="border p-3">
                                <small>
                                    <p className="pb-3 border-bottom">Order estimated to ship on <b>September 30, 2019</b></p>
                                </small>

                                {
                                    this.state.orderDetail.map((order, index) => (
                                        
                                        <div className="row " key={index}>
                                                
                                            
                                            <div className="col-md-3 col-3">
                                            <img src={`data:image/jpeg;base64,${order.productimage}`} className="img-fluid" />
                                            </div>
                                            <div className="col-md-7 col-7">
                                                <p className="font_14 mb-0">
                                                {order.productname} x {order.orderquantity}</p>
                                                <small className="text-muted">
                                                    {this.state.variants[index].color[0]}
                                                    
                                                     / {this.state.variants[index].size}
                                                </small>
                                            </div>
                                            <div className="col-md-2 col-2 font_14">
                                            ${order.productprice}
                                            </div>
                                        </div>
                                    ))
                                }

                                
                                

                                <div className="border-top mt-3"></div>
                                <small>
                                    <b className="text-muted">
                                        <div className="row mb-1 mt-3">
                                            <div className="col-sm-6 col-6">Subtotal</div>
                                            <div className="col-sm-6 col-6 text-right">
                                            ${this.state.subTotal}
                                            </div>
                                        </div>
                                        <div className="row mb-1">
                                            <div className="col-sm-6 col-6">Shipping</div>
                                            <div className="col-sm-6 col-6 text-right">$00.00</div>
                                        </div>
                                        <div className="row mb-1">
                                            <div className="col-sm-6 col-6">Total</div>
                                            <div className="col-sm-6 col-6 text-right">
                                                ${this.state.subTotal}
                                            </div>
                                        </div>     
                                    </b>
                                    
                                </small>
                                

                                <div className="border-top mt-3"></div>

                                <div className="row">
                                    <div className="col-sm-6 col-6 pt-4 text-muted"><small><b>Paid</b></small></div>
                                    <div className="col-sm-6 col-6 text-right">
                                        <h4>
                                            ${this.state.subTotal}
                                        </h4>
                                    </div>
                                </div>
                            </div>
                            
                            
                        </div>
                        
                    </div>
                </div>
                <Footer />
            </React.Fragment>
        );
    }
}
 
export default OrderSummary;