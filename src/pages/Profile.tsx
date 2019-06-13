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
import "./Profile.css";
import AboutPopover from "../components/AboutPopover";

type Props = ReturnType<typeof mapStateToProps>;

type State = {
  showPopover: boolean;
  showPopoverEvent: null | MouseEvent;
};

class Profile extends Component<Props, State> {
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
            <IonTitle>Profile</IonTitle>
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
            <IonList lines="none">
              <IonItem>
                <IonLabel>Name</IonLabel>
                <IonLabel>Hoge Bar</IonLabel>
              </IonItem>
              <IonItem>
                <IonIcon name="calendar" slot="start" />
                <IonLabel>Birth Day</IonLabel>
                <IonDatetime displayFormat="MMM DD, YYYY" max="2056" value={this.props.conferenceDate} />
              </IonItem>
              <IonItem>
                <IonIcon name="calendar" slot="start" />
                <IonLabel>Blood Type</IonLabel>
                <IonLabel>A</IonLabel>
              </IonItem>

              <IonItem>
                <IonIcon name="pin" slot="start" />
                <IonLabel>Location</IonLabel>
                <IonSelect>
                  <IonSelectOption value="madison" selected>
                    Madison, WI
                  </IonSelectOption>
                  <IonSelectOption value="austin">Austin, TX</IonSelectOption>
                  <IonSelectOption value="chicago">Chicago, IL</IonSelectOption>
                  <IonSelectOption value="seattle">Seattle, WA</IonSelectOption>
                  {/* <IonSelectOption value="foreigner">Foreign</IonSelectOption> */}
                </IonSelect>
              </IonItem>
            </IonList>

            <p>HOGE Profile</p>
          </div>
        </IonContent>
      </>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  conferenceDate: selectors.sessions.conferenceStart(state.sessions),
});

export default connect(mapStateToProps)(Profile);
