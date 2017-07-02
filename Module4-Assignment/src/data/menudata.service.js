(function(){
  'use strict';

  angular.module('Data')
  .service('MenuDataService', MenuDataService);


  MenuDataService.$inject = ['$http'];
  function MenuDataService($http){
    var service = this;

    //this function retrieves content of all categories
    //from the url below and return a promise where
    //the content data is wrapped inside
    service.getAllCategories = function(){
      return $http({
        method: "GET",
        url: "https://davids-restaurant.herokuapp.com/categories.json"
      }).then(function(response){
        return response.data;
      })
    };

    //this function retrieves content of all menu items
    //from the url where we attach the short name of category
    //at the end, and then it returns a promise where the
    //content data is wrapped inside. The short name of category
    //is passed into the function from categories.component.template.html
    service.getItemsForCategory = function(categoryShortName){
      return $http({
        method: "GET",
        url: "https://davids-restaurant.herokuapp.com/menu_items.json?category=" + categoryShortName
      }).then(function(response){
        return response.data.menu_items;
      })
    };
  }
})()
