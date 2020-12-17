import React, { Component } from 'react';
import Cookies from 'universal-cookie';
import BaseUrl from '../services/axios-url';
import API from '../services/api-request';
const axios = require('axios');
class CollectionsNameAndBtn extends Component {
    constructor (props) {
        super(props);
        
        const cookies = new Cookies();
        if(cookies.get('Auth') !== 'true'){
            this.props.history.push("/");
        } 

        this.state={
            selectVal:'Required',
            rowID:''
        }
    }

    componentDidMount(){
        axios.post(BaseUrl+'getallcheckoutformoptions')
          .then(response => {
              var data = response.data.option;
              console.log(data);
              if(response.data.responseCode === 200){
                  this.setState({ selectVal: data[0].Ismobilenumber })
                  this.setState({ rowID: data[0]._id })
                }
          })
          .catch(function (error) {
            console.log(error);
          });
    }

    selectChnageHalder=(e)=>{
        console.log(e.target.value);
        this.setState({
            selectVal : e.target.value
        })
    }

    SubmitHandler=(e)=>{
        e.preventDefault();
        let data = {
            Isoption:this.state.selectVal
        }
        API(data, "updatecheckoutformoptions/"+this.state.rowID, "POST")
        .then(resp => {
            console.log(resp);
            if(resp.responseCode === 200){
                this.setState({
                    selectVal: this.state.selectVal, 
                })
                alert('Update Successfully');
            } else {
                //this.setState({erralertdisp: 1, alertdisp: 0})
                console.log('Error');
            }
        })
    }

    render() { 
        return (  
            <React.Fragment>
                <div className="row mt-3 bg-light">
                    <div className="col-md-12">
                        <h4 className="pl-2">Checkout Setting</h4>
                        <hr />
                        <section className="my-4">
                            <div className="row m-2">
                                <div className="col-md-3 col-xs-12">
                                    <div className="w-100">Form options</div>
                                </div>
                                <div className="col-md-9 col-xs-12">
                                    <div className="card p-2">
                                        <div className="row p-3">
                                            <div className="col-12 ">
                                                <label>Shipping address phone number</label>
                                            </div>
                                            <div className="col-12">
                                                <select type="text" onChange={this.selectChnageHalder} className="form-control" value={this.state.selectVal}>
                                                    <option value="Hidden">Hidden</option>
                                                    <option value="Optional">Optional</option>
                                                    <option value="Required">Required</option>
                                                </select>
                                            </div>
                                            
                                        </div>   
                                    </div>
                                </div>
                            </div>
                        </section>
                        <hr />
                        <section className="my-4">
                            <div className="row m-2">
                                <div className="col-md-12 col-xs-12">
                                    <button onClick={this.SubmitHandler} className="btn btn-primary pull-right w-25">Save</button>
                                </div>
                            </div>
                        </section>
                        <hr />

                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default CollectionsNameAndBtn;