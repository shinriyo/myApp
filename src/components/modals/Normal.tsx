import React, { Component } from "react";
import { IonHeader, IonButton, IonButtons, IonToolbar, IonTitle, IonContent, IonPage } from "@ionic/react";

type Props = {
  title: string;
  body: string;
  dismissModal: () => void;
};

export default class Normal extends Component<Props, {}> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonButton onClick={this.props.dismissModal}>Cancel</IonButton>
            </IonButtons>
            <IonTitle>{this.props.title}</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent class="outer-content">{this.props.body}</IonContent>
      </IonPage>
    );
  }
}
