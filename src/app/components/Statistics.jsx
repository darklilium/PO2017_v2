import React from 'react';
import {browserHistory} from 'react-router';
//import ReactTabs from 'react-tabs';
import {Tab, Tabs} from 'react-toolbox';
import {getStatisticsSummaryChilquinta, getStatisticPerOfficeChilquinta, getStatisticsRegionPercentChilquinta} from '../services/graphics-service';
import {makeStackedGraphic, makeBarsGraphic} from '../services/graphics-service';
import {getStatisticsRegionPercent} from '../services//graphics-service';
import exportGraphicsToPDF from '../utils/exportToPDF';
import {Button, IconButton} from 'react-toolbox/lib/button';
import autoTable from 'jspdf-autotable';
import {HeaderComponent} from './HeaderComponents';
import Griddle from 'griddle-react';
import {getCriticalCustomersSED, getCriticalCustomersSolos, getEverythingCritical} from '../services/criticalCustomers-service';
import _ from 'lodash';
import ProgressBar from 'react-toolbox/lib/progress_bar';
import $ from 'jquery';

class Statistics extends React.Component {
  constructor(props){
    super(props);
    this.state = {
        index: 0,
        indexChilquinta: 0,
        indexLitoral: 0,
        indexParral: 0,
        indexLinares: 0,
        indexCasablanca: 0,
        selectedRowId: 0,
        dataClientesCriticosComuna: [],
        dataClientesCriticosOficina: []

    }

  }


  componentDidMount(){
    getStatisticsSummaryChilquinta(cb=>{
      if(cb!=false){
        makeStackedGraphic(cb.reg, cb.qttyRED, cb.qttyDOM, "containerChilquinta1", "Cant. Clientes (u)", "Interrupciones por comuna.");
      //  makeStackedGraphic(cb.reg, cb.qttyRED, cb.qttyDOM, "containerChilquinta11", "Cant. Clientes (u)", "Interrupciones por comuna.");

      }

    });

    getStatisticPerOfficeChilquinta(cb=>{});
    getStatisticsRegionPercentChilquinta(cb=>{});

    //promesas para obtener los clientes criticos de sed y normales
    var solos = getCriticalCustomersSolos();
    var sed = getCriticalCustomersSED();

    //espera 2 segundos para cargar la data a la tabla.
    $('.statistics_progressBar').css('visibility','visible');
    setTimeout( ()=>{
      Promise.all([solos,sed]).then(values=>{
        console.log(values,"mis valores con all");
        var x = _.concat(values[0],values[1]);

        this.setState({dataClientesCriticosComuna: x});
        $('.statistics_progressBar').css('visibility','hidden');
      });
    },3000);

  }


  //pestañas principales para chilquinta y filiales. Cuando se presiona una, obtiene los datos para que sean representados en los gráficos.
  handleTabChange = (index) => {
    console.log("index",index);
    this.setState({index});
    switch (index) {
      case 0:
          console.log("chilquinta");
          this.setState({indexChilquinta: 0});
          getStatisticsSummaryChilquinta(cb=>{
             if(cb!=false){
              makeStackedGraphic(cb.reg, cb.qttyRED, cb.qttyDOM, "containerChilquinta1", "Cant. Clientes (u)", "Interrupciones por comuna.");
            }
          });

          //promesas para obtener los clientes criticos de sed y normales
          var solos = getCriticalCustomersSolos();
          var sed = getCriticalCustomersSED();

          //espera 2 segundos para cargar la data a la tabla.
          $('.statistics_progressBar').css('visibility','visible');
          setTimeout( ()=>{
            Promise.all([solos,sed]).then(values=>{
              console.log(values,"mis valores con all");
              var x = _.concat(values[0],values[1]);

              this.setState({dataClientesCriticosComuna: x});
              $('.statistics_progressBar').css('visibility','hidden');
            });
          },3000);

      break;
      case 1:
          console.log("Litoral");
      break;
      case 2:
          console.log("linares");
      break;
      case 3:
          console.log("parral");
      break;
      case 4:
          console.log("casablanca");
      break;
      default:

    }
  };

