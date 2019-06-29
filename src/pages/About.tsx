import React, { Component } from "react";
import { connect } from "react-redux";
import { RootState, selectors } from "../store";
import {
  IonPopover,
  IonIcon,
  IonSelect,
  IonSelectOption,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonButton,
  IonMenuButton,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonDatetime,
  IonTitle,
} from "@ionic/react";
import "./About.css";
import AboutPopover from "../components/AboutPopover";

type Props = ReturnType<typeof mapStateToProps>;

type State = {
  showPopover: boolean;
  showPopoverEvent: null | MouseEvent;
};

class About extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      showPopover: false,
      showPopoverEvent: null,
    };
  }

  presentPopover = (e: MouseEvent) => {
    this.setState(() => ({
      showPopover: true,
      showPopoverEvent: e,
    }));
  };

  dismissPopover = () => {
    this.setState(() => ({
      showPopover: false,
      showPopoverEvent: null,
    }));
  };

  render() {
    return (
      <>
        <IonHeader>
          <IonToolbar color="primary">
            <IonButtons slot="start">
              <IonMenuButton />
            </IonButtons>
            <IonTitle>About</IonTitle>
            <IonButtons slot="end">
              <IonButton icon-only onClick={this.presentPopover}>
                <IonIcon slot="icon-only" name="more" />
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>

        <IonPopover
          isOpen={this.state.showPopover}
          event={this.state.showPopoverEvent}
          onDidDismiss={this.dismissPopover}
        >
          <AboutPopover dismissPopover={this.dismissPopover} />
        </IonPopover>

        <IonContent>
          <div className="about-header">
            <img src="assets/img/ionic-logo-white.svg" alt="ionic logo" />
          </div>
          <div className="ion-padding about-info">
            <h4>運営情報</h4>
            <p>
              個人のなので
            </p>
          </div>
        </IonContent>
      </>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  conferenceDate: selectors.sessions.conferenceStart(state.sessions),
});

export default connect(mapStateToProps)(About);
