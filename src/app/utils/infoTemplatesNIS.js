import InfoTemplate from 'esri/InfoTemplate';

function getInfoTemplate2(){
  return {
    getNISInfoTemp(){
      let chqNisInfoTemp= new InfoTemplate();
      chqNisInfoTemp.setTitle("<b>NIS: ${ARCGIS.DBO.CLIENTES_XY_006.nis}</b>");

      let chqNisInfoContent =
      "<div style=padding-top: 10px;><b>ID Orden:</b> ${ARCGIS.dbo.view_tiempo_order_po.id_orden}<br></div>"+
      //    "<div style=display:inline-block;width:8px;></div>"+
      "<div style=padding-top: 10px;><b>ID Incidencia:</b> ${ARCGIS.dbo.view_tiempo_order_po.id_incidencia}<br></div>"+

    //  "<div style=padding-top: 10px;><b>SED:</b> ${ARCGIS.dbo.CLIENTES_DATA_DATOS_006.resp_id_sed}<br></div>"+

      //"<div style=padding-top: 10px;><b>Dirección:</b> ${ARCGIS.dbo.CLIENTES_DATA_DATOS_006.direccion_resu}<br></div>"+

      "<div style=padding-top: 10px;><b>Comuna:</b> ${ARCGIS.dbo.view_tiempo_order_po.comuna}<br></div>"+

      "<div style=padding-top: 10px;><b>ETR:</b> ${ARCGIS.dbo.view_tiempo_order_po.etr}<br></div>"+

      "<div style=padding-top: 10px;><b>Causa:</b> ${ARCGIS.dbo.view_tiempo_order_po.causa}<br></div>"+
      //    "<div style=display:inline-block;width:8px;></div>"+
      "<div style=padding-top: 10px;><b>Comentario:</b> ${ARCGIS.dbo.view_tiempo_order_po.comentario}<br></div>"+
      //    "<div style=display:inline-block;width:8px;></div>"+
      "<div style=padding-top: 10px;><b>Estado:</b> ${ARCGIS.dbo.view_tiempo_order_po.estado_orden}<br></div>"+
      //    "<div style=display:inline-block;width:8px;></div>"+
      "<div style=padding-top: 10px;><b>Fecha Creación:</b> ${ARCGIS.dbo.view_tiempo_order_po.fecha_creacion}<br></div>"+
      //    "<div style=display:inline-block;width:8px;></div>"+
      "<div style=padding-top: 10px;><b>Fecha Asignación:</b> ${ARCGIS.dbo.view_tiempo_order_po.fecha_asignacion}<br></div>"+
      //    "<div style=display:inline-block;width:8px;></div>"+
      "<div style=padding-top: 10px;><b>Fecha Despacho:</b> ${ARCGIS.dbo.view_tiempo_order_po.fecha_despacho}<br></div>"+
      //    "<div style=display:inline-block;width:8px;></div>"+
      "<div style=padding-top: 10px;><b>Fecha Ruta:</b> ${ARCGIS.dbo.view_tiempo_order_po.fecha_ruta}<br></div>"+
      //    "<div style=display:inline-block;width:8px;></div>"+
      "<div style=padding-top: 10px;><b>Fecha Llegada:</b> ${ARCGIS.dbo.view_tiempo_order_po.fecha_llegada}<br></div>"+
      //    "<div style=display:inline-block;width:8px;></div>"+
      "<div style=padding-top: 10px;><b>Tiempo transcurrido:</b> ${ARCGIS.dbo.view_tiempo_order_po.TIEMPO_TRA}<br></div>"

      //    "<div style=display:inline-block;width:8px;></div>";
      chqNisInfoTemp.setContent(chqNisInfoContent);
      return chqNisInfoTemp;
    },
    getNISInfoConf(){
      let chqNisInfoTemp= new InfoTemplate();
      chqNisInfoTemp.setTitle("<b>NIS: ${ARCGIS.DBO.CLIENTES_XY_006.nis}</b>");

      let chqNisInfoContent =
      "<div style=padding-top: 10px;><b>ID Orden:</b> ${ARCGIS.dbo.view_tiempo_order_po.id_orden}<br></div>"+
      //    "<div style=display:inline-block;width:8px;></div>"+
      "<div style=padding-top: 10px;><b>ID Incidencia:</b> ${ARCGIS.dbo.view_tiempo_order_po.id_incidencia}<br></div>"+

      //"<div style=padding-top: 10px;><b>SED:</b> ${ARCGIS.dbo.CLIENTES_DATA_DATOS_006.resp_id_sed}<br></div>"+

      //"<div style=padding-top: 10px;><b>Dirección:</b> ${ARCGIS.dbo.CLIENTES_DATA_DATOS_006.direccion_resu}<br></div>"+

      "<div style=padding-top: 10px;><b>Comuna:</b> ${ARCGIS.dbo.view_tiempo_order_po.comuna}<br></div>"+

      "<div style=padding-top: 10px;><b>ETR:</b> ${ARCGIS.dbo.view_tiempo_order_po.etr}<br></div>"+

      "<div style=padding-top: 10px;><b>Causa:</b> ${ARCGIS.dbo.view_tiempo_order_po.causa}<br></div>"+
      //    "<div style=display:inline-block;width:8px;></div>"+
      "<div style=padding-top: 10px;><b>Comentario:</b> ${ARCGIS.dbo.view_tiempo_order_po.comentario}<br></div>"+
      //    "<div style=display:inline-block;width:8px;></div>"+
      "<div style=padding-top: 10px;><b>Estado:</b> ${ARCGIS.dbo.view_tiempo_order_po.estado_orden}<br></div>"+
      //    "<div style=display:inline-block;width:8px;></div>"+
      "<div style=padding-top: 10px;><b>Fecha Creación:</b> ${ARCGIS.dbo.view_tiempo_order_po.fecha_creacion}<br></div>"+
      //    "<div style=display:inline-block;width:8px;></div>"+
      "<div style=padding-top: 10px;><b>Fecha Asignación:</b> ${ARCGIS.dbo.view_tiempo_order_po.fecha_asignacion}<br></div>"+
      //    "<div style=display:inline-block;width:8px;></div>"+
      "<div style=padding-top: 10px;><b>Fecha Despacho:</b> ${ARCGIS.dbo.view_tiempo_order_po.fecha_despacho}<br></div>"+
      //    "<div style=display:inline-block;width:8px;></div>"+
      "<div style=padding-top: 10px;><b>Fecha Ruta:</b> ${ARCGIS.dbo.view_tiempo_order_po.fecha_ruta}<br></div>"+
      //    "<div style=display:inline-block;width:8px;></div>"+
      "<div style=padding-top: 10px;><b>Fecha Llegada:</b> ${ARCGIS.dbo.view_tiempo_order_po.fecha_llegada}<br></div>"+
      //    "<div style=display:inline-block;width:8px;></div>"+
      "<div style=padding-top: 10px;><b>Tiempo transcurrido:</b> ${ARCGIS.dbo.view_tiempo_order_po.TIEMPO_TRA}<br></div>"

      //    "<div style=display:inline-block;width:8px;></div>";
      chqNisInfoTemp.setContent(chqNisInfoContent);
      return chqNisInfoTemp;
    },
    getCriticalNisInfo(){
      let chqNisInfoTemp= new InfoTemplate();
      chqNisInfoTemp.setTitle("<b>NIS: ${ARCGIS.DBO.CLIENTES_XY_006.nis}</b>");

      let chqNisInfoContent =
      "<div style=padding-top: 10px;><b>ID Orden:</b> ${ARCGIS.dbo.POWERON_CLIENTES.id_orden}<br></div>"+
      //    "<div style=display:inline-block;width:8px;></div>"+
      "<div style=padding-top: 10px;><b>ID Incidencia:</b> ${ARCGIS.dbo.POWERON_CLIENTES.id_incidencia}<br></div>"+

      //"<div style=padding-top: 10px;><b>SED:</b> ${ARCGIS.dbo.CLIENTES_DATA_DATOS_006.resp_id_sed}<br></div>"+

      //"<div style=padding-top: 10px;><b>Dirección:</b> ${ARCGIS.dbo.CLIENTES_DATA_DATOS_006.direccion_resu}<br></div>"+

      "<div style=padding-top: 10px;><b>Comuna:</b> ${ARCGIS.dbo.view_tiempo_order_po.comuna}<br></div>"+

      "<div style=padding-top: 10px;><b>ETR:</b> ${ARCGIS.dbo.view_tiempo_order_po.etr}<br></div>"+

      "<div style=padding-top: 10px;><b>Causa:</b> ${ARCGIS.dbo.view_tiempo_order_po.causa}<br></div>"+
      //    "<div style=display:inline-block;width:8px;></div>"+
      "<div style=padding-top: 10px;><b>Comentario:</b> ${ARCGIS.dbo.view_tiempo_order_po.comentario}<br></div>"+
      //    "<div style=display:inline-block;width:8px;></div>"+
      "<div style=padding-top: 10px;><b>Estado:</b> ${ARCGIS.dbo.view_tiempo_order_po.estado_orden}<br></div>"+
      //    "<div style=display:inline-block;width:8px;></div>"+
      "<div style=padding-top: 10px;><b>Fecha Creación:</b> ${ARCGIS.dbo.view_tiempo_order_po.fecha_creacion}<br></div>"+
      //    "<div style=display:inline-block;width:8px;></div>"+
      "<div style=padding-top: 10px;><b>Fecha Asignación:</b> ${ARCGIS.dbo.view_tiempo_order_po.fecha_asignacion}<br></div>"+
      //    "<div style=display:inline-block;width:8px;></div>"+
      "<div style=padding-top: 10px;><b>Fecha Despacho:</b> ${ARCGIS.dbo.view_tiempo_order_po.fecha_despacho}<br></div>"+
      //    "<div style=display:inline-block;width:8px;></div>"+
      "<div style=padding-top: 10px;><b>Fecha Ruta:</b> ${ARCGIS.dbo.view_tiempo_order_po.fecha_ruta}<br></div>"+
      //    "<div style=display:inline-block;width:8px;></div>"+
      "<div style=padding-top: 10px;><b>Fecha Llegada:</b> ${ARCGIS.dbo.view_tiempo_order_po.fecha_llegada}<br></div>"+
      //    "<div style=display:inline-block;width:8px;></div>"+
      "<div style=padding-top: 10px;><b>Tiempo transcurrido:</b> ${ARCGIS.dbo.view_tiempo_order_po.TIEMPO_TRA}<br></div>"

      //    "<div style=display:inline-block;width:8px;></div>";
      chqNisInfoTemp.setContent(chqNisInfoContent);
      return chqNisInfoTemp;
    },
    getNISInfoPred(){
      let chqNisInfoTemp= new InfoTemplate();
      chqNisInfoTemp.setTitle("<b>NIS: ${ARCGIS.DBO.CLIENTES_XY_006.nis}</b>");

      let chqNisInfoContent =
      "<div style=padding-top: 10px;><b>ID Orden:</b> ${ARCGIS.dbo.view_tiempo_order_po.id_orden}<br></div>"+
      //    "<div style=display:inline-block;width:8px;></div>"+
      "<div style=padding-top: 10px;><b>ID Incidencia:</b> ${ARCGIS.dbo.view_tiempo_order_po.id_incidencia}<br></div>"+

      //"<div style=padding-top: 10px;><b>SED:</b> ${ARCGIS.dbo.CLIENTES_DATA_DATOS_006.resp_id_sed}<br></div>"+

      //"<div style=padding-top: 10px;><b>Dirección:</b> ${ARCGIS.dbo.CLIENTES_DATA_DATOS_006.direccion_resu}<br></div>"+

      "<div style=padding-top: 10px;><b>Comuna:</b> ${ARCGIS.dbo.view_tiempo_order_po.comuna}<br></div>"+

      "<div style=padding-top: 10px;><b>ETR:</b> ${ARCGIS.dbo.view_tiempo_order_po.etr}<br></div>"+

      "<div style=padding-top: 10px;><b>Causa:</b> ${ARCGIS.dbo.view_tiempo_order_po.causa}<br></div>"+
      //    "<div style=display:inline-block;width:8px;></div>"+
      "<div style=padding-top: 10px;><b>Comentario:</b> ${ARCGIS.dbo.view_tiempo_order_po.comentario}<br></div>"+
      //    "<div style=display:inline-block;width:8px;></div>"+
      "<div style=padding-top: 10px;><b>Estado:</b> ${ARCGIS.dbo.view_tiempo_order_po.estado_orden}<br></div>"+
      //    "<div style=display:inline-block;width:8px;></div>"+
      "<div style=padding-top: 10px;><b>Fecha Creación:</b> ${ARCGIS.dbo.view_tiempo_order_po.fecha_creacion}<br></div>"+
      //    "<div style=display:inline-block;width:8px;></div>"+
      "<div style=padding-top: 10px;><b>Fecha Asignación:</b> ${ARCGIS.dbo.view_tiempo_order_po.fecha_asignacion}<br></div>"+
      //    "<div style=display:inline-block;width:8px;></div>"+
      "<div style=padding-top: 10px;><b>Fecha Despacho:</b> ${ARCGIS.dbo.view_tiempo_order_po.fecha_despacho}<br></div>"+
      //    "<div style=display:inline-block;width:8px;></div>"+
      "<div style=padding-top: 10px;><b>Fecha Ruta:</b> ${ARCGIS.dbo.view_tiempo_order_po.fecha_ruta}<br></div>"+
      //    "<div style=display:inline-block;width:8px;></div>"+
      "<div style=padding-top: 10px;><b>Fecha Llegada:</b> ${ARCGIS.dbo.view_tiempo_order_po.fecha_llegada}<br></div>"+
      //    "<div style=display:inline-block;width:8px;></div>"+
      "<div style=padding-top: 10px;><b>Tiempo transcurrido:</b> ${ARCGIS.dbo.view_tiempo_order_po.TIEMPO_TRA}<br></div>"

      //    "<div style=display:inline-block;width:8px;></div>";
      chqNisInfoTemp.setContent(chqNisInfoContent);
      return chqNisInfoTemp;
    }
  }
}

export default getInfoTemplate2();
