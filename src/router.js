import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import IndexPage from './routes/IndexPage';
import Login from "./routes/login/Login";
import ShoppingCart from "./routes/shoppingcart/ShoppingCart";
import OrderList from "./routes/order/OrderList";
import Points from "./routes/points/PointShop";
import ProductList from "./routes/points/ProductList";
import AddressList from "./routes/address/AddressList";
import AddressEdit from "./routes/address/AddressEdit";

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={IndexPage} />
        <Route path="/login" exact component={Login} />
        <Route path="/shoppingcart" exact component={ShoppingCart} />
        <Route path="/order" exact component={OrderList} />
        <Route path="/points" exact component={Points} />
        <Route path="/products" exact component={ProductList} />
        <Route path="/address" exact component={AddressList} />
        <Route path="/addressedit" exact component={AddressEdit} />
      </Switch>
    </Router>
  );
}

export default RouterConfig;
