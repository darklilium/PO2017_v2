import React from 'react';
// import 'react-toolbox/lib/commons.scss';           // Import common styles

import { Button } from 'react-toolbox/lib/button'; // Bundled component import
import { Layout, NavDrawer, Panel, Sidebar } from 'react-toolbox';
import { AppBar, Checkbox, IconButton } from 'react-toolbox';
import Statistics from './Statistics.jsx';
import {Router, Route, browserHistory} from "react-router";
import {TabsExample} from './Tabs.jsx';
import {Link} from "react-router";
import {Logo} from "./Logo.jsx";
import {OnlineStatistics} from "./OnlineStatistics.jsx";
import {WidgetsMenu} from './WidgetsMenu.jsx';

class Header extends React.Component {
  constructor(props){
    super(props);
  }


  render() {
    return (

            <Panel>
                <AppBar>
                  <div className="wrapperTop">
                    <Logo />
                    <OnlineStatistics />
                  </div>
                  <WidgetsMenu />
                </AppBar>
            </Panel>

    );
  }

}

export {Header};
