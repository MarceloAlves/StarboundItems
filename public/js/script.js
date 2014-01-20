function ItemListCtrl($scope, $http) {
    $http.get('items.json').success(function(data) {
    $scope.items = data.items;
  });
}