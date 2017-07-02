(function(){
  'use strict';

  //This is the controller for Categories, it
  //creates a variable and copy the value of
  //passed in argument to it. The argument is
  //from routes.js, state categories.
  angular.module('MenuApp')
  .controller('CategoriesController', CategoriesController);

  CategoriesController.$inject = ['myCategories'];
  function CategoriesController(myCategories){
    var categories = this;
    categories.myCategories = myCategories;
  }
})()
