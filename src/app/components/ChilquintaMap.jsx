import React from 'react';
import mymap from '../services/map-service';
import ArcGISDynamicMapServiceLayer from 'esri/layers/ArcGISDynamicMapServiceLayer';
import layers from '../services/layers-service';
import myinfotemplate from '../utils/infoTemplates';
import {browserHistory} from 'react-router';
import {Simbologia} from './Simbologia.jsx';
import env from '../services/config';
import FeatureLayer from 'esri/layers/FeatureLayer';
import HeatmapRenderer from "esri/renderers/HeatmapRenderer";
import LayerList from 'esri/dijit/LayerList';
//13-10-2017
import {optionsProcesoNominal} from './Drawer';
import $ from 'jquery';
import {Button, IconButton} from 'react-toolbox/lib/button';

//13-11-2017
import {userPermissions} from './Drawer';


const SymbologyImg = ({imagen}) => {
  return   <div className="simbologia_container"><img src={imagen}></img></div>
}

class ToggleSymbology extends React.Component {
  constructor(props){
    super(props);
    this.state ={
      img: env.CSSDIRECTORY+"images/symbology.png"
    }
  }

  runEffect(e){
    // get effect type from
     var selectedEffect = $( "#effectTypes" ).val();

     // Most effect types need no options passed by default
     var options = {};
     // some effects have required parameters
     if ( selectedEffect === "scale" ) {
       options = { percent: 50 };
     } else if ( selectedEffect === "size" ) {
       options = { to: { width: 200, height: 60 } };
     }

     // Run the effect
     $( "#effect" ).toggle( selectedEffect, options, 500 );

     if(e.currentTarget.id=="buttonToggler"){
       this.setState({img: env.CSSDIRECTORY+"images/symbology.png"})
     }
     if(e.currentTarget.id=="buttonToggler2"){
       this.setState({img: env.CSSDIRECTORY+"images/symbology2.png"})
     }
     if(e.currentTarget.id=="buttonToggler3"){
       this.setState({img: env.CSSDIRECTORY+"images/symbology3.png"})
     }
  }

  render(){
    var classN="toggler "+this.props.theClass;
    return (
      <div className={classN}>
        <div id="effect" className="ui-widget-content ui-corner-all">
           <SymbologyImg imagen={this.state.img}/>
        </div>

        <IconButton onClick={this.runEffect.bind(this)} id="buttonToggler" className="ui-state-default ui-corner-all" icon='power' accent />
        <IconButton onClick={this.runEffect.bind(this)} id="buttonToggler2" className="ui-state-default ui-corner-all" icon='time_to_leave' accent />
        {/*<IconButton onClick={this.runEffect.bind(this)} id="buttonToggler3" className="ui-state-default ui-corner-all" icon='notifications_active' accent />*/}
      </div>

    );
  }

}

class ChilquintaMap extends React.Component {
  constructor(props){
    super(props);

  }
  componentDidMount(){
  /*var mapp = new Map("map",{basemap: "topo",  //For full list of pre-defined basemaps, navigate to http://arcg.is/1JVo6Wd
          center: [-71.2905, -33.1009], // longitude, latitude
          zoom: 9});
  */
  console.log("did mount map")
  var mapp = mymap.createMap("map","topo",-71.5215, -32.9934,9);


  //agregando layer clientes sed.
  var interrClienteSED = new ArcGISDynamicMapServiceLayer(layers.read_dyn_layerClieSED(),{id:"po_interrupciones"});
    interrClienteSED.setInfoTemplates({
      3: {infoTemplate: myinfotemplate.getNisInfo()},
      1: {infoTemplate: myinfotemplate.getIsolatedNisFailure()},
      0: {infoTemplate: myinfotemplate.getSubFailure()}
    });
    interrClienteSED.refreshInterval = 1;
    interrClienteSED.setImageFormat("png32");
    interrClienteSED.on('update-end', (obj)=>{
      if(obj.error){
        console.log("Redirecting to login page, token for this session is ended...");

        if(env.ENVIRONMENT=='DEVELOPMENT'){
            browserHistory.push("/");
        }else{
          window.location.href = env.WEBSERVERADDRESS;
        }

      }
    });
    interrClienteSED.show();

    var chqmapabase = new ArcGISDynamicMapServiceLayer(layers.read_mapabase(),{id:"gis_chqmapabase"});
    chqmapabase.hide();

    var heatmapFeatureLayerOptions = {
        id: "gis_heatmapsed",
        mode: FeatureLayer.MODE_SNAPSHOT,
        outFields: ["*"]
    };

    var heatmapFeatureLayerOptions2 = {
        id: "gis_heatmapclientes",
        mode: FeatureLayer.MODE_SNAPSHOT,
        outFields: ["*"]
    };

    var heatmapFeatureLayer = new FeatureLayer(layers.read_heatmapSED(), heatmapFeatureLayerOptions);

    var heatmapFeatureLayer1 = new FeatureLayer(layers.read_heatmapClientes(), heatmapFeatureLayerOptions2);

    var heatmapRenderer = new HeatmapRenderer({
      colors: ["rgba(0,255,0, 0)","rgb(255, 255, 0)","rgb(255, 0, 0)"],
      blurRadius: 16,
      maxPixelIntensity: 250,
      minPixelIntensity: 5
    });

    heatmapFeatureLayer.setRenderer(heatmapRenderer);
    heatmapFeatureLayer.hide();

    heatmapFeatureLayer1.setRenderer(heatmapRenderer);
    heatmapFeatureLayer1.hide();

// HACK: Inicializar layer gps con definition expression segun permisos del usuario:

    var gps_new = new ArcGISDynamicMapServiceLayer(layers.read_gps_nominal(), {id:"gps_new"});
    gps_new.setInfoTemplates({
      1: {infoTemplate: myinfotemplate.getCarsInfo_layerNominal()},
      3: {infoTemplate: myinfotemplate.getCarsInfo_layerContingencia()}
    });
    gps_new.refreshInterval = 1;
    gps_new.setImageFormat("png32");

      var layerDefinitions = [];
      //obtener todos los layers del servicio (sólo su nombre real de layer)
      var todos = optionsProcesoNominal.map(p=>{return p.realName});
      //obtener los nombres de layers restringidos segun permisos del usuario
      var restringidos = userPermissions.filter(f=>{return f.tipo=='NOMINAL'}).map(f=>{return f.realName});

      //Excluir los layers restringidos del total y agregar premisa de DB.
      var filtro = todos.filter(el=>{
        return !restringidos.includes(el);
      }).map(f=>{
        return `CONTROL_FLOTA.dbo.GPS_PROCESO_NOMINAL.ds_nombre='${f}'`;
      }).toString();
      //Reemplazar la coma del string por or para realizar definition expression
      filtro = filtro.replace(/,/g , " or ")
      layerDefinitions[1] = filtro;
      gps_new.setLayerDefinitions(layerDefinitions);
      gps_new.setVisibleLayers([1]);
      gps_new.show();

      //Agregar todos los layers al mapa.
      mapp.addLayers([chqmapabase,interrClienteSED, heatmapFeatureLayer, heatmapFeatureLayer1, gps_new]);


  }


  render(){
    return (
        <div className="map_container">
          <div id="map"></div>
          <ToggleSymbology theClass="symb_"/>
          {/*<Simbologia />*/}
        </div>


    );
  }
}

export default ChilquintaMap;
