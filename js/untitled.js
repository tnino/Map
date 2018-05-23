
//Base code help provided by Udacity Javascript Design Patterns Course
// Model
// model for currentMarkers
var currentMarkers = [];


var go = function(tst) {
    console.log(tst)
}

// ViewModel
var ViewModel = function() {

    var self = this;

    this.filterLocation = ko.observableArray();
    self.filteredLocations = ko.observableArray();
    this.Locationaustin = ko.observableArray(Locationaustin);
    this.locationList = ko.observableArray([]);
    self.currentLocation = ko.observable(this.locationList()[0]);
    self.searchField = ko.observable('');
    self.directionField = ko.observable('');
    go(self.directionField )
    this.showLocation = ko.observable(true);

    // filter Locationaustin based on keystroke
    this.Locationaustin = ko.computed(function() {
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

        return ko.utils.arrayFilter(Locationaustin, function(location) {
            return location.restaurantname.toLowerCase().indexOf(search) >= 0;
        });

    }, this);

    // Display the marker on the map based on user click on the location list
    self.showLocation = function(location) {
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


    this.setLocation = function(clickedLocation) {
        self.currentLocation(clickedLocation);
    };


};


// Map function
var map;

//New array created for listed markers below.
self.markers = [];

var self = this;

// Add function for foursquare API
var populateInfoWindow = function(marker, infowindow) {


    if (infowindow.marker != marker) {

        infowindow.marker = marker;
        infowindow.open(map, marker);

/*
        //foursquare API
        var CLIENT_SECRET = 'aIp3dfcSRlWjIsfXU3a-3DokC2Pgy6M8541JuZDuTKgaQPBECi3iiJjVgf3cO2AiGgniBKkTPKPYPyK4fFbqksKszj6bqYhc-3qbIN-zbnaGBUh_ciydGQTDyhryWnYx';
        var CLIENT_ID = 'BsU7AeJoBHBgeCQ1E9R48g';


        var LL = '30.316056,-97.724944';  
        //var FS_URL = URL + CLIENT_ID + CLIENT_SECRET;
        var venue, address;

var settings = {
          'cache': false,
          'dataType': "jsonp",
          "async": true,
          "crossDomain": true,
          "url": "https://api.yelp.com/v3/businesses/search",
          "method": "GET",
          "headers": {
              "accept": "application/json",
              "Access-Control-Allow-Origin":"*"
          }
      }*/


      /*{
            url:'https://api.yelp.com/v3/businesses/search',
            dataType: 'json',
            data: {
                limit: '1',
                ll: LL,
                client_id: CLIENT_ID,
                client_secret: CLIENT_SECRET,
                query: marker.restaurantname
            }
         }*/

        //ajax call for data and info for foursquare
        /*$.ajax(settings).done(function(response) {
            console.log(response)
              //displays info from each location
              //create variables for content below
              var address = response.response.venues[0].location.address;
              var phonenumber = response.response.venues[0].contact.formattedPhone;
              var twitter = response.response.venues[0].contact.twitter;
              infowindow.setContent('<div>' + '<h4>' + marker.restaurantname + '</h4>' + address + '<br >' + phonenumber + '<br >' + 'Twitter:  ' + twitter + '</h4>' + '</div>');
         })

        //error for foursquare
      .fail(function(e) {
            alert("Oh No! Yelp API is currently unavailable. Please try again later.");
        });*/

  $.ajax({ 
    url: "https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch="+marker.restaurantname+"&prop=info&inprop=url&utf8=&format=json",
 
   dataType: "jsonp",
   success: function(response) {
       console.log(response.query);
       if (response.query.search.length >= 1) {
         infowindow.setContent('<div>' + '<h4>' + marker.restaurantname + '</h4> <br><p>'+response.query.search[0].snippet+'</p></div>');
       }
       else {

    alert("no se encontro ninngun sitio llamado "+ marker.restaurantname);
       }
  },
   error: function () {
    alert("Error retrieving search results, please refresh the page");
   }
 
 });



    }

    infowindow.addListener('closeclick', function() {
    });



};


    // Alerts for Map Error Messages
    function googleError() {
        alert("Google Maps API is currently unavailable. Please try again later.");
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
        styles,styles,
        mapTypeControl: false

    });
  

    self.setMarker = function(data) {
        self.locationList().forEach(function(location) {
            location.marker.setVisible(false);
        });

        data.marker.setVisible(true);

        //makes markers bounce
        data.marker.setAnimation(google.maps.Animation.BOUNCE);
        setTimeout(function() {
            data.marker.setAnimation(null);
        }, 2000);
        map.setCenter(data.marker.position);
    };


    var toggleBounce = function(marker) {
        if (marker.getAnimation() !== null) {
            marker.setAnimation(null);
        } else {
            marker.setAnimation(google.maps.Animation.BOUNCE);
            setTimeout(function() {
                marker.setAnimation(null);
            }, 1000);
        }
    };


    function markerClickActions(marker) {
        marker.addListener('click', function() {
            populateInfoWindow(this, largeInfoWindow);
        });
    }

    this.largeInfoWindow = new google.maps.InfoWindow();

    function markerCall(marker) {
        var self = this;
        //self.setAnimation(google.maps.Animation.BOUNCE);
        this.marker.setAnimation(google.maps.Animation.BOUNCE);
        setTimeout(function() {
            self.setAnimation(null);
        }, 1400);
        populateInfoWindow(this, largeInfoWindow);
    }

    //This for loop use the location array to create an array of markers on the map.
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
            animation: google.maps.Animation.DROP
        });
        Locationaustin[i].marker = marker;
        //marker.addListener calls to function below to animate and populate infowindow
        marker.addListener('click', markerClickHandler);
        markerClickActions(marker);
    }

    function markerClickHandler() {
        var self = this;
        self.setAnimation(google.maps.Animation.BOUNCE);
        setTimeout(function() {
            self.setAnimation(null);
        }, 1400);
        populateInfoWindow(this, largeInfoWindow);
    }



    // applyBindings for ViewModel
    ko.applyBindings(new ViewModel());

}
