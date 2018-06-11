import React from 'react';
// import 'react-toolbox/lib/commons.scss';           // Import common styles

import { Button } from 'react-toolbox/lib/button'; // Bundled component import
import { Layout, NavDrawer, Panel, Sidebar } from 'react-toolbox';
import { AppBar, Checkbox, IconButton } from 'react-toolbox';
import Statistics from './Statistics.jsx';
import {Router, Route, browserHistory} from "react-router";
import {Link} from "react-router";
import layers from '../services/layers-service';
import createQueryTask from '../services/createquerytask-service';
import env from '../services/config';

var foo;
import mymap from '../services/map-service';

class OnlineStatistics extends React.Component {
  constructor(props){
    super(props);
   /*this.state = {
      CLIEDOM: '--',
      CLIERED:'--',
      TOTALQTTY: '--',
      afx: ''
    }
    */

    this.state = {
      pred_dom: '--',
      pred_red:'--',
      conf_dom:'--',
      conf_red:'--',
      total_pred: '--',
      total_conf: '--',
      totalDoms: '--',
      totalReds : '--',
      total: '--'
    }
    this.currentTotal = this.currentTotal.bind(this);
    this.clear = this.clear.bind(this);
    this.currentTotal();
    foo = function(){
              //console.log("desde constr ",browserHistory.getCurrentLocation().pathname);
              if(browserHistory.getCurrentLocation().pathname.toLowerCase()==env.ROOT.toLowerCase()){
                clearTimeout(foo);
              }else{
                //console.log("updating ");
                this.currentTotal();
                setTimeout(foo, 10000);
              }
    };

            foo = foo.bind(this);
            this.clear("iniciar", foo);

  }

  clear(op, fx){
    if(op='iniciar'){
      setTimeout(fx, 10000);
      this.setState({afx: fx});
    }else{
      //console.log("cleaning");
      clearTimeout(this.state.afx);
      clearTimeout(foo);
    }
  }
  componentDidMount(){


    clearTimeout(foo);
    //console.log("desde OnlineStatistics componentDidMount",browserHistory.getCurrentLocation().pathname);
  }

  componentWillReceiveProps(newState){
    var mapp = mymap.getMap();
    console.log(mapp);
    //console.log("desde OnlineStatistics componentWillReceiveProps",browserHistory.getCurrentLocation().pathname, newState);
    this.currentTotal();
  }


