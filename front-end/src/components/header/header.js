import React, { Component } from 'react';
import {NavLink, Redirect} from 'react-router-dom';
import Cookies from 'universal-cookie';
import baseUrl from '../services/axios-url';
const axios = require('axios');

class Header extends Component {
    state = {  
        totalCartQuantity: '',
        searchValue: '',
        redirectToSearchPage: false
    }

    componentDidMount () {
        const cookies = new Cookies();
        var userKey = '';
        if(cookies.get('UserKey')){
            userKey = cookies.get('UserKey').toString() 
        }
        
        let data = [];

        data = {
            "usercartkey": userKey
        }

        var self = this;
        axios.post(baseUrl+'getcartcount', data)
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
    }

    handleSearch = (e) => {
        e.preventDefault()
        // console.log(this.state.searchValue)
        this.setState({ redirectToSearchPage: true })
    }

    getPath = (e) => {
        // this.props.location
        // console.log(this.props.location)
    }
    

    render() { 
        // console.log(this.props.data)

        if (this.state.redirectToSearchPage) {
            return (<Redirect to = {{ 
                pathname: "/search",
                state: { search: this.state.searchValue }
            }} />);
        }

        return ( 
            <div className=" border-bottom py-3">
                <nav className="navbar navbar-expand-lg navbar-light bg-light container z-index-99">
                    <NavLink className="navbar-brand" activeClassName="active" exact to="/">Tee Tung</NavLink>

                    <div className="mobile_srch_cart" style={{ display: 'none' }}>
                        <i className="fa fa-search" id="show_search_form"></i>               
                            
                        <i className="fa fa-shopping-cart"></i>
                        <span className="cart_products">
                        {this.state.totalCartQuantity == 0 ? '0' : this.state.totalCartQuantity}    
                        </span>    
                    </div>

                    <form className="search_form_mobile px-3" style={{ display: 'none' }}>
                        <div className="input-group mb-3">
                            <input type="text" className="form-control" placeholder="What are you looking for ?" aria-describedby="basic-addon2" />
                            <div className="input-group-append">
                                <button className="btn btn-secondary" type="button">
                                    <i className="fa fa-search"></i>
                                </button>
                            </div>
                        
                            <i className="fa fa-times close_search_form"></i>
                       
                        </div>

                    </form>

                    

                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto" style={{ margin: 'auto' }}>
                            <li className="nav-item">
                                <NavLink className="nav-link" activeClassName="active" exact to="/" >Home </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" activeClassName="active" exact to="/shop" >Shop</NavLink>
                                {/* <a href="#" className="nav-link">Shop</a> */}
                            </li> 
                            
                            <li className="nav-item">
                                <NavLink className="nav-link" activeClassName="active" exact to="/track-order">Track Order</NavLink>
                                {/* <a href="#" className="nav-link">Track Order</a> */}
                            </li>

                            <li className="nav-item">
                                <NavLink className="nav-link" activeClassName="active" exact to="/shipping" >Shipping</NavLink>
                                {/* <a href="#" className="nav-link">Shipping</a> */}
                            </li>

                            <li className="nav-item">
                                <NavLink className="nav-link" activeClassName="active" exact to="/support">Support</NavLink>
                                {/* <a href="#" className="nav-link">Support</a> */}
                            </li>
                        </ul>
                        
                        <form className="form-inline my-2 my-lg-0 col-sm-4 disp_none_mobile" method="post" onSubmit={e => this.handleSearch(e)}>
                            <input className="form-control mr-sm-2 col-sm-12" type="search" placeholder="What are you looking for?" aria-label="Search" value={this.state.searchValue}
                            onChange={e => this.setState({searchValue: e.target.value})} />
                        </form>

                        <NavLink to={"/cart"} >
                        <div className="desktop_cart_icon disp_none_mobile text-dark">
                            <i className="fa fa-shopping-cart"></i>
                            <span>
                            {/* {this.state.totalCartQuantity == 0 ? '0' : this.state.totalCartQuantity}  */}
                            {/* {this.props.data == '' ? 
                                this.props.data != '' ? 
                                this.state.totalCartQuantity == 0 ? this.state.totalCartQuantity > 0 ?  this.state.totalCartQuantity : 
                                '0' :
                                this.props.data : 
                                this.state.totalCartQuantity : 
                                
                                this.state.totalCartQuantity
                                } */}
                                {
                                    this.props.data == '' && this.state.totalCartQuantity == 0 ? 
                                    this.props.data != '' ? 
                                    this.state.totalCartQuantity == 0 ? 
                                    this.state.totalCartQuantity > 0 ?  
                                    this.state.totalCartQuantity : 
                                    '0' :
                                    this.props.data : 
                                    this.state.totalCartQuantity : 
                                    
                                    this.state.totalCartQuantity
                                }

                                {/* {this.getPath} */}
                            </span>
                        </div>
                        </NavLink>
                        
                        
                    </div>
                </nav>  
            </div>
            

        );
    }
}
 
export default Header;