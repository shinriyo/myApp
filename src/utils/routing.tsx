import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import { RouteComponentProps } from "react-router";
import Logout from "../pages/Logout";
import { connect } from "react-redux";
import { RootState } from "../store";

type Props = ReturnType<typeof mapStateToProps> & {
  component: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>;
  path?: string | string[];
};

// App.tsxで<PrivateRoute>で囲った時 x(Account)の時にloginに飛ばす仕組み
class PRoute extends Component<Props> {
  render() {
    const Component = this.props.component;
    const routeRender = (props: any) => {
      console.log(this.props.user.isAuthenticated);
      if (this.props.user.isAuthenticated) {
        return React.createElement(Component, props);
      }
      return (
        <Redirect
          to={{
            pathname: "/login",
            state: { from: props.location },
          }}
        />
      );
    };
    return <Route render={routeRender.bind(this)} />;
  }
}

// TODO: これ消すかも？
class RTRoute extends Component<Props> {
  render() {
    return (
      <>
        {!this.props.user.hasSeenTutorial ? <Logout /> : null}
        <div style={!this.props.user.hasSeenTutorial ? { display: "none" } : {}}>
          <Route {...this.props} />
        </div>
      </>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  user: state.user,
});

export const PrivateRoute = connect(mapStateToProps)(PRoute);
export const RequiresTutorialRoute = connect(mapStateToProps)(RTRoute);
