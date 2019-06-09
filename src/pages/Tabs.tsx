import React, { Component } from "react";
import { IonIcon, IonTabs, IonTab, IonTabBar, IonTabButton, IonLabel } from "@ionic/react";

export default class Tabs extends Component {
  render() {
    return (
      <IonTabs>
        <IonTab tab="schedule">Schedule Content</IonTab>
        <IonTab tab="speakers">Speakers Content</IonTab>
        <IonTab tab="map">Map Content</IonTab>
        <IonTab tab="about">About Content</IonTab>

        <IonTabBar slot="bottom">
          <IonTabButton tab="schedule">
            <IonLabel>Schedule</IonLabel>
            <IonIcon name="schedule" />
          </IonTabButton>
          <IonTabButton tab="speakers">
            <IonLabel>Speakers</IonLabel>
            <IonIcon name="speakers" />
          </IonTabButton>
          <IonTabButton tab="map">
            <IonLabel>Map</IonLabel>
            <IonIcon name="map" />
          </IonTabButton>
          <IonTabButton tab="about">
            <IonLabel>About</IonLabel>
            <IonIcon name="about" />
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    );
  }
}
