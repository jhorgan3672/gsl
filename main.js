const mymap = L.map('mapid', {zoomControl:true, maxZoom:20, minZoom:3}).setView([32.302172, -90.873545], 16);

const basemap = new L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
		maxZoom: 18,
		attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
			'<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
			'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
		id: 'mapbox.streets'
	}).addTo(mymap);
	

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
const renderMultiPoints = (feature) => {
	for(let i=0; i<92; i++)
	L.geoJSON(feature, { 
		style: function(feature) {
			return {
				color: 'Black',
				fillColor: getColor(feature.properties.az),
				radius: 5,
        		opacity: 1,
        		color: 'Black',
        		dashArray: '',
        		lineCap: 'butt',
        		lineJoin: 'miter',
        		weight: 1.0,
        		fill: true,
        		fillOpacity: 1,
			}
		},
	pointToLayer: function (feature, latlng){ 
		return L.circleMarker(latlng)}}).addTo(mymap)

};

//Applying the function to a specific json file
renderMultiPoints(gsl_json)
