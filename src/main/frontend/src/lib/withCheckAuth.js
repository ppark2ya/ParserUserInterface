import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

const withCheckAuth = (WrappedComponent) => {
  return class extends Component {
    render() {
      const { uid, auth, expired } = sessionStorage;
      if(uid && auth && expired) {
        return (
          <WrappedComponent {...this.props}/>
        )
      } else {
        return (
          <Redirect to="/login" />
        )
      }
    }
  }
}

export default withCheckAuth;