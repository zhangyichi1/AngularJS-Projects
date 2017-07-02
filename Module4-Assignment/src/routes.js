(function(){
  'use strict';

  angular.module('MenuApp')
  .config(RoutesConfig);

  RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
  function RoutesConfig($stateProvider, $urlRouterProvider){
    //set up default state url
    $urlRouterProvider.otherwise('/');

    //declare the $stateProvider
    $stateProvider

    //home state
    .state('home', {
      url: '/',
      templateUrl: "src/data/templates/home.template.html"
    })

    //state for categories
    .state('categories', {
      url: '/my-categories',
      templateUrl: "src/data/templates/categories.template.html",
      controller: "CategoriesController as categories",
      resolve: {
        myCategories: ['MenuDataService', function(MenuDataService){
          return MenuDataService.getAllCategories();
        }]
      }
    })

    //state for items
    .state('items', {
      url: '/my-items/{catShortName}',
      templateUrl: "src/data/templates/items.template.html",
      controller: "ItemsController as items",
      resolve: {
        myItems: ['$stateParams', 'MenuDataService', function($stateParams, MenuDataService){
          return MenuDataService.getItemsForCategory($stateParams.catShortName);
        }]
      }
    })
  }

})()
