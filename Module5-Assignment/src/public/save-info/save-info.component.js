(function(){
'use strict';

angular.module('common')
.component('saveInfo', {
  templateUrl: 'src/public/save-info/save-info.html',
  controller: SaveInfoController
});


SaveInfoController.$inject = ['$rootScope'];
function SaveInfoController($rootScope){
  var $ctrl = this;
  var cancelListener;

  $ctrl.$onInit = function(){
    $ctrl.showMsg = false;
    cancelListener = $rootScope.$on('sign-up:savingUserInfo', function(event, data){
      $ctrl.showMsg = data.saved;
    })
  }


  $ctrl.$onDestroy = function(){
    cancelListener();
  }
}

})()
