(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.directive('foundItems',FoundItemsDirective)
.constant('ApiBasePath', 'https://davids-restaurant.herokuapp.com/menu_items.json');

function FoundItemsDirective(){
  var ddo = {
    templateUrl: 'loader/foundItems.html',
    scope: {
      items : '<',
      onRemove : '&'
    },
    controller: NarrowItDownController,
    controllerAs: 'list',
    bindToController: true
  };

  return ddo;
}

// function NarrowItDownDirectiveController() {}

NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService){
  var narrow = this;

  narrow.searchTerm;
  narrow.found = [];

  narrow.search = function (searchTerm) {
    MenuSearchService.getMatchedMenuItems(searchTerm)
      .then(function (answer) {
        narrow.found = answer;
        // console.log("narrow.found in the search function");
        // console.log(narrow.found);
      })
      .catch(function (error) {
        console.log("une erreur est survenu durant search()");
      });
  };

  narrow.removeItem = function (itemIndex){
    // this.lastRemoved = "Last item removed was " + narrow.found[itemIndex].name;
    narrow.found.splice(itemIndex, 1);
  };
}

MenuSearchService.$inject =['$http', 'ApiBasePath'];
function MenuSearchService($http, ApiBasePath) {
  var service = this;

  service.getMatchedMenuItems = function (searchTerm){
    return $http({
      method: "GET",
      url: ApiBasePath,
      params: {
        category: searchTerm
      }
    }).then(function result(response){
      // process result and only keep items that match
      var foundItems = new Array();

      // I use a log to understand my object and after i precise what i will show
      var preFoundItems = response.data.menu_items;
      for (var i = 0; i < preFoundItems.length; i++) {
        foundItems.push(preFoundItems[i]);
      }

      //soluce on the forum
      // foundItems = response.data.menu_items.filter(function (item) {
      //   return item.description.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1;
      // }, service);;

      // console.log("result in the http");
      // console.log(foundItems);

      // return processed items
      return foundItems;

    }).catch(function boob(error){
      console.log("An error happen during the http get method");
    });
  };

}

})();
