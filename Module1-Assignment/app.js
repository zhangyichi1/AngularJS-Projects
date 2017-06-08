(function(){
  'use strict';

  //create angular module and controller
  angular.module('LunchCheck', [])
  .controller('LunchCheckController', LunchCheckController);

  //protect code from minification by using $inject
  LunchCheckController.$inject = ['$scope'];
  //main controller
  function LunchCheckController($scope){
    //declares variables
    //input is the string from user
    $scope.input = "";
    //output is the result displayer after user clicks on the button
    $scope.output = "";
    //fontColor is used to change the color of output string based on result
    $scope.fontColor = {};
    //borderColor is used to change the color of text box border based on result
    $scope.borderColor = {};

    //function that is called when user clicks on the button and processes
    //the input and form the output
    $scope.checkForItemNumber = function (){
      //items are the tokens seperated by comma from user input
      var items = $scope.input.split(",");
      //count is the number of tokens, if the token contains only white spaces
      //we do not count this token
      var count = items.length;
      for(var i=0; i<items.length; i++){
        if(!items[i].replace(/\s/g, '').length)
        count--;
      }

      //test for input and form output
      if($scope.input == ""){
        $scope.output = "Please enter data first";
      }else if(count <= 3){
        $scope.output = "Enjoy!";
      }else {
        $scope.output = "Too much!";
      }

      //two functions for changing the color of output an text box border
      $scope.changeToGreen = function(){
        $scope.fontColor = {"color" : "green"};
        $scope.borderColor = {"border-color" : "green"};
      };
      $scope.changeToRed = function(){
        $scope.fontColor = {"color" : "red"};
        $scope.borderColor = {"border-color" : "red"};
      };

      //change the color of output and text box border based on output
      if($scope.output == "Please enter data first"){
        $scope.changeToRed();
      }else{
        $scope.changeToGreen();
      }
    };
  }
})();
