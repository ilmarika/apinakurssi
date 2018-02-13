'use strict';
/* eslint linebreak-style: ["error", "windows"] */
/* global google */
const geocoder = new google.maps.Geocoder();
const searchForm = document.getElementById('searchForm');
searchForm.addEventListener('submit', formSubmit);

const mapOptions = {
	center: new google.maps.LatLng(22.293305, 114.171053),
	zoom: 12,
};

const map = new google.maps.Map(document.getElementById('mapDiv'), mapOptions);

function formSubmit(event) {
	event.preventDefault();

	const options = {
		'address': searchForm.search.value,
	};
	geocoder.geocode(options, geocodingResult);
}

function geocodingResult(results, status) {
	if (status == google.maps.GeocoderStatus.OK) {
		const position = results[0].geometry.location;
		map.setCenter(position);
	} else {
		alert('Geocode was not successful for the following reason: ' + status);
	}
}
