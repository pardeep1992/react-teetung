import React, { Component } from 'react';
import Cookies from 'universal-cookie';
import LeftSideBar from '../../left-side-bar/left-side-bar';
import Header from '../../header/header';

import ProductNameAndBtn from './product-btn';
import baseUrl from '../../services/axios-url';
const axios = require('axios');

class Collections extends Component {
    constructor (props) {
        super(props);
        
        // redirect to login page in not sign in
        const cookies = new Cookies();
        if(cookies.get('Auth') !== 'true'){
            this.props.history.push("/");
        } 

    }

    state = {
        productsList: []
    }

    componentDidMount(){
        axios.post('getProductsList')
          .then(response => {
              var data = response.data.ProductsList;
              if(response.data.responseCode === 200){
                  this.setState({ productsList: data })
                  console.log(this.state.productsList);
            }
          })
          .catch(function (error) {
            console.log(error);
          });
    }

    render() { 
        return (  
            <React.Fragment>
                <div className="container-fluid">
                    <div className="row">

                        <div className="col-md-3 border-right">
                            <LeftSideBar />
                        </div>

                        <div className="col-md-9">

                            <Header {...this.props} />

                            <ProductNameAndBtn />

                            <table className="table mt-3">
                                <tr>
                                    <td></td>
                                    <td>Name</td>
                                    <td>Collections</td>
                                    <td>Tags</td>
                                    <td>Satus</td>
                                </tr>
                                {this.state.productsList.map((product) => (
                                    <tbody>
                                        <tr>
                                            <td>Cover</td>
                                            <td>
                                                {product.title}
                                                {/* <NavLink to={"/collections/"+collection._id}>{collection.title}</NavLink>  */}
                                            </td>
                                            <td></td>
                                            <td></td>
                                            <td>{product.status}</td>
                                        </tr>
                                    </tbody>
                                    
                                    
                                ))}
                            </table>
                            
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}
 
export default Collections;