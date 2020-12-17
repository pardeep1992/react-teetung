import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';

class CollectionsNameAndBtn extends Component {
    render() { 
        return (  
            <React.Fragment>
                <div className="row mt-3">
                    <div className="col-md-6">
                        <h4>Collections</h4>
                    </div>
                    <div className="col-md-6">
                        <NavLink exact to="/collection/new" className="btn btn-primary float-right">
                            Create Collection
                        </NavLink>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}
 
export default CollectionsNameAndBtn;