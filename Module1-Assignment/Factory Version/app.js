(function(){
  'use strict';

  //declare needed controllers and service
  angular.module('ShoppingListCheckOff', [])
  .controller('toBuyController', toBuyController)
  .controller('alreadyBoughtController', alreadyBoughtController)
  .factory('ShoppingListCheckOffServiceFactory', ShoppingListCheckOffServiceFactory);

  //inject ShoppingListCheckOffService for toBuyController
  //toBuyController.$inject = ['ShoppingListCheckOffServiceFactory'];
  function toBuyController(ShoppingListCheckOffServiceFactory){
    var toBuyList = this;

    //get toBuyList from service
    toBuyList.items = ShoppingListCheckOffServiceFactory.getToBuyList();

    //function that calls the service function that moves the selected item to boughtList
    toBuyList.buyItem = function(itemIndex){
      ShoppingListCheckOffServiceFactory.buyItem(itemIndex);
	  //console.log(ShoppingListCheckOffServiceFactory);
    };
  }

  //inject ShoppingListCheckOffService for alreadyBoughtController
  //alreadyBoughtController.$inject = ['ShoppingListCheckOffServiceFactory'];
  function alreadyBoughtController(ShoppingListCheckOffServiceFactory){
    var boughtList = this;

	//console.log(ShoppingListCheckOffServiceFactory);
    //get boughtList from service
    boughtList.items = ShoppingListCheckOffServiceFactory.getBoughtList();

    //function that calls the service function that cancels previous transaction
    boughtList.cancelTransaction = function(itemIndex){
      ShoppingListCheckOffServiceFactory.cancelTransaction(itemIndex);
    };

  }

  //service that share data and provide data manipulation function
  function ShoppingListCheckOffServiceFactory(){
    var service = {};

    //toBuyList is used to store predefined list of items you can buy
    service.toBuyList = [{name: 'banana', quantity: 10},
						 {name: 'apple', quantity: 20},
						 {name: 'grape', quantity: 30},
						 {name: 'watermelon', quantity: 5},
						 {name: 'strawberry', quantity: 40}];
    //boughtList is used to show the items you have bought
    service.boughtList = [];

    service.getToBuyList = function(){
      return service.toBuyList;
    };

    service.getBoughtList = function(){
      return service.boughtList;
    };

    //buyItem function moves the selected item from toBuyList to boughtList
    service.buyItem = function(itemIndex){
      var item = {};
      item.name = service.toBuyList[itemIndex].name;
      item.quantity = service.toBuyList[itemIndex].quantity;
      service.boughtList.push(item);
      service.toBuyList.splice(itemIndex, 1);
    };

    //cancelTransaction function moves the selected item from boughtList to toBuyList
    service.cancelTransaction = function(itemIndex){
      var item = {};
      item.name = service.boughtList[itemIndex].name;
      item.quantity = service.boughtList[itemIndex].quantity;
      service.toBuyList.push(item);
      service.boughtList.splice(itemIndex, 1);
    };
	return service;
  }

})()
