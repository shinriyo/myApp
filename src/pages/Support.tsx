import React, { Component } from "react";
import {
  IonMenuButton,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonTextarea,
  IonButton,
} from "@ionic/react";

export default class Support extends Component {
  submit() {}
  render() {
    return (
      <>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonMenuButton />
            </IonButtons>
            <IonTitle>Support</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonContent class="page-user">
          <div className="logo">
            <img src="/assets/img/appicon.svg" alt="Ionic Logo" width="200px" />
          </div>
          <div>サポートします。お気軽に。</div>
          <form onSubmit={() => this.submit()}>
            <IonList no-lines>
              <IonItem>
                <IonLabel color="primary">Enter your support message below</IonLabel>
                <IonTextarea name="supportQuestion" required />
              </IonItem>
            </IonList>
            <div>
              <IonButton type="submit">Submit</IonButton>
            </div>
          </form>
        </IonContent>
      </>
    );
  }
}
