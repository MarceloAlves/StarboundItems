angular.module('starboundItems')
.controller('itemlistCtrl', function($scope, $http) {
    $http.get('items.json').success(function(data) {
    $scope.items = data.items;
  });
});