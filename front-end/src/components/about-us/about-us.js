import React, { Component } from 'react';
import Header from '../header/header';
import Footer from '../footer/footer';
import baseUrl from '../services/axios-url';
const axios = require('axios');

class AboutUs extends Component {
    state = {  
        data: []
    }

    componentDidMount (){
        var self = this;
        axios.post(baseUrl+'getpagesbyId/about-us')
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
                    <h2>About us</h2>
                    <div dangerouslySetInnerHTML={this.rawMarkup()} />
                </div>

                <Footer />
            </div>    
        );
    }
}
 
export default AboutUs;