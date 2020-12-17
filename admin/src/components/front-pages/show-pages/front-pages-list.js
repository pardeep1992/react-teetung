import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';
import API from '../../services/api-request';
import BaseUrl from '../../services/axios-url';
const axios = require('axios');
var a=1;
class pagesList extends Component {
    state = { 
        pages: []
    }
    componentDidMount(){
        axios.post(BaseUrl+'getpages')
          .then(response => {
              var data = response.data.pages;
              if(response.data.responseCode === 200){
                  this.setState({ pages: data })
                  console.log(response);
                  //console.log(BaseUrl);
            }
          })
          .catch(function (error) {
            console.log(error);
          });
    }
    render() { 
        return (  
            <React.Fragment>
                <div>
                <table className="table mt-4">
                    <thead>
                        <tr className="bg-dark text-light">
                            <td>#</td>
                            <td>Page Name</td>
                            <td>Slug</td>
                            <td>Updated At</td>
                        </tr>
                    </thead>
                    <tbody>
                {  this.state.pages.map((page) => (
                        <tr key={page._id}>
                            <td>{a++}</td>
                            <td>
                                <NavLink to={"/pages/"+page.slug}>{page.pageName}</NavLink> 
                            </td>
                            <td>{page.slug}</td>
                            <td>{page.updated_on}</td>
                        </tr>
                    
                ))}
                    </tbody>
                </table>
                </div>
            </React.Fragment>
        );
    }
}
 
export default pagesList;