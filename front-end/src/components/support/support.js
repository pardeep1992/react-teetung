import React, { Component } from 'react';
import Header from '../header/header';
import Footer from '../footer/footer';
import SupportContent from './supportcontent';

class Support extends Component {
    state = {  }
    render() { 
        return ( 
            <div>
                <Header />
                <SupportContent />
                <Footer />
            </div>
         );
    }
}
 
export default Support;