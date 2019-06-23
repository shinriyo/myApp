import React, { Component } from "react";
import { IonHeader, IonButton, IonButtons, IonToolbar, IonTitle, IonContent, IonLabel, IonPage } from "@ionic/react";

export interface Data {
  title: string;
  bodyItems: string[];
}

type Props = {
  // TODO;
  data: Data;
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
            <IonTitle>{this.props.data.title}</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent class="outer-content">
          {this.props.data.bodyItems.map((item: string, index: number) => {
            return (
              <div key={`modal_item_${index}`}>
                <IonLabel>{item}</IonLabel>
              </div>
            );
          })}
        </IonContent>
      </IonPage>
    );
  }
}
