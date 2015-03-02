angular.module('starter.controllers', [])
.filter('capetalize',function(){
    return function(input){
        if(input){
            //return input[0].toUpperCase()+input.slice(1);
            return input.charAt(0).toUpperCase() + input.substring(1);
        }
    }
})
.controller('AppCtrl', function($scope, $ionicModal, $timeout) {
  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})
.controller('get_pnrstatus',function($scope,$http){
    $scope.getStatus = function(num){
        var reque = {
            method:'GET',
            url:'https://indianrailways.p.mashape.com/index.php?pnr='+$scope.pnrNumber,
            headers:{
                "X-Mashape-Key":"kl2P3r2rbrmshugs8cgFg5mHahFsp1zmvGSjsnHmSbcNOLqzfo",
                "Accept":"application/json"
            }
        }
        $http(reque).success(function(data){
            $scope.result = data;
            $scope.status = false;
        }).error(function(data){
            $scope.error = data;
            console.log(data);
        });
    }
})
.controller('dictionary',function($scope,$http,$rootScope){
    $scope.getMeaning = function(word){
        var url = "https://api.pearson.com/v2/dictionaries/wordwise/entries?headword="+$scope.dicWord+"&limit=20";
        //'https://montanaflynn-dictionary.p.mashape.com/define?word='+$scope.dicWord
        $rootScope.loading = false;
        var reque = {
            method:'GET',
            url:url,
            headers:{
                //"X-Mashape-Key":"kl2P3r2rbrmshugs8cgFg5mHahFsp1zmvGSjsnHmSbcNOLqzfo",
                "Accept":"application/json"
            }
        }
        $http(reque).success(function(data){
            $scope.result=data;
            console.log(data);
            $scope.status = false;
            //$rootScope.loading = true;    
            
        }).error(function(data){
            console.log(data);
        });
    }
})
.controller('get_stationCode',function($scope,$http,$rootScope){
    $scope.getCode = function(word){
        $rootScope.loading = false;
        var reque = {
            method:'GET',
            url:'https://indianrailways.p.mashape.com/findstations.php?station='+$scope.stationName,
            headers:{
                "X-Mashape-Key":"kl2P3r2rbrmshugs8cgFg5mHahFsp1zmvGSjsnHmSbcNOLqzfo",
                "Accept":"application/json"
            }
        }
        $http(reque).success(function(data){
            $scope.result=data;
            console.log(data);
            $scope.status = false;
            $rootScope.loading = true;    
            
        }).error(function(data){
            console.log(data);
        });
    }
})
.controller('PlaylistCtrl', function($scope, $stateParams) {
});
