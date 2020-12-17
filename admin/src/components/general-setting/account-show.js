import React, { Component } from 'react';
import Cookies from 'universal-cookie';
import LeftSideBar from '../left-side-bar/left-side-bar';
import Header from '../header/header';

import AcountsList from './accountList';

class Collections extends Component {
    constructor (props) {
        super(props);
        
        // redirect to login page in not sign in
        const cookies = new Cookies();
        if(cookies.get('Auth') !== 'true'){
            this.props.history.push("/");
        } 

    }

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

                            <div className="row mt-3">
                                <div className="col-md-6">
                                    <h4 className="pl-2">Accounts</h4>
                                </div>
                                <div className="col-md-6 ">
                                    <button className="btn btn-primary pull-right" type="button" data-toggle="modal" data-target="#myModal">New Account</button>
                                </div>
                            </div>

                            <AcountsList />
                            
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}
 
export default Collections;