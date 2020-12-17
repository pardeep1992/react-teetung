import React, { Component } from 'react';
import Header from '../header/header';
import Footer from '../footer/footer';
// import ProductsInCart from './products-in-cart';
import {Link, NavLink} from 'react-router-dom';
import update from 'immutability-helper';
// import thumb2 from '../images/thumb2.jpg';
import visa from '../images/visa.svg';
import amex from '../images/amex.svg';
import mastercard from '../images/mastercard.svg';
import discover from '../images/discover.svg';
import paypal from '../images/paypal.svg';
import thumb1 from '../images/thumb1.jpg';
import Cookies from 'universal-cookie';
import baseUrl from '../services/axios-url';
const axios = require('axios');

class Cart extends Component {
    state = {  
        cartProducts: [],
        cartQuantity: '',
        subTotal: '',
        productInfo: [],
        price: '',
        size: [],
        colorCode: [],
        colorName: [],
        sizeForAxios: '',
        colorForAxios: '',
        productIdByModal: '',
        variantId: '',
        modalQuantity: 1,
        totalCartQuantity: '',
        productIdForSimilarProducts: [],
        youMayAlsoLikeProducts: []
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
                    // cartQuantity: response.data.cart[0].Quantity,
                    subTotal: response.data.total,
                    productIdForSimilarProducts: response.data.cart[0].ProductID
                })
            }
        })
        .then((response) => {
            var similarProductIds = [];

            if( this.state.productIdForSimilarProducts && this.state.productIdForSimilarProducts.length > 0 ){

                var similarProductId = [];

                var similarProductId = this.state.productIdForSimilarProducts

                
                similarProductIds = {
                    "product_id": [similarProductId]
                };
                // console.log(similarProductIds)

                axios.post(baseUrl+'getsimilarproducts/', similarProductIds)
                .then(function (response) {
                    // console.log(response.data)
                    if(response.data.responseCode === 200){
                        self.setState({
                            youMayAlsoLikeProducts: response.data.ProductsList
                        })
                    }
                })
                .catch(function (error) {
                    // handle error
                    console.log(error);
                })   
            }                   
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })

        
    }

    removeProductFromCart = (id) => {
        var self = this;
        axios.get(baseUrl+'removefromcart/'+id)
        .then(function (response) {
            // console.log(response.data)
            if(response.data.responseCode === 200){
                window.location.href="/cart"
            }
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
    }

    decreaseQuantity = (e, index) => {
        // console.log(index)
        var cartid = e.currentTarget.getAttribute("cartid");
        
        var data = [];
        
        if(this.state.cartProducts[index].Quantity > 1){

            this.setState({ 
                cartProducts: update(this.state.cartProducts, {[index]: {Quantity: {$set: this.state.cartProducts[index].Quantity-1}}})
            }, function () {
                
                data = {
                    "quantity": this.state.cartProducts[index].Quantity
                }

                var self = this;
                axios.post(baseUrl+'updatecart/'+cartid, data)
                .then(function (response) {
                    self.setState({ subTotal: response.data.total })
                })
                .then((response) => {
                    // console.log('innn')
                        const cookies = new Cookies();
                    var userKey = '';
                    if(cookies.get('UserKey')){
                        userKey = cookies.get('UserKey').toString() 
                    }

                    let dataa = [];

                    dataa = {
                        "usercartkey": userKey
                    }

                    var self = this;
                    axios.post(baseUrl+'getcartcount', dataa)
                    .then(function (response) {
                        // console.log(response.data)
                        if(response.data.responseCode === 200){
                            self.setState({
                                totalCartQuantity: response.data.total
                            })
                        }
                    })
                    .catch(function (error) {
                        // handle error
                        console.log(error);
                    })
                })
                .catch(function (error) {
                    // handle error
                    console.log(error);
                })

           });
        }
    }

    increaseQuantity = (e, index) => {
        var cartid = e.currentTarget.getAttribute("cartid");
        
        var data = [];
        var q = 0;
        q = parseInt(this.state.cartProducts[index].Quantity);
        q = q + 1;
        
        this.setState({ 
            cartProducts: update(this.state.cartProducts, {[index]: {Quantity: {$set: q}}})
        }, function () {

            data = {
                "quantity": this.state.cartProducts[index].Quantity
            }

            var self = this;
            axios.post(baseUrl+'updatecart/'+cartid, data)
            .then(function (response) {
                // console.log(response.data)
                // console.log(response.data.total)
                self.setState({ subTotal: response.data.total })
            })
            .then((response) => {
                // console.log('innn')
                    const cookies = new Cookies();
                var userKey = '';
                if(cookies.get('UserKey')){
                    userKey = cookies.get('UserKey').toString() 
                }

                let dataa = [];

                dataa = {
                    "usercartkey": userKey
                }

                var self = this;
                axios.post(baseUrl+'getcartcount', dataa)
                .then(function (response) {
                    // console.log(response.data)
                    if(response.data.responseCode === 200){
                        self.setState({
                            totalCartQuantity: response.data.total
                        })
                    }
                })
                .catch(function (error) {
                    // handle error
                    console.log(error);
                })
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })

        });
        
    }

    
    handleQuantityChange = (e, index) => {
        var cartid = e.currentTarget.getAttribute("cartid");
        // this.setState({ cartQuantity: e.target.value})
         var data=[];
        this.setState({ 
            cartProducts: update(this.state.cartProducts, {[index]: {Quantity: {$set: e.target.value}}})
        }, function () {
            
            data = {
                "quantity": this.state.cartProducts[index].Quantity
            }

            var self = this;
            axios.post(baseUrl+'updatecart/'+cartid, data)
            .then(function (response) {
                self.setState({ subTotal: response.data.total })
            })
            .then((response) => {
                // console.log('innn')
                    const cookies = new Cookies();
                var userKey = '';
                if(cookies.get('UserKey')){
                    userKey = cookies.get('UserKey').toString() 
                }

                let dataa = [];

                dataa = {
                    "usercartkey": userKey
                }

                var self = this;
                axios.post(baseUrl+'getcartcount', dataa)
                .then(function (response) {
                    // console.log(response.data)
                    if(response.data.responseCode === 200){
                        self.setState({
                            totalCartQuantity: response.data.total
                        })
                    }
                })
                .catch(function (error) {
                    // handle error
                    console.log(error);
                })
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })

        });
        
    }

    hanldleAddMoreItems = (e, productId) => {
        // console.log(productId)
        this.setState({ productIdByModal: productId })
        // const cookies = new Cookies();
        // var userKey = '';

        // if(cookies.get('UserKey')){
        //     userKey = cookies.get('UserKey')
        // }

        var self = this;
        axios.get(baseUrl+'product-detail/'+productId)
        .then(function (response) {
            // console.log(response.data)
            self.setState({
                productInfo: response.data.Product,
                // defaultVariantImages: response.data.Product[0].variant_images,
                // title: response.data.Product[0].title,
                // description: response.data.Product[0].description,
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
    }

    handleSizeChange = (e, s) => {
        // console.log(this.state.productIdByModal)

        this.setState({ 
            sizeForAxios: s,
            colorForAxios: ''
        }, function () { 
            
            let data = [];
            data = {
                "product_id": this.state.productIdByModal,
                "size": this.state.sizeForAxios
            }

            var self = this;
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

        });
    }

    handleColorChange = (e, c) => {
                
        this.setState({ 
            colorForAxios: c
        }, function () { 
            
            let data = [];
            data = {
                "product_id": this.state.productIdByModal,
                "size": this.state.sizeForAxios,
                "color": this.state.colorForAxios
            }

            var self = this;

            if(this.state.sizeForAxios !== '' && this.state.colorForAxios !== ''){
                axios.post(baseUrl+'getvariantdetails', data)
                .then(function (response) {
                    // console.log(response)
                    if(response.data.responseCode === 200){
                        // console.log('inside')
                        self.setState({
                            // defaultVariantImages: response.data.data[0].variant_images,
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

    decreaseModalQuantity = (e) => {

        if(this.state.modalQuantity > 1){
            this.setState({ modalQuantity: this.state.modalQuantity-1 }, function () {
            });
        }
    }

    increaseModalQuantity = (e) => {

        var q = this.state.modalQuantity;
        q = parseInt(q);
        
        this.setState({ modalQuantity: q+1 }, function () {
        });
        
    }

    handleModalQuantityChange = (e) => {

        this.setState({ modalQuantity: e.target.value }, function () {
        });
        
    }

    buyNowButton = (e) => {
        e.preventDefault();

        const cookies = new Cookies();
        var userKey = '';

        if(cookies.get('UserKey')){
            userKey = cookies.get('UserKey')
        }

        var data = [];
        data = {
            "cartkey": userKey,
            "productid":this.state.productIdByModal,
            "quantity":this.state.modalQuantity,
            "variantid":this.state.variantId
        }
        // console.log(data)

        var self = this;

        if(this.state.variantId !== ''){
             axios.post(baseUrl+'addtocart', data)
            .then(function (response) {
                // console.log(response)
                if(response.data.responseCode === 200){
                    // self.setState({redirectToCartPage: true})
                    window.location.reload()
                }
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
        } 
       

    }


    render() { 
        // console.log(this.state.youMayAlsoLikeProducts)
        return ( 
            <div>
                <Header data={this.state.totalCartQuantity} />
                {/* <ProductsInCart /> */}
                <div className="container">
                <h2>Your Cart</h2>
                <div className="row">
                    {/* left side */}
                    <div className="col-md-8">
                        {
                            this.state.cartProducts.map((cart, index) => (
                                
                            
                                <div className="row border p-3" key={index}>
                                    <div className="col-md-3 col-3 " style={{ lineHeight: '9' }}>
                                        
                                        <img src={`data:image/jpeg;base64,${cart.variant_images[0].image}`} className="img-fluid" alt="Product Image" />
                                    </div>
                                    <div className="col-md-9 col-9">
                                        <div className="row">
                                            <div className="col-12">
                                                <h6 className="mb-1">
                                                {cart.product[0].title}
                                                  
                                                    
                                                <i className="fa fa-times cart_close" style={{cursor:'pointer'}}
                                                onClick={e => this.removeProductFromCart(cart._id)}
                                                ></i>
                                                </h6>
                                                
                                            </div>
                                            
                                        </div>
                                        
                                        <small>
                                            {cart.variants[0].color[0]} / {cart.variants[0].size}
                                        </small>

                                        <div className="row">
                                            <div className="input-group p-3 col-9 col-sm-4 text-center">
                                                <div className="input-group-prepend">
                                                    <button className="btn btn-outline-secondary" type="button"
                                                        onClick={e => this.decreaseQuantity(e, index)}
                                                        cartid={cart._id}
                                                        currentquantity={cart.Quantity}
                                                    >
                                                        <b>
                                                            <i className="fa fa-minus"></i>
                                                        </b>
                                                    </button>
                                                </div>
                                                <input type="text" className="form-control text-center" 
                                                    value={cart.Quantity} 
                                                    onChange={e => this.handleQuantityChange(e, index)}
                                                    cartid={cart._id}
                                                />
                                                <div className="input-group-append">
                                                    <button className="btn btn-outline-secondary" type="button"
                                                    onClick={e => this.increaseQuantity(e, index)}
                                                        cartid={cart._id}
                                                    >
                                                        <b>
                                                            <i className="fa fa-plus"></i>
                                                        </b>
                                                    </button>
                                                </div>
                                            </div>

                                        
                                            <div className="col-sm-4 offset-sm-4 col-3">
                                                <p className="text-right mt-4">
                                                ${cart.variants[0].price}
                                                </p>
                                            </div>
                                        </div>
                                        
                                        <a href="#" className="text-success text-underline" data-toggle="modal" data-target="#myModal"
                                        onClick={e => this.hanldleAddMoreItems(e, cart.ProductID)}
                                        >+ Add more items</a>

                                    </div>
                                </div>  
                            ))
                        }
                        <div className="modal" id="myModal">
                            <div className="modal-dialog">
                                <div className="modal-content">

                                {/* <!-- Modal Header --> */}
                                <div className="modal-header my-0 pt-0">
                                    <h4 className="modal-title">{this.state.productInfo.length > 0  ? this.state.productInfo[0].title : ''}</h4>
                                    <button type="button" className="close" data-dismiss="modal">&times;</button>
                                </div>

                                {/* <!-- Modal body --> */}
                                <div className="modal-body">
                                    <div className="row">
                                        <p className="mt-4 pt-2 mb-1 col-sm-12"><b>Size: </b> 
                                        { this.state.sizeForAxios == '' ? 'Select a size' : this.state.sizeForAxios }</p>
                                    </div>
                                    <div className="row">
                                        <div className="col-sm-12">
                                            {
                                                this.state.size.map((s, index) => (
                                                    <button key={index} className="size_varient border rounded btn-outline-successs" 
                                                    onClick={e => this.handleSizeChange(e, s)}
                                                    >
                                                        {s}
                                                    </button>
                                                    
                                                ))
                                            }
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
                                                    onClick={e => this.decreaseModalQuantity(e)}
                                                ><b><i className="fa fa-minus"></i></b></button>
                                            </div>
                                            <input type="text" className="form-control text-center" 
                                                value={this.state.modalQuantity} 
                                                onChange={e => this.handleModalQuantityChange(e)}
                                            />
                                            <div className="input-group-append">
                                                <button className="btn btn-outline-secondary" type="button"
                                                    onClick={e => this.increaseModalQuantity(e)}
                                                    ><b><i className="fa fa-plus"></i></b></button>
                                            </div>
                                        </div>
                                    </div>

                                    <button type="button" className="btn btn-lg buy_now_btn btn-block " onClick={this.buyNowButton}><b>Add to Cart</b></button>

                                </div>

                                </div>
                            </div>
                            </div>
                        {/* <div className="row border p-3">
                            <div className="col-md-3 col-3 " style={{ lineHeight: '9' }}>
                                <img src={thumb2} className="img-fluid"  />
                            </div>
                            <div className="col-md-9 col-9">
                                <div className="row">
                                    <div className="col-12">
                                        <h6 className="mb-1">THE ELEMENT OF CONFUSION 
                                            <i className="fa fa-times cart_close"></i>
                                        </h6>
                                        
                                    </div>
                                
                                </div>
                                
                                <small>Unisex Short Sleeve Classic Tee / Black / S</small>

                                <div className="row">
                                    <div className="input-group p-3 col-9 col-sm-4 text-center">
                                        <div className="input-group-prepend">
                                            <button className="btn btn-outline-secondary" type="button"><b><i className="fa fa-minus"></i></b></button>
                                        </div>
                                        <input type="text" className="form-control text-center" />
                                        <div className="input-group-append">
                                            <button className="btn btn-outline-secondary" type="button"><b><i className="fa fa-plus"></i></b></button>
                                        </div>
                                    </div>

                                  
                                    <div className="col-sm-4 offset-sm-4 col-3">
                                        <p className="text-right mt-4"> $24.95</p>
                                    </div>
                                </div>
                                
                                <a href="#" className="text-success text-underline">+ Add more items</a>

                            </div>
                        </div>  */}

                    </div>
                    {/* left side end */}

                    {/* right side */}
                    <div className="col-md-4 mobile_mt_25">
                        <div className="row">
                            <div className="col-md-6 col-6 mb-3">
                                <small> <p><b>Subtotal </b> 
                                {/* (8 items)  */}
                                </p></small>
                               
                            </div>
                            <div className="col-md-6 col-6">
                                <p className="text-right">${this.state.subTotal}</p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <Link to="/checkout" >
                                    <button className="btn btn-lg buy_now_btn btn-block">
                                        <b>
                                            <i className="fa fa-shield"> </i> &nbsp; 
                                        Proceed to Checkout
                                        </b>
                                    </button>
                                </Link>
                            </div>
                        </div>

                        <div className="row text-center mt-3">
                            <div className="col-md-12">
                                <img src={visa} width="35" className="m-1 img-fluid" alt=" "/>
                                <img src={amex} width="35" className="m-1 img-fluid" alt=" "/>
                                <img src={mastercard} width="35" className="m-1 img-fluid" alt=" "/>
                                <img src={discover} width="35" className="m-1 img-fluid" alt=" "/>
                                <img src={paypal} width="35" className="m-1 img-fluid" alt=" "/>
                            </div>
                            
                        </div>

                    </div>
                    {/* right side end */}
                </div> {/* row end */}
                
                <div className="row">
                    <div className="col-md-12">
                    <h2 className="text-center mt-5">You may also like</h2>
                    </div>
                </div>

                <div className="row my-3">
                {
                        this.state.youMayAlsoLikeProducts.map((product, index) => (
                            <div className="col-sm-6 col-md-3 text-center" key={index}>
                                {/* <NavLink to={"product-detail/"+product._id} className="productThumb"> */}
                                    
                                    <img src={`data:image/jpeg;base64,${product[0].variant_images[0].image}`} className="img-fluid" alt="Product Image" />
                                    
                                    
                                    <div className="title">{product[0].title}</div>
                                    <div className="price">
                                    $ {product[0].variants[0].price}
                                    </div>
                                    <button className="btn btn-block btn-success btn-sm mt-2" data-toggle="modal" data-target="#myModal"
                                        onClick={e => this.hanldleAddMoreItems(e, product[0]._id)}>Add To Cart</button>
                                {/* </NavLink> */}
                            </div>
                        ))
                    }
                        {/* <div className="col-lg-3 col-md-6 col-sm-12 text-center ">
                            <a href="#" className="productThumb">
                                <img src={thumb1} className="img-fluid" alt="" />
                                <div className="title">Bob Seger Travelin' The Man The Final Tour 2019 T Shirt Black Cotton Men S-6XL</div>
                                <div className="price">$24.99</div>
                                <button className="btn btn-block btn-success btn-sm mt-2">Add To Cart</button>
                            </a>
                        </div> */}
                        

                    </div>

            </div> 
                <Footer />
            </div>
         );
    }
}
 
export default Cart;