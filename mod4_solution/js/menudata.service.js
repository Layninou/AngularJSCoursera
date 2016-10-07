(function () {
'use strict';

angular.module('data')
.service('MenuDataService', MenuDataService);

MenuDataService.$inject = ['$http', '$q'];
function MenuDataService($http, $q) {
  var service = this;

  //return a promise with all categories
  service.getAllCategories = function () {
    console.log("start the service all categories");
    var deferred = $q.defer();

    $http({
      method: 'GET',
      url: 'https://davids-restaurant.herokuapp.com/categories.json'
    })
    .then( function (result) {
      deferred.resolve(result.data);
      console.log("And the result is :");
      console.log(result.data);
    });

    console.log(deferred.promise);
    return deferred.promise;
  };

  //return a promise with all items in a categories
  service.getItemsForCategory = function (categoryShortName) {
    console.log("start the service items in categories");
    console.log("the choice is : " + categoryShortName);
    var deferred = $q.defer();
    //if categoryShortName is not defined

    //the https returned
    $http({
      method: 'GET',
      url: 'https://davids-restaurant.herokuapp.com/menu_items.json',
      params: {
        category: categoryShortName
      }
    })
    .then( function (result) {
      deferred.resolve(result.data.menu_items);
      console.log("And the result is :");
      console.log(result.data);
    });

    console.log(deferred.promise);
    return deferred.promise;
  };

}

})();
