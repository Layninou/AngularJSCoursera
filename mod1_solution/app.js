(function (){
'use strict';

angular.module('LunchCheck', [])
.controller('LunchCheckController', LunchCheckController);

LunchCheckController.$inject = ['$scope', '$filter'];
function LunchCheckController($scope, $filter) {
  $scope.msg = "Check If Too Much";
  $scope.items = "";

  $scope.checkApp = function () {
      if ($scope.items = ""){
        $scope.msg = "Please enter data first";
      }
      else{
        var itemsList = $scope.items.split(",");
        console.log(itemsList);
        if (itemsList.length <= 3){$scope.msg = "Enjoy!";}
        else {$scope.msg ="Too Much!";}
      }
  };
};

})();
