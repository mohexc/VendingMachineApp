import React, { FC } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import ProductsListPage from "./pages/ProductsListPage";
import ContextStore from "./context";
import LayoutApp from "./components/layout/LayoutApp";
import "./App.less";
import ShopsListPage from "./pages/ShopsListPage";

const App: FC = () => {
  return (
    <Router>
      <Switch>
        <ContextStore>
          <LayoutApp>
            <Route exact path="/shops/:id">
              <ProductsListPage />
            </Route>
            <Route exact path="/">
              <ShopsListPage />
            </Route>
          </LayoutApp>
        </ContextStore>
      </Switch>
    </Router>
  );
};

export default App;
