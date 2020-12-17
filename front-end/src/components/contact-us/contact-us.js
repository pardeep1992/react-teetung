import React, { Component } from 'react';
import Header from '../header/header';
import Footer from '../footer/footer';
import ContactForm from './contact-form';

class ContactUs extends Component {
    state = {  }
    render() { 
        return ( 
            <div>
                <Header />
                <ContactForm />
                <Footer />
            </div>
        );
    }
}
 
export default ContactUs;