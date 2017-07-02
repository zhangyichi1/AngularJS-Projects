(function(){
  'use strict';

  //declare the item component which
  //contains the html content for displaying items
  angular.module('MenuApp')
  .component('itemsComponent', {
    templateUrl: 'src/data/templates/items.component.template.html',
    bindings: {
      items: '<'
    }
  });

})()
