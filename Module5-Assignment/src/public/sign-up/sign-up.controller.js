(function () {
"use strict";

angular.module('public')
.controller('SignUpController', SignUpController);

SignUpController.$inject = ['$rootScope','MenuService','menuCategories'];
function SignUpController($rootScope, MenuService, menuCategories) {
  var $ctrl = this;
  $ctrl.menuCategories = menuCategories;

  $ctrl.onInit = function(){
    $rootScope.$broadcast('sign-up:savingUserInfo', {saved: false});
  }

  $ctrl.submit = function(){
    if($ctrl.user.firstName !== undefined && $ctrl.user.lastName !== undefined
      && $ctrl.user.email !== undefined && $ctrl.user.phone !== undefined
      && $ctrl.user.favoriteDish !== undefined){

      MenuService.setUserInfo($ctrl.user);

      $rootScope.$broadcast('sign-up:savingUserInfo', {saved: true});
    }else{
      console.log("user is undefined!");
    }
  }

  }
}

)();
