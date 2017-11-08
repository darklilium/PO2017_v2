import InfoTemplate from 'esri/InfoTemplate';

function getInfoTemplate(){
  return {
    getSubFailure(){
      let chqSubInfoTemp= new InfoTemplate();
      chqSubInfoTemp.setTitle("<b>SED: ${ARCGIS.DBO.SED_006.codigo}</b>");
      //var tipo_estado = ${'ARCGIS.DBO.SED_006.codigo'};
      //  console.log(tipo_estado);
      let chqSubInfoContent =
      "<div style=padding-top: 10px;><b>ID Orden:</b> ${ARCGIS.dbo.POWERON_TRANSFORMADORES.id_orden}<br></div>"+
      "<div style=padding-top: 10px;><b>ID Incidencia:</b> ${ARCGIS.dbo.POWERON_TRANSFORMADORES.id_incidencia}<br></div>"+
      //  "<div style=display:inline-block;width:8px;></div>"+
      "<div style=padding-top: 10px;><b>Alimentador:</b> ${ARCGIS.DBO.SED_006.alimentador}<br></div>"+
      //  "<div style=display:inline-block;width:8px;></div>"+
      "<div style=padding-top: 10px;><b>Causa:</b> ${ARCGIS.dbo.view_tiempo_order_po.causa}<br></div>"+
      //  "<div style=display:inline-block;width:8px;></div>"+
      "<div style=padding-top: 10px;><b>Comentario:</b> ${ARCGIS.dbo.view_tiempo_order_po.comentario}<br></div>"+
      //    "<div style=display:inline-block;width:8px;></div>"+
      "<div style=padding-top: 10px;><b>Estado:</b> ${ARCGIS.dbo.view_tiempo_order_po.estado_orden}<br></div>"+
      //    "<div style=display:inline-block;width:8px;></div>"+
      "<div style=padding-top: 10px;><b>Fecha Creación:</b> ${ARCGIS.DBO.view_tiempo_order_po.fecha_creacion}<br></div>"+
      //    "<div style=display:inline-block;width:8px;></div>"+
      "<div style=padding-top: 10px;><b>Fecha Asignación:</b> ${ARCGIS.dbo.view_tiempo_order_po.fecha_asignacion}<br></div>"+
      //    "<div style=display:inline-block;width:8px;></div>"+
      "<div style=padding-top: 10px;><b>Fecha Despacho:</b> ${ARCGIS.dbo.view_tiempo_order_po.fecha_despacho}<br></div>"+
      //    "<div style=display:inline-block;width:8px;></div>"+
      "<div style=padding-top: 10px;><b>Fecha Ruta:</b> ${ARCGIS.dbo.view_tiempo_order_po.fecha_ruta}<br></div>"+
      //    "<div style=display:inline-block;width:8px;></div>"+
      "<div style=padding-top: 10px;><b>Fecha Llegada:</b> ${ARCGIS.dbo.view_tiempo_order_po.fecha_llegada}<br></div>"+
      //    "<div style=display:inline-block;width:8px;></div>"+
      "<div style=padding-top: 10px;><b>Tiempo transcurrido:</b> ${ARCGIS.dbo.view_tiempo_order_po.TIEMPO_TRA}<br></div>"+
      "<div style=padding-top: 10px;><b>ETR:</b> ${ARCGIS.dbo.view_tiempo_order_po.etr}<br></div>";
      chqSubInfoTemp.setContent(chqSubInfoContent);
      return chqSubInfoTemp;
    },
    getIsolatedNisFailure(){
      let chqIsolatedNisTemp= new InfoTemplate();
      chqIsolatedNisTemp.setTitle("<b>NIS: ${ARCGIS.DBO.CLIENTES_XY_006.nis}</b>");

      let chqIsolatedNisInfoContent =
      "<div style=padding-top: 10px;><b>ID Orden:</b> ${ARCGIS.dbo.POWERON_CLIENTES.id_orden}<br></div>"+
      //    "<div style=display:inline-block;width:8px;></div>"+
      "<div style=padding-top: 10px;><b>ID Incidencia:</b> ${ARCGIS.dbo.POWERON_CLIENTES.id_incidencia}<br></div>"+
      //    "<div style=display:inline-block;width:8px;></div>"+
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
      "<div style=padding-top: 10px;><b>Tiempo transcurrido:</b> ${ARCGIS.dbo.view_tiempo_order_po.TIEMPO_TRA}<br></div>"+
      "<div style=padding-top: 10px;><b>ETR:</b> ${ARCGIS.dbo.view_tiempo_order_po.etr}<br></div>";

      chqIsolatedNisTemp.setContent(chqIsolatedNisInfoContent);
      return chqIsolatedNisTemp;
    },
    getNisInfo(){
      let chqNisInfoTemp= new InfoTemplate();
      chqNisInfoTemp.setTitle("<b>NIS: ${ARCGIS.DBO.CLIENTES_XY_006.nis}</b>");

      let chqNisInfoContent =
      "<div style=padding-top: 10px;><b>ID Orden:</b> ${ARCGIS.dbo.POWERON_TRANSFORMADORES.id_orden}<br></div>"+
      //    "<div style=display:inline-block;width:8px;></div>"+
      "<div style=padding-top: 10px;><b>ID Incidencia:</b> ${ARCGIS.dbo.POWERON_TRANSFORMADORES.id_incidencia}<br></div>"+
      //    "<div style=display:inline-block;width:8px;></div>"+
      "<div style=padding-top: 10px;><b>SED:</b> ${ARCGIS.dbo.CLIENTES_DATA_DATOS_006.resp_id_sed}<br></div>"+
      //    "<div style=display:inline-block;width:8px;></div>"+
      "<div style=padding-top: 10px;><b>Dirección:</b> ${ARCGIS.dbo.CLIENTES_DATA_DATOS_006.direccion_resu}<br></div>"+
      //    "<div style=display:inline-block;width:8px;></div>"+
      "<div style=padding-top: 10px;><b>Comuna:</b> ${ARCGIS.dbo.CLIENTES_DATA_DATOS_006.nm_comuna}<br></div>"+
      "<div style=padding-top: 10px;><b>ETR:</b> ${ARCGIS.DBO.view_tiempo_order_po.etr}<br></div>"
      //    "<div style=display:inline-block;width:8px;></div>";
      chqNisInfoTemp.setContent(chqNisInfoContent);
      return chqNisInfoTemp;
    },
    getAlimentadorInfoWindow(){
      let chqAlimInfoTemp= new InfoTemplate();
      chqAlimInfoTemp.setTitle("<b>ID: ${ARCGIS.DBO.Tramos_MT_006.id}</b>");

      let chqAlimInfoContent =
      "<div style=padding-top: 10px;><b>Alimentador:</b> ${ARCGIS.DBO.Tramos_MT_006.alimentador}<br></div>";
      chqAlimInfoTemp.setContent(chqAlimInfoContent);
      return chqAlimInfoTemp;
    },

    getCarsInfo(){
      let chqAlimInfoTemp= new InfoTemplate();
      chqAlimInfoTemp.setTitle("<b>ID: ${GISRED.DBO.%GIS_GPS_DATA_MF_Features.ID_OBJECT}</b>");

      let chqAlimInfoContent =
      "<div style=padding-top: 10px;><b>Patente:</b> ${GISRED.DBO.%GIS_GPS_DATA_MF_Features.PATENTE}<br></div>"+
      "<div style=padding-top: 10px;><b>Empresa:</b> ${GISRED.DBO.GIS_GPS_VEHICULOS.empresa}<br></div>"+
      "<div style=padding-top: 10px;><b>Tipo:</b> ${GISRED.DBO.GIS_GPS_VEHICULOS.tipo}<br></div>"+
      "<div style=padding-top: 10px;><b>Marca:</b> ${GISRED.DBO.GIS_GPS_VEHICULOS.marca}<br></div>"+
      "<div style=padding-top: 10px;><b>Modelo:</b> ${GISRED.DBO.GIS_GPS_VEHICULOS.modelo}<br></div>"+
      "<div style=padding-top: 10px;><b>Año:</b> ${GISRED.DBO.GIS_GPS_VEHICULOS.año}<br></div>"+
      "<div style=padding-top: 10px;><b>Responsable:</b> ${GISRED.DBO.GIS_GPS_VEHICULOS.responsable}<br></div>"+
      "<div style=padding-top: 10px;><b>Rut:</b> ${GISRED.DBO.GIS_GPS_VEHICULOS.rut}<br></div>"
      /*+
      "<div style=padding-top: 10px;><b>Latitud:</b> ${GISRED.DBO.%GIS_GPS_DATA_MF_Features.LATITUD}<br></div>"+
      "<div style=padding-top: 10px;><b>Longitud:</b> ${GISRED.DBO.%GIS_GPS_DATA_MF_Features.LONGITUD}<br></div>"
      */
      ;
      chqAlimInfoTemp.setContent(chqAlimInfoContent);
      return chqAlimInfoTemp;
    },
    //12-10-2017: Agregando layers gps nuevos:
    getCarsInfo_layerNominal(){
      let chqAlimInfoTemp= new InfoTemplate();
      chqAlimInfoTemp.setTitle("<b>Patente: ${CONTROL_FLOTA.dbo.GPS_MOVIL.id_placa}</b>");

      let chqAlimInfoContent =
      "<div style=padding-top: 10px;><b>Tipo:</b> ${CONTROL_FLOTA.dbo.GPS_MOVIL_TIPO.ds_nombre}<br></div>"+
      "<div style=padding-top: 10px;><b>Características:</b> ${CONTROL_FLOTA.dbo.GPS_CARACTERISTICA.ds_nombre}<br></div>"+
      "<div style=padding-top: 10px;><b>Empresa:</b> ${CONTROL_FLOTA.dbo.GPS_EMPRESA.ds_nombre}<br></div>"+
      "<div style=padding-top: 10px;><b>Zona Operación:</b> ${CONTROL_FLOTA.dbo.GPS_ZONA_OPERACION.ds_nombre}<br></div>"+
      "<div style=padding-top: 10px;><b>Operador:</b> ${CONTROL_FLOTA.dbo.GPS_MOVIL.ds_nom_operador}<br></div>"+
      "<div style=padding-top: 10px;><b>Proceso Nominal:</b> ${CONTROL_FLOTA.dbo.GPS_PROCESO_NOMINAL.ds_nombre}<br></div>"
      /*+
      "<div style=padding-top: 10px;><b>Latitud:</b> ${GISRED.DBO.%GIS_GPS_DATA_MF_Features.LATITUD}<br></div>"+
      "<div style=padding-top: 10px;><b>Longitud:</b> ${GISRED.DBO.%GIS_GPS_DATA_MF_Features.LONGITUD}<br></div>"
      */
      ;
      chqAlimInfoTemp.setContent(chqAlimInfoContent);
      return chqAlimInfoTemp;
    },
    getCarsInfo_layerContingencia(){
      let chqAlimInfoTemp= new InfoTemplate();
      chqAlimInfoTemp.setTitle("<b>Patente: ${CONTROL_FLOTA.dbo.GPS_MOVIL.id_placa}</b>");

      let chqAlimInfoContent =
      "<div style=padding-top: 10px;><b>Tipo:</b> ${CONTROL_FLOTA.dbo.GPS_MOVIL_TIPO.ds_nombre}<br></div>"+
      "<div style=padding-top: 10px;><b>Características:</b> ${CONTROL_FLOTA.dbo.GPS_CARACTERISTICA.ds_nombre}<br></div>"+
      "<div style=padding-top: 10px;><b>Empresa:</b> ${CONTROL_FLOTA.dbo.GPS_EMPRESA.ds_nombre}<br></div>"+
      "<div style=padding-top: 10px;><b>Zona Operación:</b> ${CONTROL_FLOTA.dbo.GPS_ZONA_OPERACION.ds_nombre}<br></div>"+
      "<div style=padding-top: 10px;><b>Operador:</b> ${CONTROL_FLOTA.dbo.GPS_MOVIL.ds_nom_operador}<br></div>"+
      "<div style=padding-top: 10px;><b>Contingencia:</b>  ${CONTROL_FLOTA.dbo.GPS_CONTINGENCIA.ds_nombre}</div>"
      /*+
      "<div style=padding-top: 10px;><b>Latitud:</b> ${GISRED.DBO.%GIS_GPS_DATA_MF_Features.LATITUD}<br></div>"+
      "<div style=padding-top: 10px;><b>Longitud:</b> ${GISRED.DBO.%GIS_GPS_DATA_MF_Features.LONGITUD}<br></div>"
      */
      ;
      chqAlimInfoTemp.setContent(chqAlimInfoContent);
      return chqAlimInfoTemp;
    }

  }
}

export default getInfoTemplate();
