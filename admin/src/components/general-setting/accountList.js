import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';
import API from '../services/api-request';
import BaseUrl from '../services/axios-url';
const axios = require('axios');

class pagesList extends Component {
    state = { 
        users: [],
        a:1,
        userName:'',
        userRole:''
    }

    EmailHandler = (e) => {
        this.setState({userName:e.target.value});
        //console.log(e.target.value);
    }

    RoleHandler = (e) => {
        this.setState({userRole:e.target.value});
        console.log(e.target.value);
    }

    SubmitHandler = (e) =>{
        var today = new Date();
        let data = {
          email:this.state.userName,
          role:this.state.userRole,
          password:'12345678',
          created_on:today.toLocaleString()
      }
      console.log(data);
      API(data, "createusers", "POST")
      .then(resp => {
          console.log(resp);
          if(resp.responseCode === 200){
              alert('Create Successfully');
              this.componentDidMount();
          } else {
              //this.setState({erralertdisp: 1, alertdisp: 0})
              console.log('Error');
          }
      }) 
    }
    deleteHandler = (e) => {
        var rowid=e.currentTarget.getAttribute("rowid");
        var data={};
        API(data, "deleteusers/"+rowid, "POST")
      .then(resp => {
          console.log(resp);
          if(resp.responseCode === 200){
              alert('Delete Successfully');
              this.componentDidMount();
          } else {
              //this.setState({erralertdisp: 1, alertdisp: 0})
              console.log('Error');
          }
      }) 

    }
    componentDidMount(){
        axios.post(BaseUrl+'getusers')
          .then(response => {
              var data = response.data.account;
              if(response.data.responseCode === 200){
                  this.setState({ users: data })
                  this.setState({ a: 1 })
                  console.log(response);
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
                            <td>User Email</td>
                            <td>Role</td>
                            <td>Created At</td>
                            <td>Action</td>
                        </tr>
                    </thead>
                    <tbody>
                {  this.state.users.map((user) => (
                        <tr key={user._id}>
                            <td>{(this.state.a)++}</td>
                            <td>{user.email}</td>
                            <td>{user.role}</td>
                            <td>{user.created_on}</td>
                            <td>

                                <a onClick={this.deleteHandler} ref="tester" rowid={user._id}><i className="fa fa-trash"></i></a></td>
                        </tr>
                    
                ))}
                    </tbody>
                </table>
                </div>



                <div className="modal" id="myModal">
                  <div className="modal-dialog">
                    <div className="modal-content">

                      
                      <div className="modal-header">
                        <h4 className="modal-title">Create New Account</h4>
                      </div>

                      
                      <div className="modal-body">
                        <div className="form-group p-3">
                            <div className="row pb-3">
                                <label>Email</label>
                                <input type="email" className="form-control" onChange={this.EmailHandler} value={this.state.userName}/>
                            </div>

                            <div className="row">
                                <label>Role</label>
                                <select className="form-control" onChange={this.RoleHandler} value={this.state.userRole}>
                                    <option value="0">Select a role for this account</option>
                                    <option value="Manager">Manager</option>
                                    <option value="Editor">Editor</option>
                                </select>
                            </div>
                        </div>
                      </div>
                        <div className="modal-footer">
                        <button type="button" onClick={this.SubmitHandler} className="btn btn-primary"> <i class="fa fa-save pr-2"></i>Submit</button>
                      </div>

                    </div>
                  </div>
                </div>
            </React.Fragment>
        );
    }
}
 
export default pagesList;