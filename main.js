const mymap = L.map('mapid', {zoomControl:true, maxZoom:20, minZoom:3}).setView([32.302172, -90.873545], 10);

const basemap = new L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
		maxZoom: 18,
		attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
			'<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
			'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
		id: 'mapbox.streets'
	}).addTo(mymap);
	

let myRenderer = L.canvas({ padding: 0.5 });

//Function to assign colors to points based on a specified value (v). 
const getColor = (v) => {
	if(v < 0.0175){
		return 'Green'
	} else if(v > 0.0175 && v < 0.02) {
		return 'Yellow'
	} else if(v > 0.02){
		return 'Red'
	} else {
		return 'Teal'
	}
};

//Function to display multiple points in the same file and visualize according to specified values.  
const plotTheDots = (feature) => {
	for(let i=0; i<feature.features.length; i++)
	L.geoJSON(feature, { 
		style: function(feature) {
			return {
				color: 'Black',
				fillColor: getColor(feature.properties.az),
				radius: 5,
        		opacity: 1,
        		dashArray: '',
        		lineCap: 'butt',
        		lineJoin: 'miter',
        		weight: 1.0,
        		fill: true,
        		fillOpacity: 1,
			}
		},
	pointToLayer: function (feature, latlng){ 
		return L.circleMarker(latlng, {renderer: myRenderer})}}).addTo(mymap);
};
 
function layTheLines(v) {
	let sub_array = [];

    for (let i = 0; i < v.features.length; i++) {

		let a = v.features[i].properties.Lat;
		let b = v.features[i].properties.Lng;
		c = v.features[i].properties.az; 
		let x = new Array(b,a,c);
		sub_array.push(x);

		}; 

		sub_array2 = sub_array;
		sub_array3 = [];

		for(let j=0; j<v.features.length; j+=2){
		let c = sub_array2[j];
		let d = sub_array2[j+1];
		sub_array3.push([c,d]);
		};

		let sub_array4 = sub_array3;

		let geojson = {
			"name":"NewFeatureType",
			"type":"FeatureCollection",
			"features":[{
				"type":"Feature",
				"properties": {
					"stroke": "#1c8e6c",
					"stroke-width": 2,
					"stroke-opacity": 1
				  },
				"geometry":{
					"type":"LineString",
					"coordinates": []
				},
				"properties":null
			}]
		};

		
		let geojson2 = [];

		for(let t=0; t<46; t++){
			let a = {"type": "LineString",
					 "coordinates": sub_array4[t],
					 "color": getColor(sub_array4[t][0][2])};
			let c = new Object(a);
			//geojson.features[0].geometry.coordinates.push(c);
			geojson2.push(c); 
		};

		function getMoreColor(feature){
			for(i=0;i<46;i++){
				return feature[i].color	 
				}; 
		};
		
		var myStyle = {
			stroke: getMoreColor(geojson2),
			weight: 10
		}

	for(let i=0; i<geojson2.length; i++){
	L.geoJSON(geojson2, { 
		style: function(feature) {
			return {
				color: getMoreColor(geojson2),
				weight: 1
			}
		}
	}).addTo(mymap)};

};


plotTheDots(gsl1);

layTheLines(gsl1);

