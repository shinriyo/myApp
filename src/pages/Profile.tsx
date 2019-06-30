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
  IonTextarea,
} from "@ionic/react";
import "./Profile.css";
import AboutPopover from "../components/AboutPopover";
import { getCounties } from "../api/countries";
import * as _ from "lodash";

type Props = ReturnType<typeof mapStateToProps>;

type State = {
  showPopover: boolean;
  showPopoverEvent: null | MouseEvent;
  userData: any;
  countries: any;
};

class Profile extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    const userData = {
      firstname: "太郎",
      lastname: "山田",
      username: "user name",
      bloodType: "A",
      birthDay: "1994-01-01",
      memo: "aoueo アイウエオ",
    };

    this.state = {
      showPopover: false,
      showPopoverEvent: null,
      userData,
      countries: [],
    };

    // 呼ぶ
    getCounties((res: any)=> {
      const countries = _.map(res.data, (country: any) => {
        console.log(country);
        // 日本語
        console.log(country.translations.ja);
        return {"name": country.translations.nam, "ja": country.translations.ja};
      });

      this.setState(
        {countries}
      );
    });
  }

  presentPopover = (event: MouseEvent) => {
    this.setState(() => ({
      showPopover: true,
      showPopoverEvent: event,
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
                <IonLabel>
                  Name: {this.state.userData.firstname} {this.state.userData.lastname}
                </IonLabel>
                <IonLabel>ニックネーム: {this.state.userData.username}</IonLabel>
              </IonItem>
              <IonItem>
                <IonIcon name="calendar" slot="start" />
                <IonLabel>Birth Day</IonLabel>
                <IonDatetime
                  readonly={true}
                  displayFormat="MMM DD, YYYY"
                  max="2056"
                  value={this.state.userData.birthDay}
                />
              </IonItem>
              <IonItem>
                <IonIcon name="water" slot="start" />
                <IonLabel>Blood Type</IonLabel>
                <IonLabel>{this.state.userData.bloodType} </IonLabel>
              </IonItem>

              <IonItem>
                <IonIcon name="pin" slot="start" />
                <IonLabel>Location</IonLabel>
                <IonSelect>
                  {/* <IonSelectOption value="madison" selected>
                    Madison, WI
                  </IonSelectOption>
                  <IonSelectOption value="austin">Austin, TX</IonSelectOption>
                  <IonSelectOption value="chicago">Chicago, IL</IonSelectOption>
                  <IonSelectOption value="seattle">Seattle, WA</IonSelectOption> */}
                  <IonSelectOption key={'option_0'}  value="none" selected>
                    選択してください
                  </IonSelectOption>
                  {_.map(this.state.countries, (country: any, index: number) => {
                    return (<IonSelectOption key={`option_${index}`} value={country.name}>{country.ja}</IonSelectOption>);
                  })}
                  {/* <IonSelectOption value="foreigner">Foreign</IonSelectOption> */}
                </IonSelect>
              </IonItem>
            </IonList>
            <IonTextarea>自己紹介: {this.state.userData.memo}</IonTextarea>
            <div>
              <IonButton type="submit">編集</IonButton>
            </div>
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
