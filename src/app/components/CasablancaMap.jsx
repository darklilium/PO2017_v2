import React from 'react';
import mymap from '../services/map-service';;
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
import gps_user_permissions from '../services/gps_user_permissions';
import SymbologyImg from "./SymbologyImg";
import ToggleSymbology from "./ToggleSymbology";
//29-5-2018
import {userPermissions} from './Drawer';

class CasablancaMap extends React.Component {
  constructor(props){
    super(props);
  }

  componentDidMount(){
    console.log("en CasablancaMap");
    var mapp = mymap.createMap("map","topo",-71.4077,-33.3156,12);

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
      var permisos = gps_user_permissions();

        permisos.then((p)=>{

          var permitidos = p.filter(f=>{return f.tipo=='NOMINAL'}).map(f=>{return f.realName}).map(f=>{
              return `CONTROL_FLOTA.dbo.GPS_PROCESO_NOMINAL.ds_nombre='${f}'`;
            }).toString();
        //Reemplazar la coma del string por or para realizar definition expression
          var filtro = permitidos.replace(/,/g , " or ");
            console.log(filtro,"tengo esto", filtro.length, typeof filtro);
            layerDefinitions[1] = filtro;
            gps_new.setLayerDefinitions(layerDefinitions);
            gps_new.setVisibleLayers([1]);
            gps_new.show();
            (!filtro.length)? mapp.addLayers([chqmapabase, interrClienteSED, heatmapFeatureLayer, heatmapFeatureLayer1]) : mapp.addLayers([chqmapabase, interrClienteSED, heatmapFeatureLayer, heatmapFeatureLayer1, gps_new]);

        },(reject)=>{
            //Agregar todos los layers al mapa.
            console.log("problemas agregando layer gps");
            mapp.addLayers([chqmapabase,interrClienteSED, heatmapFeatureLayer, heatmapFeatureLayer1]);
        });
  }


  render(){
    return (
        <div className="map_container">
          <div id="map"></div>
          <ToggleSymbology theClass="symb_"/>
        </div>

    );
  }
}

export default CasablancaMap;
