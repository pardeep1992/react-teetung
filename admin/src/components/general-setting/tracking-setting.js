import React, { Component } from 'react';
import Cookies from 'universal-cookie';
import LeftSideBar from '../left-side-bar/left-side-bar';
import Header from '../header/header';

import Settingform from './tracking-setting-form';

class GeneralSettingForm extends Component {
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

                        <div className="col-md-3 border-right fixed">
                            <LeftSideBar />
                        </div>

                        <div className="col-md-9">

                            <Header {...this.props} />

                            <Settingform />
                            
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}
 
export default GeneralSettingForm;