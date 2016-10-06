(function () {
'use strict';

angular.module('data')
.component('categoriesData', {
  templateUrl: 'snippet/categories.html',
  bindings: {
    categories: '<'
  }
});

})();
