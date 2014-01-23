app.factory('StarboundItems', function ($http) {
    var StarboundItems = {};
    $http.get('items.json').success(function(data) {
    StarboundItems.items = data.items;
  });
    return StarboundItems;
});

app.controller('itemlistCtrl', function($scope, StarboundItems) {
    $scope.starbound = StarboundItems;

    $scope.viewList = 'false';
});