import layers from '../services/layers-service';
import $ from 'jquery';
import QueryTask from 'esri/tasks/QueryTask';
import _ from 'lodash';
import formatDate from '../utils/milliSecondsToDate';


function getCriticalCustomersSolos(){

  const promise = new Promise((resolve,reject)=>{

    var qTaskkResumenChilquinta = new QueryTask(layers.read_layer_CriticalCustomers());
      var qResumenChilquinta = new esri.tasks.Query();
      qResumenChilquinta.where = "ARCGIS.DBO.POWERON_CLIENTES_CRITICOS.TIPO='ELECTRODEPENDIENTE'";
      qResumenChilquinta.returnGeometry = false;
      qResumenChilquinta.outFields=["*"];

      qTaskkResumenChilquinta.execute(qResumenChilquinta, (featureSet)=>{

        if(!featureSet.features.length){
          resolve([]);
        }else{
          console.log(featureSet.features,"clientes criticos solos");
          var data =  featureSet.features.map(cliente=>{

            let d =   {
                "PRODUCTO": cliente.attributes["ARCGIS.DBO.CLIENTES_XY_006.nis"],
                "NOMBRE": cliente.attributes["ARCGIS.dbo.CLIENTES_DATA_DATOS_006.nombre_cliente"],
                "COMUNA": cliente.attributes["ARCGIS.dbo.view_tiempo_order_po.comuna"],
                "HORA": cliente.attributes["ARCGIS.dbo.view_tiempo_order_po.TIEMPO_TRA"],
                "ID ORDEN": cliente.attributes["ARCGIS.dbo.POWERON_CLIENTES.id_orden"],
                "ETR": formatDate(cliente.attributes["ARCGIS.dbo.view_tiempo_order_po.etr"]),
                "TIPO": cliente.attributes["ARCGIS.DBO.POWERON_CLIENTES_CRITICOS.TIPO"],
                "DIRECCION": cliente.attributes["ARCGIS.dbo.CLIENTES_DATA_DATOS_006.direccion_resu"]
            };

            //obtener la hora.
            //var o = cliente.attributes["ARCGIS.dbo.POWERON_CLIENTES.id_orden"];
            //var hr = searchHoraCritical(o);
            //hr.then(respuesta=>{d.HORA = respuesta}, err =>{d.HORA = ""});

            //obtener etr
            //var etrr = searchETRCritical(o);
            // etrr.then(respuesta=>{d.ETR=formatDate(respuesta)}, err=>{d.ETR=""});

            //obtener comuna
            //var comuna = searchComunaCritical(cliente.attributes["ARCGIS.DBO.CLIENTES_XY_006.nis"]);
            //comuna.then(respuesta=>{d.COMUNA=respuesta}, err=>{d.COMUNA=""});

            //obtener nombre
            //var nombre = searchNombreCritical(cliente.attributes["ARCGIS.DBO.CLIENTES_XY_006.nis"]);
            //nombre.then(respuesta=>{d.NOMBRE= respuesta}, err=>{d.NOMBRE= ""});

            return d;
          });

          resolve(data);
        }


      }, (Errorq)=>{
          console.log("Error doing query for clientes criticos ELECTROS chilquinta");
          reject([]);
    });

  });
  return promise;

}

function getCriticalCustomersSED(){

  const promise = new Promise((resolve,reject)=>{

    var qTaskkResumenChilquinta = new QueryTask(layers.read_layer_CriticalCustomers());
      var qResumenChilquinta = new esri.tasks.Query();
      qResumenChilquinta.where = "ARCGIS.DBO.POWERON_CLIENTES_CRITICOS.TIPO='GRAN CLIENTE'";;
      qResumenChilquinta.returnGeometry = false;
      qResumenChilquinta.outFields=["*"];

      qTaskkResumenChilquinta.execute(qResumenChilquinta, (featureSet)=>{

        if(!featureSet.features.length){
          resolve([]);

        }else{

          var data =  featureSet.features.map(cliente=>{

            let d =   {
                "PRODUCTO": cliente.attributes["ARCGIS.DBO.CLIENTES_XY_006.nis"],
                "NOMBRE": cliente.attributes["ARCGIS.dbo.CLIENTES_DATA_DATOS_006.nombre_cliente"],
                "COMUNA": cliente.attributes["ARCGIS.dbo.view_tiempo_order_po.comuna"],
                "HORA": cliente.attributes["ARCGIS.dbo.view_tiempo_order_po.TIEMPO_TRA"],
                "ID ORDEN": cliente.attributes["ARCGIS.dbo.POWERON_CLIENTES.id_orden"],
                "ETR": formatDate(cliente.attributes["ARCGIS.dbo.view_tiempo_order_po.etr"]),
                "TIPO": cliente.attributes["ARCGIS.DBO.POWERON_CLIENTES_CRITICOS.TIPO"],
                "DIRECCION": cliente.attributes["ARCGIS.dbo.CLIENTES_DATA_DATOS_006.direccion_resu"]
            };

            //obtener la hora.
            /*var o = cliente.attributes["ARCGIS.dbo.POWERON_TRANSFORMADORES.id_orden"];
            var hr = searchHoraCritical(o);
            hr.then(respuesta=>{d.HORA = respuesta}, err =>{d.HORA = ""});

            //obtener etr
            var etrr = searchETRCritical(o);
            etrr.then(respuesta=>{d.ETR=formatDate(respuesta)}, err=>{d.ETR=""});

            //obtener comuna
            var comuna = searchComunaCritical(cliente.attributes["ARCGIS.DBO.CLIENTES_XY_006.nis"]);
            comuna.then(respuesta=>{d.COMUNA=respuesta}, err=>{d.COMUNA=""});
            */
            return d;
          });

          resolve(data);
        }


      }, (Errorq)=>{
        console.log("Error doing query for clientes criticos GRAN CLIENTE chilquinta");
        reject([]);
    });
  });

  return promise;

}


