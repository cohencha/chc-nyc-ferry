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
  if ($(this).hasClass('flyto-the-village')) {
    newCenter = [-74.001745,40.729778]
  }

  if ($(this).hasClass('flyto-fidi')) {
    newCenter = [-74.009485,40.707873]
  }

  if ($(this).hasClass('flyto-pier-11')) {
    newCenter = [-74.006567, 40.7035214]
  }

  map.flyTo({
    center: newCenter,
    zoom: 12
  })
})

// listen for click on the 'Back to City View' button
$('.reset').on('click', function() {
  map.fitBounds(nycBounds)
})

  nycferrystops.features.forEach(function(nycferrystop) {
    var mapMarker = new mapboxgl.Marker({
      color: '#2596be'
    })
    .setLngLat(nycferrystop.geometry.coordinates)
    .setPopup(
      new mapboxgl.Popup()
        .setHTML(`
          <p><h2>${nycferrystop.properties.stopname}</h2></p>
        `))
    .addTo(map);
  })

})
