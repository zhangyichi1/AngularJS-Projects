(function(){
  'use strict';

  //declare the categories component which
  //contains the html content for displaying categories
  angular.module('MenuApp')
  .component('categoriesComponent', {
    templateUrl: 'src/data/templates/categories.component.template.html',
    bindings: {
      categories: '<'
    }
  });

})()
