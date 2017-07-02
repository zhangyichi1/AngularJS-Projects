(function(){
  'use strict';

  //This is the controller for Items, it
  //creates a variable and copy the value of
  //passed in argument to it. The argument is
  //from routes.js, state items.
  angular.module('MenuApp')
  .controller('ItemsController', ItemsController);

  ItemsController.$inject = ['myItems'];
  function ItemsController(myItems){
    var items = this;
    items.myItems = myItems;
  }
})()
