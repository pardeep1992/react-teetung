import React, { Component } from 'react';
import Cookies from 'universal-cookie';
import LeftSideBar from '../../left-side-bar/left-side-bar';
import Header from '../../header/header';
import {NavLink} from 'react-router-dom'; 
import CollectionForm from './collection-form';
import '../../css/style.css';

class CreateCollection extends Component {
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
                            
                            {/* back to all collections */}
                            <NavLink exact to="/collections" >
                                <p> <i className="fa fa-caret-left mr-3 ml-2 mt-3"></i> Collection</p> 
                            </NavLink>

                            {/* create collectkion */}
                            <h3>Create collection</h3>

                            <div className="container">
                                {/* -- form -- */}
                            
                                <CollectionForm />
                                    
                            </div>
                            
                            
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}
 
export default CreateCollection;