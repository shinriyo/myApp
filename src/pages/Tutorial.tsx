import React, { Component } from "react";
import { connect } from "react-redux";
import { actions } from "../store";
import {
  IonIcon,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonButton,
  IonContent,
  IonSlides,
  IonSlide,
  IonPage,
} from "@ionic/react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import "./Tutorial.css";

type Props = RouteComponentProps<{}> & typeof mapDispatchToProps;

type State = {
  showSkip: boolean;
};

class Tutorial extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      showSkip: false,
    };
  }

  onSlideChangeStart = () => {
    this.setState((state, props) => ({
      ...state,
      showSkip: !state.showSkip,
    }));
  };

  logIn = () => {
    this.props.logIn();
  };

  logOut = () => {
    this.props.logOut();
  };

  endTutorial = () => {
    this.props.sawTutorial();
  };

  render() {
    return (
      <IonPage className="tutorial-page">
        <IonContent no-bounce>
          <IonSlides onIonSlideWillChange={this.onSlideChangeStart} pager={false}>
            <IonSlide>
              <IonButton fill="clear" onClick={this.logIn}>
                LogIn
                <IonIcon slot="end" name="arrow-forward" />
              </IonButton>
              <IonButton fill="clear" onClick={this.logOut}>
                LogOut
                <IonIcon slot="end" name="arrow-forward" />
              </IonButton>
              <IonButton fill="clear" onClick={this.endTutorial}>
                Continue
                <IonIcon slot="end" name="arrow-forward" />
              </IonButton>
            </IonSlide>
          </IonSlides>
        </IonContent>
      </IonPage>
    );
  }
}

const mapDispatchToProps = {
  sawTutorial: () => actions.user.sawTutorial(),
  logIn: () => actions.user.logIn(),
  logOut: () => actions.user.logOut(),
};

export default withRouter(
  connect(
    null,
    mapDispatchToProps
  )(Tutorial)
);
