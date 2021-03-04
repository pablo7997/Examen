var map;
var tb;

require([
    "esri/map",
    "dojo/ready",
    "dojo/parser",
    "esri/layers/FeatureLayer",
    "esri/config",
    "esri/tasks/ServiceAreaTask",
    "esri/tasks/ServiceAreaParameters",
    "esri/graphic",
    "esri/tasks/FeatureSet",
    "dojo/dom",
    "esri/dijit/editing/Add",
    "esri/tasks/query",
    "dojo/on",
    "esri/symbols/SimpleLineSymbol",
    "esri/symbols/SimpleFillSymbol",
    "esri/Color",
    "dojo/_base/array",
    "esri/dijit/Search",
    "esri/dijit/BasemapGallery",
    "esri/dijit/OverviewMap",
    "esri/dijit/Scalebar",
    
    
],
function(Map,ready,parser,FeatureLayer,
    config,ServiceAreaTask,ServiceAreaParameters,Graphic,FeatureSet,
    dom,Add,Query,on,SimpleLineSymbol,SimpleFillSymbol,Color,array,Search,BasemapGallery,
    OverviewMap,Scalebar

    ) {

        ready(function(){


            parser.parse();

            // config.defaults.io.proxyUrl = "http://localhost/proxy/proxy.ashx";

            map = new Map("divMap", {
                basemap: "topo",
                center: [-3.7025600,40.4165000],
                zoom: 6
            });

            var pointlayer = new FeatureLayer("https://services6.arcgis.com/7Xe47Z3u3jNzryDA/ArcGIS/rest/services/CENTROS_SALUD/FeatureServer/0");
            map.addLayer(pointlayer);


            var areaservice = new ServiceAreaTask("https://formacion.esri.es/server/rest/services/RedMadrid/NAServer/Service%20Area");

            var params = new ServiceAreaParameters();
            params.defaultBreaks = [2];
            params.outSpatialReference = map.spatialReference;
            params.returnFacilities = false;

            

            var miquery = new Query();
            miquery.where = "1=1";
            pointlayer.selectFeatures(miquery, FeatureLayer.SELECTION_NEW);
            pointlayer.on("selection-complete", nuevafuncion);

            function nuevafuncion(parametrosnuevos){
                console.log(parametrosnuevos)
                params.facilities = parametrosnuevos;
                console.log(params)
                
               areaservice.solve(params, function(resultsolve){
                var polygonSymbol = new SimpleFillSymbol(
                    "solid",  
                    new SimpleLineSymbol("solid", new Color([232,104,80]), 2),
                    new Color([232,104,80,0.25])
                  );

                    

               })
            }
            
            
            


        });


        var searchguapo = new Search({
            map: map
        }, "search");
        searchguapo.startup();


        var escalacrema = new Scalebar({
            map: map,
            attachTo: "bottom-left" 
        });


});