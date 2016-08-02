var myApp;
myApp = angular.module('myApp', ['ngRoute', 'ngResource']);

myApp.config(function($routeProvider){
  $routeProvider 

    .when('/templateForm', {
      templateUrl : './templates/templateForm.html',
      controller : 'templateFormController'
    })

  .when('/templateAttendees', {
    templateUrl : './templates/templateAttendees.html',
    controller : 'templateAttendeesController'
  })

  .otherwise( {
    templateUrl : './templates/mainTemplate.html',
    controller : 'mainTemplateController'
  });

});


myApp.service('tempStorageService', function(){
  /* Object array to store and represent data */ 
  this.storageObjArray = 
    [
    {         
      "firstName": "Mikko",
      "lastName": "Karaiste",
      "email": "mikko.karaiste@gmail.com",
      "diet": "fish",
      "sauna": true
    },
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

  this.infoText = "We have an awesome event on 1st of September at Lutakko aukio!";
  this.buttonText = "Go ahead and register!";




  });


myApp.controller('mainController', function($scope){
  $scope.title = 'main';
});

myApp.controller('templateFormController', function($scope, $log, $location, tempStorageService){
  $scope.title = 'Register to ROCK!';

  $scope.register = function(){
    tempStorageService.storageObjArray.push($scope.reg);
    $location.path('/templateAttendees');
  };
});

myApp.controller('templateAttendeesController', function($scope, tempStorageService){
  $scope.title = 'These people have registered to ROCK!';

  $scope.persons = tempStorageService.storageObjArray;
  for (var person in tempStorageService.storageObjArray){
    if (tempStorageService.storageObjArray[person].sauna === true){
      $scope.persons[person].sauna = "Yes!";
    } else {
      $scope.persons[person].sauna = "No..."; 
    }
  }
});

myApp.controller('mainTemplateController', function($scope, tempStorageService){
  $scope.title = 'A ROCKing event';
  $scope.info = tempStorageService.infoText;
  $scope.btnText = tempStorageService.buttonText;
});







