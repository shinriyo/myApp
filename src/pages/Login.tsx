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
import { authFirebase, getUid } from "../api/login";

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

    // ないと怒られる
    this.updateUserName = this.updateUserName.bind(this);
    this.validate = this.validate.bind(this);
    this.authFacebook = this.authFacebook.bind(this);
  }

  // private updateUserName(e: CustomEvent) {
  private updateUserName(e: any) {
    if (e.target !== null) {
      console.log(e.target.value);
    }
    this.setState({
      username: e.currentTarget.value,
    });
  }

  private validate() {}

  private logInUser = () => {
    alert(this.state.username);
    // this.props.logInはかっこなしでコールバックとして呼ぶ
    authFirebase("unko@unko.com", "chinkounko", this.props.logIn);
  };

  private authFacebook() {
    this.props.authFacebook();
  }

  private signUpUser() {
    // setUsername

    alert(JSON.stringify(getUid()));
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
                  onBlur={e => this.validate()}
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
                {/* <IonButton onClick={this.logInUser} type="submit"> */}
                <IonButton onClick={this.logInUser}>Login</IonButton>
              </IonCol>
              <IonCol>
                <IonButton onClick={this.authFacebook}>Login with Facebook</IonButton>

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
  // TODO: あとで
  authFacebook: () => actions.user.logIn(),
};

export default withRouter(
  connect(
    null,
    mapDispatchToProps
  )(Login)
);
