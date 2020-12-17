import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';
import baseUrl from '../../services/axios-url';
const axios = require('axios');

class CollectionsList extends Component {
    state = { 
        collections: []
    }

    componentDidMount(){
        axios.post(baseUrl+'getCollections')
          .then(response => {
              var data = response.data.CollectionsList;
              if(response.data.responseCode === 200){
                  this.setState({ collections: data })
                  console.log(data);
            }
          })
          .catch(function (error) {
            console.log(error);
          });
        // API("", "getCollections", "POST")
        
        // .then(resp => {
            // console.log(resp);
            // if(resp.responseCode === 200){
            //     this.setState({
            //         alertdisp: 1, 
            //         erralertdisp: 0,
            //         title: '',
            //         description: '',
            //         collection: '',
            //         homepage: '',
            //         editorState: undefined
            //     })
            // } else {
            //     this.setState({erralertdisp: 1, alertdisp: 0})
            // }
        // })
    }
    render() { 
        return (  
            <React.Fragment>
                <div>
                <table className="table mt-4">
                    <thead>
                        <tr className="bg-dark text-light">
                            <td>Cover</td>
                            <td>Title</td>
                            <td>Type</td>
                            <td>Created</td>
                        </tr>
                    </thead>
                    
                
                {this.state.collections.map((collection) => (
                    <tbody>
                         <tr>
                            <td>Cover</td>
                            <td>
                                <NavLink to={"/collections/"+collection._id}>{collection.title}</NavLink> 
                            </td>
                            <td>{collection.collections}</td>
                            <td>{collection.created_on}</td>
                        </tr>
                    </tbody>
                       
                    
                ))}
                </table>
                </div>
            </React.Fragment>
        );
    }
}
 
export default CollectionsList;