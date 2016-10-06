(function () {
'use strict';

angular.module('data')
.service('MenuDataService', MenuDataService);

MenuDataService.$inject = ['$https'];
function MenuDataService($https) {
  service = this;

  //return a promise with all categories
  service.getAllCategories = function () {
    console.log("Start all category");
    var deferred = $q.defer();

    $https({
      method: 'GET',
      url: 'https://davids-restaurant.herokuapp.com/categories.json'
    })
    .then(function(result){
      deferred.resolve(result.data);
    });

    return deferred.promise;
  };

  //return a promise with all items in a categories
  service.getItemsForCategory = function (categoryShortName) {

    //if categoryShortName is not defined

    //the https returned
    return $https({
      method: 'GET',
      url: 'https://davids-restaurant.herokuapp.com/menu_items.json',
      params: {
        category: categoryShortName
      }
    });

  };

}

})();
