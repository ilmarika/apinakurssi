'use strict';
/* global $ map google */

$('#flickr').click(function() {
    flickrRequest();
});
$('#clear').click(function() {
    clearResults(flickrMarkers);
});

var flickrMarkers = [];
let position = map.getCenter();
function flickrRequest() {

    $.ajax({
        url: 'https://api.flickr.com/services/rest',
        dataType: 'jsonp',
        data: {
            method: 'flickr.photos.search',
            api_key: '1c7e2d1c77f17433c0d7b1de6408a3b1',
            has_geo: '1',
            media: 'photos',
            lat: position.lat(),
            lon: position.lng(),
            format: 'json',
            extras: 'geo',
            per_page: 10
        },
    })
}

function jsonFlickrApi(data) {
    data.photos.photo.forEach(function(element){
        var marker = new google.maps.Marker({
            position: new google.maps.LatLng(element.latitude, element.longitude),
            map: map,
            id: element.id,
        });
        marker.addListener('click', function() {
            console.log("position: "+ marker.getPosition());
            photoUrl(marker.id);
        });
        flickrMarkers.push(marker);
    });
    LatLngBounds(flickrMarkers);
}

function clearResults(markers) {
    markers.forEach(function(element) {
        element.setMap(null);
    });
    flickrMarkers.length = 0;
}

function LatLngBounds(array) {
    var bounds = new google.maps.LatLngBounds();
    array.forEach(function(element) {
        bounds.extend(element.getPosition());
    });
    map.fitBounds(bounds);
}

function photoUrl(id) {

    $.ajax({
        url: 'https://api.flickr.com/services/rest',
        dataType: 'jsonp',
        data: {
            method: 'flickr.photos.getSizes',
            api_key: '1c7e2d1c77f17433c0d7b1de6408a3b1',
            photo_id: id
        },
        format: 'json',
        success: parseUrl(), 
    })
}

function parseUrl(data) {

}