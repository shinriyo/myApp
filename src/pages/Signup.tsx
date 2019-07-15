import React, { Component, FormEvent } from "react";
import {
  IonHeader,
  IonToolbar,
  IonButtons,
  IonMenuButton,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonModal,
} from "@ionic/react";
import { createUser } from "../api/login";
import Normal, { Data } from "../components/modals/Normal";

type State = {
  username: string | null;
  password: string | null;
  showLoggedInModal: boolean;
  modalData: Data;
};

export default class Signup extends Component<{}, State> {
  signupFormRef: React.Ref<HTMLFormElement>;

  constructor(props: {}) {
    super(props);
    this.state = {
      username: null,
      password: null,

      showLoggedInModal: false,
      // モーダル初期値
      modalData: { title: "", bodyItems: [] },
    };
    this.signupFormRef = React.createRef();

    this.updateUserName = this.updateUserName.bind(this);
    this.updatePassword = this.updatePassword.bind(this);
    this.onSignup = this.onSignup.bind(this);
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

  // TODO: Signupに移動する?
  private onSignup(event: FormEvent) {
    // don't reload
    event.preventDefault();

    const username = this.state.username;
    const password = this.state.password;

    if (this.signupFormRef === null) {
      return;
    }

    if (username === null || password === null) {
      return;
    }

    // ユーザー生成
    createUser(username, password, (data: any) => {
      let modalData: Data;
      // alert(data.user.uid);
      if (data.user) {
        modalData = {
          title: "新規作成",
          bodyItems: ['新規作成成功しました!', `${data.user.uid}さん`],
        };
      } else {
        // TODO: firebase login
        // setUsername
        const errorCode = data.code;
        const errorMessage = data.message;

        modalData = {
          title: "新規失敗",
          bodyItems: ['新規作成失敗しました!', errorCode, errorMessage],
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

  render() {
    return (
      <>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonMenuButton />
            </IonButtons>
            <IonTitle>Signup</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent class="page-user">
          <div className="logo">
            <img src="assets/img/appicon.svg" alt="Ionic logo" width="200px" />
          </div>
          <div>新規登録しようぜ。</div>
          <form ref={this.signupFormRef} onSubmit={this.onSignup}>
            <IonList no-lines>
              <IonItem>
                <IonLabel color="primary">Username</IonLabel>
                <IonInput
                  value={this.state.username}
                  onIonChange={this.updateUserName}
                  name="username"
                  // type="text"
                  type="email"
                  required
                />
                <IonLabel color="warning">Email</IonLabel>
              </IonItem>
              <IonItem>
                <IonLabel color="primary">Password</IonLabel>
                <IonInput
                  value={this.state.password}
                  onIonChange={this.updatePassword}
                  name="password"
                  type="password"
                  required
                />
                <IonLabel color="warning">Password should be at least 6 characters</IonLabel>
              </IonItem>
            </IonList>
            <div>
              <IonButton type="submit">Create</IonButton>
            </div>
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
