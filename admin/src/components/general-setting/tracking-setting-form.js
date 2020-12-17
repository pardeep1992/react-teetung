import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';
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
            GTagManager:'',
            GAnalytics:'',
            GConversion:'',
            GSiteVerification:'',
            FPixel:'',
            BSiteVerification:'',
            rowID:''
        }
    }

    componentDidMount(){
        axios.post(BaseUrl+'getalltracking')
          .then(response => {
              var data = response.data.option;
              console.log(data);
              if(response.data.responseCode === 200){
                  this.setState({ GTagManager: data[0].GoogleTagManager })
                  this.setState({ GAnalytics: data[0].GoogleAnalytics })
                  this.setState({ GConversion: data[0].GoogleConversion })
                  this.setState({ GSiteVerification: data[0].GoogleSiteVerificationCode })
                  this.setState({ FPixel: data[0].FacebookPixel })
                  this.setState({ BSiteVerification: data[0].BingSiteVerificationCode })
                  this.setState({ rowID: data[0]._id })
                }
          })
          .catch(function (error) {
            console.log(error);
          });
    }


    GTagManagerChnageHalder=(e)=>{
        this.setState({
            GTagManager : e.target.value
        });
        console.log(this.state.GTagManager);
    }

    GAnalyticsChnageHalder=(e)=>{
        this.setState({
            GAnalytics : e.target.value
        })
    }

    GConversionChnageHalder=(e)=>{
        this.setState({
            GConversion : e.target.value
        })
    }

    GSiteVerificationChnageHalder=(e)=>{
        this.setState({
            GSiteVerification : e.target.value
        })
    }

    FPixelChnageHalder=(e)=>{
        this.setState({
            FPixel : e.target.value
        })
    }

    BSiteVerificationChnageHalder=(e)=>{
        this.setState({
            BSiteVerification : e.target.value
        })
    }

    SubmitHandler=(e)=>{
        e.preventDefault();
        
        let data = {
            GTagManager:this.state.GTagManager,
            GAnalytics:this.state.GAnalytics,
            GConversion:this.state.GConversion,
            GSiteVerification:this.state.GSiteVerification,
            FPixel:this.state.FPixel,
            BSiteVerification:this.state.BSiteVerification
        }
        console.log(data);
        API(data, "updatetracking/"+this.state.rowID, "POST")
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
                        <h4 className="pl-2">Tracking Setting</h4>
                        <hr />
                        <section className="my-4">
                            <div className="row m-2">
                                <div className="col-md-3 col-xs-12">
                                    <div className="w-100">Google Tracking</div>
                                </div>
                                <div className="col-md-9 col-xs-12">
                                    <div className="card p-2">
                                        <div className="row p-3">
                                            <div className="col-12 ">
                                                <label>Google Tag Manager</label>
                                            </div>
                                            <div className="col-12">
                                                <input type="text" onChange={this.GTagManagerChnageHalder} className="form-control" value={this.state.GTagManager} />
                                            </div>
                                            <div className="col-12 alert-sm">
                                            </div>
                                        </div>

                                        <div className="row p-3">
                                            <div className="col-12 ">
                                                <label>Google Analytics</label>
                                            </div>
                                            <div className="col-12">
                                                <input type="text" onChange={this.GAnalyticsChnageHalder} className="form-control" value={this.state.GAnalytics} />
                                            </div>
                                            <div className="col-12 alert-sm">

                                            </div>
                                        </div>

                                        <div className="row p-3">
                                            <div className="col-12 ">
                                                <label>Google Conversion Tracking</label>
                                            </div>
                                            <div className="col-12">
                                                <input type="text" onChange={this.GConversionChnageHalder} className="form-control" value={this.state.GConversion} />
                                            </div>
                                            <div className="col-12 alert-sm">
                                                
                                            </div>
                                        </div>

                                        <div className="row p-3">
                                            <div className="col-12 ">
                                                <label>Google site verification code</label>
                                            </div>
                                            <div className="col-12">
                                                <input type="text" onChange={this.GSiteVerificationChnageHalder} className="form-control" value={this.state.GSiteVerification} />
                                            </div>
                                            <div className="col-12 alert-sm">
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </section>
                        <hr />

                        <section className="my-4">
                            <div className="row m-2">
                                <div className="col-md-3 col-xs-12">
                                    <div className="w-100">Facebook Tracking</div>
                                </div>
                                <div className="col-md-9 col-xs-12">
                                    <div className="card p-2">
                                        <div className="row p-3">
                                            <div className="col-12 ">
                                                <label>Facebook Pixel</label>
                                            </div>
                                            <div className="col-12">
                                                <input type="text" onChange={this.FPixelChnageHalder} className="form-control" value={this.state.FPixel} />
                                            </div>
                                            <div className="col-12 alert-sm">
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </section>
                        <hr />

                        <section className="my-4">
                            <div className="row m-2">
                                <div className="col-md-3 col-xs-12">
                                    <div className="w-100">Bing Tracking</div>
                                </div>
                                <div className="col-md-9 col-xs-12">
                                    <div className="card p-2">
                                        <div className="row p-3">
                                            <div className="col-12 ">
                                                <label>Bing site verification code</label>
                                            </div>
                                            <div className="col-12">
                                                <input type="text" onChange={this.BSiteVerificationChnageHalder} className="form-control" value={this.state.BSiteVerification} />
                                            </div>
                                            <div className="col-12 alert-sm">
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