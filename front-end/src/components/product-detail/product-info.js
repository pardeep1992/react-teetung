import React, { Component } from 'react';
import { Route, Redirect } from 'react-router'
import thumb2 from '../images/thumb2.jpg';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import Cookies from 'universal-cookie';
import baseUrl from '../services/axios-url';
const axios = require('axios');

class ProductInfo extends Component {
    constructor(props){
        super(props);

        this.state = {  
            redirectToCartPage: false,
            defaultVariantImages: []
        }
        

        
    }

    

    makeUserKey(length) {
        var result           = '';
        var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
           result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    buyNowButton = (e) => {
        e.preventDefault();

        const cookies = new Cookies();
        var userKey = '';

        if(cookies.get('UserKey')){
            userKey = cookies.get('UserKey')
        } else {
            userKey = this.makeUserKey(100);
            cookies.set('UserKey', userKey, { path: '/', maxAge: '172800' } );
        }

        var data = [];
        data = {
            "cartkey": userKey,
            "productid":"5d6f4ddd0d1bd42f940f2d40",
            "quantity":2,
            "variantid":"5d7380e3afa4951cb4359ec1"
        }

        var self = this;
        axios.post(baseUrl+'addtocart', data)
        .then(function (response) {
            // console.log(response.data)
            if(response.data.responseCode === 200){
                self.setState({redirectToCartPage: true})
            }
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })

    }


    render() { 
        
        

        if (this.state.redirectToCartPage) {
            return <Redirect to = {{ pathname: "/cart" }} />;
        }
        
        return (  
            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-6">
                        <OwlCarousel 
                            className="owl-theme"
                            items= {1}
                            loop
                            margin={10}
                            nav
                        >
                            {
                                this.state.defaultVariantImages.map((img, index) => (
                                    <div className="item">{img.index}
                                    <img src={`data:image/jpeg;base64,${img.image}`} className="img-fluid" alt="Product Image" />
                                    </div>
                                ))
                            }
                            
                            {/* <div className="item">
                                <img src={thumb2} className="img-fluid"  />
                            </div>
                            <div className="item">
                                <img src={thumb2} className="img-fluid"  />
                            </div>
                            <div className="item">
                                <img src={thumb2} className="img-fluid"  />
                            </div>
                            <div className="item">
                                <img src={thumb2} className="img-fluid"  />
                            </div> */}
                        </OwlCarousel>

                    </div>
                    <div className="col-md-1"></div>
                    <div className="col-md-5">
                        <h4>THE ELEMENT OF CONFUSION</h4>
                        <p>$24.95</p>
                        <p><b>Product: </b>Unisex Short Sleeve Classic Tee</p>

                        <div className="col-sm-12">
                            <div className="row">
                                <div className="mr-2 mt-2 border border-secondary py-2 rounded">
                                    <img src={thumb2} className="img-fluid" width="75"  />
                                </div>
                                    
                                <div className="border py-2 rounded mt-2 mr-2">
                                    <img src={thumb2} className="img-fluid" width="75" />
                                </div>
                                <div className="border py-2 rounded mt-2 mr-2">
                                    <img src={thumb2} className="img-fluid" width="75" />
                                </div>
                                <div className="border py-2 rounded mt-2 mr-2">
                                    <img src={thumb2} className="img-fluid" width="75" />
                                </div>
                                <div className="border py-2 rounded mt-2 mr-2">
                                    <img src={thumb2} className="img-fluid" width="75" />
                                </div>
                                <div className="border py-2 rounded mt-2 mr-2">
                                    <img src={thumb2} className="img-fluid" width="75" />
                                </div>
                                <div className="border py-2 rounded mt-2 mr-2">
                                    <img src={thumb2} className="img-fluid" width="75" />
                                </div>
                                <div className="border py-2 rounded mt-2 mr-2">
                                    <img src={thumb2} className="img-fluid" width="75" />
                                </div>
                                <div className="border py-2 rounded mt-2 mr-2">
                                    <img src={thumb2} className="img-fluid" width="75" />
                                </div>
                            </div>
                            

                        </div>


                        <div className="row">
                            <p className="pt-4 mb-1 col-sm-12"><b>Color: </b> Ash</p>
                        </div>

                        <div className="row">
                            <span className="color_outline mx-2 ">
                                <span className="bg-danger product_color rounded-circle"></span>
                            </span>

                            <span className="color_outline mx-2">
                                <span className="bg-primary product_color rounded-circle"></span>
                            </span>
                        </div>
                        

                        <div className="row">
                            <p className="mt-4 pt-2 mb-1 col-sm-12"><b>Size:</b> Select a size</p>
                        </div>
                        <div className="row">
                            <div className="col-sm-12">
                                <span className="size_varient border border-success rounded ">S</span>
                                <span className="size_varient border rounded ">L</span>
                                <span className="size_varient border rounded  text-center">XL</span>
                            </div>
                        </div>

                        <div className="row">
                            <p className="mt-4 mb-1 col-sm-12"><b>Quantity</b></p>
                        </div>
                        
                        <div className="row">
                            <div className="input-group mb-3 col-sm-4 text-center">
                                <div className="input-group-prepend">
                                    <button className="btn btn-outline-secondary" type="button"><b><i className="fa fa-minus"></i></b></button>
                                </div>
                                <input type="text" className="form-control text-center" />
                                <div className="input-group-append">
                                    <button className="btn btn-outline-secondary" type="button"><b><i className="fa fa-plus"></i></b></button>
                                </div>
                            </div>
                        </div>

                        <div className="row form-group">
                            <div className="col-sm-12">
                                <button type="button" className="btn btn-lg buy_now_btn btn-block " onClick={this.buyNowButton}><b>Buy It Now</b></button>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-sm-12">
                                <p className="mb-2"><b>Return & Warranty</b></p>
                            </div>
                            <div className="col-sm-12">
                                <p className="mb-1"><i className="fa fa-shield text-success"></i> 100% Secure payment with SSL Encryption.</p>
                            </div>
                            <div className="col-sm-12">
                            <p className="mb-1"><i className="fa fa-smile-o text-success"></i> If you're not 100% satisfied, let us know and we'll make it right.</p>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-sm-12">
                                <p className="mb-1 mt-2"><b>Product Details</b></p>
                                <ul className="product_li">
                                    <li>6.1-ounce, 100% cotton</li>
                                    <li>Double-needle neck, sleeves and hem; Roomy Unisex Fit</li>
                                    <li>Ash is 99% cotton, 1% poly; Sport Grey is 90% cotton, 10% poly; Dark Heather is 50% cotton, 50% polyester</li>
                                    <li>Decoration type: Digital Print</li>
                                    <li>Made by Gildan</li>
                                </ul>
                            </div>
                        </div>


                        



                    </div>
                </div>
            </div>
        );
    }
}
 
export default ProductInfo;