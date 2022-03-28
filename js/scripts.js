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
    if ($(this).hasClass('flyto-nb')) {
      newCenter = [-73.9758898, 40.7129913]
    }

    if ($(this).hasClass('flyto-sb')) {
      newCenter = [-74.043891, 40.662119]
    }

    if ($(this).hasClass('flyto-nm')) {
      newCenter = [-73.933865, 40.787768]
    }

    if ($(this).hasClass('flyto-mq')) {
      newCenter = [-73.9529312, 40.7538378]
    }

    if ($(this).hasClass('flyto-tb')) {
      newCenter = [-73.8593614, 40.8074066]
    }

    if ($(this).hasClass('flyto-pier-11')) {
      newCenter = [-74.006567, 40.7035214]
    }

    map.flyTo({
      center: newCenter,
      zoom: 13
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
          <p><h5>Pier Name: <em>${nycferrystop.properties.stopname}</em></h5></p>
          <p><h6>Time to Pier-11 Hub: <strong>${nycferrystop.properties.minstowallst} Minutes</strong></h6></p>
          <p><h6>Weekend Riders Served: <strong>${nycferrystop.properties.weekendq1}</strong></h6></p>
          <p><h6>Weekday Riders Served: <strong>${nycferrystop.properties.weekdayq1}</strong></h6></p>
        `))
    .addTo(map);
  })

  // add layers for 15-min walking distances
   map.addSource('walklayers', {
     type: 'geojson',
     data: './data/walking-layers.geojson',
   })

   map.addLayer({
    id: 'walkingshapes',
    type: 'fill',
    source: 'walklayers',
    layout: {
      'visibility' : 'visible'
        },
    paint: {
      'fill-color': '#98f0fa',
      'fill-opacity': 0.5,
    }
  });

  // Buttons to toggle the visibility of the layers
  $('#layers-button').on('click', function() {
      // when this is clicked, open walking layers
    map.setLayoutProperty('walkingshapes', 'visibility', 'visible');
    });

})
