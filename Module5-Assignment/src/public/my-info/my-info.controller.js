(function(){
'use strict';

angular.module('public')
.controller('MyInfoController', MyInfoController);

MyInfoController.$inject = ['userInfo'];
function MyInfoController(userInfo){
  var myInfoCtrl = this;
  myInfoCtrl.userInfo = userInfo;
  console.log("myInfoCtrl.userInfo", myInfoCtrl.userInfo);

  if(myInfoCtrl.userInfo.firstName !== undefined){
    myInfoCtrl.signedUp = true;
  }else{
    myInfoCtrl.signedUp = false;
  }
}

})()
