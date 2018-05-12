// Places List
// These are the real estate listings that will be shown to the user.

// Constructor creates a new map - only center and zoom are required.
var styles = {
        map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: 30.267153, lng: -97.743061},
          zoom: 12,
          styles: styles,
          mapTypeControl: false
          styles: [
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
var locations = [
    {
        title: 'Torchies Tacos',
        address: '1822 S Congress Ave, Austin, TX 78704',
        city: 'Austin',
        id: '0',
        location: {
            Lat: 30.245432, 
            lng: -97.75152}
        }
    },
    {
        title: 'PintHouse Pizza',
        address: '4236 S Lamar Blvd, Austin, TX 78704',
        city: 'Austin',
        id: '1',
        location: {
             lat: 30.236083, 
             lng: -97.795897}
    },
    {
        title: 'Zilker Park',
        address: '2100 Barton Springs Rd, Austin, TX 78704',
        city: 'Austin,',
        id: '2',
        location: {
            lat: 30.266962, 
            lng: -97.772859
        }
    },
    {
        title: 'Sway Thai Food',
        address: '1417 S 1st St, Austin, TX 78704',
        city: 'Austin',
        id: '3',
        location: {
            lat: 30.250129, 
            lng: -97.754559
        }
    },
    {
        title: 'Uchi Sushi',
        address: '1509, 801 S Lamar Blvd, Austin, TX 78704',
        city: 'Austin',
        id: '4',
        location: {
            lat: 30.257514, 
            lng: -97.759771
        }
    },
    {
        title: 'Polvos Mexican Food',
        address: '2004 S 1st St, Austin, TX 78704',
        city: 'Austin',
        id: '5',
        location: {
            lat: 30.245299, 
            lng: -97.757395
        }
    }
];