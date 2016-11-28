import React from 'react';

import {Header} from "./Header.jsx";
class Home extends React.Component {

  render(){
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

export default Home;
