'use strict';
/* global $ map google */

$('#flickr').click(function() {
    flickrRequest();
});
$('#clear').click(function() {
    clearResults();
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
    console.log('photos in location'+ position.lat(), position.lng() +': ', data);
    data.photos.photo.forEach(function(element){
        console.log('location of the photo: '+ element.latitude, element.longitude)
        var marker = new google.maps.Marker({
            position: new google.maps.LatLng(element.latitude, element.longitude),
            map: map
        });
        flickrMarkers.push(marker);
    });
}

function clearResults() {
    flickrMarkers.forEach(function(element) {
        element.setMap(null);
    });
    flickrMarkers.length = 0;
}