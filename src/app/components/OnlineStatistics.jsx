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

class OnlineStatistics extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      dom: 0,
      red: 0,
      total: 0
    }
  }
  componentDidMount(){
    this.setState({
      dom: 5,
      red: 10,
      total: 15
    });
  }

  render() {
    return (
          <div className="onlineStatistics_wrapper">
            <div className="vertical_hr"></div>
            <IconButton icon='home' inverse={ true }/>
            <h6>DOM: {this.state.dom}</h6>
            <IconButton icon='flash_on' inverse={ true }/>
            <h6>RED: {this.state.red}</h6>
            <IconButton icon='equalizer' inverse={ true }/>
            <h6>TOTAL: {this.state.total}</h6>
            <div className="vertical_hr"></div>
          </div>
    );
  }

}

export {OnlineStatistics};
