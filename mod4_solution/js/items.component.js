(function () {
'use strict';

angular.module('data')
.component('itemsData', {
  templateUrl: 'snippet/items.html',
  bindings: {
    items: '<'
  }
});

})();
