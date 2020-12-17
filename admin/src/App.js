import React from 'react';
// import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import SignIn from './components/sign-in/sign-in';
import Dashboard from './components/dashboard/dashboard';
import Collections from './components/collections/show-collections/collections';
import CreateCollection from './components/collections/create-collection/create-collection';
import UpdateCollection from './components/collections/update-collection/update-collection';
import products from './components/products/show-product/product';
import productCreate from './components/products/create-product/create-product';

/*----------------------------------------------------------*/
import Settings from './components/settings/setting-component';
import Frontpages from './components/front-pages/show-pages/front-pages'; 
import UpdatePages from './components/front-pages/update-pages/update-pages';
import GeneralSettings from './components/general-setting/general-setting';
import Checkoutsetting from './components/general-setting/checkout-component';

import OnlineStoreSettings from './components/general-setting/onlinestore-setting';
import TrackingSettings from './components/general-setting/tracking-setting';
import Accounts from './components/general-setting/account-show';
import Orders from './components/orders/orders';

function App() {
  return (
    <Router>
        <Switch>
          <Route exact path="/" name="Sign In" component={SignIn} />
          <Route exact path="/dashboard" name="dashboard page" component={Dashboard} />
          <Route exact path="/collections" name="collections page" component={Collections} />
          <Route exact path="/collection/new" name="Create collection" component={CreateCollection} />
          <Route exact path="/collections/:id" name="update collection" component={UpdateCollection} />
          <Route exact path="/products" name="products" component={products} />
          <Route exact path="/product/new" name="create product" component={productCreate} />
          /*-------------------------------------------------------*/
          <Route exact path="/settings" name="create product" component={Settings} />
          <Route exact path="/general-settings" name="create product" component={GeneralSettings} />
          <Route exact path="/checkout-settings" name="create product" component={Checkoutsetting} />
          <Route exact path="/pages" name="front pages list" component={Frontpages} />
          <Route exact path="/pages/:slug" name="front pages list" component={UpdatePages} />

          <Route exact path="/onlinestore-settings" name="Online Store" component={OnlineStoreSettings} />
          <Route exact path="/tracking-settings" name="Tracking" component={TrackingSettings} />
          <Route exact path="/accounts" name="Account" component={Accounts} />

          <Route exact path="/orders" name="orders" component={Orders} />
        </Switch>
      </Router>
  );
}

export default App;
