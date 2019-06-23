import React, { Component } from "react";
import { connect } from "react-redux";
import {
  IonMenuButton,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonTitle,
  IonContent,
  IonItem,
  IonButton,
} from "@ionic/react";
import { actions } from "../store";
import { withRouter, RouteComponentProps } from "react-router";
import { signOut } from "../api/login";

type Props = RouteComponentProps<{}> & typeof mapDispatchToProps;
type State = {
  showSkip: boolean;
};

class Logout extends Component<Props, State> {
  submit() {}

  goLogIn = () => {
    this.props.history.push("/login");
  };

  logOut = () => {
    this.props.logOut();
  };

  endTutorial = () => {
    this.props.sawTutorial();
  };

  componentDidMount() {
    // firebade
    signOut();

    // actionログアウト
    this.logOut();
  }

  render() {
    return (
      <>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonMenuButton />
            </IonButtons>
            <IonTitle>Logout</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonContent class="page-user">
          <div className="logo">
            <img src="/assets/img/appicon.svg" alt="Ionic Logo" />
          </div>
          <div>
            <IonItem>
              <IonButton onClick={this.goLogIn} color="light">
                Go Login
              </IonButton>
            </IonItem>
          </div>
        </IonContent>
      </>
    );
  }
}

const mapDispatchToProps = {
  sawTutorial: () => actions.user.sawTutorial(),
  logIn: () => actions.user.logIn(),
  logOut: () => actions.user.logOut(),
};

export default withRouter(
  connect(
    null,
    mapDispatchToProps
  )(Logout)
);
