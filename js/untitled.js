var Markerss = [];


// ViewModel
var ViewModel = function () {

    var self = this;


    this.filterLocation = ko.observableArray();
    self.filteredLocations = ko.observableArray();
    this.Locationaustin = ko.observableArray(Locationaustin);
    this.locationList = ko.observableArray([]);
    self.currentLocation = ko.observable(this.locationList()[0]);
    self.searchField = ko.observable('');
    self.directionField = ko.observable('');
    self.maxdu = ko.observable('');
    self.maxdu2 = ['10', '15', '20'];
    this.currentduration = ko.observable('');
    self.maxMode2 = ['DRIVING', 'WALKING', 'BICYCLING', 'TRANSIT'];
    this.currentMode = ko.observable('');
    console.log(this.currentMode())

    //go(self.directionField )
    this.showLocation = ko.observable(true);
    this.map;

    this.duracion = ko.observable();
    this.distancia = ko.observable();

    self.go = function (tst) {
        searchWithinTime()

    }

    //---- 
    // This function allows the user to input a desired travel time, in order to get a tco quicker.
    
    function searchWithinTime() {
        // Initialize the distance matrix service.
        var distanceMatrixService = new google.maps.DistanceMatrixService;
        var address = self.directionField();
        // user needs to make sure that they enter a mailing adress or location.
        if (address == '') {
            window.alert('You must enter an address.');
        } else {
        
            var origins = [];
            console.log(Locationaustin)
            for (var i = 0; i < Locationaustin.length; i++) {
                origins[i] = {
                    lat: Locationaustin[i].lat,
                    lng: Locationaustin[i].lng
                };
            }
            console.log(address)
            var destination = address;
            var mode = self.currentMode();
            
            distanceMatrixService.getDistanceMatrix({
                origins: origins,
                destinations: [destination],
                travelMode: google.maps.TravelMode[mode],
                unitSystem: google.maps.UnitSystem.IMPERIAL,
            }, function (response, status) {
                if (status !== google.maps.DistanceMatrixStatus.OK) {
                    window.alert('Error was: ' + status);
                } else {
                    displayMarkersWithinTime(response);
                }
            });
        }
    }
    // The distance will show only if the distance is less that the distance selected. 
    function displayMarkersWithinTime(response) {
        var maxDuration = self.currentduration();
        var origins = response.originAddresses;
        var destinations = response.destinationAddresses;
        
        var atLeastOne = false;
        for (var i = 0; i < origins.length; i++) {
            var results = response.rows[i].elements;
            for (var j = 0; j < results.length; j++) {
                var element = results[j];
                if (element.status === "OK") {
                    atLeastOne = true;

                   
                    var distanceText = element.distance.text;
                    console.log(distanceText)
                    self.distancia = distanceText

                    // Duration value is given in seconds so we make it MINUTES. We need both the value
                    // and the text.
                    var duration = element.duration.value / 60;
                    console.log(duration)
                    var durationText = element.duration.text;
                    console.log(durationText)
                    self.duracion = durationText
                    console.log(self.duracion)
                    document.getElementById('durationText').innerHTML = durationText;
                    document.getElementById('distanceText').innerHTML = distanceText;
                    if (duration <= maxDuration) {
                        //the origin [i] should = the markers[i]
                        //Locationaustin[i].setMap(map);

                        var infowindow = new google.maps.InfoWindow({
                            content: durationText + ' away, ' + distanceText +
                                '<div><input type=\"button\" value=\"View Route\" onclick =' +
                                '\"displayDirections("' + origins[i] + '");\"></input></div>'
                        });
        
                        // when people click on the marker, wthe infowindow opens
                        Locationaustin[i].infowindow = infowindow;
                        google.maps.event.addListener(Locationaustin[i], 'click', function () {
                            this.infowindow.close();
                        });
                    }
                }
            }
        }
        if (!atLeastOne) {
            window.alert(' at this time, We could not find any locations within that distance!');
        }
    }
    //----


    // filter Locationaustin based on keystroke
    this.Locationaustin = ko.computed(function () {
        var search = self.searchField().toLowerCase();

        for (var i = 0; i < Locationaustin.length; i++) {

            if (Locationaustin[i].restaurantname.toLowerCase().indexOf(search) >= 0) {
                if (Locationaustin[i].marker) {
                    Locationaustin[i].marker.setVisible(true);
                }
            } else {
                if (Locationaustin[i].marker) {
                    Locationaustin[i].marker.setVisible(false);
                } // if
            } // if-else
        } // for

        return ko.utils.arrayFilter(Locationaustin, function (location) {
            return location.restaurantname.toLowerCase().indexOf(search) >= 0;
        });

    }, this);

    // Display the marker on the map based on user click on the location list
    self.showLocation = function (location) {
        for (var i = 0; i < Locationaustin.length; i++) {
            //var place = new Location(Locationaustin[i]);
            if (location.restaurantname == Locationaustin[i].restaurantname) {
                Locationaustin[i].marker.setVisible(true);
            } else {
                Locationaustin[i].marker.setVisible(false);
            }

        }
        google.maps.event.trigger(location.marker, 'click');
    }; // self.showLocation


    this.setLocation = function (clickedLocation) {
        self.currentLocation(clickedLocation);
    };


};


