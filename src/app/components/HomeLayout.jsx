import React from 'react';

import {Header} from "./Header.jsx";

class HomeLayout extends React.Component {

  render(){
    return (
      <div className="container">
      <Header />
        <div className="rowContent">
          {this.props.children}
        </div>
      </div>

    );
  }
}

export default HomeLayout;
