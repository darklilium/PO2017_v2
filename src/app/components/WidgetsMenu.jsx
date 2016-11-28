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
import {Logo} from "./Logo.jsx";
import {OnlineStatistics} from "./OnlineStatistics.jsx";
import {DrawerTest} from './Drawer.jsx';
import FontIcon from 'react-toolbox/lib/font_icon';

class WidgetsMenu extends React.Component {

  render() {
    return (
      <div className="widgetMenu_container">
        <Link className="widgets_link" to={"/home/map"} activeStyle={{color:"#00ff68"}}>Mapa</Link>
        <Link className="widgets_link" to={"/home/statistics"}  activeStyle={{color:"#00ff68"}}>Estadísticas</Link>
        <DrawerTest />
      </div>
    );
  }

}

export {WidgetsMenu};