  currentTotal(){
    //console.log(browserHistory.getCurrentLocation().pathname.toLowerCase(), "mypath");

    if(env.ENVIRONMENT=='DEVELOPMENT'){
      switch (browserHistory.getCurrentLocation().pathname.toLowerCase()) {
        case '/chilquinta':

          var serviceCurrTotal = createQueryTask({
            url: layers.read_vista_clientes(),
            whereClause: "1=1"
          });

          serviceCurrTotal((map,featureSet)=>{
            console.log(featureSet,"tengo");
            this.setState({
              pred_dom: featureSet.features[4].attributes.CANTIDAD,
              pred_red: featureSet.features[3].attributes.CANTIDAD,
              conf_dom: featureSet.features[1].attributes.CANTIDAD,
              conf_red: featureSet.features[0].attributes.CANTIDAD,
              total_pred: featureSet.features[5].attributes.CANTIDAD,
              total_conf: featureSet.features[2].attributes.CANTIDAD,
              totalDoms: featureSet.features[4].attributes.CANTIDAD + featureSet.features[1].attributes.CANTIDAD,
              totalReds : featureSet.features[3].attributes.CANTIDAD + featureSet.features[0].attributes.CANTIDAD,
              total: featureSet.features[4].attributes.CANTIDAD + featureSet.features[1].attributes.CANTIDAD+ featureSet.features[3].attributes.CANTIDAD + featureSet.features[0].attributes.CANTIDAD
            });

          },(errorCount) => {console.log("error getting the current total");});
          break;

          case '/casablanca':
            //console.log("desde currentTotal casablanca");
          this.setState({
            pred_dom: 0,
            pred_red: 0,
            conf_dom: 0,
            conf_red: 0,
            total_pred:0,
            total_conf: 0,
            totalDoms: 0,
            totalReds : 0,
            total: 0
          });
            break

          case '/litoral':
            //console.log("desde litoral currentTotal");
            this.setState({
              pred_dom: 0,
              pred_red: 0,
              conf_dom: 0,
              conf_red: 0,
              total_pred:0,
              total_conf: 0,
              totalDoms: 0,
              totalReds : 0,
              total: 0
            });
          break

          case '/linares':
            //console.log("desde linares currentTotal");
              this.setState({
                pred_dom: 0,
                pred_red: 0,
                conf_dom: 0,
                conf_red: 0,
                total_pred:0,
                total_conf: 0,
                totalDoms: 0,
                totalReds : 0,
                total: 0
              });
          break

          case '/parral':
            //console.log("desde parral currentTotal");
            this.setState({
              pred_dom: 0,
              pred_red: 0,
              conf_dom: 0,
              conf_red: 0,
              total_pred:0,
              total_conf: 0,
              totalDoms: 0,
              totalReds : 0,
              total: 0
           });
          break

          case '/statistics':
            //console.log("desde statistics currentTotal");
            this.setState({
              pred_dom: 0,
              pred_red: 0,
              conf_dom: 0,
              conf_red: 0,
              total_pred:0,
              total_conf: 0,
              totalDoms: 0,
              totalReds : 0,
              total: 0
            });
          break
          case '/':

          this.clear('asd','x');

          break
        default:
      }
    //es produccion:

    }else{
      //console.log(browserHistory.getCurrentLocation().pathname.toLowerCase(), "mypath2", env.ROOT+'chilquinta', "myswitchprod")
      switch (browserHistory.getCurrentLocation().pathname.toLowerCase()) {
        case "/"+env.ROOT+'chilquinta':

          var serviceCurrTotal = createQueryTask({
            url: layers.read_vista_clientes(),
            whereClause: "1=1"
          });

          serviceCurrTotal((map,featureSet)=>{
            this.setState({
              pred_dom: featureSet.features[4].attributes.CANTIDAD,
              pred_red: featureSet.features[3].attributes.CANTIDAD,
              conf_dom: featureSet.features[1].attributes.CANTIDAD,
              conf_red: featureSet.features[0].attributes.CANTIDAD,
              total_pred: featureSet.features[5].attributes.CANTIDAD,
              total_conf: featureSet.features[2].attributes.CANTIDAD,
              totalDoms: featureSet.features[4].attributes.CANTIDAD + featureSet.features[1].attributes.CANTIDAD,
              totalReds : featureSet.features[3].attributes.CANTIDAD + featureSet.features[0].attributes.CANTIDAD,
              total: featureSet.features[4].attributes.CANTIDAD + featureSet.features[1].attributes.CANTIDAD+ featureSet.features[3].attributes.CANTIDAD + featureSet.features[0].attributes.CANTIDAD
           });

          },(errorCount) => {console.log("error getting the current total");});
          break;

          case  "/"+ env.ROOT+'casablanca':
            //console.log("desde currentTotal casablanca");
          this.setState({
            pred_dom: 0,
            pred_red: 0,
            conf_dom: 0,
            conf_red: 0,
            total_pred:0,
            total_conf: 0,
            totalDoms: 0,
            totalReds : 0,
            total: 0
          });
            break

          case  "/"+ env.ROOT+'litoral':
            //console.log("desde litoral currentTotal");
            this.setState({
              pred_dom: 0,
              pred_red: 0,
              conf_dom: 0,
              conf_red: 0,
              total_pred:0,
              total_conf: 0,
              totalDoms: 0,
              totalReds : 0,
              total: 0
            });
          break

          case "/"+ env.ROOT+'linares':
            //console.log("desde linares currentTotal");
              this.setState({
                pred_dom: 0,
                pred_red: 0,
                conf_dom: 0,
                conf_red: 0,
                total_pred:0,
                total_conf: 0,
                totalDoms: 0,
                totalReds : 0,
                total: 0
              });
          break

          case  "/"+ env.ROOT+'parral':
            //console.log("desde parral currentTotal");
            this.setState({
              pred_dom: 0,
              pred_red: 0,
              conf_dom: 0,
              conf_red: 0,
              total_pred:0,
              total_conf: 0,
              totalDoms: 0,
              totalReds : 0,
              total: 0
            });
          break

          case "/"+ env.ROOT+'statistics':
            //console.log("desde statistics currentTotal");
            this.setState({
              pred_dom: 0,
              pred_red: 0,
              conf_dom: 0,
              conf_red: 0,
              total_pred:0,
              total_conf: 0,
              totalDoms: 0,
              totalReds : 0,
              total: 0
            });
          break
          case "/"+ env.ROOT:
            this.clear('asd','x');
            break
        default:
      }
    }



  }

