import React, { Component } from 'react';
import Header from '../header/header';
import Footer from '../footer/footer';
import baseUrl from '../services/axios-url';
const axios = require('axios');

class PrivacyPolicy extends Component {
    state = {  
        data: []
    }

    componentDidMount (){
        var self = this;
        axios.post(baseUrl+'getpagesbyId/privacy')
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
            <div>
                <Header />
                <div className="container">
                    <div className="container py-3">
                        <div dangerouslySetInnerHTML={this.rawMarkup()} />
                    </div>
                </div>

                <Footer />
            </div>
        );
    }
}
 
export default PrivacyPolicy;