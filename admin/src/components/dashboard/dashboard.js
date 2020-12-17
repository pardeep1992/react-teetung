import React, { Component } from 'react';
import Cookies from 'universal-cookie';
import LeftSideBar from '../left-side-bar/left-side-bar';
import Header from '../header/header';

class Dashboard extends Component {
    constructor (props) {
        super(props);
        
        // redirect to login page in not sign in
        const cookies = new Cookies();
        if(cookies.get('Auth') !== 'true'){
            this.props.history.push("/");
        } 

    }
    
    state = {  }
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
                            <h4>Dashboard</h4>
                        </div>
                    </div>
                </div>
            </React.Fragment>
            
            
        );
    }
}
 
export default Dashboard;