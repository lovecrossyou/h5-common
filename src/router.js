import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import IndexPage from './routes/IndexPage';
import Login from "./routes/Login";
import ShoppingCart from "./routes/ShoppingCart";
import OrderList from "./routes/OrderList";
import Points from "./routes/Points";

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={IndexPage} />
        <Route path="/login" exact component={Login} />
        <Route path="/shoppingcart" exact component={ShoppingCart} />
        <Route path="/order" exact component={OrderList} />
        <Route path="/points" exact component={Points} />
      </Switch>
    </Router>
  );
}

export default RouterConfig;
