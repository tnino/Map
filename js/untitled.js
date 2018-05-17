let map;

let markers = [];

let contentString = '';

let locations = [{
{title: 'tacos',location: {lat: 30.245432, lng: -97.75152}},
 {title: 'pizza',location: {lat: 30.236083, lng: -97.795897}},
 {title: 'park',location: {lat: 30.266962, lng: -97.772859}},
 {title: 'thai',location: {lat: 30.250129, lng: -97.754559}},
 {title: 'sushi', location: {lat: 30.257514, lng: -97.759771}},
 {title: 'tex mex',location: {lat: 30.245299, lng: -97.757395}}
];

function locationData(data) {
    this.title = data.title;
    this.location = data.locations;
}

// render map
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: 30.316056,
            lng: -97.724944
        },
        zoom: 15,
        styles,styles,
        mapTypeControl: false
    });


    let largeInfowindow = new google.maps.InfoWindow();


    let bounds = new google.maps.LatLngBounds();
    // Style the markers pins.
    let defaultIcon = makeMarkerIcon('89F4EE');
    let highlightedIcon = makeMarkerIcon('BC96D8');


    // The following group uses the location array to create an array of markers on initialize.
    for (let i = 0; i < location.length; i++) {
    // Get the position from the location array.
        let position = locations[i].location;
        let title = locations[i].title;

        // Create a marker per location, and put into markers array.
        let marker = new google.maps.Marker({
      position: position,
      title: title,
      img: img,
      map: map,
      animation: google.maps.Animation.DROP,
      icon: defaultIcon,
      id: i});

        markers.push(marker);

        marker.addListener('click', openInfoWindow);
        marker.addListener('mouseover', mouseOver);
        marker.addListener('mouseout', mouseOut);
    }

    function openInfoWindow() {
        populateInfoWindow(this, largeInfowindow);
        for (let i = 0; i < markers.length; i++) {
            markers[i].setAnimation(google.maps.Animation.NULL);
        }
        this.setAnimation(google.maps.Animation.BOUNCE);
    }

    function mouseOver() {
        this.setIcon(highlightedIcon);
    }

    function mouseOut() {
        this.setIcon(defaultIcon);
    }
    for (let m = 0; m < markers.length; m++) {
        markers[m].setMap(map);
        bounds.extend(markers[m].position);
    }

    google.maps.event.addDomListener(window, 'resize', () => {
    map.fitBounds(bounds); // `bounds` is a `LatLngBounds` object
  });
}

function makeMarkerIcon(markerColor) {
    let markerImage = new google.maps.MarkerImage(
        `http://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|${  markerColor 
    }|40|_|%E2%80%A2`,
        new google.maps.Size(21, 34),
        new google.maps.Point(0, 0),
        new google.maps.Point(10, 34),
        new google.maps.Size(21, 34));
    return markerImage;
}
// This function populates the infowindow when the marker is clicked. 

    this.populateInfoWindow = function(marker, infowindow) {
        if (infowindow.marker != marker) {
            infowindow.setContent('');
            infowindow.marker = marker;

// Foursquare API Client

    clientID = "UYMGYQBVEWNN32QUEMNALCEBAC0BDXBRQBEM1JDVMS51UPUE";
    clientSecret =
                "LRDYWINS4XW0MQYVZNA0YROEJDEWN0Y5ATKDNCABUKHX325C";

    // URL for Foursquare API
    var apiUrl = 'https://api.foursquare.com/v2/venues/search?ll=' +
                 marker.lat + ',' + marker.lng + '&client_id=' + clientID +
                '&client_secret=' + clientSecret + '&query=' + marker.title +
                '&v=20170708' + '&m=foursquare';

    // Foursquare API
    $.getJSON(apiUrl).done(function(marker) {
                var response = marker.response.venues[0];
                self.street = response.location.formattedAddress[0];
                self.city = response.location.formattedAddress[1];


                self.htmlContentFoursquare =
                    '<div>' +
                    '<h6 class="iw_address_title"> Address: </h6>' +
                    '<p class="iw_address">' + self.street + '</p>' +
                    '<p class="iw_address">' + self.city + '</p>' +
                    '</div>' + '</div>';

                infowindow.setContent(self.htmlContent + self.htmlContentFoursquare);
            }).fail(function() {

    // sends an alert if the foursquare API is down.
    alert( "There was an issue loading the Foursquare API. Please refresh your page to try again."
                );
            });

let MyModel = function() {
    let self = this;

    this.markers = markers;

    this.locationsList = ko.observableArray([]);

    this.filterInput = ko.observable();

    self.filter = function(title) {
        self.filterInput(title);
    };

    this.currentRes = ko.observable(self.locationsList()[0]);

    this.selectAtr = function(clickRes) {
        self.currentRes(clickRes);
        this.markers = markers;
        for (let i = 0; i < this.markers.length; i++) {
            let currentMarker = this.markers[i];
            if (currentMarker.title == clickRes.title) {
                google.maps.event.trigger(this.markers[i], 'click');
            }
        }
    };
  location.forEach(function(locationItem) {
    self.locationsList.push(new locationData(locationItem));
  });
          //knowout location list on text input
          self.filterlocations = ko.computed(function () {
                if (!self.filterInput()) {
                  for (var r = 0; r < this.markers.length; r++) {
                    this.markers[r].setVisible(true);
                  }
                  return self.locationsList();
                } else {
                  var updatedMarkers = [];
                  for (var i = 0; i < this.markers.length; i++) {
                    var currentMarker = this.markers[i];
                    if (currentMarker.title.toLowerCase().includes(self.filterInput().toLowerCase())) {
                      updatedMarkers.push(currentMarker);
                      this.markers[i].setVisible(true);
                    } else {
                      this.markers[i].setVisible(false);
                    }
                  }
                  return ko.utils.arrayFilter(self.locationList(), function (rests) {
                    return rests.title.toLowerCase().includes(self.filterInput().toLowerCase());
                  }, this);
                }
            });
};


googleError = function googleError() {
    alert(
        'Oops. Google Maps did not load. Please refresh the page and try again!');
};

ko.applyBindings(new MyModel());
// function startApp() {
//   ko.applyBindings(new MyModel());
