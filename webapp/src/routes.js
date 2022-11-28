import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ListCustomer } from "./containers/customers/ListCustomer";
import Home from "./containers/home";
import { ListOrder } from "./containers/orders/ListOrder";

const Routes = () => {
  return(
    <Router>
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/customers">
          <ListCustomer />
        </Route>
        <Route path="/orders">
          <ListOrder />
        </Route>
      </Switch>
    </Router>
  )
}

export default Routes;