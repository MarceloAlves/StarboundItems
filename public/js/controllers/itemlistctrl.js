app.controller('itemlistCtrl', function($scope, $http, $timeout) {
  $scope.searchText = null;
  $scope.nightly = true;
  $scope.change = function(text) {
      valtosend = $scope.searchText;
      nightly = $scope.nightly ? 'nightly/' : ''
      $http.get('http://starbounditems.herokuapp.com/api/search/'+ nightly + valtosend).then(function(result){
          $scope.entries = result.data;
      });
    };
});