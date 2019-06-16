import React from "react";
import { connect } from "react-redux";
import { RootState } from "../store";
import {
  IonIcon,
  IonMenu,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonListHeader,
  IonItem,
  IonLabel,
  IonMenuToggle,
} from "@ionic/react";
import { RouteComponentProps, withRouter } from "react-router";

const routes = {
  // <RequiresTutorialRoute>は中身が見えない
  // ログイン後
  loggedInPages: [
    { title: "Logout", path: "/logout", icon: "log-out" },
    { title: "Schedule", path: "/", icon: "calendar" },
    { title: "Speakers", path: "/speakers", icon: "contacts" },
  ],
  // ログアウト系
  loggedOutPages: [
    { title: "Login", path: "/login", icon: "log-in" },
    { title: "Signup", path: "/signup", icon: "person-add" },
  ],
  // 常に出したい
  appPages: [
    // { title: "Tutorial", path: "/tutorial", icon: "help" },
    { title: "Support", path: "/support", icon: "help" },
    // 人検索系にする
    { title: "Profile", path: "/profile", icon: "person" },
    { title: "About", path: "/about", icon: "information-circle" },
    // PrivateRoute
    { title: "Account", path: "/account", icon: "person" },
  ],
};

type Props = RouteComponentProps<{}> & ReturnType<typeof mapStateToProps>;

const Menu: React.SFC<Props> = ({ isAuthenticated, history }) => {
  function renderlistItems(list: any[]) {
    return list.filter(route => !!route.path).map(p => (
      <IonMenuToggle key={p.title} auto-hide="false">
        <IonItem button onClick={() => history.push(p.path)}>
          <IonIcon slot="start" name={p.icon} />
          <IonLabel>{p.title}</IonLabel>
        </IonItem>
      </IonMenuToggle>
    ));
  }

  return (
    <IonMenu contentId="main">
      <IonHeader>
        <IonToolbar>
          <IonTitle>Menu</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent class="outer-content">
        <IonList>
          {/* <IonListHeader>Navigate</IonListHeader> */}
          {isAuthenticated ? renderlistItems(routes.loggedInPages) : renderlistItems(routes.loggedOutPages)}
          {renderlistItems(routes.appPages)}
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

const mapStateToProps = (state: RootState) => ({
  isAuthenticated: state.user.isAuthenticated,
});

export default withRouter(connect(mapStateToProps)(Menu));
