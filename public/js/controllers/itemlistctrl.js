app.controller('itemlistCtrl', function($scope, $http, $timeout) {
  $scope.searchText = null;
  $scope.nightly = false;
  $scope.change = function(text) {
      valtosend = $scope.searchText;
      nightly = $scope.nightly ? 'nightly/' : ''
      $http.get('http://localhost:9393/api/search/'+ nightly + valtosend).then(function(result){
          $scope.entries = result.data;
      });
    };
});