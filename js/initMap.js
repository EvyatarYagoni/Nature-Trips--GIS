//  <!-- leaflet js code -->
var highlightLayer;
function highlightFeature(e) {
    highlightLayer = e.target;

    if (e.target.feature.geometry.type === 'LineString') {
        highlightLayer.setStyle({
            color: '#ffff00',
        });
    } else {
        highlightLayer.setStyle({
            fillColor: '#ffff00',
            fillOpacity: 1
        });
    }
    highlightLayer.openPopup();
}
var map = L.map('map', {
    zoomControl: true, maxZoom: 17, minZoom: 1
}).fitBounds([[32.8304065267166, 35.255403552866156], [32.951098022178854, 35.54468612243413]]);
var hash = new L.Hash(map);
map.attributionControl.setPrefix('<a href="https://github.com/tomchadwin/qgis2web" target="_blank">qgis2web</a> &middot; <a href="https://leafletjs.com" title="A JS library for interactive maps">Leaflet</a> &middot; <a href="https://qgis.org">QGIS</a>');
var autolinker = new Autolinker({ truncate: { length: 30, location: 'smart' } });
L.control.locate({ locateOptions: { maxZoom: 19 } }).addTo(map);
var measureControl = new L.Control.Measure({
    position: 'topleft',
    primaryLengthUnit: 'meters',
    secondaryLengthUnit: 'kilometers',
    primaryAreaUnit: 'sqmeters',
    secondaryAreaUnit: 'hectares'
});
measureControl.addTo(map);
document.getElementsByClassName('leaflet-control-measure-toggle')[0]
    .innerHTML = '';
document.getElementsByClassName('leaflet-control-measure-toggle')[0]
    .className += ' fas fa-ruler';
var bounds_group = new L.featureGroup([]);
function setBounds() {
}
map.createPane('pane_OSMStandard_0');
map.getPane('pane_OSMStandard_0').style.zIndex = 400;
var layer_OSMStandard_0 = L.tileLayer('http://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    pane: 'pane_OSMStandard_0',
    opacity: 1.0,
    attribution: '<a href="https://www.openstreetmap.org/copyright">© OpenStreetMap contributors, CC-BY-SA</a>',
    minZoom: 1,
    maxZoom: 17,
    minNativeZoom: 0,
    maxNativeZoom: 19
});
layer_OSMStandard_0;
map.addLayer(layer_OSMStandard_0);
function pop_Tracks_1(feature, layer) {
    layer.on({
        mouseout: function (e) {
            for (i in e.target._eventParents) {
                e.target._eventParents[i].resetStyle(e.target);
            }
            if (typeof layer.closePopup == 'function') {
                layer.closePopup();
            } else {
                layer.eachLayer(function (feature) {
                    feature.closePopup()
                });
            }
        },
        mouseover: highlightFeature,
    });
    var popupContent = '<table>\
             <tr>\
                 <td>' + (feature.properties['region'] !== null ? autolinker.link(feature.properties['region'].toLocaleString()) : '') + '</td>\
                 <th scope="row">:איזור</th>\
             </tr>\
             <tr>\
                 <td>' + (feature.properties['name'] !== null ? autolinker.link(feature.properties['name'].toLocaleString()) : '') + '</td>\
                 <th scope="row">:שם</th>\
             </tr>\
             <tr>\
                 <td>' + (feature.properties['trackType'] !== null ? autolinker.link(feature.properties['trackType'].toLocaleString()) : '') + '</td>\
                 <th scope="row">:סוג מסלול</th>\
             </tr>\
             <tr>\
                 <td>' + (feature.properties['length'] !== null ? autolinker.link(feature.properties['length'].toLocaleString()) : '') + '</td>\
                 <th scope="row">:אורך מסלול</th>\
             </tr>\
             <tr>\
                 <td>' + (feature.properties['time'] !== null ? autolinker.link(feature.properties['time'].toLocaleString()) : '') + '</td>\
                 <th scope="row">:זמן</th>\
             </tr>\
             <tr>\
                 <td>' + (feature.properties['ages'] !== null ? autolinker.link(feature.properties['ages'].toLocaleString()) : '') + '</td>\
                 <th scope="row">:גילאים</th>\
             </tr>\
             <tr>\
                 <td>' + (feature.properties['teamType'] !== null ? autolinker.link(feature.properties['teamType'].toLocaleString()) : '') + '</td>\
                 <th scope="row">:סוג צוות</th>\
             </tr>\
             <tr>\
                 <td>' + (feature.properties['level'] !== null ? autolinker.link(feature.properties['level'].toLocaleString()) : '') + '</td>\
                 <th scope="row">:דרגת קושי</th>\
             </tr>\
             <tr>\
                 <td>' + (feature.properties['staPoint'] !== null ? autolinker.link(feature.properties['staPoint'].toLocaleString()) : '') + '</td>\
                 <th scope="row">:נקודת התחלה</th>\
             </tr>\
             <tr>\
                 <td>' + (feature.properties['endPoint'] !== null ? autolinker.link(feature.properties['endPoint'].toLocaleString()) : '') + '</td>\
                 <th scope="row">:נקודת סיום</th>\
             </tr>\
             <tr>\
                 <td>' + (feature.properties['season'] !== null ? autolinker.link(feature.properties['season'].toLocaleString()) : '') + '</td>\
                 <th scope="row">:עונה</th>\
             </tr>\
             <tr>\
                 <td>' + (feature.properties['wet'] !== null ? autolinker.link(feature.properties['wet'].toLocaleString()) : '') + '</td>\
                 <th scope="row">:רטוב או יבש\</th>\
             </tr>\
             <tr>\
                 <td>' + (feature.properties['access'] !== null ? autolinker.link(feature.properties['access'].toLocaleString()) : '') + '</td>\
                 <th scope="row">:נגישות</th>\
             </tr>\
             <tr>\
                 <td>' + (feature.properties['vantage'] !== null ? autolinker.link(feature.properties['vantage'].toLocaleString()) : '') + '</td>\
                 <th scope="row">:נקודת תצפית</th>\
             </tr>\
             <tr>\
                 <td>' + (feature.properties['parking'] !== null ? autolinker.link(feature.properties['parking'].toLocaleString()) : '') + '</td>\
                 <th scope="row">:חניה</th>\
             </tr>\
         </table>';
    layer.bindPopup(popupContent, { maxHeight: 400 });
}

