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
import Drawer from 'react-toolbox/lib/drawer';
import Dropdown from 'react-toolbox/lib/dropdown';
import { List, ListItem, ListSubHeader, ListDivider, ListCheckbox } from 'react-toolbox/lib/list';

import { RadioGroup, RadioButton } from 'react-toolbox/lib/radio';

const countries = [
  { value: 'EN-gb', label: 'England' },
  { value: 'ES-es', label: 'Spain'},
  { value: 'TH-th', label: 'Thailand' },
  { value: 'EN-en', label: 'USA'}
];


class DrawerTest extends React.Component {
  state = {
    active: false,
    active2: false,
    active3: false,
    checkbox: false,
    checkbox2: false,
    value: 'vvendetta',
    busquedaValue: 'ES-es'
  };

  handleToggle = () => {
    this.setState({active: !this.state.active});
  };
  handleToggle2 = () => {
    this.setState({active2: !this.state.active2});
  };
  handleToggle3 = () => {
    this.setState({active3: !this.state.active3});
  };

  handleLogout(){
    browserHistory.push("/");
  }

  handleCheckboxChange = (e) => {
    console.log(e);
    switch (e) {
      case 'SSEE':
        this.setState({checkbox: !this.state.checkbox});
      break;

      case 'ALIMENTADOR':
        this.setState({checkbox2: !this.state.checkbox2});
      break;
      default:

    }
  };

  handleChange = (value) => {
  this.setState({value});
  };


  handleDropDownBusqueda = (value) => {
      this.setState({busquedaValue: value});
    };

  render () {

    return (
      <div className="drawer_buttons">

        <IconButton icon='search' inverse={ true } onClick={this.handleToggle} />
        <IconButton icon='map' inverse={ true } onClick={this.handleToggle2} />
        <IconButton icon='layers' inverse={ true } onClick={this.handleToggle3} />
        <IconButton icon='settings_power' inverse={ true } onClick={this.handleLogout.bind(this)} />

        <Drawer active={this.state.active} onOverlayClick={this.handleToggle}>
          <div className="drawer_banner">
            <Logo />
            <h6 className="drawer_banner_title">Búsqueda</h6>

          </div>
            <Dropdown auto onChange={this.handleChange} source={countries} value={this.state.value}/>

        </Drawer>

        <Drawer active={this.state.active2} onOverlayClick={this.handleToggle2}>
          <div className="drawer_banner">
            <Logo />
            <h6  className="drawer_banner_title">Seleccionar Mapa</h6>
          </div>
          <RadioGroup className="drawer_radiogroup" name='comic' value={this.state.value} onChange={this.handleDropDownBusqueda}>
            <RadioButton label='The Walking Dead' value='thewalkingdead'/>
            <RadioButton label='From Hell' value='fromhell' disabled/>
            <RadioButton label='V for a Vendetta' value='vvendetta'/>
            <RadioButton label='Watchmen' value='watchmen'/>
          </RadioGroup>
        </Drawer>

        <Drawer active={this.state.active3} onOverlayClick={this.handleToggle3}>
          <div className="drawer_banner">
            <Logo />
            <h6  className="drawer_banner_title">Seleccionar Layers</h6>
          </div>
          <List selectable ripple>
            <ListSubHeader caption='Seleccione uno o más layers para visualizar:' />
            <ListCheckbox
              caption='SSEE'
              checked={this.state.checkbox}
              legend=''
              onChange={this.handleCheckboxChange.bind(this,"SSEE")}
            />
            <ListCheckbox
              caption='Alimentador'
              checked={this.state.checkbox2}
              legend=''
              onChange={this.handleCheckboxChange.bind(this,"ALIMENTADOR")}
            />
            <ListDivider />
          </List>
        </Drawer>
      </div>
    );
  }
}

export {DrawerTest};
