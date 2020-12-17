import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';
import Header from '../header/header';
import Footer from '../footer/footer';
import baseUrl from '../services/axios-url';
const axios = require('axios');

class Search extends Component {
    state = {  
        products: [],
        reload: 0
    }

    componentDidMount() {

        let data = [];
        
        data = {
            "search":this.props.location.state.search
        }
        // console.log(this.props.location.state.search)

        var self = this;
        axios.post(baseUrl+'searchproduct/', data)
        .then(function (response) {
            console.log(response)
            self.setState({
                products: response.data.Product,
                reload: 1
            })
            if(this.state.reload == 1){
                window.location.reload()
            }
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
    }

    render() { 
        console.log(this.state)
        return (  
            <React.Fragment>
                <Header />
                <div className="container">
                    <p className="mt-4">Search Results for</p>
                    <h3 className="mt-0 pt-0 pb-4">"{this.props.location.state.search}"</h3>
                <div className="row my-3"> 
                    {
                        this.state.products.map((product, index) => (
                            <div className="col-sm-6 col-md-3 text-center" key={index}>
                                <NavLink to={"product-detail/"+product._id} className="productThumb">
                                    
                                    <img src={`data:image/jpeg;base64,${product.variant_images[0].image}`} className="img-fluid" alt="Product Image" />
                                    
                                    
                                    <div className="title">{product.title}</div>
                                    <div className="price">
                                    $ {product.variants[0].price}
                                    </div>
                                </NavLink>
                            </div>
                        ))
                    }
                </div>
                </div>

                <Footer />
            </React.Fragment>
           
        );
    }
}
 
export default Search;