  render() {

    let totalDoms = this.state.pred_dom + this.state.conf_dom;
    let totalReds = this.state.pred_red + this.state.conf_red;
    return (
          <div className="onlineStatistics_wrapper">
            <div className="vertical_hr"></div>
              <div className="big_group_wrapper">

                <div className="3_group_wrapper">
                  <div className="icon_qtty_wrapper"><h8 className="onlineStatistics_h8_title"></h8><h8>TIPO: </h8></div>
                  <div className="icon_qtty_wrapper"><h8 className="onlineStatistics_h8_title"></h8><h8>DOM </h8></div>
                  <div className="icon_qtty_wrapper"><h8 className="onlineStatistics_h8_title"></h8><h8>RED </h8></div>
                  <div className="icon_qtty_wrapper"><h8 className="onlineStatistics_h8_title"></h8><h8>TOTAL </h8></div>
                </div>

                <div className="3_group_wrapper">
                  <div className="icon_qtty_wrapper"><h8 className="onlineStatistics_h8_title">PRED.: </h8><h8></h8></div>
                  <div className="icon_qtty_wrapper"><h8 className="onlineStatistics_h8_title"></h8><h8>{this.state.pred_dom}</h8></div>
                  <div className="icon_qtty_wrapper"><h8 className="onlineStatistics_h8_title"></h8><h8>{this.state.pred_red}</h8></div>
                  <div className="icon_qtty_wrapper"><h8 className="onlineStatistics_h8_title"></h8><h8>{this.state.total_pred}</h8></div>

                </div>

                <div className="3_group_wrapper">

                  <div className="icon_qtty_wrapper"><h8 className="onlineStatistics_h8_title">CONF. : </h8><h8></h8></div>
                  <div className="icon_qtty_wrapper"><h8 className="onlineStatistics_h8_title"></h8><h8>{this.state.conf_dom}</h8></div>
                  <div className="icon_qtty_wrapper"><h8 className="onlineStatistics_h8_title"></h8><h8>{this.state.conf_red}</h8></div>
                  <div className="icon_qtty_wrapper"><h8 className="onlineStatistics_h8_title"></h8><h8>{this.state.total_conf}</h8></div>

                </div>

                <div className="3_group_wrapper">

                  <div className="icon_qtty_wrapper"><h8 className="onlineStatistics_h8_title">TOTAL: </h8><h8></h8></div>
                  <div className="icon_qtty_wrapper"><h8 className="onlineStatistics_h8_title"></h8><h8>{this.state.totalDoms}</h8></div>
                  <div className="icon_qtty_wrapper"><h8 className="onlineStatistics_h8_title"></h8><h8>{this.state.totalReds}</h8></div>
                  <div className="icon_qtty_wrapper"><h8 className="onlineStatistics_h8_title"></h8><h8>{this.state.total}</h8></div>

                </div>

              </div>

          {/*  <IconButton icon='home' inverse={ true }/>
            <h8 className="onlineStatistics_h8_title">DOM: </h8><h8>{this.state.CLIEDOM}</h8>
            <IconButton icon='flash_on' inverse={ true }/>
            <h8 className="onlineStatistics_h8_title">RED: </h8><h8>{this.state.CLIERED}</h8>
            <IconButton icon='equalizer' inverse={ true }/>
            <h8 className="onlineStatistics_h8_title">TOTAL: </h8><h8>{this.state.TOTALQTTY}</h8>
            <div className="vertical_hr"></div>
            */}
          </div>
    );
  }

}

export {OnlineStatistics, foo};
