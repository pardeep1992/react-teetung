import React, { Component } from 'react';
import '../css/style.css';
import {NavLink} from 'react-router-dom';
import thumb1 from '../images/thumb1.jpg';
import baseUrl from '../services/axios-url';
const axios = require('axios');

class EditorPick extends Component {
    state = { 
        products: []
    }

    componentDidMount() {
        var self = this;
        axios.get(baseUrl+'getproducthome/')
        .then(function (response) {
            console.log(response)
            self.setState({products: response.data.ProductsList})
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
    }


    render() { 
        return ( 
            <div className="container my-5">
                <h2 className="text-center py-3">Editor' Picks</h2>

                {/* products list */}
                <div className="row my-3"> 
                    {
                        this.state.products.map((product, index) => (
                            <div className="col-sm-6 col-md-3 text-center" key={index}>
                                <NavLink to={"product-detail/"+product._id} className="productThumb">
                                    
                                        <img src={`data:image/jpeg;base64,${product.variant_image[0].image}`} className="img-fluid" alt="Product Image" />
                                    
                                    
                                    <div className="title">{product.title}</div>
                                    <div className="price">
                                    $ {product.variants[0].price}
                                    </div>
                                </NavLink>
                            </div>
                        ))
                    }
                </div>

                {/* <div className="row my-3"> 
                    <div className="col-sm-6 col-md-3 text-center ">
                        <a href="#" className="productThumb">
                            <img src={thumb1} className="img-fluid" alt="" />
                            <div className="title">Bob Seger Travelin' The Man The Final Tour 2019 T Shirt Black Cotton Men S-6XL</div>
                            <div className="price">$24.99</div>
                        </a>
                    </div>
                    
                    <div className="col-sm-6 col-md-3 text-center ">
                        <a href="#" className="productThumb">
                            <img src={thumb1} className="img-fluid" alt="" />
                            <div className="title">Bob Seger Travelin' The Man The Final Tour 2019 T Shirt Black Cotton Men S-6XL</div>
                            <div className="price">$24.99</div>
                        </a>
                    </div>

                    <div className="col-sm-6 col-md-3 text-center ">
                        <a href="#" className="productThumb">
                            <img src={thumb1} className="img-fluid" alt="" />
                            <div className="title">Bob Seger Travelin' The Man The Final Tour 2019 T Shirt Black Cotton Men S-6XL</div>
                            <div className="price">$24.99</div>
                        </a>
                    </div>

                    <div className="col-sm-6 col-md-3 text-center ">
                        <a href="#" className="productThumb">
                            <img src={thumb1} className="img-fluid" alt="" />
                            <div className="title">Bob Seger Travelin' The Man The Final Tour 2019 T Shirt Black Cotton Men S-6XL</div>
                            <div className="price">$24.99</div>
                        </a>
                    </div>
                </div>

                <div className="text-center my-5">
                    <button className="btn btn-success btn-lg mb-5">
                        <Link to="/shop" exact="/shop" className="text-white">ViewMore</Link> 
                    </button>
                </div> */}
                

            </div> 
        );
    }
}
 
export default EditorPick;