  //subpestañas de chilquinta
  handleTabChangeChilquinta = (indexChilquinta) => {

    this.setState({indexChilquinta});
    switch (indexChilquinta) {
      case 0:
      getStatisticsSummaryChilquinta(cb=>{
        if(cb!=false){
          makeStackedGraphic(cb.reg, cb.qttyRED, cb.qttyDOM, "containerChilquinta1", "Cant. Clientes (u)", "Interrupciones por comuna.");
        }
      });
      //10.05.2017: agregando datos de comuna para clientes criticos por comuna.
      //promesas para obtener los clientes criticos de sed y normales
      var solos = getCriticalCustomersSolos();
      var sed = getCriticalCustomersSED();

      //espera 2 segundos para cargar la data a la tabla.
      $('.statistics_progressBar').css('visibility','visible');
      setTimeout( ()=>{
        Promise.all([solos,sed]).then(values=>{
          console.log(values,"mis valores con all");
          var x = _.concat(values[0],values[1]);

          this.setState({dataClientesCriticosComuna: x});
          $('.statistics_progressBar').css('visibility','hidden');
        });
      },3000);

      break;
      case 1:
        getStatisticPerOfficeChilquinta(cb=>{
          if(cb!=false){


            makeStackedGraphic(cb.offices, cb.qttyRED, cb.qttyDOM, "containerChilquinta2", "Cant. Clientes (u)", "Interrupciones por Oficina.");
          }
        });

      break;
      case 2:
        getStatisticsRegionPercentChilquinta((cb,cb2)=>{
            console.log(cb,cb2,"por comuna");
          if(cb!=false){
            makeBarsGraphic(cb,cb2, "containerChilquinta3", "% Clientes", "% Clientes", "Interrupciones por comuna.");
          }
        });
      break;

      default:

    }
  };

  handleTabChangeLitoral = (indexLitoral) => {

    this.setState({indexLitoral});
    switch (indexLitoral) {
      case 0:

      break;
      case 1:

      break;
      case 2:

      break;

      default:

    }
  };

  handleTabChangeLinares = (indexLinares) => {

    this.setState({indexLinares});
    switch (indexLinares) {
      case 0:

      break;
      case 1:

      break;
      case 2:

      break;

      default:

    }
  };

  handleTabChangeParral = (indexParral) => {

    this.setState({indexParral});
    switch (indexParral) {
      case 0:

      break;
      case 1:

      break;
      case 2:

      break;

      default:

    }
  };

  handleTabChangeCasablanca = (indexCasablanca) => {

    this.setState({indexCasablanca});
    switch (indexCasablanca) {
      case 0:

      break;
      case 1:

      break;
      case 2:

      break;

      default:

    }
  };

  onClickExportChilquinta(e){
      exportGraphicsToPDF(this.state.dataClientesCriticosComuna);
    }

