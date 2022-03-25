mapboxgl.accessToken = 'pk.eyJ1IjoiY29oZW5jaGEiLCJhIjoiY2t6dW12Zm1mMDhnbzJvbXl1cmYxY3BpNyJ9.qTcZ7QT6P96dIYJjSniWVw'

$.getJSON('./data/ferry-stops-updates.geojson', function(nycferrystops) {
  console.log(nycferrystops)

var nycCenter = [-73.9103835, 40.7152049]

var map = new mapboxgl.Map({
  container: 'mapContainer', // HTML container id
  style: 'mapbox://styles/mapbox/streets-v11', // style URL
  center: nycCenter, // starting position as [lng, lat]
  zoom: 10.25,
  minZoom: 10.25,
});

// add the mapbox geocoder plugin
map.addControl(
  new MapboxGeocoder({
    accessToken: mapboxgl.accessToken,
    mapboxgl: mapboxgl
  })
);

// add navigation controls to the map
map.addControl(new mapboxgl.NavigationControl());

    // listen for clicks on the neighborhood flyto buttons
  $('.flyto').on('click', function() {
    if ($(this).hasClass('flyto-bny')) {
      newCenter = [-73.973365, 40.701408]
    }

    if ($(this).hasClass('flyto-soundview')) {
      newCenter = [-73.8492237, 40.8047218]
    }

    if ($(this).hasClass('flyto-pier-11')) {
      newCenter = [-74.006567, 40.7035214]
    }

    map.flyTo({
      center: newCenter,
      zoom: 15
    })
  });

// listen for click on the 'Back to City View' button
  $('.reset').on('click', function() {
  map.fitBounds([[-74.180626, 40.864447], [-73.576473,40.590744]])
  })

// markers for ferry piers
  nycferrystops.features.forEach(function(nycferrystop) {
    var mapMarker = new mapboxgl.Marker({
      color: '#2596be'
    })
    .setLngLat(nycferrystop.geometry.coordinates)
    .setPopup(
      new mapboxgl.Popup()
        .setHTML(`
          <p><h4>${nycferrystop.properties.stopname}</h4></p>
          <p><h5>Weekend Riders Served: ${nycferrystop.properties.weekendq1}</h5></p>
          <p><h5>Weekday Riders Served: ${nycferrystop.properties.weekdayq1}</h5></p>
        `))
    .addTo(map);
  })

  // add layers for 15-min walking distances
   map.addSource('walklayers', {
     type: 'geojson',
     data: './data/walking-layers.geojson'
   });

   map.addLayer({
    id: 'walkingshapes',
    type: 'fill',
    source: 'walklayers',
    paint: {
      "fill-color": "#98f0fa",
      "fill-opacity": 0.5,
    },
    layout: {
      visibility: "none",
    },
  });

  // Buttons to toggle the visibility of the layers
    $('#layers-button').on('click', function() {
      // when this is clicked, open walking layers
      map.setLayoutProperty('walkingshapes', 'visibility', 'visible');
    });

})
