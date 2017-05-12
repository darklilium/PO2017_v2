import React from 'react';
import mymap from '../services/map-service';
import ArcGISDynamicMapServiceLayer from 'esri/layers/ArcGISDynamicMapServiceLayer';
import layers from '../services/layers-service';
import myinfotemplate from '../utils/infoTemplates';
import {browserHistory} from 'react-router';
import {Simbologia} from './Simbologia.jsx';
import env from '../services/config';

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

    var chqmapabase = new ArcGISDynamicMapServiceLayer(layers.read_mapabase(),{id:"gis_chqmapabase"});
    chqmapabase.hide();
    mapp.addLayers([chqmapabase,interrClienteSED]);

  }


  render(){
    return (
        <div className="map_container">
          <div id="map"></div>
          <Simbologia />
        </div>


    );
  }
}

export default ChilquintaMap;
