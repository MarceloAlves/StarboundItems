app.controller('itemlistCtrl', function($scope, $http, $timeout, $firebaseObject) {
  $scope.searchText = null;
  $scope.change = function(text) {
      valtosend = $scope.searchText;
      $http.get(window.location.origin + '/api/search/' + valtosend).then(function(result){
          $scope.entries = result.data;
      });
    };

  var ref = new Firebase("https://starbounditems.firebaseio.com");

  $scope.firebase = $firebaseObject(ref);
});
