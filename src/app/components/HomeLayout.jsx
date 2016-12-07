import React from 'react';
import {Router, Route, browserHistory} from "react-router";
import {Header} from "./Header.jsx";

class HomeLayout extends React.Component {
  constructor(props){
    super(props);
  }


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
