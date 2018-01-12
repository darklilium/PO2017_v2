import layers from './layers-service';
import Query from 'esri/tasks/query';
import QueryTask from 'esri/tasks/QueryTask';
import cookieHandler from 'cookie-handler';



function gps_user_permissions(){
  var usuario;

  //verificar el usuario si es con vialactea o no.
  if(cookieHandler.get('usr').includes('vialactea\\')){
  //  console.log("login con vialactea");
     usuario = cookieHandler.get('usr').split('vialactea\\');

  }else{
  //  console.log("login sin vialactea");
    usuario = cookieHandler.get('usr');
  }

  //retornar los permisos que son asignados al usuario para ver layers de gps.
  var promise = new Promise((resolve,reject)=>{

    var qTaskPermissions = new QueryTask(layers.read_gps_usuarios());
      var qPermissions = new esri.tasks.Query();
      qPermissions.where = "user_vialactea='"+usuario[1]+"'";

      qPermissions.returnGeometry = false;
      qPermissions.outFields=["*"];

      qTaskPermissions.execute(qPermissions, (featureSet)=>{
        var permisos = featureSet.features.map(p=>{

          let pp = {
            tipo:p.attributes.proceso.toUpperCase(),
            realName: p.attributes.acceso
          }
          return pp
        });

        return resolve(permisos);
      },(error)=>{
        return reject("");
      });

  });

  return promise;

}


export default gps_user_permissions;
