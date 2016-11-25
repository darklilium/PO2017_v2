import React from 'react';

import {Header} from "./Header.jsx";

export class Root extends React.Component {
  render() {
    return (
      <div className="container">
        <div className="rowNav">
          <Header />
        </div>
        <div className="rowContent">
          {this.props.children}
        </div>
      </div>
    );

  }
}
