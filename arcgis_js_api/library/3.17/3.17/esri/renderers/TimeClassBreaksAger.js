// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.17/esri/copyright.txt for details.
//>>built
define("esri/renderers/TimeClassBreaksAger","dojo/_base/declare dojo/_base/array dojo/_base/lang dojo/has dojo/date ../kernel ../lang ../symbols/jsonUtils ../Color ./SymbolAger".split(" "),function(k,l,e,m,n,p,q,r,s,t){var b=k(t,{declaredClass:"esri.renderer.TimeClassBreaksAger",constructor:function(c,a){this.infos=c;this.timeUnits=a||"day";c.sort(function(a,c){return a.minAge<c.minAge?-1:a.minAge>c.minAge?1:0})},getAgedSymbol:function(c,a){var f=a.getLayer(),b=a.attributes,e=q.isDefined;c=r.fromJson(c.toJson());
var g=f._map.timeExtent.endTime;if(!g)return c;var h=n.difference(new Date(b[f._startTimeField]),g,this.timeUnits);l.some(this.infos,function(a){if(h>=a.minAge&&h<=a.maxAge){var b=a.color,f=a.size;a=a.alpha;b&&c.setColor(b);e(f)&&this._setSymbolSize(c,f);e(a)&&c.color&&(c.color.a=a);return!0}},this);return c},toJson:function(){var c={agerClassBreakInfos:[]},a,b,d;c.timeUnits=this._getRestUnits(this.timeUnits);for(a=0;a<this.infos.length;a+=1)b=this.infos[a],d={},d.oldestAge=Infinity===b.maxAge?null:
b.maxAge,d.size=b.size,b.color&&(d.color=s.toJsonColor(b.color)),b.alpha&&(d.alpha=Math.round(255*b.alpha)),c.agerClassBreakInfos[a]=d;return c},_getRestUnits:function(c){var a="esriTimeUnitsDays";switch(c){case b.UNIT_SECONDS:a="esriTimeUnitsSeconds";break;case b.UNIT_MILLISECONDS:a="esriTimeUnitsMilliseconds";break;case b.UNIT_HOURS:a="esriTimeUnitsHours";break;case b.UNIT_MINUTES:a="esriTimeUnitsMinutes";break;case b.UNIT_MONTHS:a="esriTimeUnitsMonths";break;case b.UNIT_WEEKS:a="esriTimeUnitsWeeks";
break;case b.UNIT_YEARS:a="esriTimeUnitsYears"}return a}});e.mixin(b,{UNIT_DAYS:"day",UNIT_HOURS:"hour",UNIT_MILLISECONDS:"millisecond",UNIT_MINUTES:"minute",UNIT_MONTHS:"month",UNIT_SECONDS:"second",UNIT_WEEKS:"week",UNIT_YEARS:"year"});m("extend-esri")&&e.setObject("renderer.TimeClassBreaksAger",b,p);return b});