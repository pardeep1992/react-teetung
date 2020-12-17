import React, { Component } from 'react';
import Cookies from 'universal-cookie';
// import { hashHistory } from 'react-router-dom';

class Header extends Component {
    // constructor (props){
    //     super(props);
    // }
    
    logout = () => {
        const cookies = new Cookies();
        cookies.remove('Auth');
        this.props.history.push("/");
        // hashHistory.push('/');
    }
    

    render() { 
        return ( 
            <div className="row py-3 border-bottom">
                
                <div className="col-md-1 py-2"><i className="fa fa-bars"></i> </div>
                    <h2 className="col-md-5"> &nbsp;TMD Store</h2>
                    <div className="col-md-6 text-right">
                    <button onClick={this.logout} className="btn " >Logout</button>

                    </div>
                
            </div>
        );
    }
}
 
export default Header;