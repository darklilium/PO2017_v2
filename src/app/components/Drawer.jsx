import React from 'react';
// import 'react-toolbox/lib/commons.scss';           // Import common styles

import { Button } from 'react-toolbox/lib/button'; // Bundled component import
import { Layout, NavDrawer, Panel, Sidebar } from 'react-toolbox';
import { AppBar, Checkbox, IconButton } from 'react-toolbox';
import Statistics from './Statistics.jsx';
import {Router, Route, browserHistory} from "react-router";

import {Link} from "react-router";
import {Logo, LogoDrawer} from "./Logo.jsx";
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
import ArcGISDynamicMapServiceLayer from 'esri/layers/ArcGISDynamicMapServiceLayer';
import myLayers from '../services/layers-service';
import ProgressBar from 'react-toolbox/lib/progress_bar';
import Popup from 'esri/dijit/Popup';
import VETiledLayer from 'esri/virtualearth/VETiledLayer';
import env from '../services/config';
//11.10.2017
import LayerList from "esri/dijit/LayerList";
import FeatureLayer from 'esri/layers/FeatureLayer';
import _ from 'lodash';
import myinfotemplate from '../utils/infoTemplates';

export const optionsProcesoNominal = [
  {value: 1, label: "Administrativo"},
  {value: 2, label: "Constr.Empalmes"},
  {value: 3, label: "Constr. Mantención RRDD"},
  {value: 4, label: "Corte y Reposición"},
  {value: 5, label: "Ingeniería"},
  {value: 6, label: "Inspección Pérdidas / Lectura"},
  {value: 7, label: "Mtto. Empalmes"},
  {value: 8, label: "Mtto. Líneas de Transmisión"},
  {value: 9, label: "Mtto. Protecciones"},
  {value: 10, label: "Mtto. Redes Aéreas"},
  {value: 11, label: "Mtto. Redes Energizadas"},
  {value: 12, label: "Mtto. Redes Subterráneas"},
  {value: 13, label: "Mtto. Subestaciones"},
  {value: 14, label: "SAT"},
  {value: 15, label: "Poda"},
  {value: 16, label: "A definir"},
  {value: 17, label: "No Aplica"}
]
export const optionsContingencia = [
  {value: 19, label: "Logística"},
  {value: 20, label: "Concurrencia"},
  {value: 21, label: "Atención Domiciliaria"},
  {value: 22, label: "Insp. / Reparación LLTT"},
  {value: 23, label: "Operación BT/MT"},
  {value: 24, label: "Podas BT/MT"},
  {value: 25, label: "Insp. Protecciones/SSEE"},
  {value: 26, label: "Reparación Liviana"},
  {value: 27, label: "Reparación Pesada"},
  {value: 28, label: "A definir"},
  {value: 29, label: "No Aplica"}
]

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
    active4: false,
    checkbox: false,
    checkbox2: false,
    checkbox3: false,
    checkbox4: false,
    checkbox5: true,
    tipoBusqueda: 'NIS',
    valorBusqueda: '',
    labelBusqueda: 'Valor',
    snackbarMessage: '',
    activeSnackbar: false,
    snackbarIcon: 'error',
    mapSelected: 'topo',
    layersOrder: '',
    selectedValues: optionsProcesoNominal,
    selectedValues2: [],
    checkDefault: true,
    selectNominalDisabled: false,
    selectContingenciaDisabled: true,
  };

  handleToggle = () => {
    this.setState({active: !this.state.active});
  };
  handleToggle2 = () => {
    this.setState({active2: !this.state.active2});
  };
  handleToggle3 = () => {
    var mapp = mymap.getMap();

    this.setState({active3: !this.state.active3, layersOrder: mapp.graphicsLayerIds});
  };

  handleLogout(){
    if(env.ENVIRONMENT=='DEVELOPMENT'){
      browserHistory.push("/");
    }else{
      window.location.href = env.WEBSERVERADDRESS;
    }

  }

  handleCheckboxChange = (e) => {
    console.log(this.state.layersOrder,"my layers order");
    var mapp = mymap.getMap(browserHistory.getCurrentLocation().pathname);
    switch (e) {
      case 'SSEE':
        this.setState({checkbox: !this.state.checkbox});
        if(!this.state.checkbox){
          console.log("en true, prender ssee");
          var sseeLayer = new ArcGISDynamicMapServiceLayer(myLayers.read_SSEE(),{id:"gis_SSEE"});
          mapp.addLayer(sseeLayer);

        }else{
          console.log("en false, apagar ssee");
          mapp.removeLayer(mapp.getLayer("gis_SSEE"));
        }
      break;

      case 'ALIMENTADOR':
        this.setState({checkbox2: !this.state.checkbox2});
        if(!this.state.checkbox2){
          console.log("en true, prender alim");
          var alimLayer = new ArcGISDynamicMapServiceLayer(myLayers.read_layerAlimentador(),{id:"gis_alimentadores"});
          alimLayer.setImageFormat("png32");
          alimLayer.setVisibleLayers([0]);
        /*  alimLayer.setInfoTemplates({
            0: {infoTemplate: myinfotemplate.getAlimentadorInfoWindow()}
          });
          */
          mapp.addLayer(alimLayer);

        }else{
          console.log("en false, apagar alim");
          mapp.removeLayer(mapp.getLayer("gis_alimentadores"));
        }
      break;

      case 'CHILQUINTA':
        this.setState({checkbox3: !this.state.checkbox3});
        if(!this.state.checkbox3){
          console.log("en true, prender mapa chilquinta");
          //var chqmapabase = new ArcGISDynamicMapServiceLayer(myLayers.read_mapabase(),{id:"gis_chqmapabase"});

        /*  alimLayer.setInfoTemplates({
            0: {infoTemplate: myinfotemplate.getAlimentadorInfoWindow()}
          });
          */
          //mapp.addLayer(chqmapabase,1);
          var chqmapabase = mapp.getLayer("gis_chqmapabase");
          chqmapabase.show();

        }else{
          console.log("en false, mapa chilquinta");
          //mapp.removeLayer(mapp.getLayer("gis_chqmapabase"));

          var chqmapabase = mapp.getLayer("gis_chqmapabase");
          chqmapabase.hide();
        }
      break;

      case 'HEATMAPCLIENTES':
         this.setState({checkbox4: !this.state.checkbox4});
         if(!this.state.checkbox4){
           console.log("en true, prender heatmap  clientes");
           var heatmapc = mapp.getLayer("gis_heatmapclientes");
           var heatmaps = mapp.getLayer("gis_heatmapsed");
           heatmapc.show();
           heatmaps.show();
         }else{
           console.log("en false, mapa chilquinta");
           //mapp.removeLayer(mapp.getLayer("gis_chqmapabase"));

           var heatmapc = mapp.getLayer("gis_heatmapclientes");
           var heatmaps = mapp.getLayer("gis_heatmapsed");
           heatmapc.hide();
           heatmaps.hide();
         }
      break;

      case 'GPS':
         this.setState({checkbox5: !this.state.checkbox5});
         if(!this.state.checkbox5){
           console.log("en true, prender GPS");
           var gis_gps = mapp.getLayer("gis_gps");
           gis_gps.show();

         }else{
           console.log("en false, mapa GPS");
           //mapp.removeLayer(mapp.getLayer("gis_chqmapabase"));

           var gis_gps = mapp.getLayer("gis_gps");
           gis_gps.hide();
         }
      break;
      default:

    }
  };

  handleChange = (name, value) => {
   this.setState({...this.state, [name]: value});
  };

  logChange(val) {
      console.log("Selected: " + val.value);
      this.setState({tipoBusqueda: val.value});

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

  }

  onClickBusqueda(){
    var mapp = mymap.getMap();
    console.log("Buscando para:",this.state.tipoBusqueda);
    $('.drawer_progressBar').css('visibility','visible');

    switch (this.state.tipoBusqueda) {

      case 'NIS':
        console.log("searching for nis...");
        searchBar_NIS(this.state.valorBusqueda, (nisFound)=>{

          this.handleToggle();
          this.setState({snackbarMessage: nisFound[2], activeSnackbar: true, snackbarIcon: nisFound[3] });
          $('.theme__icon___4OQx3').css('color',nisFound[4]);
          $('.drawer_progressBar').css('visibility','hidden');
        });
      break;

      case 'INCIDENCIA':
        console.log("searching for incidence...");
        searchBar_Incidence(this.state.valorBusqueda, (incidenciaFound)=>{

          this.handleToggle();
          this.setState({snackbarMessage: incidenciaFound[2], activeSnackbar: true, snackbarIcon: incidenciaFound[3] });
          $('.theme__icon___4OQx3').css('color',incidenciaFound[4]);
          $('.drawer_progressBar').css('visibility','hidden');

        });
      break;

      case 'ORDEN':
        console.log("searching for order...");
        searchBar_Order(this.state.valorBusqueda, (orderFound)=>{

          this.handleToggle();
          this.setState({snackbarMessage: orderFound[2], activeSnackbar: true, snackbarIcon: orderFound[3] });
          $('.theme__icon___4OQx3').css('color',orderFound[4]);
          $('.drawer_progressBar').css('visibility','hidden');


        });
      break;

      case 'SED':
        console.log("searching for sed...");
        searchBar_SED(this.state.valorBusqueda, (sedFound)=>{

          this.handleToggle();
          this.setState({snackbarMessage: sedFound[2], activeSnackbar: true, snackbarIcon: sedFound[3] });
          $('.theme__icon___4OQx3').css('color',sedFound[4]);
          $('.drawer_progressBar').css('visibility','hidden');


        });
      break;

      default:

    }
  }

  handleSnackbarClick = () => {
    this.setState({activeSnackbar: false});

    var mapp = mymap.getMap();

    if(!_.isEmpty(mapp)){
      mapp.graphics.clear();
      mapp.infoWindow.hide();
    }
  };

  onClickLimpiarBusqueda(){
      var mapp = mymap.getMap();
      mapp.graphics.clear();
      this.setState({valorBusqueda: '', tipoBusqueda: 'NIS', activeSnackbar:false});

  }

  handleRadioMapas(mapaNow) {

    var mapp = mymap.getMap();
    $('.drawer_progressBar').css('visibility','visible');
    this.setState({mapSelected: mapaNow});
      mapp.on('basemap-change',(basemapChange)=>{
        $('.drawer_progressBar').css('visibility','hidden');
      });

    /*
        if(mapaNow!='chilquinta'){
          mapp.setBasemap(mapaNow);
          $('.drawer_progressBar').css('visibility','hidden');
        }
    */

    var veTileRoad = new VETiledLayer({
      bingMapsKey: "Asrn2IMtRwnOdIRPf-7q30XVUrZuOK7K2tzhCACMg7QZbJ4EPsOcLk6mE9-sNvUe",
      mapStyle: VETiledLayer.MAP_STYLE_ROAD,
      id:"veroad"
    });

    var veTileAerial = new VETiledLayer({
      bingMapsKey: "Asrn2IMtRwnOdIRPf-7q30XVUrZuOK7K2tzhCACMg7QZbJ4EPsOcLk6mE9-sNvUe",
      mapStyle: VETiledLayer.MAP_STYLE_AERIAL,
      id:"veaerial"
    });

    var veTileWithLabels = new VETiledLayer({
      bingMapsKey: "Asrn2IMtRwnOdIRPf-7q30XVUrZuOK7K2tzhCACMg7QZbJ4EPsOcLk6mE9-sNvUe",
      mapStyle: VETiledLayer.MAP_STYLE_AERIAL_WITH_LABELS,
      id:"velabels"
    });

    switch (mapaNow) {
      case 'topo':
        mapp.setBasemap(mapaNow);
        //desabilitar ve tiled layers (bing maps)
        if(mapp.getLayer("veroad")){
          console.log("habilitado veroad");
          mapp.removeLayer(mapp.getLayer("veroad"));
        }

        if(mapp.getLayer("veaerial")){
          console.log("habilitado veaerial");
          mapp.removeLayer(mapp.getLayer("veaerial"));
        }

        if(mapp.getLayer("velabels")){
          console.log("habilitado velabels");
          mapp.removeLayer(mapp.getLayer("velabels"));
        }

        $('.drawer_progressBar').css('visibility','hidden');
      break;

      case 'hybrid':
        mapp.setBasemap(mapaNow);
        //desabilitar ve tiled layers (bing maps)
        if(mapp.getLayer("veroad")){
          console.log("habilitado veroad");
          mapp.removeLayer(mapp.getLayer("veroad"));
        }

        if(mapp.getLayer("veaerial")){
          console.log("habilitado veaerial");
          mapp.removeLayer(mapp.getLayer("veaerial"));
        }

        if(mapp.getLayer("velabels")){
          console.log("habilitado velabels");
          mapp.removeLayer(mapp.getLayer("velabels"));
        }

        $('.drawer_progressBar').css('visibility','hidden');
      break;
      //bing map: satelite
      case 'calles':

        //desabilitar ve tiled layers (bing maps)
        if(mapp.getLayer("veroad")){
          console.log("habilitado veroad");
          mapp.removeLayer(mapp.getLayer("veroad"));
        }

        if(mapp.getLayer("veaerial")){
          console.log("habilitado veaerial");
          mapp.removeLayer(mapp.getLayer("veaerial"));
        }

        if(mapp.getLayer("velabels")){
          console.log("habilitado velabels");
          mapp.removeLayer(mapp.getLayer("velabels"));
        }

        if(this.state.mapSelected=='hybrid'){
            console.log("habilitado hybrid");
            mapp.setBasemap('topo');
        }

        mapp.addLayer(veTileRoad,1);

        $('.drawer_progressBar').css('visibility','hidden');
      break;

      case 'satelite':

        if(mapp.getLayer("veroad")){
          console.log("habilitado veroad");
          mapp.removeLayer(mapp.getLayer("veroad"));
        }

        if(mapp.getLayer("veaerial")){
          console.log("habilitado veaerial");
          mapp.removeLayer(mapp.getLayer("veaerial"));
        }

        if(mapp.getLayer("velabels")){
          console.log("habilitado velabels");
          mapp.removeLayer(mapp.getLayer("velabels"));
        }
        if(this.state.mapSelected=='hybrid'){
            console.log("habilitado hybrid");
            mapp.setBasemap('topo');
        }

        mapp.addLayer(veTileAerial,1);

        $('.drawer_progressBar').css('visibility','hidden');
      break;

      case 'satelitewithlabels':

        if(mapp.getLayer("veroad")){
          console.log("habilitado veroad");
          mapp.removeLayer(mapp.getLayer("veroad"));
        }

        if(mapp.getLayer("veaerial")){
          console.log("habilitado veaerial");
          mapp.removeLayer(mapp.getLayer("veaerial"));
        }

        if(mapp.getLayer("velabels")){
          console.log("habilitado velabels");
          mapp.removeLayer(mapp.getLayer("velabels"));
        }
        if(this.state.mapSelected=='hybrid'){
            console.log("habilitado hybrid");
            mapp.setBasemap('topo');
        }

        mapp.addLayer(veTileWithLabels,1);
        $('.drawer_progressBar').css('visibility','hidden');
      break;
      default:

    }

  };

  handleSnackbarTimeout = (event, instance) => {

      this.setState({ activeSnackbar : false });
  };

  logChangeLayers(val) {
    //console.log("Selected layers: " + JSON.stringify(val));
    this.setState({selectedValues: val});
  }

  logChangeLayers2(val) {
    //console.log("Selected layers: " + JSON.stringify(val));
    this.setState({selectedValues2: val});
  }



  verLayersGPS(){
    var mapp = mymap.getMap();
    const {selectedValues2, selectedValues} = this.state;
    console.log(selectedValues, selectedValues2);

    if(mapp.getLayer("gps_new")){
      this.removerLayersGPS();
    }

    if((selectedValues.length) || (selectedValues2.length)){
      var gps_new = new ArcGISDynamicMapServiceLayer(myLayers.read_gps_new(), {id:"gps_new"});
      gps_new.setInfoTemplates({
        1: {infoTemplate: myinfotemplate.getCarsInfo_layerNominal()},
        2: {infoTemplate: myinfotemplate.getCarsInfo_layerNominal()},
        3: {infoTemplate: myinfotemplate.getCarsInfo_layerNominal()},
        4: {infoTemplate: myinfotemplate.getCarsInfo_layerNominal()},
        5: {infoTemplate: myinfotemplate.getCarsInfo_layerNominal()},
        6: {infoTemplate: myinfotemplate.getCarsInfo_layerNominal()},
        7: {infoTemplate: myinfotemplate.getCarsInfo_layerNominal()},
        8: {infoTemplate: myinfotemplate.getCarsInfo_layerNominal()},
        9: {infoTemplate: myinfotemplate.getCarsInfo_layerNominal()},
        10: {infoTemplate: myinfotemplate.getCarsInfo_layerNominal()},
        11: {infoTemplate: myinfotemplate.getCarsInfo_layerNominal()},
        12: {infoTemplate: myinfotemplate.getCarsInfo_layerNominal()},
        13: {infoTemplate: myinfotemplate.getCarsInfo_layerNominal()},
        14: {infoTemplate: myinfotemplate.getCarsInfo_layerNominal()},
        15: {infoTemplate: myinfotemplate.getCarsInfo_layerNominal()},
        16: {infoTemplate: myinfotemplate.getCarsInfo_layerNominal()},
        17: {infoTemplate: myinfotemplate.getCarsInfo_layerNominal()},

        18: {infoTemplate: myinfotemplate.getCarsInfo_layerContingencia()},
        19: {infoTemplate: myinfotemplate.getCarsInfo_layerContingencia()},
        20: {infoTemplate: myinfotemplate.getCarsInfo_layerContingencia()},
        21: {infoTemplate: myinfotemplate.getCarsInfo_layerContingencia()},
        22: {infoTemplate: myinfotemplate.getCarsInfo_layerContingencia()},
        23: {infoTemplate: myinfotemplate.getCarsInfo_layerContingencia()},
        24: {infoTemplate: myinfotemplate.getCarsInfo_layerContingencia()},
        25: {infoTemplate: myinfotemplate.getCarsInfo_layerContingencia()},
        26: {infoTemplate: myinfotemplate.getCarsInfo_layerContingencia()},
        27: {infoTemplate: myinfotemplate.getCarsInfo_layerContingencia()},
        28: {infoTemplate: myinfotemplate.getCarsInfo_layerContingencia()},
        29: {infoTemplate: myinfotemplate.getCarsInfo_layerContingencia()}
      });
      gps_new.refreshInterval = 1;
      gps_new.setImageFormat("png32");

      var layersNominal = selectedValues.map(layer => layer.value);
      var layersContingencia = selectedValues2.map(layer => layer.value);
      var layersVisibles = _.concat(layersNominal,layersContingencia);
    //  this.setState({selectedValues2: layersContingencia, selectedValues: layersNominal})
      console.log(layersVisibles,"los visibles");
      gps_new.setVisibleLayers(layersVisibles);
      mapp.addLayer(gps_new);


    }else{
      this.setState({snackbarMessage: "No se ha seleccionado ninguna capa a mostrar.", activeSnackbar: true, snackbarIcon: "info" });
    }


  }

  removerLayersGPS(){
      var mapp = mymap.getMap();
        this.setState({selectedValues2: [], selectedValues: []})
      if(mapp.getLayer("gps_new")){
        mapp.removeLayer(mapp.getLayer("gps_new"));

      }

      if(checkNominal.checked){
        console.log("hola", checkNominal.checked);
        this.setState({selectContingenciaDisabled: true, selectNominalDisabled: false, selectedValues: optionsProcesoNominal, selectedValues2: []});
        //this.verLayersGPS();
      }

      if(checkContingencia.checked){

        console.log("hola2", checkContingencia.checked);
        this.setState({selectNominalDisabled: true, selectContingenciaDisabled: false, selectedValues2: optionsContingencia, selectedValues: []});
        //this.verLayersGPS();
      }
  }

  onCheckChange(e){

    //this.removerLayersGPS();
    //si está seleccionado, deshabilitar select contingencia.
    if(e.currentTarget.id=="checkNominal"){
      this.removerLayersGPS();
      console.log("hola", e.currentTarget.id);
      this.setState({selectContingenciaDisabled: true, selectNominalDisabled: false, selectedValues: optionsProcesoNominal, selectedValues2: []});
      //this.verLayersGPS();
    }
    //si es nominal
    if(e.currentTarget.id=="checkContingencia"){
      this.removerLayersGPS();
      console.log("hola", e.currentTarget.id);
      this.setState({selectNominalDisabled: true, selectContingenciaDisabled: false, selectedValues2: optionsContingencia, selectedValues: []});
      //this.verLayersGPS();
    }

  }

  render () {

    return (
      <div className="drawer_buttons">

        <IconButton icon='search' inverse={ true } onClick={this.handleToggle} />
        <IconButton icon='map' inverse={ true } onClick={this.handleToggle2} />
        <IconButton icon='layers' inverse={ true } onClick={this.handleToggle3} />
        <IconButton icon='settings_power' inverse={ true } onClick={this.handleLogout.bind(this)} />

        <Drawer active={this.state.active} onOverlayClick={this.handleToggle}>
          <div className="drawer_banner">
            <LogoDrawer />
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
                searchable={false}
            />
            <Input className="drawer_input" type='text' label={this.state.labelBusqueda} name='name' value={this.state.valorBusqueda} onChange={this.handleChange.bind(this, 'valorBusqueda')} maxLength={16} />
            <div className="drawer_buttonsContent">
              <Button className="drawer_button" icon='search' label='Buscar' raised primary onClick={this.onClickBusqueda.bind(this)} />
              <Button icon='delete_sweep' label='Limpiar Búsqueda' raised primary onClick={this.onClickLimpiarBusqueda.bind(this)} />
              <ProgressBar type="circular" mode="indeterminate" className="drawer_progressBar" />
            </div>
          </div>
        </Drawer>

        <Drawer active={this.state.active2} onOverlayClick={this.handleToggle2}>
          <div className="drawer_banner">
            <LogoDrawer />
            <h6  className="drawer_banner_title">Seleccionar Mapa</h6>
          </div>
          <ListSubHeader className="drawer_listSubHeader" caption='Seleccione un mapa para visualizar:' />
          <RadioGroup className="drawer_radiogroup" name='mapSelector' value={this.state.mapSelected} onChange={this.handleRadioMapas.bind(this)}>
            <RadioButton label='Topográfico' value='topo'/>
            <RadioButton label='Híbrido' value='hybrid'/>
            <RadioButton label='Aéreo' value='satelite'/>
            <RadioButton label='Aéreo con Etiquetas' value='satelitewithlabels'/>
            <RadioButton label='Caminos' value='calles'/>

          </RadioGroup>
          <ProgressBar type="circular" mode="indeterminate" className="drawer_progressBar" />
        </Drawer>

        <Drawer className="drawer_layers" active={this.state.active3} onOverlayClick={this.handleToggle3}>
          <div className="drawer_banner">
            <LogoDrawer />
            <h6  className="drawer_banner_title">Seleccionar Layers</h6>
          </div>
          <div className="content_drawer">
            <div className="content_drawer_left">
              <List>
                <ListSubHeader className="drawer_listSubHeader2" caption='OTROS: Seleccione uno o más layers para visualizar:' />
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
                <ListCheckbox
                  caption='Chilquinta Basemap'
                  checked={this.state.checkbox3}
                  legend=''
                  onChange={this.handleCheckboxChange.bind(this,"CHILQUINTA")}
                />
                <ListCheckbox
                  caption='Heatmap Clientes'
                  checked={this.state.checkbox4}
                  legend=''
                  onChange={this.handleCheckboxChange.bind(this,"HEATMAPCLIENTES")}
                />
                {/*<ListCheckbox
                  caption='GPS'
                  checked={this.state.checkbox5}
                  legend=''
                  onChange={this.handleCheckboxChange.bind(this,"GPS")}
                />
                */}
              </List>
              </div>
              <div className="content_drawer_right">
                <List >
                  <ListSubHeader className="drawer_listSubHeader2" caption='GPS: Seleccione uno o más layers para visualizar:' />
                </List>

                <div className="combo_wrapper">
                  <input type="radio" onChange={this.onCheckChange.bind(this)}  id="checkNominal" className="checkLayers"  name="checklayers" value="NOMINAL" defaultChecked={this.state.checkDefault} />Proceso Nominal<br />
                  {/* <h4 className="h4_title_layers h4_title_special ">Proceso Nominal</h4> */}
                  <Select className="marginr1"
                    name="procesoNominal"
                    value={this.state.selectedValues}
                    multi
                    options={optionsProcesoNominal}
                    disabled = {this.state.selectNominalDisabled}
                    placeholder= "Selecciona Layers de Proceso Nominal"
                    onChange={this.logChangeLayers.bind(this)}
                  />

                  <input type="radio" onChange={this.onCheckChange.bind(this)}  id="checkContingencia" className="checkLayers" name="checklayers" value="CONTINGENCIA" />Contingencia<br />

                  {/*<h4 className="h4_title_layers h4_title_special ">Contingencia</h4> */}
                  <Select className="marginr1"
                    name="contingencia"
                    value={this.state.selectedValues2}
                    multi
                    options={optionsContingencia}
                    disabled = {this.state.selectContingenciaDisabled}
                    placeholder= "Selecciona Layers de Contingencia"
                    onChange={this.logChangeLayers2.bind(this)}
                  />
                </div>
                <div className="drawer_buttonsContent">
                  <Button className="drawer_button btn50" icon='close' label='Remover' onClick={this.removerLayersGPS.bind(this)} raised primary  />
                  <Button className="drawer_button btn50" icon='check' label="Ver en Mapa" onClick={this.verLayersGPS.bind(this)} raised primary />
                </div>
              </div>
          </div>



        </Drawer>



        <Snackbar
          className={this.state.snackbarStyle}
          action='Aceptar'
          active={this.state.activeSnackbar}
          icon={this.state.snackbarIcon}
          label={this.state.snackbarMessage}
          onClick={this.handleSnackbarClick.bind(this)}
          type='cancel'
          timeout={3000}
          onTimeout={this.handleSnackbarTimeout.bind(this)} />

      </div>
    );
  }
}

export {DrawerTest};
