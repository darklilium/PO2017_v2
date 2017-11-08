import React from 'react';
// import 'react-toolbox/lib/commons.scss';           // Import common styles

import { Button } from 'react-toolbox/lib/button'; // Bundled component import
import { Layout, NavDrawer, Panel, Sidebar } from 'react-toolbox';
import { AppBar, Checkbox, IconButton } from 'react-toolbox';
import Statistics from './Statistics.jsx';
import {Router, Route, browserHistory} from "react-router";
import {Link} from "react-router";
import env from '../services/config';

class Logo extends React.Component {
  onClickGoHome(){
    //browserHistory.push("chilquinta");
  }

  render() {
    return (
          <div className="logo_content">
            <img className="img_logo" src={env.CSSDIRECTORY+"images/logo_po.png"} onClick={this.onClickGoHome.bind(this)}></img>
          </div>
    );
  }

}

class LogoDrawer extends React.Component {
  onClickGoHome(){
    //browserHistory.push("chilquinta");
  }

  render() {
    return (
          <div className="logo_content">
            <img className="img_logo2" src={env.CSSDIRECTORY+"images/logo_po.png"} onClick={this.onClickGoHome.bind(this)}></img>
          </div>
    );
  }

}

export {Logo, LogoDrawer};