function searchHoraCritical(idorden, callback){

  const promise = new Promise(function (resolve,reject){

    var qTaskkResumenChilquinta = new QueryTask(layers.read_criticalPO_ordenes());
      var qResumenChilquinta = new esri.tasks.Query();
      qResumenChilquinta.where = "id_orden='" + idorden + "'";
      qResumenChilquinta.returnGeometry = false;
      qResumenChilquinta.outFields=["*"];


      qTaskkResumenChilquinta.execute(qResumenChilquinta, (featureSet)=>{
        if(!featureSet.features.length){
          resolve(0);
          return;
        }else{
          resolve(featureSet.features[0].attributes['TIEMPO_TRA']);
        }

      }, (Errorq)=>{
          //console.log("Error doing query for clientes criticos tiempo tra sed chilquinta");
          reject(0);
      });
  });
  return promise;
}

function searchETRCritical(idorden){

  const promise = new Promise(function (resolve,reject){

    var qTaskkResumenChilquinta = new QueryTask(layers.read_criticalPO_ordenes());
      var qResumenChilquinta = new esri.tasks.Query();
      qResumenChilquinta.where = "id_orden='" + idorden + "'";
      qResumenChilquinta.returnGeometry = false;
      qResumenChilquinta.outFields=["*"];


      qTaskkResumenChilquinta.execute(qResumenChilquinta, (featureSet)=>{
        if(!featureSet.features.length){
          resolve(0);
          return;
        }else{
          resolve(featureSet.features[0].attributes['etr']);
        }
      }, (Errorq)=>{
          console.log("Error doing query for clientes criticos etr sed chilquinta");
          reject(0);
      });
    });

  return promise;
}

function searchComunaCritical(nis){
  const promise = new Promise((resolve,reject)=>{

    var qTaskkResumenChilquinta = new QueryTask(layers.read_layer_ClieSED());
      var qResumenChilquinta = new esri.tasks.Query();
      qResumenChilquinta.where = "nis='" + nis + "'";
      qResumenChilquinta.returnGeometry = false;
      qResumenChilquinta.outFields=["*"];


      qTaskkResumenChilquinta.execute(qResumenChilquinta, (featureSet)=>{
        if(!featureSet.features.length){
          resolve(0);
          return;
        }else{
          resolve(featureSet.features[0].attributes['nm_comuna']);
        }
      }, (Errorq)=>{
          console.log("Error doing query for clientes criticos comuna chilquinta");
          reject(0);
      });

  });
  return promise;
}

function searchNombreCritical(nis){
  const promise = new Promise((resolve,reject)=>{

    var qTaskkResumenChilquinta = new QueryTask(layers.read_layer_ClieSED());
      var qResumenChilquinta = new esri.tasks.Query();
      qResumenChilquinta.where = "nis='" + nis + "'";
      qResumenChilquinta.returnGeometry = false;
      qResumenChilquinta.outFields=["*"];


      qTaskkResumenChilquinta.execute(qResumenChilquinta, (featureSet)=>{
        if(!featureSet.features.length){
          resolve(0);
          return;
        }else{
          resolve(featureSet.features[0].attributes['nombre_cliente']);
        }
      }, (Errorq)=>{
          console.log("Error doing query for clientes criticos solo nombre chilquinta");
          reject(0);
      });

  });
  return promise;
}


export {getCriticalCustomersSolos, getCriticalCustomersSED}
