(function(){
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.directive('foundItems', FoundItems);

//custom directive that handles representation of found items
function FoundItems(){
  var ddo = {
    templateUrl: 'menuList.html',
    scope: {
      itemList: '<', //bind itemList to the list in the NarrowItDownController
      onRemove: '&' //use reference binding for invoking the removeItem method in the NarrowItDownController
    },
    controller: FoundItemsController,
    controllerAs: 'items',
    bindToController: true //bind the attributes to directive controller
  };

  return ddo;
}

//directive controller
function FoundItemsController(){
  var items = this;

  //function that checks whether we should print msg "Nothing found"
  items.checkForFound = function(){
    return items.itemList !== "Nothing found";
  }
}


//Main controller, responsible for retrieving data and remove items for found list
NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService){
  var narrowItDownController = this;
  narrowItDownController.searchTerm = "";

  //function that retrieves data by using menuSearchService.getMatchedMenuItems()
  //and use the result promise to bind list variable with returned data
  //set list to "Nothing found" if theres no input or no matching item found
  narrowItDownController.narrowDown = function(){
    if(!narrowItDownController.searchTerm.replace(/\s/g, '').length){
      narrowItDownController.list = "Nothing found";
    }else{
      MenuSearchService.getMatchedMenuItems(narrowItDownController.searchTerm).then(function(data){
        if(data.length !== 0){
          narrowItDownController.list = data;
        }else {
          narrowItDownController.list = "Nothing found";
        }
      }).catch(function(error){
        console.log(error);
      });
    }
  }

  //function that removes an item from list
  narrowItDownController.removeItem = function(index){
    narrowItDownController.list.splice(index, 1);
  }
}


//service that retrieves data from provided url, and return a promise with
//$http service
MenuSearchService.$inject = ['$http'];
function MenuSearchService($http){
  var menuSearchService = this;

  menuSearchService.getMatchedMenuItems = function(searchTerm){
    return $http({
      method: "GET",
      url: "https://davids-restaurant.herokuapp.com/menu_items.json"
    }).then(function(response){
      var data = response.data.menu_items; //returned data, which is an array of objects
      var result = []; //result array that is going to store the matching items
      //check whether each item's description contains the searchTerm
      //if yes, add it to the result array
      for(var i=0; i<data.length; i++){
        if(data[i].description.toLowerCase().indexOf(searchTerm) !== -1){
          result.push(data[i]);
        }
      }
      // console.log(response.data);
      return result;
    }).catch(function(error){
      console.log(error);
    })
  }
}
})()
