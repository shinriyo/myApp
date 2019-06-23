import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { PrivateRoute, RequiresTutorialRoute } from "./utils/routing";
import Account from "./pages/Account";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Support from "./pages/Support";
import Signup from "./pages/Signup";
import Logout from "./pages/Logout";
import AppStack from "./pages/AppStack";
import Menu from "./components/Menu";
import { IonApp, IonSplitPane, IonPage } from "@ionic/react";
import { Provider } from "react-redux";
import "@ionic/core/css/core.css";
import "@ionic/core/css/ionic.bundle.css";
import "./theme.css";

import store from "./store";

const App = () => (
  <Provider store={store}>
    <Router>
      <div id="app">
        <IonApp>
          <IonSplitPane contentId="main">
            <Menu />
            <IonPage id="main">
              <Switch>
                {/* ログインに無理やり飛ばす仕組み */}
                <PrivateRoute path="/account" component={Account} />
                <PrivateRoute path="/profile" component={Profile} />
                {/* ログアウトがわりに */}
                <Route path="/logout" component={Logout} />
                <Route path="/login" component={Login} />
                <Route path="/support" component={Support} />
                <Route path="/signup" component={Signup} />
                <Route path="/" component={AppStack} />
                {/* <Route path="/tutorial" component={Tutorial} /> */}
                {/* <RequiresTutorialRoute>はセットすると中身が見えない */}
                {/* <RequiresTutorialRoute path="/login" component={Login} /> */}
              </Switch>
            </IonPage>
          </IonSplitPane>
        </IonApp>
      </div>
    </Router>
  </Provider>
);

export default App;