function style_Tracks_1_0() {
    return {
        pane: 'pane_Tracks_1',
        opacity: 1,
        color: 'rgba(57,117,196,1.0)',
        dashArray: '',
        lineCap: 'square',
        lineJoin: 'bevel',
        weight: 7.0,
        fillOpacity: 0,
        interactive: true,
    }
}
map.createPane('pane_Tracks_1');
map.getPane('pane_Tracks_1').style.zIndex = 401;
map.getPane('pane_Tracks_1').style['mix-blend-mode'] = 'normal';
var layer_Tracks_1 = new L.geoJson(json_Tracks_1, {
    attribution: '',
    interactive: true,
    dataVar: 'json_Tracks_1',
    layerName: 'layer_Tracks_1',
    pane: 'pane_Tracks_1',
    onEachFeature: pop_Tracks_1,
    style: style_Tracks_1_0,
});
bounds_group.addLayer(layer_Tracks_1);
map.addLayer(layer_Tracks_1);
map.on("zoomend", function (e) {
    if (map.getZoom() <= 19 && map.getZoom() >= 12) {
        map.addLayer(layer_Tracks_1);
    } else if (map.getZoom() > 19 || map.getZoom() < 12) {
        map.removeLayer(layer_Tracks_1);
    }
});
if (map.getZoom() <= 19 && map.getZoom() >= 12) {
    map.addLayer(layer_Tracks_1);
} else if (map.getZoom() > 19 || map.getZoom() < 12) {
    map.removeLayer(layer_Tracks_1);
}
var osmGeocoder = new L.Control.Geocoder({
    collapsed: true,
    position: 'topleft',
    text: 'Search',
    title: 'Testing'
}).addTo(map);
document.getElementsByClassName('leaflet-control-geocoder-icon')[0]
    .className += ' fa fa-search';
document.getElementsByClassName('leaflet-control-geocoder-icon')[0]
    .title += 'Search for a place';
var baseMaps = {};
L.control.layers(baseMaps, { '<img src="/Tracks_1.png" /> Tracks': layer_Tracks_1, "OSM Standard": layer_OSMStandard_0, }, { collapsed: false }).addTo(map);
setBounds();
var i = 0;
layer_Tracks_1.eachLayer(function (layer) {
    var context = {
        feature: layer.feature,
        variables: {}
    };
    layer.bindTooltip((layer.feature.properties['name'] !== null ? String('<div style="color: #ffffff; font-size: 4pt; font-family: \'Castellar\', sans-serif;">' + layer.feature.properties['name']) + '</div>' : ''), { permanent: true, offset: [-0, -16], className: 'css_Tracks_1' });
    labels.push(layer);
    totalMarkers += 1;
    layer.added = true;
    addLabel(layer, i);
    i++;
});
map.addControl(new L.Control.Search({
    layer: layer_Tracks_1,
    initial: false,
    hideMarkerOnCollapse: true,
    propertyName: 'name'
}));
document.getElementsByClassName('search-button')[0].className +=
    ' fa fa-binoculars';
resetLabels([layer_Tracks_1]);
map.on("zoomend", function () {
    resetLabels([layer_Tracks_1]);
});
map.on("layeradd", function () {
    resetLabels([layer_Tracks_1]);
});
map.on("layerremove", function () {
    resetLabels([layer_Tracks_1]);
});


 // var marker = L.marker([ 34.9, 32.1 ]).addTo(map);
