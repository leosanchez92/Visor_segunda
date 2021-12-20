mapboxgl.accessToken = 'pk.eyJ1IjoibmVsc29uc2FuY2hlejkyIiwiYSI6ImNreGI0emlkdzN2ZjcyeW82aWMwbWQzaGIifQ.mjfwuF0I2fOMY5s_01a8OQ'

const map = new mapboxgl.Map({
        container: 'map',
    style: 'mapbox://styles/nelsonsanchez92/ckxcjfvtk0yzr15rzpn6woshh',
        center: [-70.862, -33.488],
    zoom: 7,
    minZoom: 6,
       
});

var hoveredStateId = null;

map.on('load', () => {
    map.addSource('comunas',
        {
            type: 'vector',
            url: 'mapbox://nelsonsanchez92.5zotqrol'

        });
    map.addLayer({
        'id': 'comunas-data',
        'type': 'fill',
        'generateID': true,
        'source': 'comunas',
        'source-layer': 'Chile_2da-b4ikqi',
     
        'layout': {
           
        },
        'paint': {
            "fill-color": {
                type: 'interval',
                property: 'P_Boric',
                stops: [[0, '#398ab2'], [50, '#d06918']]
            },
            "fill-opacity": ["case",
                ["boolean", ["feature-state", "hover"], false],
                1,
                0.5
        ]},
        'minzoom': 6,

    });

 

    map.addLayer({
        'id': 'comunas-data2',
        'type': 'line',
        'source': 'comunas',
        'source-layer': 'Chile_2da-b4ikqi',
        'generateID': true,
        'layout': {
            'visibility': "visible"
        },
        'paint': {
            "line-color": "#000000",
            "line-width": 1,
            "line-opacity": 0.4
        },
        'minzoom': 6,
    });
    map.on("mousemove", "comunas-data", function (e) {
        if (e.features.length > 0) {
            if (hoveredStateId) {
                map.setFeatureState({ source: 'comunas', sourceLayer: 'Chile_2da-b4ikqi', id: hoveredStateId }, { hover: false });
            }
            hoveredStateId = e.features[0].id;
            map.setFeatureState({ source: 'comunas', sourceLayer: 'Chile_2da-b4ikqi', id: hoveredStateId }, { hover: true });
        }
    });

    // When the mouse leaves the state-fill layer, update the feature state of the
    // previously hovered feature.
    map.on("mouseleave", "comunas-data", function () {
        if (hoveredStateId) {
            map.setFeatureState({ source: 'comunas', sourceLayer: 'Chile_2da-b4ikqi', sourceLayer: 'Chile_2da-b4ikqi', id: hoveredStateId }, { hover: false });
        }
        hoveredStateId = null;
    });

});




map.on('load', () => {
    map.addSource('puntos',
        {
            type: 'vector',
            url: 'mapbox://nelsonsanchez92.56qgchk4'

        });
    map.addLayer({
        'id': 'puntos_com',
        'type': 'symbol',
        'source': 'puntos',
        'source-layer': 'centroid_com-bnvs0a',
        'layout': {
            'text-field': "{_Com_}",

            'text-size': 10
        },
        'paint': {
            'text-color': 'white',
            'text-halo-color': 'black',
            'text-halo-width': 1,
            'text-halo-blur': 1,


        },
        minzoom: 6
    });


});


map.on('click', 'comunas-data', (e) => {
    var comuna = e.features[0].properties._Com_;
    var region = e.features[0].properties._R_g;
    new mapboxgl.Popup()
        .setLngLat(e.lngLat)
        .setHTML(
            '<h5><span style="font-weight:normal"><center><b> ' + comuna + ' </b><br> (' + region + ')</center></span></h5>'+ 
            '<table style="border-collapse:collapse">'+
            '<tr><td style="font-weight:bold">Candidato</td><td style="text-align:right;font-weight:bold">Votos</td><td style="text-align:right;font-weight:bold">%</td></tr>' +
            '<tr style="font-weight:normal"><td><span class="legend-key"></span>GABRIEL BORIC FONT</td><td style="text-align:right;padding-left:25px">' + e.features[0].properties._Boric + '</td><td style="text-align:right;padding-left:25px">' + e.features[0].properties.P_Boric + '%</td></tr>' +
            '<tr style="font-weight:normal"><td><span class="legend-key"></span>JOSE ANTONIO KAST RIST</td><td style="text-align:right;padding-left:25px">' + e.features[0].properties._Kast + '</td><td style="text-align:right;padding-left:25px">' + e.features[0].properties.P_Kast + '%</td></tr>' +
            '<tr style="font-weight:normal"><td><span class="legend-key"></span><center>Total Válidos:</center></td><td style="text-align:center;padding-left:25px">' + e.features[0].properties._Validos + '</td>' + '</td><td style="text-align:right;padding-left:25px">' + e.features[0].properties.P_Validos + '%</td></tr>' +
            '</table><hr>'+
            '<table style="border-collapse:collapse">' +
            '<tr><td style="font-weight:bold"></td><td style="text-align:right;font-weight:bold">Votos</td><td style="text-align:right;font-weight:bold">%</td></tr>' +
            '<tr style="font-weight:normal"><td><span class="legend-key"></span><center>Total Blancos:</center></td><td style="text-align:center;padding-left:25px">' + e.features[0].properties.Blancos + '</td>' + '</td><td style="text-align:right;padding-left:25px">' + e.features[0].properties.P_Blancos + '%</td></tr>' +
            '<tr style="font-weight:normal"><td><span class="legend-key"></span><center>Total Nulos:</center></td><td style="text-align:center;padding-left:25px">' + e.features[0].properties._Nulos + '</td>' + '</td><td style="text-align:right;padding-left:25px">' + e.features[0].properties.P_Nulos + '%</td></tr>' +
            '<tr style="font-weight:normal"><td><span class="legend-key"></span><center>Votación total:</center></td><td style="text-align:center;padding-left:25px">' + e.features[0].properties._Total + '</td>' + '</td><td style="text-align:right;padding-left:25px">100%</td></tr>' +
            '</table>'
           

                 
    )
        .setMaxWidth("600px")
        .addTo(map);
    
});

// Change the cursor to a pointer when
// the mouse is over the states layer.
map.on('mouseenter', 'comunas-data', () => {
    map.getCanvas().style.cursor = 'pointer';
});

// Change the cursor back to a pointer
// when it leaves the states layer.
map.on('mouseleave', 'comunas-data', () => {
    map.getCanvas().style.cursor = '';
});

map.addControl(new mapboxgl.NavigationControl(), 'top-left');
