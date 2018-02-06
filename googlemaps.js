//api key AIzaSyAgfGOS4JyDg8Hp_rVFf1MsFHxQPpI8Ys8

var map;
var lat;
var lng;
function initMap() {
    //myLatLng = new google.maps.LatLng(22.2783, 114.1747);
    map = new google.maps.Map(document.getElementById('gmap'), {
        center: {lat: 22.2783, lng: 114.1747},
        zoom: 13
    });
    lat = map.getCenter().lat;
    lng = map.getCenter().lng;
    var geocoder = new google.maps.Geocoder();

    document.getElementById('submit').addEventListener('click', function() {
        geocodeAddress(geocoder, map);
    });
    console.log(lat, lng);
}

function geocodeAddress(geocoder, resultsMap) {
    var address = document.getElementById('address').value;
    geocoder.geocode({'address': address}, function(results, status) {
        if (status === 'OK') {
            resultsMap.setCenter(results[0].geometry.location);
            myLatLng = resultsMap.getCenter();
            var marker = new google.maps.Marker({
            map: resultsMap,
            position: results[0].geometry.location
            });
        } else {
            alert('Geocode was not successful for the following reason: ' + status);
        }
    });
}

function findNearbyWikipedia (lat, lng) {
    $.ajax({
        'method': 'GET',
        'url': 'http://api.geonames.org/findNearbyWikipediaJSON',
        'datatype': 'json',
        'data': {
            'username': 'almix',
            'style': 'full',
            'formatted': 'true',
            'lat': lat,
            'lng': lng,
        },
        'success': parseData,
    })
}

function parseData(data) {
    console.log(data.geonames[0]);
    data.geonames.forEach(function(o) {
        new google.maps.Marker({
            position
        })
    });
}
const button = document.getElementById("wiki");
button.addEventListener("click", findNearbyWikipedia(lat, lng), console.log("click"));