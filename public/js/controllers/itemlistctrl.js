app.controller('itemlistCtrl', function($scope, $http, $timeout) {
  $scope.searchText = null;
  $scope.change = function(text) {
      valtosend = $scope.searchText;
      $http.get('http://starbounditems.herokuapp.com/api/search/' + valtosend).then(function(result){
          $scope.entries = result.data;
      });
    };
});