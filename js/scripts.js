mapboxgl.accessToken = 'pk.eyJ1IjoiY29oZW5jaGEiLCJhIjoiY2t6dW12Zm1mMDhnbzJvbXl1cmYxY3BpNyJ9.qTcZ7QT6P96dIYJjSniWVw'
//
// $.getJSON('./data/ferry-stops-updates.geojson', function(nycferrystops) {
//   console.log(nycferrystops)

var nycCenter = [-73.940820, 40.7724818]

var map = new mapboxgl.Map({
  container: 'mapContainer', // HTML container id
  style: 'mapbox://styles/mapbox/streets-v11', // style URL
  center: nycCenter, // starting position as [lng, lat]
  zoom: 10
});

//   nycferrystops.features.forEach(function(nycferrystop) {
//     var mapMarker = new mapboxgl.Marker({
//       color: '#2596be'
//     })
//     .setLngLat(nycferrystop.geometry.coordinates)
//     .addTo(map);
//   })
// })

$('#fly-to-wallst').on('click', function() {
  // when this is clicked, let's fly the map to Pier 11
  map.flyTo({
    center: [-74.006567, 0.7035214],
    zoom: 13
  })
})

$('.menu-ui a').on('click', function() {
    // For each filter link, get the 'data-filter' attribute value.
    var filter = $(this).data('filter');
    $(this).addClass('active').siblings().removeClass('active');
    markers.setFilter(function(f) {
        // If the data-filter attribute is set to "all", return
        // all (true). Otherwise, filter on markers that have
        // a value set to true based on the filter name.
        return (filter === 'all') ? true : f.properties[filter] === true;
    });
    return false;
})
