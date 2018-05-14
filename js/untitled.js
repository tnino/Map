var map;

var markers = [];

var contentString = '';

var locations = [
          {title: 'tacos', location: {lat: 30.245432, lng: -97.75152}},
          {title: 'pizza', location: {lat: 30.236083, lng: -97.795897}},
          {title: 'park', location: {lat: 30.266962, lng: -97.772859}},
          {title: 'thai', location: {lat: 30.250129, lng: -97.754559}},
          {title: 'sushi', location: {lat: 30.257514, lng: -97.759771}},
          {title: 'tex mex', location: {lat: 30.245299, lng: -97.757395}}
  ];

function locationData(data) {
    this.title = data.title;
    this.location = data.locations;
}

    // Create a styles array to use with the map.
    var styles = [
  {
              "featureType": "administrative",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#444444"
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "all",
        "stylers": [
            {
                "color": "#f2f2f2"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "all",
        "stylers": [
            {
                "saturation": -100
            },
            {
                "lightness": 45
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "hue": "#ff0054"
            },
            {
                "weight": "2.68"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "color": "#e60e55"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "labels.text",
        "stylers": [
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "simplified"
            },
            {
                "color": "#f5cee3"
            }
        ]
    },
    {
        "featureType": "road.highway.controlled_access",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "color": "#f5cee3"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "color": "#f5cee3"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#e60e55"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "color": "#f5cee3"
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "all",
        "stylers": [
            {
                "color": "#f5cee3"
            },
            {
                "visibility": "on"
            }
        ]
    }
];


//render map
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {
      lat: 30.316056,
      lng: -97.724944
    },
    zoom: 15,
    fullscreenControl: true,
    style: mapStyle
  });
  console.log("map initialised");


  var largeInfowindow = new google.maps.InfoWindow();


  var bounds = new google.maps.LatLngBounds();
    // Style the markers pins.
  var defaultIcon = makeMarkerIcon('89F4EE'); 

  var highlightedIcon = makeMarkerIcon('BC96D8');
  // The following group uses the location array to create an array of markers on initialize.
  for (var i = 0; i < attractions.length; i++) {
    // Get the position from the location array.
    var position = locations[i].location;
    var title = locations[i].title;
    var img = locations[i].img;

    // Create a marker per location, and put into markers array.
    var marker = new google.maps.Marker({
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
    for (var i = 0; i < markers.length; i++) {
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
    for (var m = 0; m < markers.length; m++) {
      markers[m].setMap(map);
      bounds.extend(markers[m].position);
    }

    google.maps.event.addDomListener(window, 'resize', function() {
      map.fitBounds(bounds); // `bounds` is a `LatLngBounds` object
    });
}

function makeMarkerIcon(markerColor) {
  var markerImage = new google.maps.MarkerImage(
    'http://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|'+ markerColor +
    '|40|_|%E2%80%A2',
    new google.maps.Size(21, 34),
    new google.maps.Point(0, 0),
    new google.maps.Point(10, 34),
    new google.maps.Size(21,34));
  return markerImage;
}

var MyModel = function() {
  var self = this;

  this.markers = markers;

  this.locationList = ko.observableArray([]);

  this.filterInput = ko.observable();

  self.filter = function(title) {
    self.filterInput(title);
  };

  this.currentRes = ko.observable(self.locationList()[0]);

  this.selectAtr = function(clickRes) {
    self.currentRes(clickRes);
    this.markers = markers;
    for (var i = 0; i < this.markers.length; i++) {
      var currentMarker = this.markers[i];
      if (currentMarker.title == clickRes.title) {
        google.maps.event.trigger(this.markers[i], 'click');
      }
    }
  };

  // fill the empty observable array with the items from the model
    locations.forEach(function(location) {
        self.locationList.push(new Location(location));

  //knowout location list on text input
  self.filterlocations = ko.computed(function() {
    if (!self.filterInput()) {
      for (r = 0; r < this.markers.length; r++) {
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
      return ko.utils.arrayFilter(self.locationList(), function(rests) {
        return rests.title.toLowerCase().includes(self.filterInput().toLowerCase());
  }, this);
}

ko.applyBindings(new MyModel());

googleError = function googleError() {
    alert(
        'Oops. Google Maps did not load. Please refresh the page and try again!');
};

 
 function startApp() {
    ko.applyBindings(new AppViewModel());
}


