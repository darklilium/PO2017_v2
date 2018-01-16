import React from 'react';
// import 'react-toolbox/lib/commons.scss';           // Import common styles

import { Button } from 'react-toolbox/lib/button'; // Bundled component import
import { Layout, NavDrawer, Panel, Sidebar } from 'react-toolbox';

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

import { Checkbox } from 'semantic-ui-react';
import { AppBar, IconButton } from 'react-toolbox';

import gps_user_permissions from '../services/gps_user_permissions';
export var userPermissions;

export const optionsProcesoNominal = [
  {value: 1, label: "Administrativo", name: 'Administrativo', realName: 'Administrativo', shortName: 'checkN_Admin', disabled: true, checked: false},
  {value: 2, label: "Constr.Empalmes", name:"Construcción de Empalmes", realName:"Construcción de Empalmes", shortName: 'checkN_ConstEmpalmes', disabled: true, checked: false},
  {value: 3, label: "Constr. Mantención RRDD", name: "Construcción y Mantención RRDD", realName: "Construcción y Mantención RRDD", disabled: true, checked: false},
  {value: 4, label: "Corte y Reposición", name: 'Corte y Reposición', realName: 'Corte y Reposición', disabled: true, checked: false},
  {value: 5, label: "Ingeniería", name: "Ingeniería", realName: "Ingeniería", disabled: true, checked: false},
  {value: 6, label: "Inspección Pérdidas / Lectura", name: 'Inspección Perdidas / Lectura ' , realName: 'Inspección Perdidas / Lectura ', disabled: true, checked: false},
  {value: 7, label: "Mtto. Empalmes", name: 'Mantenimiento Empalmes' , realName: 'Mantenimiento Empalmes', disabled: true, checked: false},
  {value: 8, label: "Mtto. Líneas de Transmisión", name: 'Mantenimiento Líneas de transmisión', realName: 'Mantenimiento Líneas de transmisión', disabled: true, checked: false},
  {value: 9, label: "Mtto. Protecciones", name: 'Mantenimiento Protecciones' , realName: 'Mantenimiento Protecciones', disabled: true, checked: false},
  {value: 10, label: "Mtto. Redes Aéreas", name: 'Mantenimiento Redes Aéreas', realName: 'Mantenimiento Redes Aéreas', disabled: true, checked: false},
  {value: 11, label: "Mtto. Redes Energizadas", name: 'Mantenimiento Redes Energizadas',  realName: 'Mantenimiento Redes Energizadas', disabled: true, checked: false},
  {value: 12, label: "Mtto. Redes Subterráneas", name: "Mantenimiento Redes Subterráneas", realName: "Mantenimiento Redes Subterráneas", disabled: true, checked: false},
  {value: 13, label: "Mtto. Subestaciones", name: 'Mantenimiento Subestaciones', realName: 'Mantenimiento Subestaciones', disabled: true, checked: false},
  {value: 14, label: "SAT", name: "SAT", realName: "SAT", disabled: true, checked: false},
  {value: 15, label: "Poda", name: 'Poda' , realName: "Poda", disabled: true, checked: false},
  {value: 16, label: "A definir", name: 'A definirNominal'  , realName: "A definir", disabled: true, checked: false},
  {value: 17, label: "No Aplica", name: 'No AplicaNominal', realName: "No Aplica", disabled: true, checked: false}
]
export const optionsContingencia = [
  {value: 19, label: "Logística", name: "Logística", realName: "Logística", disabled: true, checked: false},
  {value: 20, label: "Concurrencia", name: "Concurrencia", realName: "Concurrencia", disabled: true, checked: false},
  {value: 21, label: "Atención Domiciliaria", name: "Atención Domiciliaria", realName: "Atención Domiciliaria", disabled: true, checked: false},
  {value: 22, label: "Insp. / Reparación LLTT", name: "Inspección / Reparación LLTT", realName: "Inspección / Reparación LLTT", disabled: true, checked: false},
  {value: 23, label: "Operación BT/MT", name: "Operación BT MT", realName: "Operación BT MT", disabled: true, checked: false},
  {value: 24, label: "Podas BT/MT", name: "Podas BT MT", realName: "Podas BT MT", disabled: true, checked: false},
  {value: 25, label: "Insp. Protecciones/SSEE", name: "Inspección Protecciones / SSEE", realName: "Inspección Protecciones / SSEE", disabled: true, checked: false},
  {value: 26, label: "Reparación Liviana", name: "Reparación Liviana", realName: "Reparación Liviana", disabled: true, checked: false},
  {value: 27, label: "Reparación Pesada", name: "Reparación Pesada", realName: "Reparación Pesada", disabled: true, checked: false},
  {value: 28, label: "A definir", name: "A definirContingencia", realName: "A definir", disabled: true, checked: false},
  {value: 29, label: "No Aplica", name: "No AplicaContingencia", realName: "No Aplica", disabled: true, checked: false}
]

