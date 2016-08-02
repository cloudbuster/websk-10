// Creating module myApp, which can be called with ng-app="myApp" in the view (index.html)
var myApp = angular.module('myApp', ['ngRoute', 'ngResource']);

// Configuring routing with routeprovider service
myApp.config(function($routeProvider){
  $routeProvider 

    // When user clicks on "#templateForm" in the view, url bind to a controller opens
    // to the view.
    .when('/templateForm', {
      templateUrl : './templates/templateForm.html',
      controller : 'templateFormController'
    })

  .when('/templateAttendees', {
    templateUrl : './templates/templateAttendees.html',
    controller : 'templateAttendeesController'
  })

  // When user click doesn't match a fallback url and controller will be opened
  // in this case they are also opened when the app is executed ()
  .otherwise( {
    templateUrl : './templates/mainTemplate.html',
    controller : 'mainTemplateController'
  });
});

// Creating custom service for storing and calling data.
// There exists a mockup object array to which user inputted
// date is pushed.
myApp.service('tempStorageService', function(){
  /* Object array to store, add and call data */ 
  this.storageObjArray = 
    [
    {
      "firstName": "Herkko",
      "lastName": "Makkonen",
      "email": "makkonen22@gmail.com",
      "diet": "meat",
      "sauna": true
    },
    {
      "firstName": "Maija",
      "lastName": "Maukonen",
      "email": "maija.maukonen@outlook.com",
      "diet": "fish",
      "sauna": true
    },
    {
      "firstName": "Mervi",
      "lastName": "Laulavainen",
      "email": "merla@yahoo.com",
      "diet": "vegetarian",
      "sauna": false
    },
    {
      "firstName": "Jussi",
      "lastName": "Turunen",
      "email": "jussi.turunen@luukku.com",
      "diet": "meat",
      "sauna": true
    },
    {
      "firstName": "Günther",
      "lastName": "Bösebuben",
      "email": "guenther.boeseboeben@gmx.de",
      "diet": "fish",
      "sauna": true
    },
    {
      "firstName": "Erkki",
      "lastName": "Lasinen",
      "email": "erkki62@hotmail.com",
      "diet": "meat",
      "sauna": false
    },
    {
      "firstName": "Rauli",
      "lastName": "Hiironen",
      "email": "rauli-hiironen@gmail.com",
      "diet": "fish",
      "sauna": true
    },
    {    
      "firstName": "Paula",
      "lastName": "Viitaniemi",
      "email": "paula.viitaniemi@jamk.fi",
      "diet": "vegetarian",
      "sauna": false
    }
  ];

  // Some text that could be on a sole controller, but are here for testing the service.
  this.infoText = "We have an awesome event on 1st of September at Lutakko aukio!";
  this.buttonText = "Go ahead and register!";
});

// Creating custom filter to transform boolean data into user readable words.
myApp.filter('bool2words', function(){
  return function(x){
    if (x == true){
      return "Yes!";
    } else if (x == false){
      return "No..."; 
    } else {
      return "No...";
    }
  };
});

// Creating filter to capitalize the first letter of dietary options that would otherwise
// be all lowercase. 
myApp.filter('capitalize', function(){
  return function(x){
    var tempString = x[0].toUpperCase();
    for (var i = 1; i < x.length; i += 1){
       tempString += x[i];
    }
    return tempString;
  };
});

// Main controller is somewhat obsolete, the other controllers are nested withing the main
// controller. 
myApp.controller('mainController', function($scope){
  $scope.title = 'main';
});

// Controller for form, where user inputs data. register function takes in user input, pushes it
// to tempStorageService.storageObjArray object array.
// $location service is used to route user to templateAttendees.
// There are some controller/template specific messages used as headings ie. $scope.title
myApp.controller('templateFormController', function($scope, $log, $location, tempStorageService){
  $scope.title = 'Register to ROCK!';
  $scope.register = function(){
    tempStorageService.storageObjArray.push($scope.reg);
    $location.path('/templateAttendees');
  };
});

// The injected tempStorageService.storageObjArray is handed over to $scope.persons 
// and iterated in the view with ng-route, with custom filters.
myApp.controller('templateAttendeesController', function($scope, tempStorageService){
  $scope.title = 'These people have registered to ROCK!';
  $scope.persons = tempStorageService.storageObjArray;
});

// Just some scopes to be shown for the user at mainTemplate which is controlled by
// mainTemplateController. Nothing fancy here.
myApp.controller('mainTemplateController', function($scope, tempStorageService){
  $scope.title = 'A ROCKing event';
  $scope.info = tempStorageService.infoText;
  $scope.btnText = tempStorageService.buttonText;
});







