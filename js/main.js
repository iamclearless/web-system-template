var map, infoWindow, geocoder, input, autocomplete, placesearch;

//function that draws the map:
 
function initialize() {
  initMap();
  initAutocomplete();
}
 
var initMap = function () {
	var centerPosition = new google.maps.LatLng(54.687157, 25.279652);
   	map = new google.maps.Map(document.getElementById('map'), {
        center: centerPosition,
        zoom: 8
    });
    geocoder = new google.maps.Geocoder;
    infoWindow = new google.maps.InfoWindow;
    // Using geolocation API to find the current location of the device:
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            infoWindow.setPosition(pos);
            infoWindow.setContent(reverseGeocoding(pos));
            map.setCenter(pos);
        }, function () {
            handleLocationError(true, infoWindow, map.getCenter());
        });
    }
    else {
        // If the web browser does not support geolocation, an error will be shown:
        handleLocationError(false, infoWindow, map.getCenter());
    }
    
    google.maps.event.addListener(map, 'click', function (e) {
        infoWindow.setPosition(e.latLng);
        reverseGeocoding(e.latLng);
        getWeather(e.latLng);
    });
	
	

};

	// If geocoder doesn't work, this handles the error message shown
var handleLocationError = function (browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
        'Error: The Geolocation service failed.' :
        'Error: Your browser does not support geolocation.');
    infoWindow.open(map);
	
};

	// Function finds address based on coordinates set from mouse click:
var reverseGeocoding = function (latlng) {
    geocoder.geocode({ 'location': latlng }, function (results, status) {
        if (status === 'OK') {
			
            if (results[0]) {
                infoWindow.setContent(results[0].formatted_address);
                infoWindow.open(map);
				map.setCenter(latlng);
				map.setZoom(15);
            }
			
            else {
                window.alert('Nothing could be found.');
            }
        }
		
        else {
            window.alert('Geocoder failed due to: ' + status + '.');
            infoWindow.close(map);
        }
    });
};

//---------------------------------------------------------------------------------


function initAutocomplete() {
  // Create the autocomplete object, restricting the search to geographical location types only.
  input = document.getElementById('search_term');
  autocomplete = new google.maps.places.Autocomplete(
    /** @type {!HTMLInputElement} */
    (document.getElementById('autocomplete')), {
      types: ['geocode']
    });

  // When the user selects an address from the dropdown, populate the address fields in the form.
  autocomplete.addListener('place_changed', fillInAddress);
}

//Function looks for address that was typed in the search bar

function fillInAddress() {
  var place = autocomplete.getPlace();
  if (place.geometry.viewport) {
    map.fitBounds(place.geometry.viewport);
  } else {
    map.setCenter(place.geometry.location);
    map.setZoom(6);
  }
}
