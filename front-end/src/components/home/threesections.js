import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import satisfaction from '../images/satisfaction.png';
import secure from '../images/secure.png';
import shipping from '../images/shipping.png';

class Threesections extends Component {
    state = {  }
    render() { 
        return ( 
            <div className="container my-5">
                <div className="row text-center py-5">
                    <div className="col-sm-4">
                        <img src={satisfaction} alt="" className="img-fluid" />
                        <p>100% Satisfaction</p>
                        <span className="text-muted">
                            If you are not 100% satisfied, we will take your order back within 30 days.
                        </span> <br />
                        <Link to="#">Learn More</Link> 
                    </div>

                    <div className="col-sm-4">
                        <img src={secure} alt="" className="img-fluid" />
                        <p>Secure Payment</p>
                        <span className="text-muted">
                            We use encrypted SSL security to ensure that your credit card information is 100% protected.
                        </span>
                    </div>

                    <div className="col-sm-4">
                        <img src={shipping} alt="" className="img-fluid" />
                        <p>Worldwide Shipping</p>
                        <span className="text-muted">
                            Available as Standard or Express delivery.
                        </span>
                    </div>
                </div>
            </div>
         );
    }
}
 
export default Threesections;