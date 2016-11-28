import React from 'react';
// import 'react-toolbox/lib/commons.scss';           // Import common styles
import Mapa from './Map.jsx';
import { Button } from 'react-toolbox/lib/button'; // Bundled component import
import { Layout, NavDrawer, Panel, Sidebar } from 'react-toolbox';
import { AppBar, Checkbox, IconButton } from 'react-toolbox';
import Statistics from './Statistics.jsx';
import {Router, Route, browserHistory} from "react-router";
import {TabsExample} from './Tabs.jsx';
import {Link} from "react-router";

class Logo extends React.Component {

  render() {
    return (
          <div className="logo_content">
            <img className="img_logo" src="../dist/css/images/logo_po.png"></img>
          </div>
    );
  }

}

export {Logo};
