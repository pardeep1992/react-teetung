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
            ShippingOnProductPage:false,
            ShippingOnProductPageFlag:'No',
            FeaturedCollectionOnHomePage:false,
            FeaturedCollectionOnHomePageFlag:'No',
            CountdownOnCheckoutPage:false,
            CountdownOnCheckoutPageFlag:'No',
            CountdownOnProductPage:false,
            CountdownOnProductPageFlag:'No',
            TrarkOrderPageOnMenu:false,
            TrarkOrderPageOnMenuFlag:'No',
            TestimonyPageUrlForMenu:'',
            TestimonyPageUrlForProductPage:'',
            DiscountPercentage:'',
            TopBarPromotion:false,
            TopBarPromotionFlag:'No',
            DiscountText:'',
            DiscountTextPlaceholder:'LIMITED TIME! All Sale. Everything. % Off!',
            rowID:''
        }
        console.log(this.state.ShippingOnProductPage);
    }

    componentDidMount(){ axios.post(BaseUrl+'getallonlinestore')
    .then(response => {   var data = response.data.option;
    console.log(data);   
    if(response.data.responseCode === 200){
        this.setState({rowID:data[0]._id})
        if(data[0].isShippingOnProduct == 'Yes')
        {
            this.setState({ ShippingOnProductPage: true })
            this.setState({ ShippingOnProductPageFlag: 'Yes' })  
            //console.log(this.state.ShippingOnProductPage);      
        }
        else
        {
            this.setState({ ShippingOnProductPage: false })
            this.setState({ ShippingOnProductPageFlag: 'No' })
        }
    
        if(data[0].isFeaturedCollectionOnHome == 'Yes')
        {
            this.setState({ FeaturedCollectionOnHomePage: true })
            this.setState({ FeaturedCollectionOnHomePageFlag: 'Yes' })        
        }
        else
        {
            this.setState({ FeaturedCollectionOnHomePage: false })
            this.setState({ FeaturedCollectionOnHomePageFlag: 'No' })
        }   

        if(data[0].isCountdownOnCheckout == 'Yes')
        {
            this.setState({ CountdownOnCheckoutPage: true })
            this.setState({ CountdownOnCheckoutPageFlag: 'Yes' })        
        }
        else
        {
            this.setState({ CountdownOnCheckoutPage: false })
            this.setState({ CountdownOnCheckoutPageFlag: 'No' })
        }   

        if(data[0].isCountdownOnProduct == 'Yes')
        {
            this.setState({ CountdownOnProductPage: true })
            this.setState({ CountdownOnProductPageFlag: 'Yes' })        
        }
        else
        {
            this.setState({ CountdownOnProductPage: false })
            this.setState({ CountdownOnProductPageFlag: 'No' })
        }   

        if(data[0].isDisplayTrackOrderOnMenu == 'Yes')
        {
            this.setState({ TrarkOrderPageOnMenu: true })
            this.setState({ TrarkOrderPageOnMenuFlag: 'Yes' })        
        }
        else
        {
            this.setState({ TrarkOrderPageOnMenu: false })
            this.setState({ TrarkOrderPageOnMenuFlag: 'No' })
        }
        this.setState({TestimonyPageUrlForMenu: data[0].testimonyPageUrlOnMenu})
        this.setState({TestimonyPageUrlForProductPage: data[0].testimonyPageUrlOnProduct})
        this.setState({DiscountPercentage: data[0].discountPercentage})

        if(data[0].isTopbarPromotion == 'Yes')
        {
            this.setState({ TopBarPromotion: true })
            this.setState({ TopBarPromotionFlag: 'Yes' })        
        }
        else
        {
            this.setState({ TopBarPromotion: false })
            this.setState({ TopBarPromotionFlag: 'No' })
        }
        this.setState({DiscountText: data[0].discountOrofferText})
        this.setState({DiscountTextPlaceholder: 'LIMITED TIME! All Sale. Everything. '+data[0].discountPercentage+'% Off!'})
     }   
 })
    .catch(function (error) { console.log(error);   }); }


    ShippingOnProductPageChnageHalder=(e)=>{
        if(this.state.ShippingOnProductPage)
        {
            this.setState({
             ShippingOnProductPage : false,
             ShippingOnProductPageFlag : "No"
            });
        }
        else
        {
            this.setState({
             ShippingOnProductPage : true,
             ShippingOnProductPageFlag : "Yes"
            });
        }
        //console.log(this.state.ShippingOnProductPage);
    }

    FeaturedCollectionOnHomePageChnageHalder=(e)=>{
        if(this.state.FeaturedCollectionOnHomePage)
        {
            this.setState({
                FeaturedCollectionOnHomePage : false,
                FeaturedCollectionOnHomePageFlag : "No"
            });
        }
        else
        {
            this.setState({
                FeaturedCollectionOnHomePage : true,
                FeaturedCollectionOnHomePageFlag : "Yes"
            });
        }
    }

    CountdownOnCheckoutPageChnageHalder=(e)=>{
        if(this.state.CountdownOnCheckoutPage)
        {
            this.setState({
             CountdownOnCheckoutPage : false,
             CountdownOnCheckoutPageFlag:'No'
            });
        }
        else
        {
            this.setState({
             CountdownOnCheckoutPage : true,
             CountdownOnCheckoutPageFlag:'Yes'
            });
        }
    }

    CountdownOnProductPageChnageHalder=(e)=>{
        if(this.state.CountdownOnProductPage)
        {
            this.setState({
             CountdownOnProductPage : false,
             CountdownOnProductPageFlag :'No'
            });
        }
        else
        {
            this.setState({
             CountdownOnProductPage : true,
             CountdownOnProductPageFlag :'Yes'
            });
        }
    }

    TrarkOrderPageOnMenuChnageHalder=(e)=>{
        if(this.state.TrarkOrderPageOnMenu)
        {
            this.setState({
             TrarkOrderPageOnMenu : false,
             TrarkOrderPageOnMenuFlag : 'No'
            });
        }
        else
        {
            this.setState({
             TrarkOrderPageOnMenu : true,
             TrarkOrderPageOnMenuFlag : 'Yes'
            });
        }
    }

    TestimonyPageUrlForMenuChnageHalder=(e)=>{
        this.setState({
            TestimonyPageUrlForMenu : e.target.value
        })
    }  

    TestimonyPageUrlForProductPageChnageHalder=(e)=>{
        this.setState({
            TestimonyPageUrlForProductPage : e.target.value
        })
    }   

    DiscountPercentageChnageHalder=(e)=>{
        this.setState({
            DiscountPercentage : e.target.value,
            DiscountTextPlaceholder:'LIMITED TIME! All Sale. Everything. '+e.target.value+'% Off!'
        })
    }

    TopBarPromotionChnageHalder=(e)=>{
        if(this.state.TopBarPromotion)
        {
            this.setState({
             TopBarPromotion : false,
             TopBarPromotionFlag : 'No'
            });
        }
        else
        {
            this.setState({
             TopBarPromotion : true,
             TopBarPromotionFlag : 'Yes'
            });
        }
    }  

    DiscountTextChnageHalder=(e)=>{
        this.setState({
            DiscountText : e.target.value
        })
    }    

    SubmitHandler=(e)=>{
        e.preventDefault();
        let data = {
            ShippingOnProductPage:this.state.ShippingOnProductPageFlag,
            FeaturedCollectionOnHomePage:this.state.FeaturedCollectionOnHomePageFlag,
            CountdownOnCheckoutPage:this.state.CountdownOnCheckoutPageFlag,
            CountdownOnProductPage:this.state.CountdownOnProductPageFlag,
            TrarkOrderPageOnMenu:this.state.TrarkOrderPageOnMenuFlag,
            TestimonyPageUrlForMenu:this.state.TestimonyPageUrlForMenu,
            TestimonyPageUrlForProductPage:this.state.TestimonyPageUrlForProductPage,
            DiscountPercentage:this.state.DiscountPercentage,
            TopBarPromotion:this.state.TopBarPromotionFlag,
            DiscountText:this.state.DiscountText
        }
        console.log(data);
        API(data, "updateonlinestore/"+this.state.rowID, "POST")
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
                        <h4 className="pl-2">Online Store Setting</h4>
                        <hr />
                        <section className="my-4">
                            <div className="row m-2">
                                <div className="col-md-3 col-xs-12">
                                    <div className="w-100">Preferences</div>
                                </div>
                                <div className="col-md-9 col-xs-12">
                                    <div className="card p-2">
                                        <div className="row p-1">
                                            <div className="col-12 ">
                                                <input type="checkbox" defaultChecked={this.state.ShippingOnProductPage} onChange={this.ShippingOnProductPageChnageHalder} />
                                                <label className="pl-2">Enable shipping info on Product page</label>
                                            </div>
                                        </div>

                                        <div className="row p-1">
                                            <div className="col-12 ">
                                                <input type="checkbox" onChange={this.FeaturedCollectionOnHomePageChnageHalder} className="" defaultChecked={this.state.FeaturedCollectionOnHomePage} />
                                                <label className="pl-2">Show featured collections on Home page</label>
                                            </div>
                                        </div>

                                        <div className="row p-1">
                                            <div className="col-12 ">
                                                <input type="checkbox" onChange={this.CountdownOnCheckoutPageChnageHalder} className="" defaultChecked={this.state.CountdownOnCheckoutPage}/>
                                                <label className="pl-2">Enable countdown on Checkout page</label>
                                            </div>
                                        </div>

                                        <div className="row p-1">
                                            <div className="col-12 ">
                                                <input type="checkbox" onChange={this.CountdownOnProductPageChnageHalder} className="" defaultChecked={this.state.CountdownOnProductPage} />
                                                <label className="pl-2">Enable countdown on Product page</label>
                                            </div>
                                        </div>


                                        <div className="row p-1">
                                            <div className="col-12 ">
                                                <input type="checkbox" onChange={this.TrarkOrderPageOnMenuChnageHalder} className="" defaultChecked={this.state.TrarkOrderPageOnMenu} />
                                                <label className="pl-2">Display “Track Order” page on menu</label>
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
                                    <div className="w-100">Customer Reviews</div>
                                </div>
                                <div className="col-md-9 col-xs-12">
                                    <div className="card p-2">
                                        <div className="row p-3">
                                            <div className="col-12 ">
                                                <label>Display Testimony page on menu and load the following URL</label>
                                            </div>
                                            <div className="col-12">
                                                <input type="text" onChange={this.TestimonyPageUrlForMenuChnageHalder} className="form-control" value={this.state.TestimonyPageUrlForMenu} />
                                            </div>
                                            <div className="col-12 alert-sm">
                                            </div>
                                        </div>

                                        <div className="row p-3">
                                            <div className="col-12 ">
                                                <label>Display Testimony page on product page and load the following URL</label>
                                            </div>
                                            <div className="col-12">
                                                <input type="text" onChange={this.TestimonyPageUrlForProductPageChnageHalder} className="form-control" value={this.state.TestimonyPageUrlForProductPage} />
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
                                    <div className="w-100">Promotion</div>
                                </div>
                                <div className="col-md-9 col-xs-12">
                                    <div className="card p-2">
                                        <div className="row p-3">
                                            <div className="col-12 ">
                                                <label>The amount of discount that you wanted your customers to see for each product <small>(Discount in %)</small></label>
                                            </div>
                                            <div className="col-4">
                                                <input type="text" onChange={this.DiscountPercentageChnageHalder} className="form-control" value={this.state.DiscountPercentage} />
                                                <div className="input-group-append"><span className="input-group-text" id="discount_value_addon">%</span></div>
                                            </div>
                                            <div className="col-12 alert-sm">
                                            </div>
                                        </div>

                                        <div className="row p-1">
                                            <div className="col-12 ">
                                                <input type="checkbox" onChange={this.TopBarPromotionChnageHalder} className="" defaultChecked={this.state.TopBarPromotion}/>
                                                <label className="pl-2">Enable top bar promotion</label>
                                            </div>
                                        </div>
                                        <div className="row p-3">
                                            <div className="col-12">
                                                <input type="text" placeholder={this.state.DiscountTextPlaceholder} onChange={this.DiscountTextChnageHalder} className="form-control" value={this.state.DiscountText} />
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