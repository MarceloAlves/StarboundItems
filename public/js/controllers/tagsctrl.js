app.controller('tagsCtrl', function($scope, $http, $timeout) {
  $scope.tagSelect = null;
  $scope.selectAction = function(text) {
      valtosend = $scope.tagSelect;
      $http.get(window.location.origin + '/api/tags/' + valtosend).then(function(result){
          $scope.entries = result.data;
      });
    };
});
