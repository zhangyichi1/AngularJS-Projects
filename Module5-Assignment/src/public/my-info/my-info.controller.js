(function(){
'use strict';

angular.module('public')
.controller('MyInfoController', MyInfoController);

MyInfoController.$inject = ['userInfo', 'ApiPath', 'MenuService'];
function MyInfoController(userInfo, ApiPath, MenuService){
  var myInfoCtrl = this;
  myInfoCtrl.userInfo = userInfo;
  myInfoCtrl.basePath = ApiPath;
  // console.log("myInfoCtrl.userInfo: ", myInfoCtrl.userInfo);

  if(myInfoCtrl.userInfo.firstName !== undefined){
    myInfoCtrl.signedUp = true;

    var promise = MenuService.getMenuItem(myInfoCtrl.userInfo.favoriteDish);
    promise.then(function(response){
      // console.log('im in MyInfoController, response: ', response);
      myInfoCtrl.item = response;

      if(myInfoCtrl.item.price_small !== null){
        myInfoCtrl.item.price_small = "$" + myInfoCtrl.item.price_small;
      }
      if(myInfoCtrl.item.price_large !== null){
        myInfoCtrl.item.price_large = "$" + myInfoCtrl.item.price_large;
      }
    });
  }else{
    myInfoCtrl.signedUp = false;
  }




}

})()
