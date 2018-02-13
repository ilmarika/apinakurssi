'use strict';
/* global $ map google */

$('#flickr').click(function() {
    flickrRequest();
});

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
            lat: position.lat,
            lon: position.lng,
            format: 'json'
        },
    })
}

function jsonFlickrApi(data) {
    console.log('photos in location'+ position.lat, position.lng +': ', JSON.stringify(data));
}
