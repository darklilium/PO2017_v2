
import myLayers from '../services/layers-service';
import token from '../services/token-service';
import createQueryTask from '../services/createquerytask-service';
import cookieHandler from 'cookie-handler';
import _ from 'lodash';
import $ from 'jquery';
import {getFormatedDateNow, getFormatedDate} from '../utils/milliSecondsToDate';

//22:02/2017 : adding config
import env from '../services/config';

//09/11
function login(user, pass, app, callback){
  let snackbarRet;

  const url = "http://gisred.chilquinta.cl:5555/arcgis/tokens/generateToken";
  console.log("hola");
  const data = {
    username: user,
    password: pass,
    client: 'requestip',
    expiration: 10080,
    format: 'jsonp'
  };

  $.ajax({
    method: 'POST',
    url: "http://gisred.chilquinta.cl:5555/arcgis/tokens/generateToken",
    data: data,
    dataType: 'html'
  })
  .done(myToken => {
    if(myToken.indexOf('Exception') >= 0) {
      notifications('Login incorrecto, intente nuevamente.', 'Login_Error', '.notification-login');
      console.log("error1");
      return;
    }
    if (myToken.indexOf('error') >= 0){
      notifications('Login incorrecto, intente nuevamente.', 'Login_Error', '.notification-login');
        console.log("error2");
      return;
    }


    switch (app) {
      case env.SAVEAPPLICATIONNAME:
        interrupciones_login(app, myToken, user, (cback)=>{
          if(cback){
            snackbarRet = {
              message: "Iniciando Sesión",
              open: true,
              error: false
            };
            return callback(snackbarRet);
          }else{
            snackbarRet = {
              message: "Hubo un problema iniciando sesión, intente nuevamente.",
              open: true,
              error: true
            };
            return callback(snackbarRet);
          }

        });
      break;

      case 'REACT_FACTIGIS':
          return callback();
      break;

      default:
    }
  })
  .fail(error => {
    console.log("You are not authorized ):", error);
    snackbarRet = {
      message: error.responseText,
      open: true,
      error: true
    };
    return callback(snackbarRet)

  });

  console.log('Transaction for Login Access Done');
}


//09/11
function interrupciones_login(page, tkn, user, callback){
  console.log('Requesting service access..., logging in to gisred-interruptions');
  token.write(tkn);
  const module = env.SAVEAPPLICATIONMODULE;
  return callback(true);
  saveLogin(user,page,module,tkn, (cb)=>{
    if(cb){
      return callback(true)
    }else{
      return callback(false)
    }
  });

}

//09/11
function saveLogin(user,page,mod,tkn, callback){

  const data = {
    f: 'json',
    adds: JSON.stringify([{ attributes: { "usuario": user, "pagina": page, "modulo": mod, fecha: getFormatedDate()  }, geometry: {} }]),
    token: tkn
  };

  $.ajax({
    method: 'POST',
    url: myLayers.read_logAcessosSave(),
    dataType:'html',
    data: data
  })
  .done(d =>{
    let json = JSON.parse(d);
    console.log(json);
    if( (_.has(json,'error')) ){
      return callback(false);
    }else{
      if(json["addResults"][0].objectId>0){
        return callback(true);

      }else{
        return callback(false);
      }
    }
  })
  .fail(f=>{
    console.log(f,"no pase");
    return callback(false);
  });
}


export {login, saveLogin};
