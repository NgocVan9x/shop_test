import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import NotFound from './components/exception/not-found';
import HomePage from './containers/homepage';
import CartPage from './containers/cartpage';
import LoginPage from './containers/loginpage';
import OrderPage from './containers/orderpage';

export default () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route exact path="/cart" component={CartPage} />
      <Route exact path="/login" component={LoginPage} />
      <Route exact path="/order" component={OrderPage} />
      <Route path="*" component={NotFound} />
    </Switch>
  </BrowserRouter>
);
