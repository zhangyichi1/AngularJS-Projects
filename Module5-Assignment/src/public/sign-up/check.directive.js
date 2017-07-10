(function(){
'use strict';

angular.module('public')
.directive('checkDirective', CheckDirective);

CheckDirective.$inject = ['MenuService'];
function CheckDirective(MenuService){
  return {
    require: 'ngModel',
    link: function(scope, element, attr, ctrl){
      ctrl.$parsers.unshift(function(value){
        var item = MenuService.getMenuItem(value);
        item.then(function(response){
          // console.log('im in if', response);
          ctrl.$setValidity('itemExists', true);
        }).catch(function(response){
          // console.log('im in else', response);
          ctrl.$setValidity('itemExists', false);
        })
        // console.log(item);


        // if(value === 'A1'){
        //   console.log("Im in if");
        //   ctrl.$setValidity('itemExists', true);
        // }else{
        //   console.log("Im in else");
        //   ctrl.$setValidity('itemExists', false);
        // }
        return value;
      });

      // function myValidation(value){
      //   if(value == 'A1'){
      //     signUpCtrl.$setValidity("itemExists", true);
      //   }else{
      //     signUpCtrl.$setValidity("itemExists", false);
      //   }
      //   return value
      // }
      // signUpCtrl.$parsers.push(myValidation);
    }
  }
}

})()
