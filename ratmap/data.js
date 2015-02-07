var regions;
function loadRegions(){
	d3.csv( "csv/regions.csv", function( data ){
		regions = {};
		for ( var i in data ){
			regions[ data[i].abbrev ] = data[i];
			if ( !data[i].fill_color || data[i].fill_color == "" )
				regions[ data[i].abbrev ].color = colors["region"+i];	// colors are in map.js
			else {
				regions[ data[i].abbrev ].color = data[i].fill_color;
				var style;
				if ( !d3.select( "head style" ).node() ) style = d3.select("head").append( "style" );
				else style = d3.select( "head style" );
				var html = style.html();
				html += ".region" + i + "{fill:" + data[i].fill_color + ";background-color:" + data[i].fill_color + ";}";
				if ( data[i].text_color && data[i].text_color != "" ){
					html += "#list-header.region" + i + ", .list-item.selected.region" + i + " p{color:" + data[i].text_color + ";}";
				}
				style.html( html );
			}
			regions[ data[i].abbrev ].class = "region" + i;
		}
		loaded();
	});
}

var mapFeatures;
function loadGeography(){
	d3.json( "countries.json", function( json )
	{
		d3.json( "islands.json", function(islands){

			mapFeatures = topojson.feature(json,json.objects.countries).features;

			mapFeatures = mapFeatures.concat(islands.features);
			loaded();
		});
		
	});
}

var countryData;
function loadCountries(){
	d3.csv( "csv/countries.csv", function( data ){
		countryData = data;
		loaded();
	});
}

function loaded(){
	if ( regions && mapFeatures && countryData ) dataReady();
}