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
  IonModal,
} from "@ionic/react";
import "./Login.css";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { authFirebase, getUid } from "../api/login";
import Normal from "../components/modals/Normal";

type State = {
  username: string | null;
  password: string | null;
  showFilterModal: boolean;
  body: string;
};

type Props = RouteComponentProps<{}> & typeof mapDispatchToProps;

class Login extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      username: null,
      password: null,
      showFilterModal: false,
      body: "",
    };

    // ないと怒られる
    this.updateUserName = this.updateUserName.bind(this);
    this.updatePassword = this.updatePassword.bind(this);

    this.validate = this.validate.bind(this);
    this.authFacebook = this.authFacebook.bind(this);
  }

  private updateUserName(e: CustomEvent) {
    e.preventDefault();

    this.setState({
      username: e.detail.value,
    });
  }

  private updatePassword(e: CustomEvent) {
    e.preventDefault();

    this.setState({
      password: e.detail.value,
    });
  }

  // TODO: Signup参考にする
  private validate(e: any) {
    console.log(e);
  }

  private logInUser = () => {
    // this.props.logInはかっこなしでコールバックとして呼ぶ
    const username = this.state.username;
    const password = this.state.password;

    if (username === null || password === null) {
      return;
    }

    // TODO:
    // authFirebase(username, password, this.props.logIn);

    authFirebase("unko@unko.com", "chinkounko", (data: any) => {
      // Action
      this.props.logIn;

      // Modal
      this.setState({
        showFilterModal: true,
        body: JSON.stringify(data),
      });
    });
  };

  private authFacebook() {
    this.props.authFacebook();
  }

  private signUpUser() {
    // setUsername

    alert(JSON.stringify(getUid()));
    // TODO: firebase login
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
                  onBlur={e => this.validate(e)}
                  name="username"
                  type="text"
                  autocapitalize="off"
                  value={this.state.username}
                  required
                />
              </IonItem>
              <IonItem>
                <IonLabel color="primary">Password</IonLabel>
                <IonInput
                  onIonChange={this.updatePassword}
                  onBlur={e => this.validate(e)}
                  name="password"
                  type="password"
                  autocapitalize="off"
                  value={this.state.password}
                  required
                />
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
          <IonModal
            isOpen={this.state.showFilterModal}
            onDidDismiss={() => this.setState(() => ({ showFilterModal: false }))}
          >
            <Normal
              title="Loing"
              body={this.state.body}
              dismissModal={() => this.setState(() => ({ showFilterModal: false }))}
            />
          </IonModal>
        </IonContent>
      </>
    );
  }
}

const mapDispatchToProps = {
  logIn: () => actions.user.logIn(),
  // TODO: あとで(Ionicなんてらじゃないとダメ？)
  authFacebook: () => actions.user.logIn(),
};

export default withRouter(
  connect(
    null,
    mapDispatchToProps
  )(Login)
);
