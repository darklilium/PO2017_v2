import React from 'react';
import Map from 'esri/map';

class Mapa extends React.Component {


  componentDidMount(){
  var mapp = new Map("map",{basemap: "topo",  //For full list of pre-defined basemaps, navigate to http://arcg.is/1JVo6Wd
          center: [-71.2905, -33.1009], // longitude, latitude
          zoom: 9});
  }


  render(){
    return (
        <div className="map_container">
          <div id="map"></div>
        </div>

    );
  }
}

export default Mapa;
