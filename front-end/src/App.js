import React, { Component } from 'react';
// import logo from './logo.svg';
// import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// import { createBrowserHistory } from "history";

import Home from './components/home/home';
import Shipping from './components/shipping/shipping';
import Support from './components/support/support';
import Shop from './components/shop/shop';
import TrackOrder from './components/trackOrder/trackorder';
import Returns from './components/returns/returns';
import Dmca from './components/dmca/dmca';
import AboutUs from './components/about-us/about-us';
import PrivacyPolicy from './components/privacy-policy/privacy-policy';
import TermsOfServices from './components/terms-of-services/terms-of-services';
import ContactUs from './components/contact-us/contact-us';
import ProductDetail from './components/product-detail/product-detail';
import Cart from './components/cart/cart';
import Checkout from './components/checkout/checkout';
import OrderSummary from './components/order-summary/order-summary';
import Search from './components/search/search';
// const history = createBrowserHistory()

class App extends Component {
  render (){
    return (
      <Router>
        <Switch>
          <Route exact path="/" name="Home Page" component = {Home} />
          <Route exact path="/shop" name="Shop Page" component={Shop} />
          <Route exact path="/shipping" name="Shipping Page" component={Shipping} />
          <Route exact path="/support" name="Support Page" component={Support} />
          <Route ecact path="/track-order" name="Track Page" component={TrackOrder} />
          <Route exact path="/returns" name="Returns Page" component={Returns} />
          <Route exact path="/ip" name="DMCA Page" component={Dmca} />
          <Route exact path="/about-us" name="About page" component={AboutUs} />
          <Route exact path="/privacy-policy" name="About us" component={PrivacyPolicy} />
          <Route exact path="/terms-of-services" name="Terms page" component={TermsOfServices} />
          <Route exact path="/contact-us" name="Contact Page" component={ContactUs} />
          <Route exact path="/product-detail/:id" name="Product detail page" component={ProductDetail} />
          <Route exact path="/cart" name="cart page" component={Cart} />
          <Route exact path="/checkout" name="checkout page" component={Checkout} />
          <Route exact path="/order-summary" name="order summary page" component={OrderSummary} />
          <Route exact path="/search" name="search page" component={Search} />
        </Switch>
      </Router>
    );
  }
  
}

export default App;
