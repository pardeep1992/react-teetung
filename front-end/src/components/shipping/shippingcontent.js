import React, { Component } from 'react';
import baseUrl from '../services/axios-url';
const axios = require('axios');

class ShippingContent extends Component {
    state = {  
        data: []
    }

    componentDidMount (){
        var self = this;
        axios.post(baseUrl+'getpagesbyId/shipping')
        .then(function (response) {
            console.log(response)
            self.setState({
                data: response.data.data[0].pageContent
            })
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
    }

    rawMarkup(){
        var rawMarkup = this.state.data;
        return { __html: rawMarkup };
    }

    render() { 
        return ( 
            <div className="container py-3">
                <div className="container py-3">
                    <div dangerouslySetInnerHTML={this.rawMarkup()} />
                </div>
            </div>
         );
    }
}
 
export default ShippingContent;