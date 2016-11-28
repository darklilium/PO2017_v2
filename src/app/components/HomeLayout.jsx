import React from 'react';

import {Header} from "./Header.jsx";

class HomeLayout extends React.Component {

  render(){
    return (
      <div className="container">
      <Header />

          {this.props.children}
      
      </div>

    );
  }
}

export default HomeLayout;
