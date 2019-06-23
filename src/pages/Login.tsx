import React, { Component, FormEvent } from "react";
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
import { authFirebase, checkLoggedIn } from "../api/login";
import Normal, { Data } from "../components/modals/Normal";

type State = {
  username: string | null;
  password: string | null;
  showLoggedInModal: boolean;
  // モーダルの値
  modalData: Data;
};

type Props = RouteComponentProps<{}> & typeof mapDispatchToProps;

class Login extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      username: null,
      password: null,
      showLoggedInModal: false,

      // モーダル初期値
      modalData: { title: "", bodyItems: [] },
    };

    // ないと怒られる
    this.updateUserName = this.updateUserName.bind(this);
    this.updatePassword = this.updatePassword.bind(this);
    this.submit = this.submit.bind(this);

    // TOOD:
    this.authFacebook = this.authFacebook.bind(this);
  }

  private updateUserName(event: CustomEvent) {
    event.preventDefault();

    this.setState({
      username: event.detail.value,
    });
  }

  private updatePassword(event: CustomEvent) {
    event.preventDefault();

    this.setState({
      password: event.detail.value,
    });
  }

  private submit(event: FormEvent) {
    // don't reload
    event.preventDefault();

    // this.props.logInはかっこなしでコールバックとして呼ぶ
    const username = this.state.username;
    const password = this.state.password;

    if (username === null || password === null) {
      return;
    }

    // TODO:
    // authFirebase(username, password,

    authFirebase("unko@unko.com", "chinkounko", (data: any) => {
      let modalData: Data;
      if (data.user) {
        // これは成功
        modalData = {
          title: "ログイン成功",
          bodyItems: [`ログイン成功しました!`, JSON.stringify(data.user)],
        };
      } else {
        // 失敗
        modalData = {
          title: "ログイン失敗",
          bodyItems: ["ログイン失敗しました!", `code:${data.code}`, `message:${data.message}`],
        };
      }

      // Modal
      this.setState({
        showLoggedInModal: true,
        modalData,
      });
    });

    // don't reload
    return false;
  }

  private authFacebook() {
    this.props.authFacebook();
  }

  // TODO: Signupに移動する
  private signUpUser() {
    // setUsername
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

  // 必ずログイン画面を通るのでここで飛ばせばOK
  componentDidMount() {
    // ログイン確認
    checkLoggedIn((user: any) => {
      if (user) {
        // ログイン
        this.props.logIn();
      } else {
        // 未ログイン
      }
    });
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
          <form onSubmit={this.submit}>
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
                <IonInput
                  onIonChange={this.updatePassword}
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
                <IonButton type="submit">Login</IonButton>
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
            isOpen={this.state.showLoggedInModal}
            onDidDismiss={() => this.setState(() => ({ showLoggedInModal: false }))}
          >
            <Normal
              data={this.state.modalData}
              dismissModal={() => this.setState(() => ({ showLoggedInModal: false }))}
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
