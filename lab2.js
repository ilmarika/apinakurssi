'use strict';
/* eslint linebreak-style: ["error", "windows"] */
/* global google map $ MarkerWithLabel */
const infoWindow = new google.maps.InfoWindow();
const wikipediaMarkers = [];
const weatherMarkers = [];

const wikipediaButton = document.getElementById('wikipediaButton');
wikipediaButton.addEventListener('click', wikipediaButtonClick);

const weatherButton = document.getElementById('weatherButton');
weatherButton.addEventListener('click', weatherButtonClick);

function wikipediaButtonClick() {
	clearWikipediaMarkers();
	const center = map.getCenter();
	loadArticles(center.lat(), center.lng());
}

function weatherButtonClick() {
	clearWeatherMarkers();
	const bounds = map.getBounds();
	const ne = bounds.getNorthEast();
	const sw = bounds.getSouthWest();
	loadWeather(ne.lat(), sw.lat(), ne.lng(), sw.lng());
}

function loadWeather(north, south, east, west) {
	$.ajax({
		'url': 'http://api.geonames.org/weatherJSON',
		'dataType': 'json',
		'data': {
			'north': north,
			'south': south,
			'east': east,
			'west': west,
			'username': 'almix',
		},
		'success': weatherLoaded,
	});
}

function weatherLoaded(data) {
	clearWeatherMarkers();
	let found = false;
	data.weatherObservations.forEach(function(o) {
		console.log(o);
		found = true;
		const marker = new MarkerWithLabel({
			'position': new google.maps.LatLng(o.lat, o.lng),
			'map': map,
			'icon': {path: ''},
			'labelAnchor': new google.maps.Point(3, 10),
			'labelContent': o.temperature + '&nbsp;&deg;C',
			'labelClass': 'markerLabel',
		});
		weatherMarkers.push(marker);
	});
	if(!found) {
		console.log('Weather stations not found!');
	}
}

function loadArticles(latitude, longitude) {
	$.ajax({
		'url': 'http://api.geonames.org/findNearbyWikipediaJSON',
		'dataType': 'json',
		'data': {
			'lat': latitude,
			'lng': longitude,
			'radius': 20,
			'username': 'almix',
		},
		'success': articlesLoaded,
	});
}

function articlesLoaded(data) {
	clearWikipediaMarkers();
	data.geonames.forEach(handleArticle);
}

function handleArticle(article) {
	const marker = new google.maps.Marker({
		'position': new google.maps.LatLng(article.lat, article.lng),
		'title': article.title,
		'map': map,
		'icon': {
			'url': 'wiki_icon.svg',
			'scaledSize': new google.maps.Size(25, 25),
		},
	});

	google.maps.event.addListener(marker, 'click', function() {
		const content =	'<strong>' + article.title + '</strong>' +
						'<p>' + article.summary + '</p>' +
						'<a href="http://' + article.wikipediaUrl + '" target="_blank">Wikipedia</a>';

		infoWindow.setContent(content);
		infoWindow.open(map, marker);
	});

	wikipediaMarkers.push(marker);
}

function clearWikipediaMarkers() {
	wikipediaMarkers.forEach(clearMarker);
	wikipediaMarkers.length = 0;
}

function clearWeatherMarkers() {
	weatherMarkers.forEach(clearMarker);
	weatherMarkers.length = 0;
}

function clearMarker(marker) {
	marker.setMap(null);
}
