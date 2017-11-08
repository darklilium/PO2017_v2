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
          <IconButton onClick={this.runEffect.bind(this)} id="buttonToggler3" className="ui-state-default ui-corner-all" icon='notifications_active' accent />
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

    /*var gpsCars = new ArcGISDynamicMapServiceLayer(layers.read_GPS(), {id:"gis_gps"});

    gpsCars.setInfoTemplates({
      0: {infoTemplate: myinfotemplate.getCarsInfo()}
    });
    gpsCars.refreshInterval = 0.1;
    gpsCars.setImageFormat("png32");
    gpsCars.hide();
    */

    var gps_new = new ArcGISDynamicMapServiceLayer(layers.read_gps_new(), {id:"gps_new"});
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
      17: {infoTemplate: myinfotemplate.getCarsInfo_layerNominal()}
    });
    gps_new.refreshInterval = 1;
    gps_new.setImageFormat("png32");
    gps_new.setVisibleLayers([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17]);
    gps_new.show();
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