var options = [
    { value: 'NIS', label: 'NIS' },
    { value: 'INCIDENCIA', label: 'INCIDENCIA' },
    { value: 'ORDEN', label: 'ORDEN' },
    { value: 'SED', label: 'SED' }
];

class DrawerTest extends React.Component {
  constructor(props){
    super(props);
    this.filtrarContenido = this.filtrarContenido.bind(this);
    userPermissions = gps_user_permissions();

  }
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
    checkbox6: false,
    tipoBusqueda: 'NIS',
    valorBusqueda: '',
    labelBusqueda: 'Valor',
    snackbarMessage: '',
    activeSnackbar: false,
    snackbarIcon: 'error',
    mapSelected: 'topo',
    layersOrder: '',
    //selectedValues: optionsProcesoNominal,
    //selectedValues2: [],
    checkContingenciaChecked: false,
    checkNominalChecked: true,
    selectNominalDisabled: false,
    selectContingenciaDisabled: true,
    optionsProcesoNominal: optionsProcesoNominal,
    optionsContingencia: optionsContingencia


    //checkboxes para layers: (Contingencia)

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
    //console.log(this.state.layersOrder,"my layers order");
    var mapp = mymap.getMap(browserHistory.getCurrentLocation().pathname);
    switch (e) {
      case 'SSEE':
        this.setState({checkbox: !this.state.checkbox});
        if(!this.state.checkbox){
          //console.log("en true, prender ssee");
          var sseeLayer = new ArcGISDynamicMapServiceLayer(myLayers.read_SSEE(),{id:"gis_SSEE"});
          mapp.addLayer(sseeLayer);

        }else{
          //console.log("en false, apagar ssee");
          mapp.removeLayer(mapp.getLayer("gis_SSEE"));
        }
      break;

      case 'ALIMENTADOR':
        this.setState({checkbox2: !this.state.checkbox2});
        if(!this.state.checkbox2){
          //console.log("en true, prender alim");
          var alimLayer = new ArcGISDynamicMapServiceLayer(myLayers.read_layerAlimentador(),{id:"gis_alimentadores"});
          alimLayer.setImageFormat("png32");
          alimLayer.setVisibleLayers([0]);
        /*  alimLayer.setInfoTemplates({
            0: {infoTemplate: myinfotemplate.getAlimentadorInfoWindow()}
          });
          */
          mapp.addLayer(alimLayer);

        }else{
          //console.log("en false, apagar alim");
          mapp.removeLayer(mapp.getLayer("gis_alimentadores"));
        }
      break;

      case 'CHILQUINTA':
        this.setState({checkbox3: !this.state.checkbox3});
        if(!this.state.checkbox3){
          //console.log("en true, prender mapa chilquinta");
          //var chqmapabase = new ArcGISDynamicMapServiceLayer(myLayers.read_mapabase(),{id:"gis_chqmapabase"});

        /*  alimLayer.setInfoTemplates({
            0: {infoTemplate: myinfotemplate.getAlimentadorInfoWindow()}
          });
          */
          //mapp.addLayer(chqmapabase,1);
          var chqmapabase = mapp.getLayer("gis_chqmapabase");
          chqmapabase.show();

        }else{
          //console.log("en false, mapa chilquinta");
          //mapp.removeLayer(mapp.getLayer("gis_chqmapabase"));

          var chqmapabase = mapp.getLayer("gis_chqmapabase");
          chqmapabase.hide();
        }
      break;

      case 'HEATMAPCLIENTES':
         this.setState({checkbox4: !this.state.checkbox4});
         if(!this.state.checkbox4){
           //console.log("en true, prender heatmap  clientes");
           var heatmapc = mapp.getLayer("gis_heatmapclientes");
           var heatmaps = mapp.getLayer("gis_heatmapsed");
           heatmapc.show();
           heatmaps.show();
         }else{
           //console.log("en false, mapa chilquinta");
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
           //console.log("en true, prender GPS");
           var gis_gps = mapp.getLayer("gis_gps");
           gis_gps.show();

         }else{
           //console.log("en false, mapa GPS");
           //mapp.removeLayer(mapp.getLayer("gis_chqmapabase"));

           var gis_gps = mapp.getLayer("gis_gps");
           gis_gps.hide();
         }
      break;
      /*
      case 'SECTORES':
         this.setState({checkbox6: !this.state.checkbox6});
         if(!this.state.checkbox6){
           //console.log("en true, prender GPS");
           var sectores_layer = mapp.getLayer("sectores");
           sectores_layer.show();

         }else{
           //console.log("en false, mapa GPS");
           //mapp.removeLayer(mapp.getLayer("gis_chqmapabase"));

           var sectores_layer = mapp.getLayer("sectores");
           sectores_layer.hide();
         }
      break;
      */
      default:

    }
  };

  handleChange = (name, value) => {
   this.setState({...this.state, [name]: value});
  };

  logChange(val) {
      //console.log("Selected: " + val.value);
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
    //console.log("Buscando para:",this.state.tipoBusqueda);
    $('.drawer_progressBar').css('visibility','visible');

    switch (this.state.tipoBusqueda) {

      case 'NIS':
        //console.log("searching for nis...");
        searchBar_NIS(this.state.valorBusqueda, (nisFound)=>{

          this.handleToggle();
          this.setState({snackbarMessage: nisFound[2], activeSnackbar: true, snackbarIcon: nisFound[3] });
          $('.theme__icon___4OQx3').css('color',nisFound[4]);
          $('.drawer_progressBar').css('visibility','hidden');
        });
      break;

      case 'INCIDENCIA':
        //console.log("searching for incidence...");
        searchBar_Incidence(this.state.valorBusqueda, (incidenciaFound)=>{

          this.handleToggle();
          this.setState({snackbarMessage: incidenciaFound[2], activeSnackbar: true, snackbarIcon: incidenciaFound[3] });
          $('.theme__icon___4OQx3').css('color',incidenciaFound[4]);
          $('.drawer_progressBar').css('visibility','hidden');

        });
      break;

      case 'ORDEN':
        //console.log("searching for order...");
        searchBar_Order(this.state.valorBusqueda, (orderFound)=>{

          this.handleToggle();
          this.setState({snackbarMessage: orderFound[2], activeSnackbar: true, snackbarIcon: orderFound[3] });
          $('.theme__icon___4OQx3').css('color',orderFound[4]);
          $('.drawer_progressBar').css('visibility','hidden');


        });
      break;

      case 'SED':
        //console.log("searching for sed...");
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
          //console.log("habilitado veroad");
          mapp.removeLayer(mapp.getLayer("veroad"));
        }

        if(mapp.getLayer("veaerial")){
          //console.log("habilitado veaerial");
          mapp.removeLayer(mapp.getLayer("veaerial"));
        }

        if(mapp.getLayer("velabels")){
          //console.log("habilitado velabels");
          mapp.removeLayer(mapp.getLayer("velabels"));
        }

        $('.drawer_progressBar').css('visibility','hidden');
      break;

      case 'hybrid':
        mapp.setBasemap(mapaNow);
        //desabilitar ve tiled layers (bing maps)
        if(mapp.getLayer("veroad")){
          //console.log("habilitado veroad");
          mapp.removeLayer(mapp.getLayer("veroad"));
        }

        if(mapp.getLayer("veaerial")){
          //console.log("habilitado veaerial");
          mapp.removeLayer(mapp.getLayer("veaerial"));
        }

        if(mapp.getLayer("velabels")){
          //console.log("habilitado velabels");
          mapp.removeLayer(mapp.getLayer("velabels"));
        }

        $('.drawer_progressBar').css('visibility','hidden');
      break;
      //bing map: satelite
      case 'calles':

        //desabilitar ve tiled layers (bing maps)
        if(mapp.getLayer("veroad")){
          //console.log("habilitado veroad");
          mapp.removeLayer(mapp.getLayer("veroad"));
        }

        if(mapp.getLayer("veaerial")){
          //console.log("habilitado veaerial");
          mapp.removeLayer(mapp.getLayer("veaerial"));
        }

        if(mapp.getLayer("velabels")){
          //console.log("habilitado velabels");
          mapp.removeLayer(mapp.getLayer("velabels"));
        }

        if(this.state.mapSelected=='hybrid'){
            //console.log("habilitado hybrid");
            mapp.setBasemap('topo');
        }

        mapp.addLayer(veTileRoad,1);

        $('.drawer_progressBar').css('visibility','hidden');
      break;

      case 'satelite':

        if(mapp.getLayer("veroad")){
          //console.log("habilitado veroad");
          mapp.removeLayer(mapp.getLayer("veroad"));
        }

        if(mapp.getLayer("veaerial")){
          //console.log("habilitado veaerial");
          mapp.removeLayer(mapp.getLayer("veaerial"));
        }

        if(mapp.getLayer("velabels")){
          //console.log("habilitado velabels");
          mapp.removeLayer(mapp.getLayer("velabels"));
        }
        if(this.state.mapSelected=='hybrid'){
            //console.log("habilitado hybrid");
            mapp.setBasemap('topo');
        }

        mapp.addLayer(veTileAerial,1);

        $('.drawer_progressBar').css('visibility','hidden');
      break;

      case 'satelitewithlabels':

        if(mapp.getLayer("veroad")){
          //console.log("habilitado veroad");
          mapp.removeLayer(mapp.getLayer("veroad"));
        }

        if(mapp.getLayer("veaerial")){
          //console.log("habilitado veaerial");
          mapp.removeLayer(mapp.getLayer("veaerial"));
        }

        if(mapp.getLayer("velabels")){
          //console.log("habilitado velabels");
          mapp.removeLayer(mapp.getLayer("velabels"));
        }
        if(this.state.mapSelected=='hybrid'){
            //console.log("habilitado hybrid");
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

  verLayersGPS(){
    var mapp = mymap.getMap();
    if(mapp.getLayer("gps_new")){
      this.removerLayersGPS();
    }
    // HACK: Ver layers segun tipo nominal o contingencia:
    //si contingencia está seleccionado, sólo ver los layers habilitados y checkeados.

    //si nominal está seleccionado, sólo ver los layers habilitados y checkeados.
    if(checkNominal.checked){
      var selectedChecks =  this.state.optionsProcesoNominal.map(pnom =>{
        var el = document.getElementsByName(pnom.name);

        if(el.length){
          if(el[0].checked){
            ////console.log("Checked", el[0].attributes.name);
            return `CONTROL_FLOTA.dbo.GPS_PROCESO_NOMINAL.ds_nombre='${pnom.realName}'`;
          }else{
            return '';
          }
        }else{
          return '';
        }

      });
      var filtrados = selectedChecks.filter(valor=>{
        return valor !='';
      })

      //agregar el layer con la definición según los layers seleccionados.
      var gps_new = new ArcGISDynamicMapServiceLayer(myLayers.read_gps_nominal(), {id:"gps_new"});
      gps_new.setInfoTemplates({
        1: {infoTemplate: myinfotemplate.getCarsInfo_layerNominal()},
        3: {infoTemplate: myinfotemplate.getCarsInfo_layerContingencia()}
      });
      gps_new.refreshInterval = 1;
      gps_new.setImageFormat("png32");
      var layerDefinitions = [];
      gps_new.setVisibleLayers([1]);


      var w = filtrados.toString();

      w = w.replace(/,/g , " or ")

      layerDefinitions[1] = w;
      gps_new.setLayerDefinitions(layerDefinitions);
      //si hay algun check seleccionado
      if(filtrados.length){
        mapp.addLayer(gps_new);
      }


    }

    if(checkContingencia.checked){
      var selectedChecks =  this.state.optionsContingencia.map(pnom =>{


        var el = document.getElementsByName(pnom.name);

        if(el.length){
          if(el[0].checked){

            return `CONTROL_FLOTA.dbo.GPS_CONTINGENCIA.ds_nombre='${pnom.realName}'`;
          }else{
            return '';
          }
        }else{
          return '';
        }

      });
      var filtrados = selectedChecks.filter(valor=>{
        return valor !='';
      })


      //agregar el layer con la definición según los layers seleccionados.
      var gps_new = new ArcGISDynamicMapServiceLayer(myLayers.read_gps_nominal(), {id:"gps_new"});
      gps_new.setInfoTemplates({
        1: {infoTemplate: myinfotemplate.getCarsInfo_layerNominal()},
        3: {infoTemplate: myinfotemplate.getCarsInfo_layerContingencia()}
      });
      gps_new.refreshInterval = 1;
      gps_new.setImageFormat("png32");
      var layerDefinitions = [];
      gps_new.setVisibleLayers([3]);


      var w = filtrados.toString();
      ////console.log(w,"Tengo")
      w = w.replace(/,/g , " or ")

      layerDefinitions[3] = w;
      gps_new.setLayerDefinitions(layerDefinitions);
      //si hay algun check seleccionado
      if(filtrados.length){
        mapp.addLayer(gps_new);
      }


    }
  }

  removerLayersGPS(){
      var mapp = mymap.getMap();
        //this.setState({selectedValues2: [], selectedValues: []})
      if(mapp.getLayer("gps_new")){
        mapp.removeLayer(mapp.getLayer("gps_new"));
      }

      if(checkNominal.checked){
        //this.setState({selectContingenciaDisabled: true, selectNominalDisabled: false, selectedValues: optionsProcesoNominal, selectedValues2: []});
        this.setState({selectContingenciaDisabled: true, selectNominalDisabled: false});
      }

      if(checkContingencia.checked){
        //this.setState({selectNominalDisabled: true, selectContingenciaDisabled: false, selectedValues2: optionsContingencia, selectedValues: []});
        this.setState({selectNominalDisabled: true, selectContingenciaDisabled: false});
      }
  }



  componentDidMount(){
    //filtrar segun permisos
    this.filtrarContenido();
  }

  onCheckChange(e){

    if(e.currentTarget.id=="checkNominal"){
      this.removerLayersGPS();

      this.setState({selectContingenciaDisabled: true, selectNominalDisabled: false, checkNominalChecked: true, checkContingenciaChecked: false});

      this.filtrarContenido();

    }

    if(e.currentTarget.id=="checkContingencia"){
      this.removerLayersGPS();

      this.setState({selectNominalDisabled: true, selectContingenciaDisabled: false, checkContingenciaChecked: true, checkNominalChecked: false});

      this.filtrarContenido();
    }

  }

  handleCheckboxLayersChange(e, data){

    if(this.state.checkNominalChecked){
        this.setState({optionsProcesoNominal: this.state.optionsProcesoNominal.map( (el)=> el.name===data.name ? Object.assign({}, el, {checked: data.checked}): el)})
    }

    if(this.state.checkContingenciaChecked){
        this.setState({optionsContingencia: this.state.optionsContingencia.map( (el)=> el.name===data.name ? Object.assign({}, el, {checked: data.checked}): el)})
    }

  }


  filtrarContenido(){
    // HACK: Filtrar checkboxes segun permisos de usuario:
      //filtro de permisos de usuario segun tipo
      var uperm = gps_user_permissions();
      uperm.then((userPermissions)=>{

        var nominal = _.filter(userPermissions, (o)=> {return o.tipo=='NOMINAL'});
        var contin = _.filter(userPermissions, (o)=> {return o.tipo=="CONTINGENCIA"});
        //habilitar options para proceso nominal segun permisos de usuario
        nominal.map(u=>{
            var res = _.filter(this.state.optionsProcesoNominal, (o)=>{
              return o.name==u.realName;
            });

            res.map(r=>{
              r.disabled=false;
              r.checked=true;

            });
        });
        //deshabilitar optiones para contingencia segun permisos de usuario
        contin.map(u=>{

            var res = _.filter(this.state.optionsContingencia, (o)=>{
              return o.name==u.realName;
            });

            res.map(r=>{
              r.disabled=false;
              r.checked=true;

            });
        })

      },(reject)=>{
      });

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
                {/*
                <ListCheckbox
                  caption='Sectores'
                  checked={this.state.checkbox6}
                  legend=''
                  onChange={this.handleCheckboxChange.bind(this,"SECTORES")}
                />
                */}
              </List>
              </div>
              <div className="content_drawer_right">
                <List >
                  <ListSubHeader className="drawer_listSubHeader2" caption='GPS: Seleccione uno o más layers para visualizar:' />
                </List>

                <div className="combo_wrapper">
                  <input type="radio" onChange={this.onCheckChange.bind(this)}  id="checkNominal" className="checkLayers"  name="checklayers" value="NOMINAL" checked={this.state.checkNominalChecked} />Proceso Nominal<br />

                  {/*<Select className="marginr1"
                    name="procesoNominal"
                    value={this.state.selectedValues}
                    multi
                    options={optionsProcesoNominal}
                    disabled = {this.state.selectNominalDisabled}
                    placeholder= "Selecciona Layers de Proceso Nominal"
                    onChange={this.logChangeLayers.bind(this)}
                  />
                  */}

                  <List>
                    <div className="wrapper_checksLayers">
                    <Checkbox
                      label= {optionsProcesoNominal[0].label}
                      name= {optionsProcesoNominal[0].name}
                      onChange={this.handleCheckboxLayersChange.bind(this)}
                      disabled={this.state.optionsProcesoNominal[0].disabled}
                      checked={this.state.optionsProcesoNominal[0].checked}
                    />

                    <Checkbox
                      label= {optionsProcesoNominal[1].label}
                      name = {optionsProcesoNominal[1].name}
                      onChange={this.handleCheckboxLayersChange.bind(this)}
                      disabled={this.state.optionsProcesoNominal[1].disabled}
                      checked={this.state.optionsProcesoNominal[1].checked}
                    />

                    <Checkbox
                      label= {optionsProcesoNominal[2].label}
                      name= {optionsProcesoNominal[2].name}
                      onChange={this.handleCheckboxLayersChange.bind(this)}
                      disabled={this.state.optionsProcesoNominal[2].disabled}
                      checked={this.state.optionsProcesoNominal[2].checked}
                    />

                    <Checkbox
                      label= {optionsProcesoNominal[3].label}
                      name = {optionsProcesoNominal[3].name}
                      onChange={this.handleCheckboxLayersChange.bind(this)}
                      disabled={this.state.optionsProcesoNominal[3].disabled}
                      checked={this.state.optionsProcesoNominal[3].checked}
                    />

                    <Checkbox
                      label= {optionsProcesoNominal[4].label}
                      name= {optionsProcesoNominal[4].name}
                      onChange={this.handleCheckboxLayersChange.bind(this)}
                      disabled={this.state.optionsProcesoNominal[4].disabled}
                      checked={this.state.optionsProcesoNominal[4].checked}
                    />

                    <Checkbox
                      label= {optionsProcesoNominal[5].label}
                      name = {optionsProcesoNominal[5].name}
                      onChange={this.handleCheckboxLayersChange.bind(this)}
                      disabled={this.state.optionsProcesoNominal[5].disabled}
                      checked={this.state.optionsProcesoNominal[5].checked}
                    />

                    <Checkbox
                      label= {optionsProcesoNominal[6].label}
                      name= {optionsProcesoNominal[6].name}
                      onChange={this.handleCheckboxLayersChange.bind(this)}
                      disabled={this.state.optionsProcesoNominal[6].disabled}
                      checked={this.state.optionsProcesoNominal[6].checked}
                    />

                    <Checkbox
                      label= {optionsProcesoNominal[7].label}
                      name = {optionsProcesoNominal[7].name}
                      onChange={this.handleCheckboxLayersChange.bind(this)}
                      disabled={this.state.optionsProcesoNominal[7].disabled}
                      checked={this.state.optionsProcesoNominal[7].checked}
                    />

                    <Checkbox
                      label= {optionsProcesoNominal[8].label}
                      name= {optionsProcesoNominal[8].name}
                      onChange={this.handleCheckboxLayersChange.bind(this)}
                      disabled={this.state.optionsProcesoNominal[8].disabled}
                      checked={this.state.optionsProcesoNominal[8].checked}
                    />

                    <Checkbox
                      label= {optionsProcesoNominal[9].label}
                      name = {optionsProcesoNominal[9].name}
                      onChange={this.handleCheckboxLayersChange.bind(this)}
                      disabled={this.state.optionsProcesoNominal[9].disabled}
                      checked={this.state.optionsProcesoNominal[9].checked}
                    />

                    <Checkbox
                      label= {optionsProcesoNominal[10].label}
                      name = {optionsProcesoNominal[10].name}
                      onChange={this.handleCheckboxLayersChange.bind(this)}
                      disabled={this.state.optionsProcesoNominal[10].disabled}
                      checked={this.state.optionsProcesoNominal[10].checked}
                    />

                    <Checkbox
                      label= {optionsProcesoNominal[11].label}
                      name = {optionsProcesoNominal[11].name}
                      onChange={this.handleCheckboxLayersChange.bind(this)}
                      disabled={this.state.optionsProcesoNominal[11].disabled}
                      checked={this.state.optionsProcesoNominal[11].checked}
                    />

                    <Checkbox
                      label= {optionsProcesoNominal[12].label}
                      name = {optionsProcesoNominal[12].name}
                      onChange={this.handleCheckboxLayersChange.bind(this)}
                      disabled={this.state.optionsProcesoNominal[12].disabled}
                      checked={this.state.optionsProcesoNominal[12].checked}
                    />

                    <Checkbox
                      label= {optionsProcesoNominal[13].label}
                      name = {optionsProcesoNominal[13].name}
                      onChange={this.handleCheckboxLayersChange.bind(this)}
                      disabled={this.state.optionsProcesoNominal[13].disabled}
                      checked={this.state.optionsProcesoNominal[13].checked}
                    />

                    <Checkbox
                      label= {optionsProcesoNominal[14].label}
                      name = {optionsProcesoNominal[14].name}
                      onChange={this.handleCheckboxLayersChange.bind(this)}
                      disabled={this.state.optionsProcesoNominal[14].disabled}
                      checked={this.state.optionsProcesoNominal[14].checked}
                    />

                    <Checkbox
                      label= {optionsProcesoNominal[15].label}
                      name = {optionsProcesoNominal[15].name}
                      onChange={this.handleCheckboxLayersChange.bind(this)}
                      disabled={this.state.optionsProcesoNominal[15].disabled}
                      checked={this.state.optionsProcesoNominal[15].checked}
                    />

                    <Checkbox
                      label= {optionsProcesoNominal[16].label}
                      name = {optionsProcesoNominal[16].name}
                      onChange={this.handleCheckboxLayersChange.bind(this)}
                      disabled={this.state.optionsProcesoNominal[16].disabled}
                      checked={this.state.optionsProcesoNominal[16].checked}
                    />

                    </div>
                  </List>


                  <input type="radio" onChange={this.onCheckChange.bind(this)} id="checkContingencia" className="checkLayers" name="checklayers" value="CONTINGENCIA" checked={this.state.checkContingenciaChecked} />Contingencia<br />


                  {/*<Select className="marginr1"
                    name="contingencia"
                    value={this.state.selectedValues2}
                    multi
                    options={optionsContingencia}
                    disabled = {this.state.selectContingenciaDisabled}
                    placeholder= "Selecciona Layers de Contingencia"
                    onChange={this.logChangeLayers2.bind(this)}
                  />
                  */}

                  <div className="wrapper_checksLayers">
                  <Checkbox
                    label= {optionsContingencia[0].label}
                    name= {optionsContingencia[0].name}
                    onChange={this.handleCheckboxLayersChange.bind(this)}
                    disabled={this.state.optionsContingencia[0].disabled}
                    checked={this.state.optionsContingencia[0].checked}

                  />
                  <Checkbox
                    label= {optionsContingencia[1].label}
                    name = {optionsContingencia[1].name}
                    onChange={this.handleCheckboxLayersChange.bind(this)}
                    disabled={this.state.optionsContingencia[1].disabled}
                    checked={this.state.optionsContingencia[1].checked}
                  />

                  <Checkbox
                    label= {optionsContingencia[2].label}
                    name= {optionsContingencia[2].name}
                    onChange={this.handleCheckboxLayersChange.bind(this)}
                    disabled={this.state.optionsContingencia[2].disabled}
                    checked={this.state.optionsContingencia[2].checked}

                  />
                  <Checkbox
                    label= {optionsContingencia[3].label}
                    name = {optionsContingencia[3].name}
                    onChange={this.handleCheckboxLayersChange.bind(this)}
                    disabled={this.state.optionsContingencia[3].disabled}
                    checked={this.state.optionsContingencia[3].checked}
                  />

                  <Checkbox
                    label= {optionsContingencia[4].label}
                    name= {optionsContingencia[4].name}
                    onChange={this.handleCheckboxLayersChange.bind(this)}
                    disabled={this.state.optionsContingencia[4].disabled}
                    checked={this.state.optionsContingencia[4].checked}
                  />

                  <Checkbox
                    label= {optionsContingencia[5].label}
                    name = {optionsContingencia[5].name}
                    onChange={this.handleCheckboxLayersChange.bind(this)}
                    disabled={this.state.optionsContingencia[5].disabled}
                    checked={this.state.optionsContingencia[5].checked}
                  />

                  <Checkbox
                    label= {optionsContingencia[6].label}
                    name= {optionsContingencia[6].name}
                    onChange={this.handleCheckboxLayersChange.bind(this)}
                    disabled={this.state.optionsContingencia[6].disabled}
                    checked={this.state.optionsContingencia[6].checked}
                  />

                  <Checkbox
                    label= {optionsContingencia[7].label}
                    name = {optionsContingencia[7].name}
                    onChange={this.handleCheckboxLayersChange.bind(this)}
                    disabled={this.state.optionsContingencia[7].disabled}
                    checked={this.state.optionsContingencia[7].checked}
                  />

                  <Checkbox
                    label= {optionsContingencia[8].label}
                    name= {optionsContingencia[8].name}
                    onChange={this.handleCheckboxLayersChange.bind(this)}
                    disabled={this.state.optionsContingencia[8].disabled}
                    checked={this.state.optionsContingencia[8].checked}
                  />

                  <Checkbox
                    label= {optionsContingencia[9].label}
                    name = {optionsContingencia[9].name}
                    onChange={this.handleCheckboxLayersChange.bind(this)}
                    disabled={this.state.optionsContingencia[9].disabled}
                    checked={this.state.optionsContingencia[9].checked}
                  />

                  <Checkbox
                    label= {optionsContingencia[10].label}
                    name = {optionsContingencia[10].name}
                    onChange={this.handleCheckboxLayersChange.bind(this)}
                    disabled={this.state.optionsContingencia[10].disabled}
                    checked={this.state.optionsContingencia[10].checked}
                  />

                  </div>

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
