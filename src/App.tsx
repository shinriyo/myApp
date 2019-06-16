import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { PrivateRoute, RequiresTutorialRoute } from "./utils/routing";
import Account from "./pages/Account";
import Login from "./pages/Login";
import Support from "./pages/Support";
import Signup from "./pages/Signup";
// import Tutorial from "./pages/Tutorial";
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
                <PrivateRoute path="/account" component={Account} />
                {/* <Route path="/tutorial" component={Tutorial} /> */}
                <Route path="/logout" />
                <Route path="/login" component={Login} />
                <Route path="/support" component={Support} />
                <Route path="/signup" component={Signup} />
                <Route path="/" component={AppStack} />
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
