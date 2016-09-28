(function () {
'use strict';

//List of items at the beginning
//I believe it will be an improvement if we use jquery and a .json..
//will make it another time... maybe
var items = [
  {name: "shirts",  quantity: 12},
  {name: "pants",   quantity: 2},
  {name: "coat",    quantity: 1},
  {name: "dresses", quantity: 3},
  {name: "shorts",  quantity: 4},
  {name: "skirts",  quantity: 7},
  {name: "diet cookies", quantity: 10}
];

angular.module("ShoppingListCheckOff", [])
.controller('ToBuyShoppingController',ToBuyShoppingController)
.controller('AlreadyBoughtShoppingController',AlreadyBoughtShoppingController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

ToBuyShoppingController.$inject = ['ShoppingListCheckOffService'];
function ToBuyShoppingController(ShoppingListCheckOffService) {
  var itemToBuy = this;

  itemToBuy.items = ShoppingListCheckOffService.getItemsToBuy();

  itemToBuy.giveItem = function (itemIndex){
    ShoppingListCheckOffService.giveItem(itemIndex);
  };

  itemToBuy.message = function () {
    return itemToBuy.items.length === 0;
  };
}

AlreadyBoughtShoppingController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtShoppingController(ShoppingListCheckOffService) {
  var itemBought = this;

  itemBought.items = ShoppingListCheckOffService.getItemsBought();

  itemBought.message = function () {
    return itemBought.items.length === 0;
  };
}

function ShoppingListCheckOffService() {
  var service = this;

  // List of shopping items
  var itemsToBuy = items;
  var itemsBought = [];

  //Add item on the list of items Bought and splice the item of the list to Buy
  service.giveItem = function (itemsIndex) {
    itemsBought.push(itemsToBuy[itemsIndex]);
    itemsToBuy.splice(itemsIndex, 1);
  };

  //Give the list of item to Buy
  service.getItemsToBuy = function () {
    return itemsToBuy;
  };

  //Give the list of item Bought
  service.getItemsBought = function () {
    return itemsBought;
  };

  service.hasNoItemBuy = function (listOfItems) {
    if (listOfItems.length == 0) {
      console.log("hasNoItemBuy is true");
      return true;
    }
    else {
      console.log("hasNoItemBuy is false");
      return false;
    }
  };
}

})();
