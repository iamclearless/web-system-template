# GoogleMaps

## Description
- [ ] Provide user with an interactive earth map with added adress search, location localization funcionality.

## Entity definition
- [ ] initMap
    - [ ] centerPosition (float,array(length=500))
    - [ ] geocoder
- [ ] initAutoComplete
    - [ ] input (string(length=100))
    - [ ] autocomplete

## API definition
- [ ] Initialize Google Maps API : https://maps.googleapis.com/maps/api/js?key=AIzaSyAZllgebyBeIDlDU2gM_AlPIB2dqdmyOTc&libraries=places&callback=initialize
- [ ] var centerPosition = new google.maps.LatLng(54.687157, 25.279652)
- [ ] handleLocationError(false, infoWindow, map.getCenter()); {error: 'Error: The Geolocation service failed.'}
- [ ] 404 - {error: 'page not found'}
- [ ] 500 - {error: 'server error'}
- [ ] infoWindow.setPosition(pos);
- [ ] map.setCenter(pos)

## UI definition
- [ ] Defined view in wireframe: https://wireframe.cc/pro/edit/245440

