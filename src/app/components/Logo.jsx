import React from 'react';
// import 'react-toolbox/lib/commons.scss';           // Import common styles

import { Button } from 'react-toolbox/lib/button'; // Bundled component import
import { Layout, NavDrawer, Panel, Sidebar } from 'react-toolbox';
import { AppBar, Checkbox, IconButton } from 'react-toolbox';
import Statistics from './Statistics.jsx';
import {Router, Route, browserHistory} from "react-router";
import {Link} from "react-router";
import env from '../services/config';
import $ from 'jquery';

class LogoDrawer extends React.Component {
  onClickGoHome(){
    //browserHistory.push("chilquinta");
  }

  render() {
    let img = env.CSSDIRECTORY+"images/logo_po.png";
    if($(window).width() < 425){
      img =  env.CSSDIRECTORY+"images/logo_po_reduced.png";
    }else{
        img = env.CSSDIRECTORY+"images/logo_po.png";
    }
    return (
          <div className="logo_content">
            <img className="img_logo" src={img} onClick={this.onClickGoHome.bind(this)}></img>
          </div>
    );
  }

}

export {LogoDrawer};
