const mymap = L.map('mapid', {zoomControl:true, maxZoom:20, minZoom:3}).setView([32.302172, -90.873545], 15);

const basemap = new L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
		maxZoom: 18,
		attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
			'<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
			'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
		id: 'mapbox.dark'
	}).addTo(mymap);
	

let myRenderer = L.canvas({ padding: 0.5 });


const getColor = (v) => {
	if(v < 0.0175){
		return "Green"
	} else if(v > 0.0175 && v < 0.02) {
		return "Yellow"
	} else if(v > 0.02){
		return "Red"
	} else {
		return "Orange"
	}
};

const getMoreColor = (v) => {
	if(v == "Green"){
		return 'Green'
	} else if(v == "Yellow") {
		return 'Yellow'
	} else if(v == "Red"){
		return 'Red'
	} else {
		return 'Orange'
	}
};

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
 
//function for extracting Long/Lat and mapping lines

function layTheLines(v) {
        sub_array1 = [];

		for(let j=0; j<v.features.length; j+=2){
			let c = v.features[j].geometry.coordinates;
			let d = v.features[j+1].geometry.coordinates;
        	sub_array1.push([c,d]);
       
		};
        
		for(let t=0; t<sub_array1.length; t++){
			let e = {"type": "LineString",
					 "coordinates": sub_array1[t],
                     "color": getColor(v.features[t].properties.az),
                    
                    }
			let f = new Object(e);

			var myStyle1 = {
				color: e.color,
				weight: 10
	
			}; 
	
			var myStyle2 = {
				color: 'Black',
				weight: 15
			}
	
			L.geoJSON(f, {style: myStyle2}).addTo(mymap);
            L.geoJSON(f, {style: myStyle1}).addTo(mymap); 
              
		};
	};

/*function layTheLines(v) {
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

		for(let t=0; t<46; t++){
			let a = {"type": "LineString",
					 "coordinates": sub_array4[t],
					 "color": getColor(sub_array4[t][0][2])};
			let c = new Object(a);
			//geojson.features[0].geometry.coordinates.push(c);
			var myStyle1 = {
				color: getMoreColor(c.color),
				weight: 5
	
			}; 
	
			var myStyle2 = {
				color: 'Black',
				weight: 10
			}
	
			L.geoJSON(c, {style: myStyle2}).addTo(mymap);
			L.geoJSON(c, {style: myStyle1}).addTo(mymap); 
		};

		

};
*/
layTheLines(gsl2)
layTheLines(gsl1);

