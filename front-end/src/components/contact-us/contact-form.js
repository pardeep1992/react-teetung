import React, { Component } from 'react';

class ContactForm extends Component {
    
    render() { 
        return ( 
            <div className="container">
                <h2>Contact Us</h2>
                <form method="post">
                    <div className="form-group">
                        <label>Your Name</label>
                        <input type="text" name="name" className="form-control" />
                    </div>
                    <div className="form-group">
                        <label>Your Email</label>
                        <input type="email" name="email" className="form-control" />
                    </div>
                    <div className="form-group">
                        <label>Message</label>
                        <textarea rows="7" className="form-control"></textarea>
                    </div>
                    <button type="button" className="btn btn-info btn-block">Submit</button>
                </form>
            </div>
        );
    }
}
 
export default ContactForm;