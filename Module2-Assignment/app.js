(function(){
  'use strict';

  //declare needed controllers and service
  angular.module('ShoppingListCheckOff', [])
  .controller('toBuyController', toBuyController)
  .controller('alreadyBoughtController', alreadyBoughtController)
  .service('ShoppingListCheckOffService', ShoppingListCheckOffService);

  //inject ShoppingListCheckOffService for toBuyController
  toBuyController.$inject = ['ShoppingListCheckOffService'];
  function toBuyController(ShoppingListCheckOffService){
    var toBuyList = this;

    //get toBuyList from service
    toBuyList.items = ShoppingListCheckOffService.getToBuyList();

    //function that calls the service function that moves the selected item to boughtList
    toBuyList.buyItem = function(itemIndex){
      ShoppingListCheckOffService.buyItem(itemIndex);
    };
  }

  //inject ShoppingListCheckOffService for alreadyBoughtController
  alreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
  function alreadyBoughtController(ShoppingListCheckOffService){
    var boughtList = this;

    //get boughtList from service
    boughtList.items = ShoppingListCheckOffService.getBoughtList();

    //function that calls the service function that cancels previous transaction
    boughtList.cancelTransaction = function(itemIndex){
      ShoppingListCheckOffService.cancelTransaction(itemIndex);
    };
  }

  //service that share data and provide data manipulation function
  function ShoppingListCheckOffService(){
    var service = this;

    //toBuyList is used to store predefined list of items you can buy
    var toBuyList = [{name: 'banana', quantity: 10},
                     {name: 'apple', quantity: 20},
                     {name: 'grape', quantity: 30},
                     {name: 'watermelon', quantity: 5},
                     {name: 'strawberry', quantity: 40}];
    //boughtList is used to show the items you have bought
    var boughtList = [];

    service.getToBuyList = function(){
      return toBuyList;
    };

    service.getBoughtList = function(){
      return boughtList;
    };

    //buyItem function moves the selected item from toBuyList to boughtList
    service.buyItem = function(itemIndex){
      var item = {};
      item.name = toBuyList[itemIndex].name;
      item.quantity = toBuyList[itemIndex].quantity;
      boughtList.push(item);
      toBuyList.splice(itemIndex, 1);
    };

    //cancelTransaction function moves the selected item from boughtList to toBuyList
    service.cancelTransaction = function(itemIndex){
      var item = {};
      item.name = boughtList[itemIndex].name;
      item.quantity = boughtList[itemIndex].quantity;
      toBuyList.push(item);
      boughtList.splice(itemIndex, 1);
    };
  }

})()
