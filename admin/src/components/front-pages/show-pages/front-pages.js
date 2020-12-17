import React, { Component } from 'react';
import Cookies from 'universal-cookie';
import LeftSideBar from '../../left-side-bar/left-side-bar';
import Header from '../../header/header';
import PagesList from './front-pages-list';

class FrontPages extends Component {
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
                                <div className="col-md-12">
                                    <h4 className="pl-2">Pages</h4>
                                </div>
                            </div>
                            <PagesList/>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}
 
export default FrontPages;