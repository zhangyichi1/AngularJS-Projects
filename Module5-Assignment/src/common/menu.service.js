(function () {
"use strict";

angular.module('common')
.service('MenuService', MenuService);


MenuService.$inject = ['$http', '$q', 'ApiPath'];
function MenuService($http, $q, ApiPath) {
  var service = this;

  var userInfo;

  service.getCategories = function () {
    return $http.get(ApiPath + '/categories.json').then(function(response){
      return response.data;
    });
  };

  service.getMenuItems = function (category) {
    var config = {};
    if (category) {
      config.params = {'category': category};
    }

    return $http.get(ApiPath + '/menu_items.json', config).then(function (response) {
      return response.data;
    });
  };

  service.getMenuItem = function(shortName){
    // https://YOUR-CHOSEN-SUBDOMAIN.herokuapp.com/menu_items/SHORT-NAME.json
    var  config = {};
    if(shortName){
      config.params = {'shortName': shortName};
    }
    return $http.get(ApiPath + '/menu_items/' + shortName + '.json').then(function(response){
      return response.data;
    })
  }


  service.setUserInfo = function(myInfo){
    userInfo = myInfo;
  }

  service.getUserInfo = function(){
    // console.log("im here");
    var promise = getPromise();

    return promise.then(function(result){
      return result;
    }).catch(function(result){
      // console.log(result.massege);
      return result;
    });
  }

  function getPromise(){

    var deferred = $q.defer();

    if(userInfo !== undefined){
      deferred.resolve(userInfo);
    }else{
      userInfo = {
        massege: "Not Sign Up Yet. Sign Up Now!"
      }
      deferred.reject(userInfo);
    }
    // console.log("im here2");
    return deferred.promise;
  }
}


})();
