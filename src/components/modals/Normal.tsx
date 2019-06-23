import React, { Component } from "react";
import { IonHeader, IonButton, IonButtons, IonToolbar, IonTitle, IonContent, IonLabel, IonPage } from "@ionic/react";

type Props = {
  title: string;
  // TODO;
  body: any;
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
              <IonButton onClick={this.props.dismissModal}>閉じる</IonButton>
            </IonButtons>
            <IonTitle>{this.props.title}</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent class="outer-content">
          <IonLabel>
            {this.props.body.displayName || "名前未定義"}
            がログインしました
          </IonLabel>
          <IonLabel>{this.props.body.email}</IonLabel>
          <IonLabel>{JSON.stringify(this.props.body)}</IonLabel>
        </IonContent>
      </IonPage>
    );
  }
}
