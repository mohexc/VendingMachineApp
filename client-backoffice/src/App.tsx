import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.less";
import LayoutApp from "./components/layouts/LayoutApp";
import SignInPage from "./pages/auth/SignInPage";
import SignUpPage from "./pages/auth/SignUpPage";
// import HomePage from "./pages/home/HomePage";
import DashboardPage from "./pages/dashborad/DashboardPage";
import UserListPage from "./pages/user/UserListPage";
import MachineListPage from "./pages/machine/MachineListPage";
import ProductListPage from "./pages/product/ProductListPage";
import ContextStore from "./context";
import MachineDetailPage from "./pages/machine/MachineDetailPage";
import ProductDetailPage from "./pages/product/ProductDetailPage";
import UserDetailPage from "./pages/user/UserDetailPage";
import InventoriesListPage from "./pages/inventory/InventoriesListPage";
import InventoryDetailPage from "./pages/inventory/InventoryDetailPage";
import OrdersListPage from "./pages/order/OrdersListPage";
import AlertsListPage from "./pages/alert/AlertsListPage";
import { QueryClient, QueryClientProvider } from "react-query";
const queryClient = new QueryClient();
const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Switch>
          <ContextStore>
            <LayoutApp>
              <Route exact path="/signin">
                <SignInPage />
              </Route>
              <Route exact path="/signup">
                <SignUpPage />
              </Route>
              <Route exact path="/dashboard">
                <DashboardPage />
              </Route>
              <Route exact path="/users">
                <UserListPage />
              </Route>
              <Route exact path="/users/:id">
                <UserDetailPage />
              </Route>
              <Route exact path="/machines">
                <MachineListPage />
              </Route>
              <Route exact path="/machines/:id">
                <MachineDetailPage />
              </Route>
              <Route exact path="/products">
                <ProductListPage />
              </Route>
              <Route exact path="/products/:id">
                <ProductDetailPage />
              </Route>
              <Route exact path="/inventories">
                <InventoriesListPage />
              </Route>
              <Route exact path="/inventories/:id">
                <InventoryDetailPage />
              </Route>
              <Route exact path="/orders">
                <OrdersListPage />
              </Route>
              <Route exact path="/alerts">
                <AlertsListPage />
              </Route>
              <Route exact path="/">
                <DashboardPage />
              </Route>
            </LayoutApp>
          </ContextStore>
        </Switch>
      </Router>
    </QueryClientProvider>
  );
};

export default App;
