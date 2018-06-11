
/*
Author: Evelyn Hernández
APP: po_interrupciones 2017
Compiled: 24/07/2017
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
/*
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
*/


//servidor web: interno. servicios internos.

/*
  const env = {
    ROOT: "po/",
    CSSDIRECTORY: 'css/',
    ROUTEPATH: 'index.html',
    ENVIRONMENT: 'PRODUCTION',
    WEBSERVERADDRESS: "https://gisredint.chilquinta.cl/po/",
    SAVEAPPLICATIONMODULE: "PO_INTERRUPCIONES_PROD_v4",
    SAVEAPPLICATIONNAME: 'REACT_INTERRUPCIONES_WEB_PROD_V4',
    BUILDFOR: 'INTERNA'
  }
*/


//servidor web: externo, servicios externos.

  const env = {
    ROOT: "po/",
    CSSDIRECTORY: 'css/',
    ROUTEPATH: 'index.html',
    ENVIRONMENT: 'PRODUCTION',
    WEBSERVERADDRESS: "https://gisred.chilquinta.cl:6443/po/",
    SAVEAPPLICATIONMODULE: "PO_INTERRUPCIONES_PROD_v4",
    SAVEAPPLICATIONNAME: 'REACT_INTERRUPCIONES_WEB_PROD_V4',
    BUILDFOR: 'EXTERNA'
  }

//servidor i-kraft

/*
  const env = {
    ROOT: "po/",
    CSSDIRECTORY: 'css/',
    ROUTEPATH: 'index.html',
    ENVIRONMENT: 'PRODUCTION',
    WEBSERVERADDRESS: "http:/i-kraft.net/po/",
    SAVEAPPLICATIONMODULE: "PO_INTERRUPCIONES_PROD_v2",
    SAVEAPPLICATIONNAME: 'REACT_INTERRUPCIONES_WEB_PROD_V2',
    BUILDFOR: 'EXTERNA'
  }
*/

export default env;