  render(){

    var columnMetaClientesCriticos = [
            {
            "columnName": "PRODUCTO",
            "customHeaderComponent": HeaderComponent,
            "customHeaderComponentProps": { color: '#da291c' }
            },
            {
            "columnName": "NOMBRE",
            "customHeaderComponent": HeaderComponent,
            "customHeaderComponentProps": { color: '#da291c' }
            },
            {
            "columnName": "COMUNA",
            "customHeaderComponent": HeaderComponent,
            "customHeaderComponentProps": { color: '#da291c' }
            },
            {
            "columnName": "HORA",
            "customHeaderComponent": HeaderComponent,
            "customHeaderComponentProps": { color: '#da291c' }
            },
            {
            "columnName": "ID ORDEN",
            "customHeaderComponent": HeaderComponent,
            "customHeaderComponentProps": { color: '#da291c' }
            },
            {
            "columnName": "ETR",
            "customHeaderComponent": HeaderComponent,
            "customHeaderComponentProps": { color: '#da291c' }
            }
        ];

    const rowMetadata = {
      bodyCssClassName: rowData => (rowData['PRODUCTO'] === this.state.selectedRowId ? 'selected' : ''),
    };

    //por oficina chilquinta.
    var columnMetaClientesCriticosOficina = [
            {
            "columnName": "PRODUCTO",
            "customHeaderComponent": HeaderComponent,
            "customHeaderComponentProps": { color: '#da291c' }
            },
            {
            "columnName": "NOMBRE",
            "customHeaderComponent": HeaderComponent,
            "customHeaderComponentProps": { color: '#da291c' }
            },
            {
            "columnName": "COMUNA",
            "customHeaderComponent": HeaderComponent,
            "customHeaderComponentProps": { color: '#da291c' }
            },
            {
            "columnName": "HORA",
            "customHeaderComponent": HeaderComponent,
            "customHeaderComponentProps": { color: '#da291c' }
            },
            {
            "columnName": "ID ORDEN",
            "customHeaderComponent": HeaderComponent,
            "customHeaderComponentProps": { color: '#da291c' }
            },
            {
            "columnName": "ETR",
            "customHeaderComponent": HeaderComponent,
            "customHeaderComponentProps": { color: '#da291c' }
            }
        ];

    const rowMetadataOficina = {
      bodyCssClassName: rowData => (rowData['PRODUCTO'] === this.state.selectedRowId ? 'selected' : ''),
    };


    return (
        <div className="estatisticas_wrapper_content">
          <h3 className="estadisticas_title_h3">ESTADÍSTICAS</h3>
          <section>
            <Tabs index={this.state.index} onChange={this.handleTabChange}>

              <Tab label='Chilquinta' className="estadisticas_mainTab_title">
                <div className="wrapper_estadisticas_opciones">
                <small>Seleccione una opción a visualizar</small>
                <Button icon='file_download' label='Exportar Estadísticas' accent  onClick={this.onClickExportChilquinta.bind(this)}/>
                </div>
                  <Tabs index={this.state.indexChilquinta} onChange={this.handleTabChangeChilquinta}>

                    <Tab label='Por Comuna'>
                        <div id="containerChilquinta1" className="statistics-summary__chart"></div>
                        <div id="containerChilquinta11" className="statistics-summary__chart"></div>
                        <div><h4>Clientes Críticos</h4></div>
                        <ProgressBar mode='indeterminate' className="statistics_progressBar"/>
                        <div>
                          <Griddle resultsPerPage={5}
                            rowMetadata={rowMetadata}
                            tableClassName="table"
                            columnMetadata={columnMetaClientesCriticos} ref="griddleTable" className="drawer_griddle_medidores"
                            results={this.state.dataClientesCriticosComuna} columns={["PRODUCTO","NOMBRE", "COMUNA","HORA","ID ORDEN","ETR"]} uniqueIdentifier="PRODUCTO"
                           />
                         </div>

                    </Tab>
                    <Tab label='Por Oficina'>
                        <div id="containerChilquinta2" className="statistics-summary__chart"></div>


                    </Tab>
                    <Tab label='% Por Comuna'>
                        <div id="containerChilquinta3" className="statistics-summary__chart"></div>

                    </Tab>

                  </Tabs>


              </Tab>

              <Tab label='Litoral' className="estadisticas_mainTab_title">
                <small>Seleccione una opción a visualizar</small>
                  <Tabs index={this.state.indexLitoral} onChange={this.handleTabChangeLitoral}>
                    <Tab label='Por Comuna'>
                        <div id="containerLitoral1" className="statistics-summary__chart"></div>
                        <h5>En construcción</h5>
                    </Tab>
                    <Tab label='Por Oficina'>
                        <div id="containerLitoral2" className="statistics-summary__chart"></div>
                        <h5>En construcción</h5>
                    </Tab>
                    <Tab label='% Por Comuna'>
                        <div id="containerLitoral3" className="statistics-summary__chart"></div>
                        <h5>En construcción</h5>
                    </Tab>
                  </Tabs>
              </Tab>

              <Tab label='Linares' className="estadisticas_mainTab_title">
              <small>Seleccione una opción a visualizar</small>
                <Tabs index={this.state.indexLinares} onChange={this.handleTabChangeLinares}>
                  <Tab label='Por Comuna'>
                      <div id="containerLinares1" className="statistics-summary__chart"></div>
                      <h5>En construcción</h5>
                  </Tab>
                  <Tab label='Por Oficina'>
                      <div id="containerLinares2" className="statistics-summary__chart"></div>
                      <h5>En construcción</h5>
                  </Tab>
                  <Tab label='% Por Comuna'>
                      <div id="containerLinares3" className="statistics-summary__chart"></div>
                      <h5>En construcción</h5>
                  </Tab>
                </Tabs>
              </Tab>

              <Tab label='Parral' className="estadisticas_mainTab_title">
              <small>Seleccione una opción a visualizar</small>
                <Tabs index={this.state.indexParral} onChange={this.handleTabChangeParral}>
                  <Tab label='Por Comuna'>
                      <div id="containerParral1" className="statistics-summary__chart"></div>
                      <h5>En construcción</h5>
                  </Tab>
                  <Tab label='Por Oficina'>
                      <div id="containerParral2" className="statistics-summary__chart"></div>
                      <h5>En construcción</h5>
                  </Tab>
                  <Tab label='% Por Comuna'>
                      <div id="containerParral3" className="statistics-summary__chart"></div>
                      <h5>En construcción</h5>
                  </Tab>
                </Tabs>
              </Tab>

              <Tab label='Casablanca' className="estadisticas_mainTab_title">
              <small>Seleccione una opción a visualizar</small>
                <Tabs index={this.state.indexCasablanca} onChange={this.handleTabChangeCasablanca}>
                  <Tab label='Por Comuna'>
                      <div id="containerCasablanca1" className="statistics-summary__chart"></div>
                      <h5>En construcción</h5>
                  </Tab>
                  <Tab label='Por Oficina'>
                      <div id="containerCasablanca2" className="statistics-summary__chart"></div>
                      <h5>En construcción</h5>
                  </Tab>
                  <Tab label='% Por Comuna'>
                      <div id="containerCasablanca3" className="statistics-summary__chart"></div>
                      <h5>En construcción</h5>
                  </Tab>
                </Tabs>
              </Tab>
            </Tabs>

          </section>
        </div>

    );
  }
}

export default Statistics;
