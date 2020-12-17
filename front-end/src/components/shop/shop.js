import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';
import Header from '../header/header';
import Footer from '../footer/footer';
import thumb1 from '../images/thumb1.jpg';
import baseUrl from '../services/axios-url';
import Pagination from "react-js-pagination";
const axios = require('axios');
// require("bootstrap/less/bootstrap.less");

class Shop extends Component {
    state = {  
        activePage: 1,
        products: []
    }

    handlePageChange = (pageNumber) => {
        var self = this;
        console.log(`active page is ${pageNumber}`);
        self.setState({activePage: pageNumber});

        axios.get(baseUrl+'getproductshop/'+pageNumber)
        .then(function (response) {
            console.log(response)
            self.setState({products: response.data.ProductsList})
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
    }

    componentDidMount() {
        var self = this;
        axios.get(baseUrl+'getproductshop/1')
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
            <div>
                <Header />
                <div className="container">
                    <h2 className="text-center">Products</h2>

                    <div className="row my-3"> 
                    {
                        this.state.products.map((product, index) => (
                            <div className="col-sm-6 col-md-3 text-center" key={index}>
                                <NavLink to={"product-detail/"+product._id} className="productThumb">
                                    <img src={`data:image/jpeg;base64,${product.variant_images[0].image}`} className="img-fluid" alt="" />
                                    {/* <img src={thumb1} className="img-fluid" alt="" /> */}
                                    <div className="title py-2">{product.title}</div>
                                    <div className="price">
                                    $ {product.variants[0].price}
                                    </div>
                                </NavLink>
                            </div>
                        ))
                    }
                    
                    
                   
                    </div>

                    <div className="row">
                        <center>
                            <Pagination
                                activePage={this.state.activePage}
                                itemsCountPerPage={12}
                                totalItemsCount={2}
                                pageRangeDisplayed={5}
                                onChange={this.handlePageChange}
                            />
                        </center>
                    </div>
                   

                </div>

                <Footer />
            </div>
            
         );
    }
}
 
export default Shop;