self.markers = [];

var self = this;

// Wikipedia API information
var populateInfoWindow = function (marker, infowindow) {


    if (infowindow.marker != marker) {

        infowindow.marker = marker;
        infowindow.open(map, marker);

        $.ajax({
            url: "https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=" + marker.restaurantname + "&prop=info&inprop=url&utf8=&format=json",

            dataType: "jsonp",
            success: function (response) {
                console.log(response.query);
                if (response.query.search.length >= 1) {
                    infowindow.setContent('<div>' + '<h4>' + marker.restaurantname + '</h4> <br><p>' + response.query.search[0].snippet + '</p></div>');
                } else {

                    alert("no se encontro ninngun sitio llamado " + marker.restaurantname);
                }
            },
            error: function () {
                alert("Error retrieving search results, please refresh the page");
            }

        });


    }

    infowindow.addListener('closeclick', function () {});


};


//  if there is an error with the map, this message will show. 
function googleError() {
    alert("Google Maps API is currently not working right now, Please try again in a couple minutes.");
}


// Initiate the map
function initMap() {
    // Setup Error messages
    this.showGoogleMessage = ko.observable(false);
    this.show4SquareMessage = ko.observable(false);
    self.locationList = ko.observableArray([]);

    self.map = new google.maps.Map(document.getElementById('map'), {
        //Location for Washington, D.C.
        center: {
            lat: 30.316056,
            lng: -97.724944
        },
        zoom: 11,
        styles,
        styles,
        mapTypeControl: false

    });


    self.setMarker = function (data) {
        self.locationList().forEach(function (location) {
            location.marker.setVisible(false);
        });

        data.marker.setVisible(true);

        //makes markers bounce
        data.marker.setAnimation(google.maps.Animation.BOUNCE);
        setTimeout(function () {
            data.marker.setAnimation(null);
        }, 2000);
        map.setCenter(data.marker.position);
    };


    var toggleBounce = function (marker) {
        if (marker.getAnimation() !== null) {
            marker.setAnimation(null);
        } else {
            marker.setAnimation(google.maps.Animation.BOUNCE);
            setTimeout(function () {
                marker.setAnimation(null);
            }, 1000);
        }
    };


    function Mappins(marker) {
        marker.addListener('click', function () {
            populateInfoWindow(this, largeInfoWindow);
        });
    }

    this.largeInfoWindow = new google.maps.InfoWindow();

    function markerCall(marker) {
        var self = this;
        //self.setAnimation(google.maps.Animation.BOUNCE);
        this.marker.setAnimation(google.maps.Animation.BOUNCE);
        setTimeout(function () {
            self.setAnimation(null);
        }, 1400);
        populateInfoWindow(this, largeInfoWindow);
    }

    // Loop to create an array of markers on the map.
    for (var i = 0; i < Locationaustin.length; i++) {
        var markerrestaurantname = Locationaustin[i].restaurantname;
        var markerLat = Locationaustin[i].lat;
        var markerLng = Locationaustin[i].lng;
        var marker = new google.maps.Marker({
            map: map,
            position: {
                lat: markerLat,
                lng: markerLng
            },
            restaurantname: markerrestaurantname,
            id: 1,
            animation: google.maps.Animation.BOUNCE
        });
        Locationaustin[i].marker = marker;
        //animate map poimters
        marker.addListener('click', Clickers);
        Mappins(marker);
    }

    function Clickers() {
        var self = this;
        self.setAnimation(google.maps.Animation.BOUNCE);
        setTimeout(function () {
            self.setAnimation(null);
        }, 1400);
        populateInfoWindow(this, largeInfoWindow);
    }


    // applyBindings for ViewModel
    ko.applyBindings(new ViewModel());
