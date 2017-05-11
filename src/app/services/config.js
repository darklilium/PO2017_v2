
/*
Author: Evelyn Hernández
APP: po_interrupciones 2017
Compiled: 11.5.2017
*/

//Always use lower case for replace this content in prod and dev.


//local: usando servicios internos dev.
/*
  const env = {
    ROOT: "/",
    CSSDIRECTORY: 'dist/css/',
    ROUTEPATH: '/',
    ENVIRONMENT: 'DEVELOPMENT',
    WEBSERVERADDRESS: "index.html",
    SAVEAPPLICATIONMODULE: "PO_INTERRUPCIONES_DESA_v2",
    SAVEAPPLICATIONNAME: 'REACT_INTERRUPCIONES_WEB_DESA_v2',
    BUILDFOR: 'INTERNA'
  }
*/

//local: usando servicios externos dev

const env = {
  ROOT: "/",
  CSSDIRECTORY: 'dist/css/',
  ROUTEPATH: '/',
  ENVIRONMENT: 'DEVELOPMENT',
  WEBSERVERADDRESS: "index.html",
  SAVEAPPLICATIONMODULE: "PO_INTERRUPCIONES_DESA_v2",
  SAVEAPPLICATIONNAME: 'REACT_INTERRUPCIONES_WEB_DESA_v2',
  BUILDFOR: 'EXTERNA'
}



//servidor web: interno. servicios internos.

/*
  const env = {
    ROOT: "potest/",
    CSSDIRECTORY: 'css/',
    ROUTEPATH: 'index.html',
    ENVIRONMENT: 'PRODUCTION',
    WEBSERVERADDRESS: "http://gisred.chilquinta/potest/",
    SAVEAPPLICATIONMODULE: "PO_INTERRUPCIONES_PROD_v2",
    SAVEAPPLICATIONNAME: 'REACT_INTERRUPCIONES_WEB_PROD_V2',
    BUILDFOR: 'INTERNA'
  }
*/

//servidor web: externo, servicios externos.
/*
  const env = {
    ROOT: "po/",
    CSSDIRECTORY: 'css/',
    ROUTEPATH: 'index.html',
    ENVIRONMENT: 'PRODUCTION',
    WEBSERVERADDRESS: "http://gisred.chilquinta.cl:5555/po/",
    SAVEAPPLICATIONMODULE: "PO_INTERRUPCIONES_PROD_v2",
    SAVEAPPLICATIONNAME: 'REACT_INTERRUPCIONES_WEB_PROD_V2',
    BUILDFOR: 'EXTERNA'
  }
  */

export default env;
