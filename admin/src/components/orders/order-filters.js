import React, { Component } from 'react';
import DateRangePicker from '@wojtekmaj/react-daterange-picker';
import baseUrl from '../services/axios-url';
const axios = require('axios');

class OrderFilters extends Component {
    
    state = {  
        paidAtDate: ['', ''],
        orderDetail: [],
        paymentstatus: 'true',
        selectValue: {value: 'number'}
    }

    componentDidMount(){
        var data = [];
        data = {
            "ordernumber": "", 
            "email": "", 
            "external_number": "", 
            "fulfillment_status": "", 
            "full_name": "", 
            "limit": "", 
            "page": "", 
            "paymentstatus": this.state.paymentstatus, 
            "tags": [] 
        }
        axios.post(baseUrl+'getOrdersDetail', data)
          .then(response => {
            //   console.log(response);
               
            if(response.data.responseCode === 200){
                this.setState({
                    orderDetail: response.data.order
                })
            }
          })
          .catch(function (error) {
            console.log(error);
          });
    }

    onChange = paidAtDate => this.setState({ paidAtDate })

    handlePaymentStatusChange = (value) => {
        // console.log(paymentStatus)
        var data = [];

        if(value == 'all' ){
            this.setState({ paymentstatus: 'true' }, function(){
                // console.log(this.state.paymentstatus)
               
                data = {
                    "ordernumber": "", 
                    "email": "", 
                    "external_number": "", 
                    "fulfillment_status": "", 
                    "full_name": "", 
                    "limit": "", 
                    "page": "", 
                    "paymentstatus": this.state.paymentstatus, 
                    "tags": [] 
                }
                axios.post(baseUrl+'getOrdersDetail', data)
                .then(response => {
                    //   console.log(response);
                    
                    if(response.data.responseCode === 200){
                        this.setState({
                            orderDetail: response.data.order
                        })
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });

            })
        }

        if(value == 'paid' ){
            this.setState({ paymentstatus: 'paid' }, function(){
                // console.log(this.state.paymentstatus)
               
                data = {
                    "ordernumber": "", 
                    "email": "", 
                    "external_number": "", 
                    "fulfillment_status": "", 
                    "full_name": "", 
                    "limit": "", 
                    "page": "", 
                    "paymentstatus": "true", 
                    "tags": [] 
                }
                axios.post(baseUrl+'getOrdersDetail', data)
                .then(response => {
                    //   console.log(response);
                    
                    if(response.data.responseCode === 200){
                        this.setState({
                            orderDetail: response.data.order
                        })
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });

            })
        }
        
        if(value == 'pending'){
            this.setState({ paymentstatus: value }, function(){
                data = {
                    "ordernumber": "", 
                    "email": "", 
                    "external_number": "", 
                    "fulfillment_status": "", 
                    "full_name": "", 
                    "limit": "", 
                    "page": "", 
                    "paymentstatus": this.state.paymentstatus, 
                    "tags": [] 
                }
                axios.post(baseUrl+'getOrdersDetail', data)
                .then(response => {
                    //   console.log(response);
                    
                    if(response.data.responseCode === 200){
                        this.setState({
                            orderDetail: response.data.order
                        })
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });

            
            })
        }
        if(value == 'refunded'){
            this.setState({ paymentstatus: value }, function(){
                data = {
                    "ordernumber": "", 
                    "email": "", 
                    "external_number": "", 
                    "fulfillment_status": "", 
                    "full_name": "", 
                    "limit": "", 
                    "page": "", 
                    "paymentstatus": this.state.paymentstatus, 
                    "tags": [] 
                }
                axios.post(baseUrl+'getOrdersDetail', data)
                .then(response => {
                    //   console.log(response);
                    
                    if(response.data.responseCode === 200){
                        this.setState({
                            orderDetail: response.data.order
                        })
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });

            })
        }
        
        console.log(this.state.paymentstatus)
    }

    handleSelectChange = (e) => {
        console.log(e.target.vaue)
    } 

    

    
    render() { 
        console.log(this.state)
        return ( 
            <React.Fragment>
                <div className="border p-3">
                    <div className="row">
                        <div className="col-md-4">
                            <h6>Payment Status:</h6>
                            <ul className="ListOrder" >
                                <li  className={this.state.paymentstatus == 'true' ? 'active' : ''} value="All" onClick={ () => this.handlePaymentStatusChange('all')}>
                                    <span className="nav-link">All</span>
                                </li>
                                <li  className={this.state.paymentstatus == 'paid' ? 'active' : ''} onClick={ () => this.handlePaymentStatusChange('paid')}>
                                    <span className="nav-link">Paid</span>
                                </li>
                                <li className={this.state.paymentstatus == 'pending' ? 'active' : ''} onClick={ () => this.handlePaymentStatusChange('pending')}>
                                    <span className="nav-link">Pending</span>
                                </li>
                                <li className={this.state.paymentstatus == 'refunded' ? 'active' : ''} onClick={ () => this.handlePaymentStatusChange('refunded')}>
                                    <span className="nav-link">Refunded</span>
                                </li>
                            </ul>
                        </div>
                        <div className="col-md-4">
                            <h6>Fulfillment Status:</h6>
                            <ul className="ListOrder">
                                <li className="active">
                                    <span className="nav-link">All</span>
                                </li>
                                <li className="">
                                    <span className="nav-link">Partial</span>
                                </li>
                                <li className="">
                                    <span className="nav-link">Unfulfilled</span>
                                </li>
                                <li className="">
                                    <span className="nav-link">On Hold</span>
                                </li>
                                <li className="">
                                    <span className="nav-link">Fulfilled</span>
                                </li>
                            </ul>
                        </div>
                        <div className="col-md-3">
                            <h6>Fulfillment manual:</h6>
                            <ul className="ListOrder">
                                <li className="active">
                                    <span className="nav-link">All</span>
                                </li>
                                <li className="">
                                    <span className="nav-link">Manual</span>
                                </li>
                                
                            </ul>
                        </div>
                        <div className="col-md-1">
                            <button className="btn btn-outline-secondary ">
                              <i className="fa fa-refresh"></i>
                            </button> 
                        </div>
                    </div>

                    <div className="row my-3">
                        <div className="col-md-12">
                            <div className="form-group form-check">
                                <input type="checkbox" className="form-check-input" />
                                <label className="form-check-label" htmlFor="exampleCheck1">Display order items</label>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col">Show</div>
                        <div className="col">
                            <select className="form-control">
                                <option>10</option>
                                <option>20</option>
                                <option>50</option>
                                <option>100</option>
                            </select>
                        </div>
                        <div className="col">Enteries</div>
                        <div className="col">Paid at</div>
                        <div className="col">
                            <DateRangePicker
                            className="form-control"
                            onChange={this.onChange}
                            value={this.state.paidAtDate}
                            format="dd-MM-y"
                            
                            />
                        </div>
                        <div className="col-md-3">
                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <select className="form-control" value={this.state.selectValue} onChange={(e) => this.handleSelectChange}>
                                        <option value="number">Number</option>
                                        <option value="external_number">External number</option>
                                        <option value="tags">Tags</option>
                                        <option value="tags">Customer email</option>
                                        <option tags="customer_name">Customer name</option>
                                    </select>
                                </div>
                                <input type="text" className="form-control" aria-label="Text input with dropdown button" />
                            </div>
                        </div>
                        <div className="col">
                            <h6>{this.state.orderDetail.length} Items</h6>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-12">
                            <table className="table table-responsive">
                                <thead className="thead-light">
                                    <tr>
                                        <th>Number</th>
                                        <th>Time</th>
                                        <th>Customer</th>
                                        <th>Tags</th>
                                        <th>Payment status</th>
                                        <th>Fulfillment status</th>
                                        <th>Tracking</th>
                                        <th>Revenue</th>
                                        <th>Fulfillment cost</th>
                                        <th>Note</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.orderDetail.map((order, index) =>{
                                           
                                            return (
                                                <tr key={index}>
                                                    <td>{order.ordernumber}</td>
                                                    <td>{order.orderdate}</td>
                                                    <td>
                                                        {order.customerdetail[0].fullname} <br /> 
                                                        {order.customerdetail[0].email} <br /> 
                                                        {order.customerdetail[0].country} 
                                                    </td>
                                                    <td></td>
                                                    <td>
                                                        {order.paymentstatus == 'true' ? <span className="badge badge-pill badge-secondary">Paid</span> : ''}
                                                        
                                                    </td>
                                                    <td><span className="badge badge-pill badge-warning">Unfulfilled</span></td>
                                                    <td><i className="fa fa-times" ></i></td>
                                                    <td>${order.totalamount}</td>
                                                    <td>--</td>
                                                    <td></td>
                                                </tr>
                                            )
                                        })
                                    }
                                    <tr>
                                        
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                   
                    </div>
                </div>
            </React.Fragment>
        );
    }
}
export default OrderFilters;