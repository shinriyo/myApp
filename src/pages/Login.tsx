import React, { Component } from "react";
import { connect } from "react-redux";
import { actions } from "../store";
import {
  IonHeader,
  IonToolbar,
  IonButtons,
  IonButton,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonInput,
  IonRow,
  IonCol,
  IonMenuButton,
} from "@ionic/react";
import "./Login.css";
import { withRouter, RouteComponentProps } from "react-router-dom";

type State = {
  username: string | null;
};

type Props = RouteComponentProps<{}> & typeof mapDispatchToProps;

class Login extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      username: null,
    };
  }

  private updateUserName(e: CustomEvent) {}
  logInUser = () => {
    this.props.logIn();
  };

  signUpUser() {
    alert(1);
    // firebase
    //   .auth()
    //   .createUserWithEmailAndPassword(email, password)
    //   .catch(function(error) {
    //     // Handle Errors here.
    //     var errorCode = error.code;
    //     var errorMessage = error.message;
    //     // ...
    //   });
  }

  render() {
    return (
      <>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonMenuButton />
            </IonButtons>
            <IonTitle>Login</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonContent>
          <div className="logo">
            <img src="assets/img/appicon.svg" alt="Ionic logo" />
          </div>
          <form noValidate>
            <IonList no-lines>
              <IonItem>
                <IonLabel color="primary">Username</IonLabel>
                <IonInput
                  onIonChange={this.updateUserName}
                  name="username"
                  type="text"
                  autocapitalize="off"
                  value={this.state.username}
                  required
                />
              </IonItem>
              <IonItem>
                <IonLabel color="primary">Password</IonLabel>
                <IonInput name="password" type="password" required />
              </IonItem>
            </IonList>

            <IonRow responsive-sm>
              <IonCol>
                {/* submitしないとリロードされない */}
                <IonButton onClick={this.logInUser} type="submit">
                  Login
                </IonButton>
              </IonCol>
              <IonCol>
                <IonButton onClick={this.signUpUser} color="light">
                  Signup
                </IonButton>
              </IonCol>
            </IonRow>
          </form>
        </IonContent>
      </>
    );
  }
}

const mapDispatchToProps = {
  logIn: () => actions.user.logIn(),
};

export default withRouter(
  connect(
    null,
    mapDispatchToProps
  )(Login)
);
