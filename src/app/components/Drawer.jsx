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
import Drawer from 'react-toolbox/lib/drawer';
import Select from 'react-select';
import { List, ListItem, ListSubHeader, ListDivider, ListCheckbox } from 'react-toolbox/lib/list';
import Input from 'react-toolbox/lib/input';
import { RadioGroup, RadioButton } from 'react-toolbox/lib/radio';

import {searchBar_NIS, searchBar_Order, searchBar_Incidence, searchBar_SED} from '../services/searchbar_service';
import {makeInfowindow} from '../utils/makeInfowindow';
import mymap from '../services/map-service';
import makeSymbol from '../utils/makeSymbol';
import SimpleMarkerSymbol from 'esri/symbol';
import {Snackbar} from 'react-toolbox';
import $ from 'jquery';


var options = [
    { value: 'NIS', label: 'NIS' },
    { value: 'INCIDENCIA', label: 'INCIDENCIA' },
    { value: 'ORDEN', label: 'ORDEN' },
    { value: 'SED', label: 'SED' }
];

class DrawerTest extends React.Component {
  state = {
    active: false,
    active2: false,
    active3: false,
    checkbox: false,
    checkbox2: false,
    value: 'vvendetta',
    tipoBusqueda: 'NIS',
    valorBusqueda: '',
    labelBusqueda: 'Valor',
    snackbarMessage: '',
    activeSnackbar: false,
    snackbarIcon: 'error'
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


  handleChange = (name, value) => {
   this.setState({...this.state, [name]: value});
  };

  logChange(val) {
      console.log("Selected: " + val.value);
      switch (val.value) {
        case 'NIS':
            this.setState({labelBusqueda: 'N° NIS'});
          break;
          case 'INCIDENCIA':
              this.setState({labelBusqueda: 'N° INCIDENCIA'});
            break;
            case 'ORDEN':
                this.setState({labelBusqueda: 'N° ORDEN'});
              break;
              case 'SED':
                  this.setState({labelBusqueda: 'CODIGO SED'});
                break;
        default:
          this.setState({tipoBusqueda: 'NIS'});
      }
      this.setState({tipoBusqueda: val});
  }

  onClickBusqueda(){
    var mapp = mymap.getMap();


    switch (this.state.tipoBusqueda) {
      case 'NIS':
          console.log("searching for nis...");
          searchBar_NIS(this.state.valorBusqueda, (nisFound)=>{
            
              this.handleToggle();
              this.setState({snackbarMessage: nisFound[2], activeSnackbar: true, snackbarIcon: nisFound[3] });
              $('.theme__icon___4OQx3').css('color',nisFound[4]);
              mapp.infoWindow.on('hide', function(){
                mapp.graphics.clear();
              });
              return;

          });
        break;
        case 'INCIDENCIA':
            console.log("searching for incidence...");
            searchBar_Incidence(this.state.valorBusqueda);
          break;
          case 'ORDEN':
              console.log("searching for order...");
              searchBar_Order(this.state.valorBusqueda);
            break;
            case 'SED':
                console.log("searching for sed...");
                searchBar_SED(this.state.valorBusqueda);
              break;
      default:

    }
  }

  handleSnackbarClick = () => {
     this.setState({activeSnackbar: false})
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
          <div className="drawer_content">
            <List selectable ripple>
              <ListSubHeader className="drawer_listSubHeader drawer_busquedaTitle" caption='Seleccione un tipo de búsqueda:' />
            </List>
            <Select
                name="form-field-name"
                value={this.state.tipoBusqueda}
                options={options}
                onChange={this.logChange.bind(this)}
            />
            <Input className="drawer_input" type='text' label={this.state.labelBusqueda} name='name' value={this.state.valorBusqueda} onChange={this.handleChange.bind(this, 'valorBusqueda')} maxLength={16} />
            <Button icon='search' label='Buscar' raised primary onClick={this.onClickBusqueda.bind(this)} />
          </div>
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
            <ListSubHeader className="drawer_listSubHeader" caption='Seleccione uno o más layers para visualizar:' />
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
        <Snackbar className={this.state.snackbarStyle} action='Aceptar' active={this.state.activeSnackbar} icon={this.state.snackbarIcon} label={this.state.snackbarMessage} onClick={this.handleSnackbarClick.bind(this)} type='cancel' />

      </div>
    );
  }
}

export {DrawerTest};
