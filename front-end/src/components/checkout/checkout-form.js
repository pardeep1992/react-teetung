import React, { Component } from 'react';
import { Redirect } from 'react-router'
import visa from '../images/visa.svg';
import amex from '../images/amex.svg';
import mastercard from '../images/mastercard.svg';
import discover from '../images/discover.svg';
import paypal from '../images/paypal.svg';
import norton from '../images/norton.png';
import ssl from '../images/ssl-secure.png';
// import thumb1 from '../images/thumb1.jpg';
import PaypalExpressBtn from 'react-paypal-express-checkout';
import Cookies from 'universal-cookie';
import baseUrl from '../services/axios-url';
const axios = require('axios');

class CheckoutForm extends Component {
    state = {  
        email: '',
        fullName: '',
        address: '',
        city: '',
        province: '',
        zip: '',
        country: '',
        redirectSuccess: false,
        cartProducts: [],
        cartQuantity: 0,
        redirectToOrderDetailPage: false,
        order_id: '',
        subTotal: 0,
        emailvalidate: false
    }

    componentDidMount() { 
        const cookies = new Cookies();
        var userKey = '';
        if(cookies.get('UserKey')){
            userKey = cookies.get('UserKey').toString()
            
        }
        
        var self = this;
        axios.get(baseUrl+'getcart/'+userKey)
        .then(function (response) {
            // console.log(response.data)
            if(response.data.responseCode === 200){
                self.setState({
                    cartProducts: response.data.cart,
                    cartQuantity: response.data.cart[0].Quantity,
                    subTotal: response.data.total
                })
            }
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
    }

    submitForm = (e) => {
        e.preventDefault();
        if(this.state.email === '' || this.state.fullName === '' || this.state.address === '' || this.state.city === '' || this.state.province === '' || this.state.zip === '' || this.state.country === '') {
            console.log('err')
        } else {

        }
        
        
       
    } 

    estimateDelivery = () => {
        var date = new Date().getDate(); //Current Date
        var month = new Date().getMonth() + 1; //Current Month
        var year = new Date().getFullYear();
        parseInt(date);
        date = date+6;
        return (date+"-"+month+"-"+year);
    }

    render() { 
        // console.log(this.state)
        if (this.state.redirectToOrderDetailPage) {
            return (<Redirect to = {{ 
                pathname: "/order-summary/",
                state: { orderId: this.state.order_id }
            }} />);
        }
       
        const onSuccess = (payment) => {
            // Congratulation, it came here means everything's fine!
            const cookies = new Cookies();
            var userKey = '';
            userKey = cookies.get('UserKey');
            
            // console.log("The payment was succeeded!", payment);
            // console.log(this.state)
            var date = new Date().getDate(); //Current Date
            var month = new Date().getMonth() + 1; //Current Month
            var year = new Date().getFullYear(); //Current Year

            var fulldate = date+'-'+month+'-'+year;

            var data = [];
            data = {
                // ordernumber:"rn-98746-32600",
                paymentmethod:"paypal",
                totalamount:this.state.subTotal,
                shipping:"",
                orderstatus:"pending",
                orderdate:fulldate,
                usertoken:userKey,
                email: this.state.email,
                fullname: this.state.fullName,
                address: this.state.address,
                city: this.state.city,
                province: this.state.province,
                zipcode: this.state.zip,
                country: this.state.country,
                shippingtype:"Standard Shipping",
                card:"",
                month:"",
                year:"",
                cvc:"",
                paymentstatus: payment.paid
            }

            var self = this;
            axios.post(baseUrl+'placeorder', data)
            .then(function (response) {
                if(response.data.responseCode === 200){
                    // self.setState({ redirectToOrderDetailPage: true })
                    // console.log(response.data.order[0].ordernumber)
                    
                    self.setState({ 
                        redirectToOrderDetailPage: true,
                        order_id: response.data.order[0].ordernumber
                    }, function () {
                        
                    });

                    

                }
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            
            // You can bind the "payment" object's value to your state or props or whatever here, please see below for sample returned data
        }
 
        const onCancel = (data) => {
            // User pressed "cancel" or close Paypal's popup!
            console.log('The payment was cancelled!', data);
            // You can bind the "data" object's value to your state or props or whatever here, please see below for sample returned data
        }
 
        const onError = (err) => {
            // The main Paypal's script cannot be loaded or somethings block the loading of that script!
            console.log("Error!", err);
            // Because the Paypal's main script is loaded asynchronously from "https://www.paypalobjects.com/api/checkout.js"
            // => sometimes it may take about 0.5 second for everything to get set, or for the button to appear
        }
 
        let env = 'sandbox'; // you can set here to 'production' for production
        let currency = 'USD'; // or you can set this value from your props or state
        let total = this.state.subTotal; // same as above, this is the total amount (based on currency) to be paid by using Paypal express checkout
        // Document on Paypal's currency code: https://developer.paypal.com/docs/classic/api/currency_codes/
 
        const client = { 
            sandbox:'ATtYRkk0eiGoI7FqJEIoNOcyzOYNgGcf9YFFut_fXgRpAkjoAd-HqPxyYTD5wNGT-7ZY6_C9y_OitU-8',
            // production: 'YOUR-PRODUCTION-APP-ID',
        }
        // In order to get production's app-ID, you will have to send your app to Paypal for approval first
        // For sandbox app-ID (after logging into your developer account, please locate the "REST API apps" section, click "Create App"):
        //   => https://developer.paypal.com/docs/classic/lifecycle/sb_credentials/
        // For production app-ID:
        //   => https://developer.paypal.com/docs/classic/lifecycle/goingLive/
 
        // NB. You can also have many Paypal express checkout buttons on page, just pass in the correct amount and they will work!

        const style = {
            size: 'large', 
            color: 'gold',
            shape: 'rect',
            label: 'checkout'
        }

        return (  
            <div className="container">
                <h3>Checkout</h3>

                <h4>Contact Info</h4>
                <div className="row">
                    {/* left side */}
                    <div className="col-md-7">
                        <form method="post">
                        
                            <input type="email" className="form-control form-control-lg font_15" placeholder="Email"  required
                                value={this.state.email} 
                                onChange={e => this.setState({ email: e.target.value })} 
                            />
                            
                            <h4>Shipping Address</h4>
                            <input type="text" required className="form-control form-control-lg font_15 form-group" placeholder="Full Name" 
                                value={this.state.fullName} 
                                onChange={e => this.setState({ fullName: e.target.value })} 
                            />

                            <input type="text" required className="form-control form-control-lg font_15 form-group" placeholder="Address" 
                                value={this.state.address} 
                                onChange={e => this.setState({ address: e.target.value })} 
                            />
                            <input type="text" required className="form-control form-control-lg font_15 form-group" placeholder="City" 
                                value={this.state.city} 
                                onChange={e => this.setState({ city: e.target.value })} 
                            />

                            <div className="row">
                                <div className="col-md-7">
                                    <input type="text" required className="form-control form-control-lg font_15 form-group" placeholder="Province" 
                                        value={this.state.province} 
                                        onChange={e => this.setState({ province: e.target.value })} 
                                    />
                                </div>
                                <div className="col-md-5">
                                    <input type="text" required className="form-control form-control-lg font_15 form-group" placeholder="Zip" 
                                        value={this.state.zip} 
                                        onChange={e => this.setState({ zip: e.target.value })} 
                                    />
                                </div>
                            </div>

                            <select className="form-control form-control-lg font_15 form-group"  required
                                value={this.state.country} 
                                onChange={e => this.setState({ country: e.target.value })} 
                            >
                                <option value="">Select</option>
                                <option value="India">India</option>
                                <option value="Australia">Australia</option>
                                <option value="England">England</option>
                            </select>

                            <h4 className="mt-4">Delivery Options</h4>
                            <div className="row border delivery_options">
                                <div className="col-md-1 col-1">
                                <input type="radio" className="form-control-lg" defaultChecked />
                                </div>
                                <div className="col-md-6 col-6 pt-2">Standard Shipping</div>
                                <div className="col-md-5 col-5 text-right pt-2">$20.92</div>
                            </div>

                            <h4 className="mt-4">Payment Info</h4>
                            <div className="row">
                                <div className="col-md-1 col-1">
                                    <input type="radio" className="form-control-lg" defaultChecked />
                                </div>
                                <div className="col-md-3 col-3">
                                    <img src={paypal} width="70" className="mr-1 img-fluid" alt=" "/>
                                </div>
                                <div className="col-md-8 text-right col-7">
                                    <img src={visa} width="35" className="mr-1 img-fluid" alt=" "/>
                                    <img src={amex} width="35" className="mr-1 img-fluid" alt=" "/>
                                    <img src={mastercard} width="35" className="mr-1 img-fluid" alt=" "/>
                                    <img src={discover} width="35" className="mr-1 img-fluid" alt=" "/>
                                </div>
                            </div>

                            <div className="row form-group">
                                {/* <button className="btn checkout_btn btn-lg btn-block" 
                                // onClick={e => this.submitForm(e)} 
                                type="button"> 
                                    <i className="fa fa-paypal"> </i> 
                                    <i><b>PayPal </b>
                                    </i> Checkout
                                </button> */}

                                

                               

                                <span className="test">
                                    <PaypalExpressBtn  env={env} style={style} client={client} currency={currency} total={total} onError={onError} onSuccess={onSuccess} onCancel={onCancel}  />
                                </span>
                                
                                
                            </div>

                            <div className="row">
                                <img src={norton} width="130" className="img-fluid mr-3" alt="" />
                                <img src={ssl} width="130" className="img-fluid mx-3" alt=" " />
                            </div>

                        </form>
                    </div>

                    {/* right side */}
                    <div className="col-md-5">
                        
                        <div className="border p-3">
                            <small>
                                <p className="pb-3 border-bottom">Order estimated to ship on <b>  September 30, 2019
                                {/* {this.estimateDelivery()} */}
                                </b></p>
                            </small>

                            {
                                this.state.cartProducts.map((cart, index) => (
                                    <div className="row" key={index}>
                                        <div className="col-md-3 col-3">
                                        <img src={`data:image/jpeg;base64,${cart.variant_images[0].image}`} className="img-fluid" alt="image" />
                                        </div>
                                        <div className="col-md-7 col-7">
                                            <p className="font_14 mb-0">
                                            {cart.product[0].title} x {cart.Quantity} 
                                            </p>
                                            <small className="text-muted">
                                                {cart.variants[0].color[0]} / {cart.variants[0].size}
                                            </small>
                                        </div>
                                        <div className="col-md-2 col-2 font_14">
                                        ${cart.variants[0].price}
                                        </div>
                                    </div>
                                ))
                            }

                            
                            

                            <div className="border-top mt-3"></div>
                            <small>
                                <b className="text-muted">
                                    <div className="row mb-1 mt-3">
                                        <div className="col-sm-6 col-6">Subtotal</div>
                                        <div className="col-sm-6 col-6 text-right">${this.state.subTotal}</div>
                                    </div>
                                    <div className="row mb-1">
                                        <div className="col-sm-6 col-6">Shipping</div>
                                        <div className="col-sm-6 col-6 text-right">$00</div>
                                    </div>
                                    <div className="row mb-1">
                                        <div className="col-sm-6 col-6">Total</div>
                                        <div className="col-sm-6 col-6 text-right">${this.state.subTotal}</div>
                                    </div>     
                                </b>
                                
                            </small>
                            

                            <div className="border-top mt-3"></div>

                            <div className="row">
                                <div className="col-sm-6 pt-4 text-muted"><small><b>Paid</b></small></div>
                                <div className="col-sm-6 text-right"><h4>${this.state.subTotal}</h4></div>
                            </div>
                        </div>
                        
                        
                    </div>
                </div>
            </div>
        );
    }
}
 
export default CheckoutForm;