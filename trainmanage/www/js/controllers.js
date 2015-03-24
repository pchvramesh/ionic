angular.module('starter.controllers', [])

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

.controller('PlaylistCtrl', function($scope, $stateParams) {
        console.log($stateParams);
})
.controller('pnrlist',['$scope','$cordovaSQLite',function(a,b){
        var db = b.openDB("main.db");
        var query = "select name from sqlite_master where type='table' and name = 'pnr_table'";
        var queryCheck = b.execute(db, query,[]).then(function(res){
            if(res.rows.length > 0){
                var query = "insert into pnr_table values(?)";
                b.execute(db,query,['ramesh']).then(function(res){
                    //a.inserted = true;
                    console.log("Insert Success "+res);
                    var query = "select * from pnr_table";
                    b.execute(db,query,[]).then(function(res){
                        if(res.rows.length > 0) {
                            console.log(res.rows.item[0]);
                            /*var data = [];
                            angular.forEach(res.rows,function(i,res){
                                var arr = {};
                                arr.name = res.item.name;
                                data.push(arr);
                            });*/
                        }
                        a.items = data;
                        console.log("Select Success "+data);
                    },function(err){
                        console.log("Select Error");
                    });
                },function(err){
                    //a.inserted = false;
                    console.log("Insert Failed");
                });
            }
            else{
                var query = "create table pnr_table('name varchar(128)')";
                b.execute(db,query).then(function(res){
                    //a.created = "true";
                    console.log("Create Success");
                },function(err){
                    console.log("Create failed");
                    //a.created = "eroor"
                });
            }
        },function(err){
            a.errdetails = err;
        });
    }]);
