import React, { Component } from 'react';
import { Route, Redirect } from 'react-router'
import Header from '../header/header';
import Footer from '../footer/footer';
// import ProductInfo from './product-info';
import thumb2 from '../images/thumb2.jpg';
// import OwlCarousel from 'react-owl-carousel';
// import 'owl.carousel/dist/assets/owl.carousel.css';
// import 'owl.carousel/dist/assets/owl.theme.default.css';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import Cookies from 'universal-cookie';
import baseUrl from '../services/axios-url';
const axios = require('axios');


class ProductDetail extends Component {
    state = { 
        productInfo: [],
        redirectToCartPage: false,
        defaultVariantImages: [],
        title: '',
        description: '',
        price: '',
        size: [],
        colorCode: [],
        colorName: [],
        quantity: 1,
        sizeForAxios: '',
        colorForAxios: '',
        variantId: ''
    }

    componentDidMount() {
        const product_id = this.props.match.params.id
        var self = this;
        axios.get(baseUrl+'product-detail/'+product_id)
        .then(function (response) {
            // console.log(response)
            self.setState({
                productInfo: response.data.Product,
                defaultVariantImages: response.data.Product[0].variant_images,
                title: response.data.Product[0].title,
                description: response.data.Product[0].description,
                price: response.data.Product[0].variants[0].price,
                size: response.data.Product[0].sizegroup,
                colorCode: response.data.Product[0].colorcode,
                colorName: response.data.Product[0].colorgroup
            })
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
        .finally(function () {
            // always executed
        });
        
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
            "productid":this.props.match.params.id,
            "quantity":this.state.quantity,
            "variantid":this.state.variantId
        }

        if(this.state.variantId != '') {
            var self = this;
            axios.post(baseUrl+'addtocart', data)
            .then(function (response) {
                console.log(response)
                if(response.data.responseCode === 200){
                    self.setState({redirectToCartPage: true})
                }
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
        }
        // console.log(data)

        

    }

    decreaseQuantity = (e) => {

        if(this.state.quantity > 1){
            this.setState({ quantity: this.state.quantity-1 }, function () {
            });
        }
    }

    increaseQuantity = (e) => {

        var q = this.state.quantity;
        q = parseInt(q);
        
        this.setState({ quantity: q+1 }, function () {
        });
        
    }

    handleQuantityChange = (e) => {

        this.setState({ quantity: e.target.value }, function () {
        });
        
    }

    handleSizeChange = (e, s) => {

        var productId = this.props.match.params.id

        this.setState({ 
            sizeForAxios: s,
            colorForAxios: ''
        }, function () { 
            // console.log(this.state.colorForAxios)

            let data = [];
            data = {
                "product_id": productId,
                "size": this.state.sizeForAxios
            }

            var self = this;
        if(this.state.sizeForAxios != ''){
            axios.post(baseUrl+'getvariantdetails', data)
            .then(function (response) {
                // console.log(response.data)
                if(response.data.responseCode === 200){
                    self.setState({
                        colorCode: response.data.variantsdata.colorcode,
                        colorName: response.data.variantsdata.colorgroup,
                        colorForAxios: ''
                    })
                    
                }
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
        }
            

        });
    }
    
    handleColorChange = (e, c) => {

        var productId = this.props.match.params.id
                
        this.setState({ 
            colorForAxios: c
        }, function () { 
            
            let data = [];
            data = {
                "product_id": productId,
                "size": this.state.sizeForAxios,
                "color": this.state.colorForAxios
            }

            var self = this;
            if(this.state.colorForAxios != '' && this.state.sizeForAxios != ''){
                axios.post(baseUrl+'getvariantdetails', data)
                .then(function (response) {
                    // console.log(response)
                    console.log(response.data.data[0].variant_images)
                    if(response.data.responseCode === 200){
                        self.setState({
                            defaultVariantImages: response.data.data[0].variant_images,
                            variantId: response.data.data[0]._id
                        })
                        
                    }
                })
                .catch(function (error) {
                    // handle error
                    console.log(error);
                })
            }
            

        });

        
    }
    

    render() { 
        console.log(this.state.colorForAxios)

        if (this.state.redirectToCartPage) {
            return <Redirect to = {{ pathname: "/cart" }} />;
        }

        return (
            <div>
                <Header />
                {/* detail */}
                <div className="container mt-5">
                    <div className="row">
                        <div className="col-md-6">
                        <Carousel
                            infiniteLoop
                            autoPlay
                            showThumbs={false}
                        >
                        {
                            this.state.defaultVariantImages.map((img, index) => (
                                <div key={index}>
                                    <img src={`data:image/jpeg;base64,${img.image}`} className="img-fluid" alt="Product Image" />
                                </div>
                
                            ))
                        }
                        </Carousel>
                            

                        </div>
                        <div className="col-md-1"></div>
                        <div className="col-md-5">
                            <h4>{this.state.title}</h4>
                            <p>${ this.state.price }</p>
                            {/* <p><b>Product: </b>Unisex Short Sleeve Classic Tee</p> */}

                            <div className="col-sm-12">
                                {/* <div className="row">
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
                                </div> */}
                                

                            </div>

                            <div className="row">
                                <p className="mt-4 pt-2 mb-1 col-sm-12"><b>Size: </b> 
                                { this.state.sizeForAxios == '' ? 'Select a size' : this.state.sizeForAxios }</p>
                            </div>
                            <div className="row size-validate">
                                <div className="col-sm-12">
                                    {
                                        this.state.size.map((s, index) => (
                                            <button key={index} className="size_varient border rounded btn-outline-successs" 
                                            onClick={e => this.handleSizeChange(e, s)}>
                                                {s}
                                            </button>
                                            
                                        ))
                                    }
                                    {/* <span className="size_varient border border-success rounded ">S</span> */}
                                </div>
                            </div>

                            <div className="row">
                                <p className="pt-4 mb-1 col-sm-12"><b>Color: </b></p>
                            </div>

                            <div className="row">
                                {
                                    this.state.colorCode.map((c, index) =>(
                                        
                                        <span className="color_outline mx-2" key={index}>
                                            <span className="product_color rounded-circle" style={{backgroundColor: c}} 
                                                onClick={e => this.handleColorChange(e, c)}
                                            ></span>
                                        </span>
                                        
                                    ))
                                }
                            </div>

                            <div className="row">
                                <p className="mt-4 mb-1 col-sm-12"><b>Quantity</b></p>
                            </div>
                            
                            <div className="row">
                                <div className="input-group mb-3 col-sm-4 text-center">
                                    <div className="input-group-prepend">
                                        <button className="btn btn-outline-secondary" type="button"
                                            onClick={e => this.decreaseQuantity(e)}
                                        ><b><i className="fa fa-minus"></i></b></button>
                                    </div>
                                    <input type="text" className="form-control text-center" 
                                        value={this.state.quantity} 
                                        onChange={e => this.handleQuantityChange(e)}
                                    />
                                    <div className="input-group-append">
                                        <button className="btn btn-outline-secondary" type="button"
                                            onClick={e => this.increaseQuantity(e)}
                                            ><b><i className="fa fa-plus"></i></b></button>
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
                                        {this.state.description}
                                    {/* <ul className="product_li">
                                        <li>6.1-ounce, 100% cotton</li>
                                        <li>Double-needle neck, sleeves and hem; Roomy Unisex Fit</li>
                                        <li>Ash is 99% cotton, 1% poly; Sport Grey is 90% cotton, 10% poly; Dark Heather is 50% cotton, 50% polyester</li>
                                        <li>Decoration type: Digital Print</li>
                                        <li>Made by Gildan</li>
                                    </ul> */}
                                </div>
                            </div>


                            



                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
}
 
export default ProductDetail;