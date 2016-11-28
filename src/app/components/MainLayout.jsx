import React from 'react';
import {Header} from './Header.jsx';



export class MainLayout extends React.Component {
  render() {
    return (
      <div className="container">
        <div className="rowContent">
          {this.props.children}
        </div>
      </div>

    );

  }
}
